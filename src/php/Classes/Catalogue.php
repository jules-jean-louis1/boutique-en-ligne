<?php

require_once "Database.php";
class Catalogue extends Database
{
    public function __construct()
    {
        parent::__construct();
    }
    public function getPagesCatalogue($date = '', $Filtre = 'ASC_date', $categorie = '', $sousCategorie = '')
    {
        $bdd = $this->getBdd();
        $req = "SELECT COUNT(product.id_product) AS total_count 
                                FROM product 
                                JOIN subcategories ON product.subcategories_id = subcategories.id_subcategories 
                                JOIN categories ON categories.id_categories = subcategories.categories_id";
        if ($date != '') {
            $req .= " WHERE YEAR(product.released_date_product) = :date";
        }

        if (isset($categorie) && !empty(trim($categorie)) && isset($sousCategorie) && !empty(trim($sousCategorie))) {
            $req .= " AND subcategories.id_subcategories = :sousCategorie";
        } elseif ($categorie != '') {
            $req .= " AND categories.id_categories = :categorie";
        } elseif ($sousCategorie != '') {
            $req .= " AND subcategories.id_subcategories = :sousCategorie";
        }

        if ($Filtre === 'ASC_prix') {
            $req .= " ORDER BY product.price_product ASC";
        } elseif ($Filtre === 'DESC_prix') {
            $req .= " ORDER BY product.price_product DESC";
        } elseif ($Filtre === 'ASC_vente') {
            $req .= " ORDER BY product.quantite_product ASC";
        } elseif ($Filtre === 'DESC_vente') {
            $req .= " ORDER BY product.quantite_product DESC";
        } elseif ($Filtre === 'ASC_rating') {
            $req .= " ORDER BY product.rating_product ASC";
        } elseif ($Filtre === 'DESC_rating') {
            $req .= " ORDER BY product.rating_product DESC";
        } elseif ($Filtre === 'ASC_date') {
            $req .= " ORDER BY product.released_date_product ASC";
        } elseif ($Filtre === 'DESC_date') {
            $req .= " ORDER BY product.released_date_product DESC";
        }

        $stmt = $bdd->prepare($req);

        if ($date != '') {
            $stmt->bindParam(':date', $date, PDO::PARAM_INT);
        }

        if (isset($categorie) && !empty(trim($categorie)) && isset($sousCategorie) && !empty(trim($sousCategorie))) {
            $stmt->bindParam(':sousCategorie', $sousCategorie, PDO::PARAM_INT);
        } elseif ($categorie != '') {
            $stmt->bindParam(':categorie', $categorie, PDO::PARAM_INT);
        } elseif ($sousCategorie != '') {
            $stmt->bindParam(':sousCategorie', $sousCategorie, PDO::PARAM_INT);
        }

        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $count = $result['total_count'];
        $pages = ceil($count / 12);
        return $pages;
    }

    public function getProductsCatalogue($pages = '1', $date = '', $Filtre = 'ASC_date', $categorie = '', $sousCategorie = '')
    {
        // Nombre d'articles par page
        $limit = 9;
        // Calcul de l'offset en fonction de la page demandée
        $offset = ($pages - 1) * $limit;
        // Définir l'offset à 0 si le numéro de page est inférieur à 1
        if ($offset < 0) {
            $offset = 0;
        }
        $bdd = $this->getBdd();
        $req = "SELECT product.id_product, product.name_product, product.price_product, product.img_product, product.rating_product, product.quantite_product, product.quantite_vendue, product.released_date_product, subcategories.name_subcategories, categories.name_categories 
                FROM product JOIN subcategories ON product.subcategories_id = subcategories.id_subcategories 
                JOIN categories ON categories.id_categories = subcategories.categories_id";

        if ($date != '') {
            $req .= " WHERE YEAR(product.released_date_product) = :date";
        }

        if (isset($categorie) && !empty(trim($categorie)) && isset($sousCategorie) && !empty(trim($sousCategorie))) {
            $req .= " AND subcategories.id_subcategories = :sousCategorie";
        } elseif ($categorie != '') {
            $req .= " AND categories.id_categories = :categorie";
        } elseif ($sousCategorie != '') {
            $req .= " AND subcategories.id_subcategories = :sousCategorie";
        }

        if ($Filtre === 'ASC_prix') {
            $req .= " ORDER BY product.price_product ASC";
        } elseif ($Filtre === 'DESC_prix') {
            $req .= " ORDER BY product.price_product DESC";
        } elseif ($Filtre === 'ASC_vente') {
            $req .= " ORDER BY product.quantite_product ASC";
        } elseif ($Filtre === 'DESC_vente') {
            $req .= " ORDER BY product.quantite_product DESC";
        } elseif ($Filtre === 'ASC_rating') {
            $req .= " ORDER BY product.rating_product ASC";
        } elseif ($Filtre === 'DESC_rating') {
            $req .= " ORDER BY product.rating_product DESC";
        } elseif ($Filtre === 'ASC_date') {
            $req .= " ORDER BY product.released_date_product ASC";
        } elseif ($Filtre === 'DESC_date') {
            $req .= " ORDER BY product.released_date_product DESC";
        }

        $stmt = $bdd->prepare($req);

        if ($date != '') {
            $stmt->bindParam(':date', $date, PDO::PARAM_INT);
        }

        if (isset($categorie) && !empty(trim($categorie)) && isset($sousCategorie) && !empty(trim($sousCategorie))) {
            $stmt->bindParam(':sousCategorie', $sousCategorie, PDO::PARAM_INT);
        } elseif ($categorie != '') {
            $stmt->bindParam(':categorie', $categorie, PDO::PARAM_INT);
        } elseif ($sousCategorie != '') {
            $stmt->bindParam(':sousCategorie', $sousCategorie, PDO::PARAM_INT);
        }

        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}