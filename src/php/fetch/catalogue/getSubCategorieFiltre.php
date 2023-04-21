<?php
session_start();
require_once "../../Classes/Categories.php";

$product = new Categories();
$displaySubCategories = $product->displaySubCategoriesForFilter();
header("Content-Type: application/json");
echo json_encode(['status' => 'success', 'displaySubCategories' => $displaySubCategories]);