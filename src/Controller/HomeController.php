<?php

namespace App\Controller;

class HomeController
{
    public function index()
    {
        require_once __DIR__ . '/../../public/View/home.php';
    }
    public function search($query)
    {
        $url = "https://store.steampowered.com/api/storesearch/?term=$query&cc=FR&l=french&v=1&format=json";
        $json = file_get_contents($url);
        echo $json;
    }
    public function lastGame()
    {
        $url = "https://store.steampowered.com/api/featured/?cc=FR&l=french&v=1&format=json";
        $json = file_get_contents($url);
        echo $json;
    }
}