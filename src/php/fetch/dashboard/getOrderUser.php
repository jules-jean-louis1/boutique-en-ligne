<?php
session_start();
require_once "../../Classes/Order.php";

if (isset($_SESSION['id'])) {
    $order = new Order();
    $displayOrder = $order->getOrderAdmin(htmlspecialchars($_GET['search']), htmlspecialchars($_GET['order']));
    if (empty($displayOrder)) {
        echo 'Aucune commande trouvée';
        exit();
    } else {
        /*$displayOrder = json_encode($displayOrder);
        header("Content-Type: application/json");
        echo json_encode(['status' => 'success', 'message' => 'Commandes récupérées avec succès', 'orders' => $displayOrder]);*/
        var_dump($displayOrder);
    }
}