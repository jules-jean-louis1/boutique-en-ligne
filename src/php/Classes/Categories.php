<?php

require_once "Database.php";
class Categories extends Database
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
    public function displayCategoriesAndSub($search)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT * FROM categories LEFT JOIN subcategories ON categories.id_categories = subcategories.categories_id WHERE name_subcategories LIKE :search;");
        $req->execute(['search' => '%' . $search . '%']);
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function displaySubCategoriesByCat($id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT * FROM subcategories WHERE categories_id = :id");
        $req->execute(array(
            "id" => $id
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
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
    public function addSubCategory($id, $name)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("INSERT INTO subcategories (name_subcategories, categories_id) VALUES (:name, :id)");
        $req->execute(array(
            "name" => $name,
            "id" => $id
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
    public function updateSubCategory($id, $name)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("UPDATE subcategories SET name_subcategories = :name WHERE id_subcategories = :id");
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
    public function deleteSubCategory($id_subcategories)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("DELETE FROM subcategories WHERE id_subcategories = :id_subcategories");
        $req->execute(array(
            "id_subcategories" => $id_subcategories
        ));
    }
}