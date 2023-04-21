<?php
session_start();
require_once "../../Classes/Product.php";

$product = new Product();
$displayYear = $product->getDateOfReleasedProduct();
header("Content-Type: application/json");
echo json_encode(['status' => 'success', 'displayYear' => $displayYear]);