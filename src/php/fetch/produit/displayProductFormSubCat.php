<?php
session_start();
require_once "../../Classes/Product.php";

if (isset($_GET['subcategories_id'])) {
    $categories_id = intval($_GET['subcategories_id']);
    $product = new Product();
    $displayProducts = $product->getProductFormSubCatId($categories_id);
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'displayProducts' => $displayProducts]);
    die();
}