<?php
session_start();
require_once "../../Classes/Order.php";

if (isset($_SESSION['id'])) {
    $order = new Order();
    $detailOrder = $order->displayDetailOrder(htmlspecialchars($_GET['id_commande']));
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'message' => 'Détails de la commande récupérés avec succès', 'detailOrder' => $detailOrder]);
}