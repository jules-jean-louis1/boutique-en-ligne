<?php
session_start();
require_once "../../Classes/Product.php"; // On inclut la classe Client

$product = new Product();
$displaySubCategories = $product->checkIfCategoryExist('Action');

var_dump($displaySubCategories);
