<?php
session_start();
require_once "../../Classes/Avis.php";

//var_dump($_POST);
if (isset($_POST['id_product'])) {
    $id_comment = intval($_POST['parent_comment']);
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
        $avis->addReplyToComment($comment, $id_comment, $id_user, $id_product);
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'success',
            'message' => 'Votre réponse a bien été ajoutée',
        ]);
    }
}