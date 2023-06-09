<?php
session_start();
require_once "../../Classes/Avis.php";

if (isset($_GET['id_avis'])){
    $id_avis = htmlspecialchars($_GET['id_avis']);
    $id_avis = intval($id_avis);
    $avis = new Avis();
    $replyExist = $avis->searchIfAvisAsReply($id_avis);
    if ($replyExist) {
        $avis->deleteUpdateAvis($id_avis);
        header("Content-Type: application/json");
        echo json_encode(["status" => "success"]);
    } else {
        $avis->deleteAvis($id_avis);
        header("Content-Type: application/json");
        echo json_encode(["status" => "success"]);
    }
}