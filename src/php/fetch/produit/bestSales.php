<?php
/*require_once "../../Classes/Product.php";*/
require_once "src/php/Classes/Product.php";
$product = new Product();
$bestSales = $product->getBestSales();

