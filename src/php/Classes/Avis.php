<?php
require_once "Database.php";
class Avis extends Database
{
    function __construct()
    {
        parent::__construct();
    }
    public function addAvis(string $title, string $content, $note, int $id_user, int $id_product) :void
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("INSERT INTO avis_client (produit_id, title_comment, content, note_avis, created_at, users_id) 
                                VALUES (:id_product, :title_avis, :content_avis, :note_avis, NOW(), :id_user)");
        $req->execute([
            "id_product" => $id_product,
            "title_avis" => $title,
            "content_avis" => $content,
            "note_avis" => $note,
            "id_user" => $id_user
        ]);
    }
    public function editAvis(string $content, int $id_avis)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("UPDATE avis_client SET content = :content, update_at = NOW() 
                                    WHERE id = :id_avis");
        $req->execute([
            "content" => $content,
            "id_avis" => $id_avis
        ]);
    }
    public function deleteAvis(int $id_avis)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("DELETE FROM avis_client WHERE id = :id_avis");
        $req->execute([
            "id_avis" => $id_avis
        ]);
    }
    public function getAvis(int $id_product) :array
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT ac.id, ac.produit_id, ac.parent_id, ac.title_comment, ac.content, ac.created_at, GROUP_CONCAT(u.login_users) AS login, GROUP_CONCAT(u.avatar_users) AS avatar, u.id_users 
                                    FROM avis_client ac JOIN users u ON ac.users_id = u.id_users WHERE ac.produit_id = :id_product 
                                    GROUP BY ac.produit_id, ac.parent_id, ac.title_comment, ac.content, u.login_users ORDER BY ac.parent_id ASC;");
        $req->execute([
            "id_product" => $id_product
        ]);
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function addReplyAvis(int $produit_id, string $content, int $parent_id, int $id_users)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("INSERT INTO avis_client (produit_id, content, parent_id, created_at, users_id) 
                                VALUES (:produit_id, :content, :parent_id, NOW(), :users_id)");
        $req->execute([
            "produit_id" => $produit_id,
            "content" => $content,
            "parent_id" => $parent_id,
            "users_id" => $id_users
        ]);
    }
    public function searchIfAvisAsReply(int $id_avis) :bool
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT COUNT(parent_id) FROM avis_client WHERE parent_id = :id_avis");
        $req->execute([
            "id_avis" => $id_avis
        ]);
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        if ($result[0]["COUNT(parent_id)"] > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function deleteUpdateAvis(int $id_avis)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("UPDATE avis_client SET content = :comment WHERE id = :id_avis");
        $req->execute([
            "id_avis" => $id_avis,
            "comment" => "<i>Ce avis a été supprimé.</i>"
        ]);
    }

    public function displayLastAvis() : array
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT ac.id, ac.produit_id, ac.parent_id, ac.title_comment, ac.content, ac.created_at, GROUP_CONCAT(u.login_users) AS login, GROUP_CONCAT(u.avatar_users) AS avatar, u.id_users, u.login_users, u.avatar_users, p.name_product 
                FROM avis_client ac 
                JOIN users u ON ac.users_id = u.id_users 
                JOIN product p ON ac.produit_id = p.id_product WHERE ac.title_comment IS NOT NULL GROUP BY ac.produit_id, ac.parent_id, ac.title_comment, ac.content, u.login_users 
                ORDER BY ac.created_at DESC LIMIT 5; 
                                    ");
        $req->execute();
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}