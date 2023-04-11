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
    $subCategoryId = intval($_POST['subCategoryId']);

    // Verifier que tous les champs sont remplis
    if (empty($name) && empty($description) && empty($price) && empty($quantite) && empty($date_released) && empty($subCategoryId)) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'EmptyFields', 'message' => 'Veuillez remplir tous les champs']);
        exit();
    }
    if (empty($name)) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'EmptyName', 'message' => 'Veuillez remplir le champ nom']);
        exit();
    }
    if (empty($description)) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'EmptyDescription', 'message' => 'Veuillez remplir le champ description']);
        exit();
    }
    if (empty($price)) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'EmptyPrice', 'message' => 'Veuillez remplir le champ prix']);
        exit();
    }
    if (empty($quantite)) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'EmptyQuantite', 'message' => 'Veuillez remplir le champ quantité']);
        exit();
    }
    if (empty($date_released)) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'EmptyDateReleased', 'message' => 'Veuillez remplir le champ date de sortie']);
        exit();
    }
    if (empty($subCategoryId)) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'EmptySubCategoryId', 'message' => 'Veuillez remplir le champ sous-catégorie']);
        exit();
    }

}