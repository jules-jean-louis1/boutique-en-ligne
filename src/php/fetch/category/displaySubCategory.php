<?php
session_start();
require_once "../../Classes/Categories.php";

$product = new Categories();
$displaySubCategories = $product->displaySubCategories();
print_r($displaySubCategories);