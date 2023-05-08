<?php
session_start();
var_dump($_GET);
require_once "../../Classes/Avis.php";

if (isset($_GET['id_comment'])) {
    $avis = new Avis();
    $replyExist = $avis->searchIfCommentAsReply(intval($_GET['id_comment']));
    var_dump($replyExist);
    if ($replyExist === true) {
        echo "test";
//        $avis->updateReplyComment(intval($_GET['id_comment']));

    } else {
        echo "test2";
//        $avis->deleteReplyAvis(intval($_GET['id_comment']));
    }
}