<?php
session_start();
require_once "../../Classes/Product.php";
require_once "../../Classes/Order.php";

if(isset($_SESSION['id'])) {
    $id = $_SESSION['id'];
    $order = new Order();
    $orderUser = $order->getCommandeByUserId($id);
    if(count($orderUser) > 0) {
        $orderDetails = $order->getDetailCommandeById($id);
        header("Content-Type: application/json");
        echo json_encode(array("status" => "success", "Commande" => $orderUser, "DetailCommande" => $orderDetails));
    } else {
        header("Content-Type: application/json");
        echo json_encode(array("status" => "error", "message" => "Aucune commande trouvée"));
    }
}