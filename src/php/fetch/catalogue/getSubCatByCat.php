<?php
session_start();
require_once "../../Classes/Categories.php";

if (isset($_GET['categoryId'])) {
    $categoryId = $_GET['categoryId'];
    $product = new Categories();
    $displaySubCategories = $product->displaySubCategoriesByCat($categoryId);
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'displaySubCategories' => $displaySubCategories]);
} else {
    header("Content-Type: application/json");
    echo json_encode(['status' => 'error', 'message' => 'Aucune catégorie sélectionnée']);
}