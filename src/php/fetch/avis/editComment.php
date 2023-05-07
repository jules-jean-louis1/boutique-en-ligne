<?php
session_start();
require_once "../../Classes/Avis.php";

if (isset($_POST['content_avis'])) {
    if (isset($_POST['content_avis']) && !empty($_POST['content_avis'])) {
        if (strlen($_POST['content_avis']) < 1) {
            header("Content-Type: application/json");
            echo json_encode([
                'status' => 'error',
                'message' => 'Votre commentaire est trop court',
            ]);
            exit();
        }
        $avis = new Avis();
        $avis->editReplyAvis(htmlspecialchars($_POST['content_avis']), intval($_POST['id_comment']));
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'success',
            'message' => 'Commentaire modifié',
        ]);
    } else {
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'error',
            'message' => 'Veuillez remplir le champ',
        ]);
    }
}