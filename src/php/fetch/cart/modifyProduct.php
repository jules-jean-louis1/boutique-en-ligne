<?php
session_start();
require_once "../../Classes/Cart.php";

if (isset($_GET['id_product'])) {
    $id_product = intval($_GET['id_product']);
    $id_user = $_SESSION['id'];
    $quantity = intval($_GET['quantity_product']);
    $cart = new Cart();
    $VerifyStock = $cart->verifyIfStockIsAvailable($id_product, $quantity);
    if ($VerifyStock === true) {
        $updateQuantity = $cart->updateQuantityProduct($id_product, $quantity, $id_user);
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'success',
            'message' => 'Quantité modifiée',
        ]);
    } else {
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'error',
            'message' => 'Stock insuffisant',
        ]);
    }
}
