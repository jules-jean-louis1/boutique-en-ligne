<?php
session_start();
require_once "../../Classes/Cart.php";

if (isset($_GET['id_product'])) {
    $id_product = intval($_GET['id_product']);
    $id_user = $_SESSION['id'];
    $cart = new Cart();
    $QuantityProduct = $cart->getQuantityItems($id_product, $id_user);
    header("Content-Type: application/json");
    echo json_encode([
        'status' => 'success',
        'QuantityProduct' => $QuantityProduct,
    ]);
}