<?php

namespace App\Controller;
use App\Model\CartModel;
class CartController
{

    public function addToCart($id)
    {
        $id_product = intval($id);
        $id_user = intval($_SESSION['id']);
        $version_product = intval($_POST['version']);
        $platform_product = htmlspecialchars($_POST['platforms']);

        // Effectuer les requêtes vers L'API STEAM pour obtenir les informations du jeu
        $language = "french"; // Langue souhaitée
        $url = "https://store.steampowered.com/api/packagedetails/?packageids=$version_product&cc=FR&l=$language";
        $response = file_get_contents($url);
        $responseData = json_decode($response, true); // Convertir la réponse JSON en tableau associatif

        if ($responseData[$version_product]['success']) {
            $name = $responseData[$version_product]['data']['name'];
            $finalPrice = $responseData[$version_product]['data']['price']['final'];

            if (isset($_SESSION['id'])) {
                $cartModel = new CartModel();
                $verifyIfCartExist = $cartModel->verifyIfCartExist($_SESSION['id']);
                if (!$verifyIfCartExist) {
                    $cartModel->createCart($_SESSION['id']);
                    $addProductToCart = $cartModel->addProductToCart($id_product, $id_user, $version_product, $platform_product, $name, $finalPrice);
                }
            } else {

            }
        } else {
            // Gérer le cas où la requête n'a pas réussi
            echo "La requête n'a pas réussi.";
        }
    }
}