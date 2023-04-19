<?php
session_start();
require_once "../../Classes/Cart.php";

if (isset($_GET['id_product'])) {
    if (isset($_SESSION['id'])) {
        $id_product = intval($_GET['id_product']);
        $id_user = $_SESSION['id'];
        $quantity = intval($_GET['quantity_product']);
        if ($quantity <= 0) {
            header("Content-Type: application/json");
            echo json_encode([
                'status' => 'error',
                'message' => 'Quantité invalide',
            ]);
        } else {
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
    } else {
        $id_product = intval($_GET['id_product']);
        $quantity = intval($_GET['quantity_product']);
        $cookie = json_decode($_COOKIE['cart'], true);
        if($quantity > 0) {
            $cookie[$id_product]['quantity'] = $quantity;
            setcookie('cart', json_encode($cookie), time() + 3600, '/');
            header("Content-Type: application/json");
            echo json_encode([
                'status' => 'success',
                'message' => 'Quantité modifiée',
            ]);
        } else {
            header("Content-Type: application/json");
            echo json_encode([
                'status' => 'error',
                'message' => 'Quantité invalide',
            ]);
        }
    }

}
