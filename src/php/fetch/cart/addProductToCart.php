<?php
session_start();
require_once "../../Classes/Cart.php";
require_once "../../Classes/Product.php";

$id_product = $_GET['id'];
$quantity_product = $_GET['quantity'];
var_dump($id_product, $quantity_product, $_SESSION['id']);
If (isset($_SESSION['id'])) {
    // On vérifie si le panier existe pour l'utilisateur
    $id = $_SESSION['id'];
    $cart = new Cart();
    $cartExist = $cart->verifyIfCartExist($id);
    // Si FALSE, on crée un panier
    if ($cartExist == false) {
        $cart->createCart($id);
        $addProductToCart = $cart->AddProductToClientCart($id, $id_product, $quantity_product);
        var_dump($addProductToCart);
        if ($addProductToCart == true) {
            echo "Le produit a bien été ajouté au panier";
        } else {
            echo "Une erreur est survenue";
        }
    }
}
