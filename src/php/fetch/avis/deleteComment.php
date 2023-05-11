<?php
session_start();
require_once "../../Classes/Avis.php";

if (isset($_GET['id_comment'])) {
    $avis = new Avis();
    $replyExist = $avis->searchIfCommentAsReply(intval($_GET['id_comment']));
    if ($replyExist) {
        $avis->updateReplyComment(intval($_GET['id_comment']));
        header("Content-Type: application/json");
        echo json_encode(["message" => "success"]);
    } else {
        $avis->deleteReplyAvis(intval($_GET['id_comment']));
        header("Content-Type: application/json");
        echo json_encode(["message" => "success"]);
    }
}