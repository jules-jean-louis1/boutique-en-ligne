<?php
session_start();
require_once "../../Classes/Categories.php";

if (isset($_POST['nom'])) {
    $nom = $_POST['nom'];
    $id = intval($_GET['id']);
    $product = new Categories();
    $addSubCategory = $product->updateSubCategory($id, $nom);
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'message' => 'sous-catégorie modifiée']);
    die();
}