<?php
session_start();
require_once "../../Classes/Avis.php";

if (isset($_POST['content'])) {
    $produit_id = htmlspecialchars($_POST['produit_id']);
    $parent_id = htmlspecialchars($_POST['parent_id']);
    $content = htmlspecialchars($_POST['content']);
    $user_id = $_SESSION['id'];
    if (empty($content)) {
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'error',
            'message' => 'Veuillez remplir tous les champs',
        ]);
        if (strlen($content) > 1200) {
            header("Content-Type: application/json");
            echo json_encode([
                'status' => 'tooLong',
                'message' => 'Votre commentaire ne doit pas dépasser les 500 caractères',
            ]);
            exit();
        } else {
            $avis = new Avis();
            $avis->addReplyAvis($produit_id, trim($content), $parent_id, $user_id);
            header("Content-Type: application/json");
            echo json_encode([
                'status' => 'success',
                'message' => 'Votre réponse a bien été ajoutée',
            ]);
        }
    }
}