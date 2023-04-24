<?php
session_start();
require_once "../../Classes/Catalogue.php";

if (isset($_GET['date']) && !empty(trim($_GET['date'])) || isset($_GET['order']) && !empty(trim($_GET['order'])) || isset($_GET['page']) && !empty(trim($_GET['page'])) || isset($_GET['categorie']) && !empty(trim($_GET['categorie'])) || isset($_GET['subCategorie']) && !empty(trim($_GET['subCategorie']))) {
    $date = $_GET['date'];
    $order = htmlspecialchars($_GET['order']);
    $page = intval($_GET['page']);
    $category = htmlspecialchars($_GET['categorie']);
    $subCategory = $_GET['subCategorie'];
    $product = new Catalogue();
    $displayProducts = $product->getProductsCatalogue($page, $date, $order, $category, $subCategory);
    if (empty($displayProducts)) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'error', 'message' => 'Aucun produit trouvé']);
    } else {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'success', 'displayProducts' => $displayProducts]);
    }
}