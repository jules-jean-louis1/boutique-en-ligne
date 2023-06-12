<?php

namespace App\Controller;

class ProductController
{
    public function showPage()
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
            foreach ($data as $product) { // On parcourt les données
                $name = $product['data']['name'];
                $header_image = $product['data']['header_image'];
                $short_description = $product['data']['short_description'];
                $long_description = $product['data']['detailed_description'];
                $release_date = $product['data']['release_date']['date'];
                $price = $product['data']['price_overview']['final_formatted'];
                $platforms = $product['data']['platforms'];?>
                <div>
                    <h1><?php echo $name; ?></h1>
                    <img src="<?php echo $header_image; ?>" alt="Image du jeu <?php echo $name; ?>">
                    <p><?php echo $short_description; ?></p>
                    <p><?php echo $long_description; ?></p>
                    <p><?php echo $release_date; ?></p>
                    <p><?php echo $price; ?></p>
                    <p><?php echo $platforms; ?></p>
                </div>
            <?php
            }
        }
    }
}