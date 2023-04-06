<?php
session_start();
require_once "../../Classes/Product.php";

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $product = new Product();
    $product->deleteCategory($id);
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'message' => 'Catégorie supprimée']);
    die();
}