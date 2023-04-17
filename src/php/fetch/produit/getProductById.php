<?php
session_start();
require_once "../../Classes/Product.php";

if (isset($_GET['id'])) {
    $id = htmlspecialchars($_GET['id']);
    $product = new Product();
    $displayProduct = $product->getProductById($id);
    header("Content-Type: application/json");
    echo json_encode(["status" => "success", "message" => "Produit trouvé", "data" => $displayProduct]);
}