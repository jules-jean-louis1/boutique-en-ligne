<?php

require_once "Database.php";
class Product extends Database
{
    public function __construct()
    {
        parent::__construct();
    }
    public function addProduct($name, $description, $price, $stock, $image, $date, $subcategories_id)
    {
        // Si dispo_product = 1 alors le produit n'est disponible
        $bdd = $this->getBdd();
        $req = $bdd->prepare("INSERT INTO product (name_product, description_product, price_product, quantite_product, img_product, released_date_product, ajout_date_product, dispo_product, subcategories_id) 
                                VALUES (:name, :description, :price, :stock, :image, :date,  NOW(), '0', :subcategories_id)");
        $req->execute(array(
            "name" => $name,
            "description" => $description,
            "price" => $price,
            "stock" => $stock,
            "image" => $image,
            "date" => $date,
            "subcategories_id" => $subcategories_id
        ));
    }
    public function verifieIfProductExist($name)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT * FROM product WHERE name_product = :name");
        $req->execute(array(
            "name" => $name
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        if (count($result) > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function verifieIfImageProductExist($image)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT * FROM product WHERE img_product = :image");
        $req->execute(array(
            "image" => $image
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        if (count($result) > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function getProductFormSubCatId($id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT p.*, s.name_subcategories
                                    FROM product p
                                    JOIN subcategories s ON p.subcategories_id = s.id_subcategories;
                                    WHERE s.id_subcategories = :id");
        $req->execute(array(
            "id" => $id
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function updateProduct($name, $description, $price, $stock, $image, $date, $subcategories_id, $id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("UPDATE product SET name_product = :name, description_product = :description, price_product = :price, quantite_product = :stock, img_product = :image, released_date_product = :date, subcategories_id = :subcategories_id WHERE id_product = :id");
        $req->execute(array(
            "name" => $name,
            "description" => $description,
            "price" => $price,
            "stock" => $stock,
            "image" => $image,
            "date" => $date,
            "subcategories_id" => $subcategories_id,
            "id" => $id
        ));
    }
    public function supprProduct($id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("DELETE FROM product WHERE id_produit = :id;");
        $req->execute(array(
            "id" => $id
        ));
    }
    public function supprClientAvisProduct($id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("DELETE FROM avis_client WHERE product_id = :id;");
        $req->execute(array(
            "id" => $id
        ));
    }
    public function archiveProduct($id)
    {
        // Ne pas supprimer le produit mais mettre le quantité à 0
        $bdd = $this->getBdd();
        $req = $bdd->prepare("UPDATE product SET quantite_product = :stock, dispo_product = :dispo WHERE id_product = :id");
        $req->execute(array(
            "stock" => 0,
            "dispo" => 0,
            "id" => $id
        ));
    }
    public function searchProduct($search)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT p.id_product, p.name_product, p.price_product, p.rating_product, p.img_product, p.subcategories_id, s.name_subcategories 
                                FROM product p 
                                JOIN subcategories s ON p.subcategories_id = s.id_subcategories 
                                WHERE p.name_product LIKE :search
                                OR s.name_subcategories LIKE :search");
        $req->execute(array(
            "search" => "%" . $search . "%"
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function getProductById($id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT p.*, s.name_subcategories 
                                FROM product p 
                                JOIN subcategories s ON p.subcategories_id = s.id_subcategories 
                                WHERE id_product = :id");
        $req->execute(array(
            "id" => $id
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function getProductPriceById($id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT price_product FROM product WHERE id_product = :id");
        $req->execute(array(
            "id" => $id
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}