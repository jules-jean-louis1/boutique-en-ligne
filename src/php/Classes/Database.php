<?php

class Database
{
    private $bdd;
    public function __construct()
    {
        // Connexion a la base de données LOCAL
        try {
            $this->bdd = new PDO('mysql:host=localhost;dbname=jules-jean-louis_wellgames;charset=utf8', 'jjl_wellgames', 'Uu8c*5w96');
            $this->bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo 'Connexion échouée : ' . $e->getMessage();
            exit;
        }

    }
    public function getBdd()
    {
        return $this->bdd;
    }
}

?>