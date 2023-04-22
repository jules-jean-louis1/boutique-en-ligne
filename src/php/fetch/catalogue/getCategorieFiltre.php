<?php
session_start();
require_once "../../Classes/Categories.php";

$product = new Categories();
$displayCategories = $product->displayCategoriesForFilter();
header("Content-Type: application/json");
echo json_encode(['status' => 'success', 'displayCategories' => $displayCategories]);