<?php
session_start();
require_once "../../Classes/Product.php";

if (isset($_GET['name'])) {
    $id = intval($_GET['id']);
    $nom = htmlspecialchars($_GET['name']);
    $product = new Product();
    if ($product->checkIfCategoryExist($nom) === true) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'error', 'message' => 'Cette catégorie existe déjà']);
    } else {
        $product->updateCategory($id, $nom);
        header("Content-Type: application/json");
        echo json_encode(['status' => 'success', 'message' => 'Catégorie modifiée']);
    }
    die();
}

