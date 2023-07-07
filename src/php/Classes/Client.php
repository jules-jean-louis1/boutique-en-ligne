<?php
require_once "Database.php";

class Client extends Database
{
    public function __construct()
    {
        parent::__construct();
    }
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
        // 8 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial, accepte les - et _
        if (preg_match("/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_-])[A-Za-z\d@$!%*#?&_-]{8,16}$/", $password)) {
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
    public function generateAvatarImage($text, $backgroundColor, $login)
    {
        $canvasWidth = 200;
        $canvasHeight = 200;

        $canvas = imagecreatetruecolor($canvasWidth, $canvasHeight);

        // Convertir la couleur d'arrière-plan en composantes RGB
        $backgroundR = hexdec(substr($backgroundColor, 1, 2));
        $backgroundG = hexdec(substr($backgroundColor, 3, 2));
        $backgroundB = hexdec(substr($backgroundColor, 5, 2));

        // Remplir le canvas avec la couleur d'arrière-plan
        $backgroundColor = imagecolorallocate($canvas, $backgroundR, $backgroundG, $backgroundB);
        imagefill($canvas, 0, 0, $backgroundColor);

        // Définir la couleur du texte
        $foregroundColor = imagecolorallocate($canvas, 255, 255, 255); // Blanc

        // Centrer le texte dans le canvas
        $fontSize = floor(100.00);
        $fontPath = $_SERVER['DOCUMENT_ROOT'] . '/wellgames/public/font/font_avatars.ttf'; // Chemin vers le dossier des polices de caractères
        $textBoundingBox = imageftbbox($fontSize, 0, $fontPath, $text);
        $textWidth = $textBoundingBox[2] - $textBoundingBox[0];
        $textHeight = $textBoundingBox[1] - $textBoundingBox[7];
        $textX = round(($canvasWidth - $textWidth) / 2);
        $textY = round(($canvasHeight - $textHeight) / 2 + $textHeight);

        imagefttext($canvas, $fontSize, 0, $textX, $textY, $foregroundColor, $fontPath, $text);

        // Enregistrer l'image dans un fichier PNG
        $randomString = bin2hex(random_bytes(3)); // Génère une chaîne hexadécimale de 6 caractères
        $avatarName = $randomString . '-' . $login.'.png';
        $filename = $_SERVER['DOCUMENT_ROOT'] . '/wellgames/src/images/avatars/' . $avatarName; // Chemin vers le dossier et nom du fichier d'avatar
        imagepng($canvas, $filename);
        imagedestroy($canvas);
        return $avatarName;
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
    public function getShippingInfo($id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT client.id_client, client.prenom_client, client.nom_client, client.ville_client, client.code_postal_client, client.adresse_client, client.mobile_client, client.pays_client, client.users_id, users.login_users, users.email_users, users.avatar_users
                            FROM client
                            INNER JOIN users ON client.users_id = users.id_users
                            WHERE users.id_users = :id;");
        $req->execute(array(
            "id" => $id
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function getClientInfo(int $id) : string
    {
        $bdd = $this->getBdd();
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
        $bdd = $this->getBdd();
        $req = $bdd->prepare("UPDATE users SET login_users = :login, modified_at_users = NOW() WHERE id_users = :id");
        $req->execute(array(
            "login" => $login,
            "id" => $id
        ));
        $_SESSION['login'] = $login;
    }
    public function modifyEmail($id, $email)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("UPDATE users SET email_users = :email, modified_at_users = NOW() WHERE id_users = :id");
        $req->execute(array(
            "email" => $email,
            "id" => $id
        ));
        $_SESSION['email'] = $email;
    }
    public function modifyPassword($id, $password)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("UPDATE users SET password_users = :password, modified_at_users = NOW() WHERE id_users = :id");
        $password = password_hash($password, PASSWORD_DEFAULT);
        $req->execute(array(
            "password" => $password,
            "id" => $id
        ));
    }
    public function modifyClientField($id, $field, $client, $value)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("UPDATE client SET {$client} = :value WHERE users_id = :id");
        $req->execute(array(
            "value" => $value,
            "id" => $id
        ));
        $_SESSION[$field] = $value;
    }
    public function modifyAvatar($id, $filename)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("UPDATE users SET avatar_users = :avatar, modified_at_users = NOW() WHERE id_users = :id");
        $req->execute(array(
            "avatar" => $filename,
            "id" => $id
        ));
    }
    public function getAllUsers()
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT users.id_users, users.login_users, users.email_users, users.type_compte_users, users.avatar_users, users.created_at_users FROM users");
        $req->execute();
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function getUser($id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT users.id_users, users.login_users, users.email_users, users.type_compte_users, users.avatar_users, users.created_at_users FROM users WHERE id_users = :id");
        $req->execute(array(
            "id" => $id
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function deleteUser(int $id)
    {
        $bdd = $this->getBdd();
        // Table users
        $req1 = $bdd->prepare("DELETE FROM users WHERE id_users = :id");
        $req1->execute(["id" => $id]);
        // Table avis_client
        $req2 = $bdd->prepare("DELETE FROM avis_client WHERE users_id = :id");
        $req2->execute(["id" => $id]);
        // Table client
        $req3 = $bdd->prepare("DELETE FROM client WHERE users_id = :id");
        $req3->execute(["id" => $id]);
        // Table commande
        $req4 = $bdd->prepare("DELETE FROM commande WHERE users_id = :id");
        $req4->execute(["id" => $id]);
        // Table detail_commande
        $req6 = $bdd->prepare("DELETE FROM detail_commande WHERE command_id  IN (SELECT id_commande FROM commande WHERE id_client = :id)");
        $req6->execute(["id" => $id]);
        // Table panier
        $req7 = $bdd->prepare("DELETE FROM cart WHERE users_id = :id");
        $req7->execute(["id" => $id]);
        $req8 = $bdd->prepare("DELETE FROM cart_product WHERE cart_id IN (SELECT id_cart FROM cart WHERE users_id = :id");
        $req8->execute(["id" => $id]);
    }
    public function updateUserDroits($id, $droits)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("UPDATE users SET type_compte_users = :droits WHERE id_users = :id");
        $req->execute(array(
            "droits" => $droits,
            "id" => $id
        ));
    }
    public function numberOfPagesForUser($searchUser, $order = 'DESC')
    {
        $bdd = $this->getBdd();
        $Query = "SELECT COUNT(*) as nb FROM users";
        $params = [];
        if (!empty($searchUser)) {
            $Query = "SELECT COUNT(*) as nb FROM users WHERE login_users LIKE ?";
            $params[] = "%{$searchUser}%";
        }
        if ($order == 'ASC') {
            $Query .= " ORDER BY `users`.`created_at_users` ASC";
        } else {
            $Query .= " ORDER BY `users`.`created_at_users` DESC";
        }
        $req = $bdd->prepare($Query);
        $req->execute($params);
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        $nb = $result[0]['nb'];
        $nbPages = ceil($nb / 10);
        return $nbPages;
    }
    public function getUserInfoByPages($page = 1, $searchUser = '', $order = 'DESC')
    {
        $bdd = $this->getBdd();

        // Définir la page par défaut si elle est nulle ou inférieure à 0
        $page = max(1, $page);

        $start = ($page - 1) * 10;
        $limit = 10;

        $query = "SELECT users.id_users, users.login_users, users.email_users, users.type_compte_users, users.avatar_users, users.created_at_users FROM users";

        if (!empty($searchUser)) {
            $query .= " WHERE login_users LIKE :searchUser";
        }

        if ($order == 'ASC') {
            $query .= " ORDER BY `users`.`created_at_users` ASC";
        } else {
            $query .= " ORDER BY `users`.`created_at_users` DESC";
        }

        $query .= " LIMIT :start, :limit";

        $stmt = $bdd->prepare($query);

        if (!empty($searchUser)) {
            $stmt->bindValue(':searchUser', '%' . $searchUser . '%');
        }

        $stmt->bindValue(':start', $start, PDO::PARAM_INT);
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);

        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }

    public function verifyIfUsersInfoExists($users_id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT * FROM client WHERE users_id = :users_id");
        $req->execute(array(
            "users_id" => $users_id
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        $valid = 0;
        if (empty(trim($result[0]['nom_client']))) {
            $valid = 1;
        } elseif (empty(trim($result[0]['prenom_client']))) {
            $valid = 1;
        } elseif (empty(trim($result[0]['adresse_client']))) {
            $valid = 1;
        } elseif (empty(trim($result[0]['code_postal_client']))) {
            $valid = 1;
        } elseif (empty(trim($result[0]['ville_client']))) {
            $valid = 1;
        } elseif (empty(trim($result[0]['pays_client']))) {
            $valid = 1;
        } else {
            $valid = 0;
        }
        if ($valid == 1) {
            return true;
        } else {
            return false;
        }
    }
    public function getUserInfo($users_id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT * FROM client WHERE users_id = :users_id");
        $req->execute(array(
            "users_id" => $users_id
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    /**
     * Summary of getAllInfoForProfil
     * @param int $id_users
     * @return array
     */
    public function getAllInfoForProfil(int $id_users) : array
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT 
                            u.login_users, 
                            u.email_users, 
                            u.avatar_users,
                            u.created_at_users, 
                            COUNT(DISTINCT cmd.id_commande) AS nombre_commandes, 
                            COUNT(DISTINCT av.id) AS nombre_avis, 
                            COUNT(DISTINCT com.id_comment) AS nombre_commentaires 
                        FROM 
                            users u 
                            LEFT JOIN client cl ON u.id_users = cl.users_id 
                            LEFT JOIN commande cmd ON cl.id_client = cmd.users_id 
                            LEFT JOIN avis_client av ON cl.id_client = av.users_id 
                            LEFT JOIN comment_avis com ON cl.id_client = com.users_id 
                        WHERE 
                            u.id_users = :id_users
                        GROUP BY 
                            u.login_users, 
                            u.email_users, 
                            u.created_at_users
                        ");
        $req->execute(array(
            "id_users" => $id_users
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function getUserInfoById(int $id) :array
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT COUNT(DISTINCT a.id) AS nb_avis, COUNT(DISTINCT c.id_commande) AS nb_commandes, u.login_users, u.avatar_users, u.created_at_users 
                                        FROM users u 
                                        LEFT JOIN avis_client a ON u.id_users = a.users_id 
                                        LEFT JOIN commande c ON u.id_users = c.users_id 
                                        WHERE u.id_users = :id 
                                        GROUP BY u.login_users, u.avatar_users, u.created_at_users; ");
        $req->execute(["id" => $id]);
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function verifieIfUserExist(int $id) : bool
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT * FROM users WHERE id_users = :id");
        $req->execute(array(
            "id" => $id
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        if (empty($result)) {
            return false;
        } else {
            return true;
        }
    }

    public function getID(string $login) : int
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT id_users FROM users WHERE login_users = :login");
        $req->execute(array(
            "login" => $login
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        return $result[0]['id_users'];
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
}