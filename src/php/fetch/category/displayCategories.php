<?php
session_start();
require_once "../../Classes/Categories.php";

$product = new Categories();
$displaySubCategories = $product->displayCategories();
print_r($displaySubCategories);