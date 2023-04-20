<?php
session_start();
require_once "../../Classes/Avis.php";

if (isset($_GET['id_avis'])){
    $id_avis = intval($_GET['id_avis']);
    $avis = new Avis();
    $avis->deleteAvis($id_avis);
    header("Content-Type: application/json");
    echo json_encode([
        'status' => 'success',
        'message' => 'Votre avis a bien été supprimé',
    ]);
}