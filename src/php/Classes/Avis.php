<?php
require_once "Database.php";
class Avis extends Database
{
    function __construct()
    {
        parent::__construct();
    }
    public function addAvis($title, $content, $note, $id_user, $id_product)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("INSERT INTO avis_client (produit_id, titre_avis, commentaire_avis, note_avis, created_at, users_id) 
                                VALUES (:id_product, :title_avis, :content_avis, :note_avis, NOW(), :id_user)");
        $req->execute([
            "id_product" => $id_product,
            "title_avis" => $title,
            "content_avis" => $content,
            "note_avis" => $note,
            "id_user" => $id_user
        ]);
    }
    public function editAvis($title, $content, $note, $id_avis)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("UPDATE avis_client SET titre_avis = :title_avis, commentaire_avis = :content_avis, note_avis = :note_avis, update_at = NOW() WHERE id_avis = :id_avis");
        $req->execute([
            "title_avis" => $title,
            "content_avis" => $content,
            "note_avis" => $note,
            "id_avis" => $id_avis
        ]);
    }
    public function deleteAvis($id_avis)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("DELETE FROM avis_client WHERE id_avis = :id_avis");
        $req->execute([
            "id_avis" => $id_avis
        ]);
    }
    public function getAvis($id_product)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT a.*, u.login_users, u.avatar_users
                                    FROM avis_client a
                                    JOIN users u ON a.users_id = u.id_users
                                    WHERE a.produit_id = :id_product
                                    ORDER BY `a`.`created_at` DESC");
        $req->execute([
            "id_product" => $id_product
        ]);
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function addReplyAvis($content, $id_avis, $id_users, $id_product)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("INSERT INTO comment_avis (avis_parent_id, content_comment, created_at, users_id, product_id)
                                    VALUES (:id_avis, :content, NOW(), :id_users, :id_product)");
        $req->execute([
            "id_avis" => $id_avis,
            "content" => $content,
            "id_users" => $id_users,
            "id_product" => $id_product
        ]);
    }
    public function getReplyAvis($id_product)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT comment_avis.id_comment, comment_avis.avis_parent_id, comment_avis.content_comment, comment_avis.created_at, users.login_users, users.avatar_users
                                    FROM comment_avis
                                    INNER JOIN users ON comment_avis.users_id = users.id_users
                                    WHERE comment_avis.avis_parent_id IN (SELECT id_avis FROM avis_client WHERE produit_id = :id_product));
                                    ");
        $req->execute([
            "id_product" => $id_product
        ]);
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function getReplyById($id_avis)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT c.*, u.login_users, u.email_users, u.avatar_users
                                    FROM comment_avis c
                                    JOIN users u ON c.users_id = u.id_users
                                    WHERE c.avis_parent_id = :id_avis
                                    OR c.comment_parent_id IN (
                                      SELECT id_comment
                                      FROM comment_avis
                                      WHERE avis_parent_id = :id_avis
                                    )ORDER BY c.created_at ASC");
        $req->execute([
            "id_avis" => $id_avis
        ]);
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function addReplyToComment($content, $id_comment, $id_users, $id_product)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("INSERT INTO comment_avis (comment_parent_id, content_comment, created_at, users_id, product_id)
                                    VALUES (:id_comment, :content, NOW(), :id_users, :id_product)");
        $req->execute([
            "id_comment" => $id_comment,
            "content" => $content,
            "id_users" => $id_users,
            "id_product" => $id_product
        ]);
    }
    public function getReplyByProduct($id_product)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT * FROM comment_avis WHERE product_id = :id ORDER BY `comment_avis`.`created_at` DESC ");
        $req->execute([
            "id" => $id_product
        ]);
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}