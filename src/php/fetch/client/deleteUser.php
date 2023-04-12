<?php
session_start();
require_once "../../Classes/Client.php";

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $user = new Client();
    $deleteUser = $user->deleteUser($id);
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'message' => 'Utilisateur supprimé avec succès']);
}