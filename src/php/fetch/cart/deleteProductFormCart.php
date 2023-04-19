<?php
session_start();
require_once "../../Classes/Cart.php";

if (isset($_GET['id_product'])) {
    $id_product = intval($_GET['id_product']);
    if (isset($_SESSION['id'])) {
        $id_user = $_SESSION['id'];
        $cart = new Cart();
        $verifyProduct = $cart->verifyProductExistInCart($id_product, $id_user);
        if ($verifyProduct === true) {
            $deleteProduct = $cart->deleteProductFromCart($id_product, $id_user);
            header("Content-Type: application/json");
            echo json_encode([
                'status' => 'success',
                'message' => 'Produit supprimé',
            ]);
        } else {
            header("Content-Type: application/json");
            echo json_encode([
                'status' => 'error',
                'message' => 'Ce produit n\'existe pas dans votre panier',
            ]);
        }
    }
} else {

}
?>

