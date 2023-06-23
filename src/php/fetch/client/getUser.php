<?php
session_start();
require_once "../../Classes/Client.php";

if (isset($_SESSION['id'])) {
    $user = new Client();
    $detailUser = $user->getUserInfoById(intval($_GET['id']));
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'message' => 'Utilisateur récupéré avec succès', 'detailUser' => $detailUser]);
}