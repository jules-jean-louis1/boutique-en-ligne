<?php
session_start();
require_once "../../Classes/Product.php";

$errors = [];
if (isset($_POST['id_product'])) {
    $id_product = intval($_POST['id_product']);
    $product = new Product();
    $verfiyProduct = $product->verifieIfProductExist($id_product);
    if ($verfiyProduct) {
        $product->supprProduct($id_product);
        $errors['product'] = "Le produit a bien été supprimé";
    } else {
        $errors['product'] = "Ce produit n'existe pas";
    }
} else {
    $errors['product'] = "Ce produit n'existe pas";
}
header("Content-Type: application/json");
echo json_encode($errors);
