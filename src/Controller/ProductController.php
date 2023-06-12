<?php

namespace App\Controller;

class ProductController
{
    public function showPage($gameDetails)
    {
        require_once __DIR__ . '/../../public/View/product.php';
    }
    public function product($appID)
    {
        $language = "french"; // Langue souhaitée
        $url = "https://store.steampowered.com/api/appdetails/?appids=$appID&l=$language";
        $response = file_get_contents($url);

        if ($response === false) {
            echo "Erreur lors de la requête";
        } else {
            $data = json_decode($response, true);

            // Extraire les détails du jeu du tableau $data
            $gameDetails = $data[$appID]['data'];

            // Passer les détails du jeu à la vue product.php
            require_once __DIR__ . '/../../public/View/product.php';
        }
    }
}