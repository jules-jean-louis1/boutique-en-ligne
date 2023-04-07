<?php
session_start();
require_once "../../Classes/Categories.php";

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $nom = $_POST['nom'];
    $subCategories = new Categories();
    $updateSubCategory = $subCategories->addSubCategory($id, $nom);
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'message' => 'Sous-catégorie ajoutée']);
    die();

}