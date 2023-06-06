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
    public function getAvis(int $id_product)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT GROUP_CONCAT(ac.id_avis) AS id, ac.produit_id, ac.parent_avis_id, GROUP_CONCAT(ac.titre_avis) AS titres, GROUP_CONCAT(ac.commentaire_avis) AS commentaires, ac.created_at, GROUP_CONCAT(u.login_users) AS logins, GROUP_CONCAT(u.avatar_users) AS avatar 
                                    FROM avis_client ac JOIN users u ON ac.users_id = u.id_users WHERE ac.produit_id = :id_product 
                                    GROUP BY ac.produit_id, ac.parent_avis_id, ac.titre_avis, ac.commentaire_avis, u.login_users ORDER BY ac.parent_avis_id ASC;");
        $req->execute([
            "id_product" => $id_product
        ]);
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function getReplyAvis($id_product)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT comment_avis.*, u.login_users, u.avatar_users
                                    FROM comment_avis
                                    JOIN users u ON comment_avis.users_id = u.id_users
                                    WHERE comment_avis.product_id = :id_product
                                    ORDER BY comment_avis.comment_parent_id ASC;");
        $req->execute([
            "id_product" => $id_product
        ]);
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function addReplyAvis($content, $id_avis, $id_users, $id_product, $id_parent)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("INSERT INTO avis_client (produit_id, commentaire_avis, parent_avis_id, created_at, users_id) 
                                VALUES (:id_product, :content_avis, :parent_avis_id, :note_avis, NOW(), :id_user)");
        $req->execute([
            "id_avis" => $id_avis,
            "content" => $content,
            "id_users" => $id_users,
            "id_product" => $id_product
        ]);
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
    public function editReplyAvis(string $content, int $id_comment)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("UPDATE comment_avis SET content_comment = :content, update_at = NOW() WHERE id_comment = :id_comment");
        $req->execute([
            "content" => $content,
            "id_comment" => $id_comment
        ]);
    }
    public function searchIfAvisAsReply(int $id_avis)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT COUNT(avis_parent_id) FROM comment_avis WHERE avis_parent_id = :id_avis");
        $req->execute([
            "id_avis" => $id_avis
        ]);
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        if ($result[0]["COUNT(avis_parent_id)"] > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function deleteUpdateAvis(int $id_avis)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("UPDATE avis_client SET commentaire_avis = :comment WHERE id_avis = :id_avis");
        $req->execute([
            "id_avis" => $id_avis,
            "comment" => "<i>Ce avis a été supprimé.</i>"
        ]);
    }
    public function searchIfCommentAsReply($id_comment)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT COUNT(comment_parent_id) FROM comment_avis WHERE comment_parent_id = :id_comment");
        $req->execute([
            "id_comment" => $id_comment
        ]);
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        if ($result[0]["COUNT(comment_parent_id)"] > 0) {
            return true;
        } else {
            return false;
        }
    }
public function updateReplyComment($id_comment)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("UPDATE comment_avis SET content_comment = '<i>Ce commentaire a été supprimé..</i>' WHERE id_comment = :id_comment");
        $req->execute([
            "id_comment" => $id_comment
        ]);
    }
    public function deleteReplyAvis($id_comment)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("DELETE FROM comment_avis WHERE id_comment = :id_comment");
        $req->execute([
            "id_comment" => $id_comment
        ]);
    }
}