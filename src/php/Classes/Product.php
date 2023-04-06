<?php

require_once "Database.php";
class Product extends Database
{
    public function __construct()
    {
        parent::__construct();
    }
    public function displaySubCategories()
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT * FROM subcategories");
        $req->execute();
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        $result = json_encode($result);
        return $result;
    }
    public function displayCategories()
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT * FROM categories");
        $req->execute();
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        $result = json_encode($result);
        return $result;
    }
    public function checkIfCategoryExist($name)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT * FROM categories WHERE name_categories = :name");
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
    public function displayCategoriesAndSub()
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT * FROM categories LEFT JOIN subcategories ON categories.id_categories = subcategories.categories_id;");
        $req->execute();
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        $result = json_encode($result);
        return $result;
    }
    public function AddParentCategory($name)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("INSERT INTO categories (name_categories) VALUES (:name)");
        $req->execute(array(
            "name" => $name
        ));
    }
    public function updateCategory($id, $name)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("UPDATE categories SET name_categories = :name WHERE id_categories = :id");
        $req->execute(array(
            "name" => $name,
            "id" => $id
        ));
    }
    public function deleteCategory($id_categories)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("DELETE categories, subcategories
                                    FROM categories
                                    LEFT JOIN subcategories ON categories.id_categories = subcategories.categories_id
                                    WHERE categories.id_categories = :id_categories
                                    ");
        $req->execute(array(
            "id_categories" => $id_categories
        ));
    }
}