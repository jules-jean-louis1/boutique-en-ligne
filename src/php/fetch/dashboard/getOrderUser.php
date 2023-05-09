<?php
session_start();
require_once "../../Classes/Order.php";

if (isset($_SESSION['id'])) {
    $order = new Order();
    $displayOrder = $order->getOrderAdmin(htmlspecialchars($_GET['search']), htmlspecialchars($_GET['order']));
    if (empty($displayOrder)) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'error', 'message' => 'Aucune commande trouvée']);
        exit();
    } else {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'success', 'message' => 'Commandes récupérées avec succès', 'orders' => $displayOrder]);
    }
}