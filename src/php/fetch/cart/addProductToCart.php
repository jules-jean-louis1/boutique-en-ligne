<?php
session_start();
require_once "../../Classes/Cart.php";
require_once "../../Classes/Product.php";

$id_product = $_GET['id'];
$quantity_product = $_GET['quantity'];
$name_product = $_GET['name'];

If (isset($_SESSION['id'])) {
    // On vérifie si le panier existe pour l'utilisateur
    $id = $_SESSION['id'];
    $cart = new Cart();
    $cartExist = $cart->verifyIfCartExist($id);
    // Si FALSE, on crée un panier
    if ($cartExist === false) {
        $cart->createCart($id);
        $addProductToCart = $cart->AddProductToClientCart($id, $id_product, $quantity_product);
        if ($addProductToCart === true) {
            header("Content-Type: application/json");
            echo json_encode(array("status" => "success", "message" => "Le produit a bien été ajouté au panier"));
        } else {
            header("Content-Type: application/json");
            echo json_encode(array("status" => "error", "message" => "Une erreur est survenue"));
        }
    } else {
        // Si TRUE, on ajoute le produit au panier
        $addProductToCart = $cart->AddProductToClientCart($id, $id_product, $quantity_product);
        if ($addProductToCart === true) {
            header("Content-Type: application/json");
            echo json_encode(array("status" => "success", "message" => "Le produit a bien été ajouté au panier"));
        } else {
            header("Content-Type: application/json");
            echo json_encode(array("status" => "error", "message" => "Une erreur est survenue"));
        }
    }
} else {
// Vérifie si le cookie 'cart' existe et le décode en tableau associatif
    $cart = isset($_COOKIE['cart']) ? json_decode($_COOKIE['cart'], true) : [];

// Vérifie si le produit est déjà dans le panier
    if (array_key_exists($id_product, $cart)) {
        // Si oui, met à jour la quantité du produit
        $cart[$id_product]['quantity'] += $quantity_product;
    } else {
        // Sinon, ajoute un nouveau produit au panier
        $cart[$id_product] = ['id' => $id_product, 'name' => $name_product, 'quantity' => $quantity_product];
    }

// Encode le panier en JSON et enregistre-le dans le cookie 'cart'
    setcookie('cart', json_encode($cart), time() + (86400 * 30), "/"); // expire dans 30 jours
    header("Content-Type: application/json");
    echo json_encode(array("status" => "success", "message" => "Le produit a bien été ajouté au panier"));
}
