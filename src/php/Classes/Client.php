<?php
require_once "Database.php";

class Client
{
    public function __construct()
    {
    }
    public function checkLogin($login)
    {
        $db = new Database();
        $bdd = $db->getBdd();
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
        $db = new Database();
        $bdd = $db->getBdd();
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
    public function validEmail($email)
    {
        $email = filter_var($email, FILTER_SANITIZE_EMAIL);
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return true;
        } else {
            return false;
        }
    }
    public function lenghtEmail($email)
    {
        if (strlen($email) > 319) {
            return true;
        } else {
            return false;
        }
    }
    public function validPassword($password)
    {
        // 8 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
        if (preg_match("/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/", $password)) {
            return true;
        } else {
            return false;
        }
    }
    public function validPhone($phone)
    {
        if (preg_match("/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/", $phone)) {
            return true;
        } else {
            return false;
        }
    }
    public function validZipCode($zipCode)
    {
        if (preg_match("/^\d{5}(?:[-\s]\d{4})?$/", $zipCode)) {
            return true;
        } else {
            return false;
        }
    }
    public function register($login, $password, $email)
    {
        $db = new Database();
        $bdd = $db->getBdd();
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
    public function login($loginOrEmail, $password)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare("SELECT * FROM users WHERE login_users = :loginOrEmail OR email_users = :loginOrEmail");
        $req->execute(array(
            "loginOrEmail" => $loginOrEmail
        ));
        $result = $req->fetch();
        if ($result) {
            if (password_verify($password, $result['password_users'])) {
                $_SESSION['id'] = $result['id_users'];
                $_SESSION['login'] = $result['login_users'];
                $_SESSION['email'] = $result['email_users'];
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    public function getClientInfo($id)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare("SELECT client.id_client, client.prenom_client, client.nom_client, client.ville_client, client.code_postal_client, client.adresse_client, client.mobile_client, client.pays_client, client.users_id, users.id_users as user_id, users.login_users, users.email_users, users.password_users, users.type_compte_users, users.avatar_users, users.created_at_users, users.modified_at_users 
FROM client
INNER JOIN users ON client.users_id = users.id_users
WHERE users.id_users = :id;");
        $req->execute(array(
            "id" => $id
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        $_SESSION['prenom'] = $result[0]['prenom_client'];
        $_SESSION['nom'] = $result[0]['nom_client'];
        $_SESSION['ville'] = $result[0]['ville_client'];
        $_SESSION['code_postal'] = $result[0]['code_postal_client'];
        $_SESSION['adresse'] = $result[0]['adresse_client'];
        $_SESSION['mobile'] = $result[0]['mobile_client'];
        $_SESSION['pays'] = $result[0]['pays_client'];
        $result = json_encode($result);
        return $result;
    }
    public function modifyLogin($id, $login)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare("UPDATE users SET login_users = :login, modified_at_users = NOW() WHERE id_users = :id");
        $req->execute(array(
            "login" => $login,
            "id" => $id
        ));
        $_SESSION['login'] = $login;
    }
    public function modifyEmail($id, $email)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare("UPDATE users SET email_users = :email, modified_at_users = NOW() WHERE id_users = :id");
        $req->execute(array(
            "email" => $email,
            "id" => $id
        ));
        $_SESSION['email'] = $email;
    }
    public function modifyPassword($id, $password)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare("UPDATE users SET password_users = :password, modified_at_users = NOW() WHERE id_users = :id");
        $password = password_hash($password, PASSWORD_DEFAULT);
        $req->execute(array(
            "password" => $password,
            "id" => $id
        ));
    }
    public function modifyClientField($id, $field, $client, $value)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare("UPDATE client SET {$client} = :value WHERE users_id = :id");
        $req->execute(array(
            "value" => $value,
            "id" => $id
        ));
        $_SESSION[$field] = $value;
    }
    public function modifyAvatar($id, $filename)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare("UPDATE users SET avatar_users = :avatar, modified_at_users = NOW() WHERE id_users = :id");
        $req->execute(array(
            "avatar" => $filename,
            "id" => $id
        ));
    }
}