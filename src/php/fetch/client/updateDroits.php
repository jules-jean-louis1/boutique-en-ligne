<?php

session_start();
require_once "../../Classes/Client.php";


if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $droits = htmlspecialchars($_POST['droits']);
    $user = new Client();
    if ($_SESSION['type_compte'] === 'administrateur') {
        $updateUser = $user->updateUserDroits($id, $droits);
        header("Content-Type: application/json");
        echo json_encode(['status' => 'success', 'message' => 'Droits modifiés avec succès']);
    } else {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'error', 'message' => 'Vous n\'avez pas les droits pour supprimer un utilisateur']);
    }
}