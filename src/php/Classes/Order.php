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
                $result = $req2->fetchAll(PDO::FETCH_ASSOC);
                $stock = $result[0]['quantite_product'];
                $sold = $result[0]['quantite_vendue'];

                $newSold = $sold + $quantite_produit;
                $newStock = $stock - $quantite_produit;

                $req3 = $bdd->prepare("UPDATE product SET quantite_product = :newStock, quantite_vendue =:newSold  WHERE id_product = :id_product");
                $req3->execute(array(
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
    public function numberItemsInOrder($id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT SUM(quantite_produit) AS total_articles 
                                    FROM commande c 
                                    JOIN detail_commande d ON c.id_commande = d.command_id 
                                    WHERE d.command_id = :id");
        $req->execute(array(
            "id" => $id
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        $total = $result[0]['total_articles'];
        return $total;
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
    public function getOrderAdmin($search = '', $order = 'DESC')
    {
        $bdd = $this->getBdd();
        $query = "SELECT DISTINCT commande.id_commande, commande.date_commande, commande.motant_commande, commande.statue_commande,
                users.login_users, users.email_users
            FROM commande
            JOIN client ON commande.users_id = client.id_client
            JOIN users ON client.users_id = users.id_users
            JOIN detail_commande ON commande.id_commande = detail_commande.command_id
            JOIN product ON detail_commande.product_id = product.id_product
            JOIN subcategories ON product.subcategories_id = subcategories.id_subcategories
            JOIN categories ON subcategories.categories_id = categories.id_categories";

        if (isset($search) && !empty(trim($search))) {
            $query .= " WHERE users.login_users LIKE :search OR users.email_users LIKE :search";
        }
        if (trim($order) != 'DESC') {
            $query .= " ORDER BY commande.date_commande ASC";
        } else {
            $query .= " ORDER BY commande.date_commande DESC";
        }
        $stmt = $bdd->prepare($query);
        if (!empty(trim($search))) {
            $searchParam = '%' . $search . '%';
            $stmt->bindParam(':search', $searchParam, PDO::PARAM_STR);
        }
        // Assurez-vous d'utiliser ":order" dans votre requête SQL où vous souhaitez l'utiliser
        // Par exemple, si vous voulez l'utiliser dans la clause ORDER BY, vous pouvez faire comme ceci :
        // $query .= " ORDER BY commande.date_commande " . $order;
        // Et vous pouvez supprimer la ligne suivante qui lie le paramètre ":order"
        //$stmt->bindParam(':order', $order, PDO::PARAM_STR);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function displayDetailOrder(int $id_commande) : array
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT p.img_product, p.name_product, p.price_product, dc.quantite_produit, s.name_subcategories 
                                    FROM detail_commande dc 
                                    JOIN product p ON p.id_product = dc.product_id 
                                    JOIN subcategories s ON s.id_subcategories = p.subcategories_id 
                                    JOIN commande c ON c.id_commande = dc.command_id 
                                    JOIN client cl ON cl.id_client = c.users_id 
                                    WHERE c.id_commande = :id_commande");
        $req->execute(array(
            "id_commande" => $id_commande
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function updateStatusOrder($id_commande, $statue_commande)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("UPDATE commande SET statue_commande = :statue_commande WHERE id_commande = :id_commande");
        $req->execute(array(
            "id_commande" => $id_commande,
            "statue_commande" => $statue_commande
        ));
    }
    public function deleteOrder($id_commande)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("DELETE FROM commande, detail_commande
                                    USING commande
                                    JOIN detail_commande ON commande.id_commande = detail_commande.command_id
                                    WHERE id_commande = :id_commande");
        $req->execute(array(
            "id_commande" => $id_commande
        ));
    }
    public function getAllOrder(int $ID)
    {
        $bdd = $this->getBdd();
        $req1 = $bdd->prepare("SELECT id_commande, date_commande, motant_commande, statue_commande, users_id FROM commande WHERE users_id = :ID");
        $req1->execute(array(
            "ID" => $ID
        ));
        $result1 = $req1->fetchAll(PDO::FETCH_ASSOC);
        return $result1;
    }
    public function getDetailOrder(int $id_commande)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT p.img_product, p.name_product, p.price_product, dc.quantite_produit, s.name_subcategories 
                                    FROM detail_commande dc 
                                    JOIN product p ON p.id_product = dc.product_id 
                                    JOIN subcategories s ON s.id_subcategories = p.subcategories_id 
                                    JOIN commande c ON c.id_commande = dc.command_id 
                                    JOIN client cl ON cl.id_client = c.users_id 
                                    WHERE c.id_commande = :id_commande");
        $req->execute(array(
            "id_commande" => $id_commande
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function getCommandeByID(int $id_commande)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT id_commande, date_commande, motant_commande, statue_commande, users_id FROM commande WHERE id_commande = :id_commande");
        $req->execute(array(
            "id_commande" => $id_commande
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}