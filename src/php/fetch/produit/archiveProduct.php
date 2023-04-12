<?php

session_start();
require_once "../../Classes/Product.php";

if (isset($_GET['id_produits'])) {
    $id = intval($_GET['id_produits']);
    $product = new Product();
    $archiveProduct = $product->archiveProduct($id);
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'message' => 'Produit archivé avec succès']);
} else {
    header("Content-Type: application/json");
    echo json_encode(['status' => 'error', 'message' => 'Erreur lors de l\'archivage du produit']);
}