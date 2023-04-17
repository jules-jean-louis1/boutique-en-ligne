<?php
session_start();
require_once "../../Classes/Cart.php"; // On inclut la classe Client

$id_product = '1';
$quantity_product = '2';
$id = $_SESSION['id'];
$price_product = '19.99';

/*If (isset($_SESSION['id'])) {
    // On vérifie si le panier existe pour l'utilisateur
    $id = $_SESSION['id'];
    $cart = new Cart();
    $cartExist = $cart->verifyIfCartExist($id);
    if ($cartExist === false) {
        $cart->createCart($id);
        $addProductToCart = $cart->AddProductToClientCart($id, $id_product, $quantity_product);
        echo "Le produit a bien été ajouté au panier";
        if ($addProductToCart === true) {
            echo "Le produit a bien été ajouté au panier";
        } else {
            echo "Une erreur est survenue";
        }
    } if ($cartExist === true) {
        $addProductToCart = $cart->AddProductToClientCart($id, $id_product, $quantity_product);
        echo "Le produit a bien été ajouté au panier";
        if ($addProductToCart === true) {
            echo "Le produit a bien été ajouté au panier";
        } else {
            echo "Une erreur est survenue";
        }
    }
}*/


