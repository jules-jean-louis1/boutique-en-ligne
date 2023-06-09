<?php
session_start();
require_once "../../Classes/Avis.php";

if (isset($_POST['content'])) {
    $id_avis = htmlspecialchars($_POST['parent_id']);
    $content = htmlspecialchars($_POST['content']);
    $user_id = $_SESSION['id'];

    if (empty($content)) {
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'error',
            'message' => 'Veuillez remplir tous les champs',
        ]);
    } elseif (empty($id_avis) || empty($user_id)) {
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'error',
            'message' => 'Veuillez remplir tous les champs',
        ]);
    } elseif (strlen($content) > 1200) {
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'tooLong',
            'message' => 'Votre commentaire ne doit pas dépasser les 1200 caractères',
        ]);
        exit();
    } else {
        $avis = new Avis();
        $avis->editAvis(trim($content), $id_avis);
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'success',
            'message' => 'Votre réponse a bien été modifiée',
        ]);
    }
}