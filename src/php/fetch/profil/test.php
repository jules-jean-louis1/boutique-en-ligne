<?php
session_start();
require_once "../../Classes/Categories.php"; // On inclut la classe Client

$product = new Categories();
$displaySubCategories = $product->checkIfCategoryExist('Action');

var_dump($displaySubCategories);
