<?php
session_start();
require_once "../../Classes/Cart.php";
require_once "../../Classes/Product.php";

$id_product = $_GET['id'];
$quantity_product = $_GET['quantity'];

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
    header("Content-Type: application/json");
    echo json_encode(array("status" => "error", "message" => "Vous devez être connecté pour ajouter un produit au panier"));
}
