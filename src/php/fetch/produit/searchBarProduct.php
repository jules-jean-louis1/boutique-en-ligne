<?php

session_start();
require_once "../../Classes/Product.php";

if (isset($_GET['query'])) {
    $search = htmlspecialchars($_GET['query']);
    $product = new Product();
    $displayProduct = $product->searchProduct($search);
    if (count($displayProduct) > 0) {
        header("Content-Type: application/json");
        echo json_encode(["status" => "success", "message" => "Produit trouvé", "data" => $displayProduct]);
    } else {
        header("Content-Type: application/json");
        echo json_encode(["status" => "error", "message" => "Aucun produit trouvé"]);
    }
}