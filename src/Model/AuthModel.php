<?php

namespace App\Model;

class AuthModel extends AbstractDatabase
{
    public function checkLogin($login)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT COUNT(*) as total FROM users WHERE login_users = :login_users");
        $req->execute(array(
            "login_users" => $login
        ));
        $result = $req->fetch();
        if ($result['total'] > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function checkEmail($email)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT COUNT(*) as total FROM users WHERE email_users = :email_users");
        $req->execute(array(
            "email_users" => $email
        ));
        $result = $req->fetch();
        if ($result['total'] > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function register($login, $password, $email)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("INSERT INTO users (login_users, password_users, email_users, type_compte_users, avatar_users, created_at_users) VALUES (:login, :password, :email, :type_compte, :avatar, NOW())");
        $password = password_hash($password, PASSWORD_DEFAULT);
        $req->execute(array(
            "login" => $login,
            "password" => $password,
            "email" => $email,
            "type_compte" => "client",
            "avatar" => "default_avatar.png"
        ));
        // récupérer l'id_users généré
        $id_users = $bdd->lastInsertId();
        // insérer les données dans la table client
        $req = $bdd->prepare("INSERT INTO client (users_id) VALUES (:id_users)");
        $req->execute(array(
            "id_users" => $id_users
        ));
    }
    public function getId($login) : int
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare('SELECT id_users FROM users WHERE login_users = :login');
        $req->execute([
            ':login' => $login
        ]);
        $user = $req->fetch(\PDO::FETCH_ASSOC);
        return $user['id_users'];
    }
    public function addAvatar(string $avatar, int $id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare('UPDATE users SET avatar_users = :avatar WHERE id = :id');
        $req->execute([
            ':avatar' => $avatar,
            ':id' => $id
        ]);
    }
}