<?php
require_once "src/php/Classes/Avis.php";

if (isset($_GET['id'])) {
    $id = intval(htmlspecialchars($_GET['id']));
    $avis = new Avis();
    $countAvis = $avis->countAvis($id);
}