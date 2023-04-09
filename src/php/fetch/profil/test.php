<?php
session_start();
require_once "../../Classes/Categories.php"; // On inclut la classe Client

if (is_dir("../../../images/products/")) {
    echo "Le dossier existe";
} else {
    echo "Le dossier n'existe pas";
}
