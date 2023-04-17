<?php
session_start();
require_once "../../Classes/Cart.php";
require_once "../../Classes/Product.php";

// On vérifie si l'utilisateur est connecté
if (isset($_SESSION['id'])) {
    // code si connecté
} else {
    // On vérifie si le cookie 'cart' existe et le décode en tableau associatif
    if (isset($_COOKIE['cart'])) {
        $cart = json_decode($_COOKIE['cart'], true);
        // On vérifie si le panier est vide
        if (empty($cart)) {
            // Afficher message panier vide
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
                    'id' => $productId,
                    'name' => $productDetails[0]['name_product'],
                    'quantity' => $productQuantity,
                    'image' => $productDetails[0]['img_product'],
                    'price' => $productPrice
                ];
            }
            echo json_encode($tableProducts);
            // Afficher le total
            echo "Total: " . $total . "€";
        }
    } else {
        // Afficher message panier vide
    }
}

