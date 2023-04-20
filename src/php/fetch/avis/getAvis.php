<?php
session_start();
require_once "../../Classes/Avis.php";

if (isset($_GET['id_product'])) {
    $id_product = intval($_GET['id_product']);
    $avis = new Avis();
    $AV = $avis->getAvis($id_product);
    header("Content-Type: application/json");
    echo json_encode([
        'status' => 'success',
        'message' => 'Avis récupérés',
        'avis' => $AV,
    ]);
}