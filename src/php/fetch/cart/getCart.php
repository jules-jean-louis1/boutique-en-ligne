<?php
session_start();
require_once "../../Classes/Cart.php";

if (isset($_SESSION['id'])) {
    $userid = $_SESSION['id'];
    $cart = new Cart();
    $displayCart = $cart->getCartByUserId($userid);
    if (count($displayCart) === 0) {
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'error',
            'message' => 'Votre panier est vide',
        ]);
    } else {
        $countProducts = $cart->countProductsInCart($userid);
        $total = $cart->countTotalPriceInCart($userid);
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'success_connected',
            'countProducts' => $countProducts,
            'total' => $total,
            'products' => $displayCart,
        ]);
    }
} else {

}