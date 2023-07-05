<?php
session_start();
require_once "../../Classes/Order.php";

if(isset($_SESSION['id'])) {
    $id = $_SESSION['id'];
    $order = new Order();
    $orderUser = $order->getCommandeByUserId($id);
    if (count($orderUser) > 0) {
        $response = [];
        $getAllOrder = $order->getAllOrder($id);
        foreach ($getAllOrder as $item) {
            $orderDetails = $order->getDetailOrder($item['id_commande']);
            $totalItems = $order->numberItemsInOrder($item['id_commande']);
            $orderUser = $order->getCommandeByID($item['id_commande']);

            $response[] = [
                "Commande" => $orderUser,
                "DetailCommande" => $orderDetails,
                "totalItems" => $totalItems
            ];
        }
        header("Content-Type: application/json");
        echo json_encode(["status" => "success", "order" => $response]);
    } else {
        header("Content-Type: application/json");
        echo json_encode(["status" => "error", "message" => "Aucune commande trouvée"]);
    }

}