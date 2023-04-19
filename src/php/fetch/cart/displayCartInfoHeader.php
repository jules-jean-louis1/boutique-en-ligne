<?php
session_start();
require_once "../../Classes/Cart.php";
require_once "../../Classes/Product.php";

// On vérifie si l'utilisateur est connecté
if (isset($_SESSION['id'])) {
    $id = $_SESSION['id'];
    // On vérifie si le panier existe pour l'utilisateur
    $cart = new Cart();
    $cartExist = $cart->verifyIfCartExist($id);
    // Si FALSE, on crée un panier
    if ($cartExist === true) {
        $getCart = $cart->getCartByUserId($id);
        $getNbProducts = $cart->countProductsInCart($id);
        $total = $cart->countTotalPriceInCart($id);
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'success_connected',
            'countProducts' => $getNbProducts,
            'total' => $total,
            'products' => $getCart,
        ]);
    } else {
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'error',
            'message' => 'Votre panier est vide'
        ]);
    }
} else {
    // On vérifie si le cookie 'cart' existe et le décode en tableau associatif
    if (isset($_COOKIE) && isset($_COOKIE['cart']) && !empty($_COOKIE['cart'])) {
        $cart = json_decode($_COOKIE['cart'], true);
        // On vérifie si le panier est vide
        if (empty($cart)) {
            // Afficher message panier vide
            header("Content-Type: application/json");
            echo json_encode([
                'status' => 'error',
                'message' => 'Votre panier est vide'
            ]);
        } else {
            // Afficher le panier
            $userCart = new Product();
            $total = 0;
            foreach ($cart as $product) {
                $productId = $product['id'];
                $productQuantity = $product['quantity'];
                $productDetails = $userCart->getProductById($productId);
                $productPrice = $productDetails[0]['price_product'];
                $total += $productPrice * $productQuantity;
                // Ajouter le produit au tableau
                $tableProducts[] = [
                    'id_product' => $productId,
                    'name_product' => $productDetails[0]['name_product'],
                    'quantity_product' => $productQuantity,
                    'img_product' => $productDetails[0]['img_product'],
                    'price_product' => $productPrice
                ];
                $CountProducts = count($tableProducts);
            }
            header("Content-Type: application/json");
            echo json_encode([
                'status' => 'success_not_connected',
                'message' => 'Le panier a bien été récupéré',
                'countProducts' => $CountProducts,
                'total' => $total,
                'products' => $tableProducts,
            ]);
        }
    } else {
        // Afficher message panier vide
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'error',
            'message' => 'Votre panier est vide'
        ]);
    }
}

