<?php
session_start();
require_once "../../Classes/Categories.php";

$category = new Categories();
$cat = $category->displayCategoriesIndex();
header("Content-Type: application/json");
echo json_encode(['cat' => $cat]);