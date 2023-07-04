<?php

require_once "Database.php";
class Product extends Database
{
    public function __construct()
    {
        parent::__construct();
    }
    public function addProduct($name, $description, $price, $stock, $image, $date, $subcategories_id)
    {
        // Si dispo_product = 1 alors le produit n'est disponible
        $bdd = $this->getBdd();
        $req = $bdd->prepare("INSERT INTO product (name_product, description_product, price_product, quantite_product, img_product, released_date_product, ajout_date_product, dispo_product, subcategories_id) 
                                VALUES (:name, :description, :price, :stock, :image, :date,  NOW(), '0', :subcategories_id)");
        $req->execute(array(
            "name" => $name,
            "description" => $description,
            "price" => $price,
            "stock" => $stock,
            "image" => $image,
            "date" => $date,
            "subcategories_id" => $subcategories_id
        ));
    }
    public function verifieIfProductExist($name)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT * FROM product WHERE name_product = :name");
        $req->execute(array(
            "name" => $name
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        if (count($result) > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function verifieIfImageProductExist($image)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT * FROM product WHERE img_product = :image");
        $req->execute(array(
            "image" => $image
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        if (count($result) > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function getProductFormSubCatId($id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT p.*, s.name_subcategories
                                    FROM product p
                                    JOIN subcategories s ON p.subcategories_id = s.id_subcategories
                                    WHERE s.id_subcategories = :id");
        $req->execute(array(
            "id" => $id
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function updateProduct($name, $description, $price, $stock, $image, $date, $subcategories_id, $id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("UPDATE product SET name_product = :name, description_product = :description, price_product = :price, quantite_product = :stock, img_product = :image, released_date_product = :date, subcategories_id = :subcategories_id WHERE id_product = :id");
        $req->execute(array(
            "name" => $name,
            "description" => $description,
            "price" => $price,
            "stock" => $stock,
            "image" => $image,
            "date" => $date,
            "subcategories_id" => $subcategories_id,
            "id" => $id
        ));
    }
    public function supprProduct($id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("DELETE product, avis_client, comment_avis 
                                    FROM product 
                                    LEFT JOIN avis_client ON product.id_product = avis_client.produit_id 
                                    LEFT JOIN comment_avis ON avis_client.id_avis = comment_avis.avis_parent_id 
                                    WHERE product.id_product = :id");
        $req->execute(array("id" => $id));
    }
    public function supprClientAvisProduct($id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("DELETE ac, cc
                                    FROM avis_client ac
                                    LEFT JOIN comment_avis cc ON ac.id_avis = cc.avis_parent_id
                                    WHERE ac.id_avis = :idAvis;");
        $req->execute(array("id" => $id));
    }
    public function archiveProduct($id)
    {
        // Ne pas supprimer le produit mais mettre le quantité à 0
        $bdd = $this->getBdd();
        $req = $bdd->prepare("UPDATE product SET quantite_product = :stock, dispo_product = :dispo WHERE id_product = :id");
        $req->execute(array(
            "stock" => 0,
            "dispo" => 1,
            "id" => $id
        ));
    }
    public function searchProduct($search)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT p.id_product, p.name_product, p.price_product, p.rating_product, p.img_product, p.subcategories_id, s.name_subcategories 
                                FROM product p 
                                JOIN subcategories s ON p.subcategories_id = s.id_subcategories 
                                WHERE p.name_product LIKE :search
                                OR s.name_subcategories LIKE :search");
        $req->execute(array(
            "search" => "%" . $search . "%"
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function getProductById($id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT p.*, s.name_subcategories, c.name_categories
                                FROM product p
                                JOIN subcategories s ON p.subcategories_id = s.id_subcategories 
                                JOIN categories c ON s.categories_id = c.id_categories 
                                WHERE id_product = :id");
        $req->execute(array(
            "id" => $id
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function getProductImageById(int $id) : array
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT ip.name_img, ip.banner_img FROM img_product ip WHERE product_id = :id");
        $req->execute(array(
            "id" => $id
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function updateProductRating($id_product) {
        $bdd = $this->getBdd();

        // Sélectionnez tous les avis associés au produit
        $req = $bdd->prepare("SELECT SUM(note_avis) as total_note, COUNT(*) as total_avis FROM avis_client WHERE produit_id = :id_product");
        $req->execute([
            "id_product" => $id_product
        ]);
        $result = $req->fetch();

        $total_note = $result['total_note'];
        $total_avis = $result['total_avis'];

        // Calculez la moyenne des notes
        $rating = $total_avis > 0 ? round($total_note / $total_avis, 1) : 0;

        // Mettez à jour la colonne "rating_product" de la table "product"
        $req = $bdd->prepare("UPDATE product SET rating_product = :rating WHERE id_product = :id_product");
        $req->execute([
            "id_product" => $id_product,
            "rating" => $rating
        ]);
    }
    public function getDateOfReleasedProduct($categorie = '', $sousCategorie = '') {
        $bdd = $this->getBdd();
        $req = "SELECT YEAR(p.released_date_product) AS annee, COUNT(*) AS count 
            FROM product p
            JOIN subcategories s ON p.subcategories_id = s.id_subcategories
            JOIN categories c ON s.categories_id = c.id_categories";

        if (!empty($categorie) && !empty($sousCategorie)) {
            $req .= " WHERE s.id_subcategories = :sousCategorie";
        } elseif (!empty($categorie)) {
            $req .= " WHERE c.id_categories = :categorie";
        } elseif (!empty($sousCategorie)) {
            $req .= " WHERE s.id_subcategories = :sousCategorie";
        }

        $req .= " GROUP BY YEAR(p.released_date_product)
            ORDER BY YEAR(p.released_date_product) DESC";

        $stmt = $bdd->prepare($req);

        if (!empty($categorie) && !empty($sousCategorie)) {
            $stmt->bindParam(':sousCategorie', $sousCategorie, PDO::PARAM_INT);
        } elseif (!empty($categorie)) {
            $stmt->bindParam(':categorie', $categorie, PDO::PARAM_INT);
        } elseif (!empty($sousCategorie)) {
            $stmt->bindParam(':sousCategorie', $sousCategorie, PDO::PARAM_INT);
        }
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function displayLastProduct() : array
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT p.id_product, p.name_product, p.price_product, p.rating_product, p.img_product, p.released_date_product, p.subcategories_id, s.name_subcategories 
                                    FROM product p 
                                    JOIN subcategories s ON p.subcategories_id = s.id_subcategories 
                                    ORDER BY p.released_date_product DESC LIMIT 8; ");
        $req->execute();
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function verifyStockProduct(int $id_product, int $quantite)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT quantite_product FROM product WHERE id_product = :id_product");
        $req->execute(array(
            "id_product" => $id_product
        ));
        $result = $req->fetch(PDO::FETCH_ASSOC);
        if ($result['quantite_product'] > $quantite) {
            return true;
        } else {
            return false;
        }
    }

    public function addImageToProduct(int $productID, string $fileName, bool $isBanner)
    {
        if ($isBanner === true) {
            $isBanner = 'true';
        } else {
            $isBanner = 'false';
        }
        $bdd = $this->getBdd();
        $req = $bdd->prepare("INSERT INTO img_product (name_img, banner_img, product_id) VALUES (:fileName, :isBanner,:productID)");
        $req->execute([
            "productID" => $productID,
            "fileName" => $fileName,
            "isBanner" => $isBanner
        ]);
    }
    public function verifyNumberImageProduct(int $productID) : bool
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT COUNT(*) as count FROM img_product WHERE product_id = :productID");
        $req->execute([
            "productID" => $productID
        ]);
        $result = $req->fetch(PDO::FETCH_ASSOC);
        if ($result['count'] >= 6) {
            return true;
        } else {
            return false;
        }
    }

    public function getProductDashboard($search, $categorie, $limit) : array
    {
        $bdd = $this->getBdd();
        $req = "SELECT p.*, s.name_subcategories, c.name_categories
                FROM product p
                JOIN subcategories s ON p.subcategories_id = s.id_subcategories 
                JOIN categories c ON s.categories_id = c.id_categories";

        if (!empty($search) || !empty($categorie)) {
            $req .= " WHERE";
        }

        if (!empty($search)) {
            $req .= " p.name_product LIKE :search";
        }

        if (!empty($categorie)) {
            if (!empty($search)) {
                $req .= " AND";
            }
            $req .= " s.categories_id = :categorie";
        }

        $req .= " ORDER BY p.id_product DESC LIMIT :limit";

        $stmt = $bdd->prepare($req);

        if (!empty($search)) {
            $stmt->bindValue(':search', '%' . $search . '%', PDO::PARAM_STR);
        }

        if (!empty($categorie)) {
            $stmt->bindParam(':categorie', $categorie, PDO::PARAM_INT);
        }

        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function countTotalProduct()
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT COUNT(*) as count FROM product");
        $req->execute();
        $result = $req->fetch(PDO::FETCH_ASSOC);
        return $result['count'];
    }
    public function addDetailProduct(int $productID, string $developpeur, string $editeur, string $genre)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("INSERT INTO detail_product (developpeur, editeur, genre, product_id) VALUES (:developpeur, :editeur, :genre, :productID)");
        $req->execute([
            "productID" => $productID,
            "developpeur" => $developpeur,
            "editeur" => $editeur,
            "genre" => $genre
        ]);
    }
}