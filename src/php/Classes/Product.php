<?php

require_once "Database.php";
class Product extends Database
{
    public function __construct()
    {
        parent::__construct();
    }
    public function addProduct($name, $description, $price, $stock, $image, $quantite, $date, $subcategories_id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("INSERT INTO product (name_product, description_product, price_product, quantite_product, img_product, released_date_product, ajout_date_product, subcategories_id) 
                                    VALUES (:name, :description, :price, :stock, :image, :quantite, :date,  NOW(), :subcategories_id)");
        $req->execute(array(
            "name" => $name,
            "description" => $description,
            "price" => $price,
            "stock" => $stock,
            "image" => $image,
            "quantite" => $quantite,
            "date" => $date,
            "subcategories_id" => $subcategories_id
        ));
    }
}