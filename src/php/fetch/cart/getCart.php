<?php
session_start();
require_once "../../Classes/Cart.php";

if (isset($_SESSION['id'])) {
    $userid = $_SESSION['id'];
    $cart = new Cart();
    $displayCart = $cart->getCartByUserId($userid);
    $countProducts = $cart->countProductsInCart($userid);
    $total = $cart->countTotalPriceInCart($userid);
    header("Content-Type: application/json");
    echo json_encode([
        'status' => 'success_connected',
        'countProducts' => $countProducts,
        'total' => $total,
        'products' => $displayCart,
    ]);
} else {

}