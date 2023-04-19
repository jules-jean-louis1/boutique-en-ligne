<?php
session_start();
require_once "../../Classes/Cart.php";
require_once "../../Classes/Product.php";

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
    if (isset($_COOKIE) && isset($_COOKIE['cart']) && !empty($_COOKIE['cart'])) {
        $cart = json_decode($_COOKIE['cart'], true);
        if (empty($cart)) {
            header("Content-Type: application/json");
            echo json_encode([
                'status' => 'error',
                'message' => 'Votre panier est vide',
            ]);
        } else {
            $userCart = new Product();
            $total = 0;
            foreach ($cart as $product) {
                $productId = $product['id'];
                $productQuantity = $product['quantity'];
                $productDetails = $userCart->getProductById($productId);
                $productPrice = $productDetails[0]['price_product'];
                $total += $productPrice * $productQuantity;
                $tableProducts[] = [
                    'id_product' => $productId,
                    'name_product' => $productDetails[0]['name_product'],
                    'quantity_product' => $productQuantity,
                    'img_product' => $productDetails[0]['img_product'],
                    'price_product' => $productPrice
                ];
                $countProducts = count($tableProducts);
            }
            header("Content-Type: application/json");
            echo json_encode([
                'status' => 'success_not_connected',
                'countProducts' => $countProducts,
                'total' => $total,
                'products' => $tableProducts,
            ]);
        }
    } else {
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'error',
            'message' => 'Votre panier est vide',
        ]);
    }
}