<?php

require_once "Database.php";
class Order extends Database
{
    public function __construct()
    {
        parent::__construct();
    }
    public function insertOrderAndDetailsForUsers($users_id, $totalOrder, $orderDetails)
    {
        $bdd = $this->getBdd();
        $bdd->beginTransaction();

        try {
            // Insertion de la commande
            $req = $bdd->prepare("INSERT INTO commande (date_commande, motant_commande, statue_commande, users_id) VALUES (NOW(), :total_order, :statue_commande, :users_id)");
            $req->execute([
                "total_order" => $totalOrder,
                "statue_commande" => "En cours",
                "users_id" => $users_id
            ]);

            // Récupération de l'ID de la commande
            $command_id = $bdd->lastInsertId();

            // Insertion des détails de la commande
            foreach ($orderDetails as $detail) {
                $product_id = $detail['id_product'];
                $quantite_produit = $detail['quantity_product'];
                $price_product = $detail['price_product'];

                $req = $bdd->prepare("INSERT INTO detail_commande (product_id, quantite_produit, price_product, command_id) 
                                        VALUES (:product_id, :quantite, :price, :command_id)");
                $req->execute([
                    "quantite" => $quantite_produit,
                    "price" => $price_product,
                    "product_id" => $product_id,
                    "command_id" => $command_id
                ]);
                $req2 = $bdd->prepare("SELECT quantite_product, quantite_vendue FROM product WHERE id_product = :id_product");
                $req2->execute(array(
                    "id_product" => $product_id
                ));
                $result = $req->fetchAll(PDO::FETCH_ASSOC);
                $stock = $result[0]['quantite_product'];
                $sold = $result[0]['quantite_vendue'];

                $newSold = $sold + $quantite_produit;
                $newStock = $stock - $quantite_produit;

                $req = $bdd->prepare("UPDATE product SET quantite_product = :newStock, quantite_vendue =:newSold  WHERE id_product = :id_product");
                $req->execute(array(
                    "id_product" => $product_id,
                    "newStock" => $newStock,
                    "newSold" => $newSold
                ));
            }


            // Valider la transaction
            $bdd->commit();
            return true;

        } catch (Exception $e) {
            // Annuler la transaction en cas d'erreur
            $bdd->rollback();
            return false;
        }
    }
    public function getCommandeByUserId($id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT * FROM commande WHERE users_id = :id");
        $req->execute(array(
            "id" => $id
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function getDetailCommandeById($id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT p.img_product, p.name_product, p.price_product, dc.quantite_produit, s.name_subcategories 
                                    FROM detail_commande dc 
                                    JOIN product p ON p.id_product = dc.product_id 
                                    JOIN subcategories s ON s.id_subcategories = p.subcategories_id 
                                    JOIN commande c ON c.id_commande = dc.command_id 
                                    JOIN client cl ON cl.id_client = c.users_id 
                                    WHERE cl.users_id = :id");
        $req->execute(array(
            "id" => $id
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}