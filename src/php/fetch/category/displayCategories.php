<?php
session_start();
require_once "../../Classes/Product.php";

$product = new Product();
$displaySubCategories = $product->displayCategories();
print_r($displaySubCategories);