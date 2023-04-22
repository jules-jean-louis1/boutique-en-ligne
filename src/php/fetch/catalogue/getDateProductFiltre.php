<?php
session_start();
require_once "../../Classes/Product.php";

if (isset($_GET['categorie']) && !empty(trim($_GET['categorie'])) || isset($_GET['subCategorie']) && !empty(trim($_GET['subCategorie']))) {
    $category = $_GET['categorie'];
    $subCategory = $_GET['subCategorie'];
    $product = new Product();
    $displayYear = $product->getDateOfReleasedProduct($category, $subCategory);
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'displayYear' => $displayYear]);
} else {
    $product = new Product();
    $displayYear = $product->getDateOfReleasedProduct( '', '');
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'displayYear' => $displayYear]);
}
