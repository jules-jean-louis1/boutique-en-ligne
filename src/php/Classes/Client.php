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
        $req = $bdd->prepare("SELECT login_user FROM compte_users WHERE login_user = :login");
        $req->execute(array(
            "login_user" => $login
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
        $req = $bdd->prepare("SELECT email_client FROM client WHERE email_client = :email");
        $req->execute(array(
            "email_client" => $email
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
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return true;
        } else {
            return false;
        }
    }
    public function validPassword($password)
    {
        // 8 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
        if (preg_match("/^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^!#%]*[!#%])[A-Za-z0-9!#%]{8,32}$/", $password)) {
            return true;
        } else {
            return false;
        }
    }
    public function register($login, $password, $email)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare("INSERT INTO ");

        $password = password_hash($password, PASSWORD_DEFAULT);
    }
}