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

}