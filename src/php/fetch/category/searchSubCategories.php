<?php
session_start();
require_once "../../Classes/Categories.php";

if (isset($_GET['query'])) {
    $query = $_GET['query'];
    $product = new Categories();
    $displaySubCategories = $product->displayCategoriesAndSub($query);
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'displaySubCategories' => $displaySubCategories]);
    die();
}