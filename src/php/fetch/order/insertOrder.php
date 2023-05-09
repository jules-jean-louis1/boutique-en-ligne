<?php
session_start();
require_once "../../Classes/Order.php";
require_once "../../Classes/Cart.php";




if (isset($_SESSION['id'])) {
    $id_users = $_SESSION['id'];
    $Order = new Order();
    $cart = new Cart();
    $Total = $cart->countTotalPriceInCart($id_users);
    $Panier = $cart->getCartByUserId($id_users);
    if (empty($Panier)) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'error', 'message' => 'Votre panier est vide.']);
        exit();
    }
    $Commade = $Order->insertOrderAndDetailsForUsers($id_users, $Total, $Panier);
    if ($Commade) {
        $cart->deleteCartByUserId($id_users);
        header("Content-Type: application/json");
        echo json_encode(['status' => 'success', 'message' => 'Commande effectuée.']);
    } else {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'error', 'message' => 'Commande non effectuée.']);
    }
}