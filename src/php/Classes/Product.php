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
        $bdd = $this->getBdd();
        $req = $bdd->prepare("INSERT INTO product (name_product, description_product, price_product, quantite_product, img_product, released_date_product, ajout_date_product, subcategories_id) 
                                    VALUES (:name, :description, :price, :stock, :image, :date,  NOW(), :subcategories_id)");
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
    public function verfieIfImage($image)
    {

    }
}