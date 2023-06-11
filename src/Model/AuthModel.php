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
        $req = $bdd->prepare("INSERT INTO users (login_users, password_users, email_users, type_compte_users, created_at_users) VALUES (:login, :password, :email, :type_compte, NOW())");
        $password = password_hash($password, PASSWORD_DEFAULT);
        $req->execute(array(
            "login" => $login,
            "password" => $password,
            "email" => $email,
            "type_compte" => "client",
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
    public function addAvatar(int $id, string $avatar)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare('UPDATE users SET avatar_users = :avatar WHERE id_users = :id');
        $req->execute([
            ':avatar' => $avatar,
            ':id' => $id
        ]);
    }
    public function login($loginOrEmail, $password)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT id_users, login_users, email_users, password_users, type_compte_users FROM users WHERE login_users = :loginOrEmail OR email_users = :loginOrEmail");
        $req->execute(array(
            "loginOrEmail" => $loginOrEmail
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        if ($result > 0) {
            if (password_verify($password, $result[0]['password_users'])) {
                $_SESSION['id'] = $result[0]['id_users'];
                $_SESSION['login'] = $result[0]['login_users'];
                $_SESSION['email'] = $result[0]['email_users'];
                $_SESSION['type_compte'] = $result[0]['type_compte_users'];
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}