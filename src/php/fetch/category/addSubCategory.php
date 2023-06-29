<?php
session_start();
require_once "../../Classes/Categories.php";

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $nom = htmlspecialchars($_POST['nom']);
    if (empty($nom)) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'empty', 'message' => "Veuillez renseigner un nom"]);
        die();
    } else if (strlen($nom) > 35) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'long', 'message' => "Le nom de la sous-catégorie ne doit pas dépasser 35 caractères"]);
        die();
    } else if (strlen($nom) < 3) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'short', 'message' => "Le nom de la sous-catégorie doit contenir au moins 3 caractères"]);
    } else {
        $subCategories = new Categories();
        $updateSubCategory = $subCategories->addSubCategory($id, $nom);
        header("Content-Type: application/json");
        echo json_encode(['status' => 'success', 'message' => 'Sous-catégorie ajoutée']);
    }
} else {
    header("Content-Type: application/json");
    echo json_encode(['status' => 'error', 'message' => "Erreur lors de l'ajout de la sous-catégorie"]);
    die();
}