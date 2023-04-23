<?php
session_start();
require_once "../../Classes/Product.php";

$product = new Product();
$lastProduct = $product->displayLastProduct();
header("Content-Type: application/json");
echo json_encode(["lastProduct" => $lastProduct]);