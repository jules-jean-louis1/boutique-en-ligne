<?php
session_start();
require_once "../../Classes/Client.php";

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    if ($_SESSION['type_compte'] !== 'administrateur') {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'error', 'message' => 'Vous n\'avez pas les droits pour supprimer un utilisateur']);
        exit();
    } if ($_SESSION['id'] === $id) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'error', 'message' => 'Vous ne pouvez pas supprimer votre propre compte']);
        exit();
    } if ($id === '1') {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'error', 'message' => 'Vous ne pouvez pas supprimer le compte super-administrateur']);
        exit();
    } else {
        $user = new Client();
        $deleteUser = $user->deleteUser($id);
        header("Content-Type: application/json");
        echo json_encode(['status' => 'success', 'message' => 'Utilisateur supprimé avec succès']);
    }
}