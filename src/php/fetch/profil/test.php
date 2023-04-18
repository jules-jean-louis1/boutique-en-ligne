<?php
session_start();
require_once "../../Classes/Cart.php"; // On inclut la classe Client


$carts = new Cart();
$test = $carts->countProductsInCart($_SESSION['id']);
$r = $carts->getCartByUserId($_SESSION['id']);
print_r($r);



