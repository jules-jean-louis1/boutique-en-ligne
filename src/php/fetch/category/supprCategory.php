<?php
session_start();
require_once "../../Classes/Categories.php";

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $product = new Categories();
    $product->deleteCategory($id);
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'message' => 'Catégorie supprimée']);
    die();
}