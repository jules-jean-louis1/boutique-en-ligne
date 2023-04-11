<?php
session_start();

require_once "../../Classes/Product.php";


if (isset($_POST['updateNameProduct'])) {

    $id_product = intval($_GET['id_produits']);
    $name = htmlspecialchars($_POST['updateNameProduct']);
    $description = htmlspecialchars($_POST['updateDescriptionProduct']);
    $price = htmlspecialchars($_POST['updatePriceProduct']);
    $quantite = htmlspecialchars($_POST['updateQuantiteProduct']);
    $date_released = intval($_POST['updateReleasedDateProduct']);
    $subCategoryId = intval($_POST['updateSubCategoryProduct']);

    // Verifier que tous les champs sont remplis
    if (!empty($name) && !empty($description) && !empty($price) && !empty($quantite) && !empty($date_released) && !empty($subCategoryId)) {

    } else {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'error', 'EmptyFields' => 'Veuillez remplir tous les champs']);
        exit();
    }
}