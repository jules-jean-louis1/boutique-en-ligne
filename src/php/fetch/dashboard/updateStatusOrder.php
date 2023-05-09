<?php
session_start();
require_once "../../Classes/Order.php";

if (isset($_SESSION['id'])) {
    $order = new Order();
    if (isset($_GET['id_commande']) && isset($_POST['statue_commande'])) {
        $ChangeStatue = $order->updateStatusOrder(htmlspecialchars($_GET['id_commande']), htmlspecialchars($_POST['statue_commande']));
        header("Content-Type: application/json");
        echo json_encode(['status' => 'success', 'message' => 'Statut de la commande modifié avec succès']);
    } else {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la modification du statut de la commande']);
    }
}