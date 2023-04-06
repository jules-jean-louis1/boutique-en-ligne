<?php
session_start();
require_once "../../Classes/Product.php";

if (isset($_POST['nom'])) {
    $nom = htmlspecialchars($_POST['nom']);
    $product = new Product();
    if ($product->checkIfCategoryExist($nom) === true) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'error', 'message' => 'Cette catégorie existe déjà']);
        die();
    } else {
        $product->AddParentCategory($nom);
        header("Content-Type: application/json");
        echo json_encode(['status' => 'success', 'message' => 'Catégorie ajoutée']);
        die();
    }
}
