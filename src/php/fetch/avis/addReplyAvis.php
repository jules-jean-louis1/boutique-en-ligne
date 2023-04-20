<?php
session_start();
require_once "../../Classes/Avis.php";


if (isset($_GET['id_avis'])) {
    $id_avis = intval($_GET['id_avis']);
    $id_product = intval($_POST['id_product']);
    $comment = htmlspecialchars($_POST['content_avis']);
    $id_user = intval($_SESSION['id']);
    if (empty($comment)) {
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'error',
            'message' => 'Veuillez remplir tous les champs',
        ]);
    } else {
        $avis = new Avis();
        $avis->addReplyAvis($comment, $id_avis, $id_user, $id_product);
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'success',
            'message' => 'Votre réponse a bien été ajoutée',
        ]);
    }
}