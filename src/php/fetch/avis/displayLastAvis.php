<?php

require_once "../../Classes/Avis.php";

$avis = new Avis();
$lastAvis = $avis->displayLastAvis();
header("Content-Type: application/json");
echo json_encode(['lastAvis' => $lastAvis]);
