<?php
session_start();
require_once "../../Classes/Categories.php";

if (isset($_GET['id'])) {

    $id = intval($_GET['id']);
    $product = new Categories();
    $deleteSubCategory = $product->deleteSubCategory($id);
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'message' => 'Sous-catégorie supprimée']);
    die();
}