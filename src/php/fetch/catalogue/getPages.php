<?php
session_start();
require_once "../../Classes/Catalogue.php";

if (isset($_GET['date']) && !empty(trim($_GET['date'])) || isset($_GET['order']) && !empty(trim($_GET['order'])) || isset($_GET['page']) && !empty(trim($_GET['page'])) || isset($_GET['subCategory']) && !empty(trim($_GET['subCategory']))) {
    $date = $_GET['date'];
    $order = $_GET['order'];
    $page = $_GET['page'];
    $subCategory = $_GET['subCategory'];
    $pages = new Catalogue();
    $displayPages = $pages->getPagesCatalogue($date, $order, $page, $subCategory);
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'displayPages' => $displayPages]);
} else {
    $pages = new Catalogue();
    $displayPages = $pages->getPagesCatalogue();
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'displayPages' => $displayPages]);
}
