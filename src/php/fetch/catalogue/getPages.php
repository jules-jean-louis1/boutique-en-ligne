<?php
session_start();
require_once "../../Classes/Catalogue.php";

if (isset($_GET['date']) && !empty(trim($_GET['date'])) || isset($_GET['order']) && !empty(trim($_GET['order'])) || isset($_GET['subCategorie']) && !empty(trim($_GET['subCategorie']))|| isset($_GET['categorie']) && !empty(trim($_GET['categorie']))) {
    $date = $_GET['date'];
    $order = $_GET['order'];
    $categorie = $_GET['categorie'];
    $subCategory = $_GET['subCategorie'];
    $pages = new Catalogue();
    $displayPages = $pages->getPagesCatalogue($date, $order, $categorie, $subCategory);
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'displayPages' => $displayPages]);
} else {
    $pages = new Catalogue();
    $displayPages = $pages->getPagesCatalogue();
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'displayPages' => $displayPages]);
}
