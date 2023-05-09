<?php
session_start();
require_once "../../Classes/Order.php";

if (isset($_SESSION['id'])) {
    $order = new Order();
    $deleteOrder = $order->deleteOrder(htmlspecialchars($_GET['id_commande']));
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'message' => 'Commande supprimée avec succès']);
}