<?php

namespace App\Controller;
use App\Model\AuthModel;

class AuthController extends AbstractController
{
    public function showLoginForm()
    {
        require_once "public/View/auth/login.php";
    }
    public function showRegisterForm()
    {
        require_once "public/View/auth/register.php";
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
    public function validPassword($password)
    {
        // 8 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
        if (preg_match("/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/", $password)) {
            return true;
        } else {
            return false;
        }
    }
    private function generateAvatarImage($text, $backgroundColor, $login)
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
        $fontPath = 'public/font/Rajdhani-SemiBold.ttf'; // Chemin vers le dossier des polices de caractères
        $textBoundingBox = imageftbbox($fontSize, 0, $fontPath, $text);
        $textWidth = $textBoundingBox[2] - $textBoundingBox[0];
        $textHeight = $textBoundingBox[1] - $textBoundingBox[7];
        $textX = ($canvasWidth - $textWidth) / 2;
        $textY = ($canvasHeight - $textHeight) / 2 + $textHeight;

        // Dessiner le texte sur le canvas avec la police de caractères par défaut
        imagefttext($canvas, $fontSize, 0, $textX, $textY, $foregroundColor, $fontPath, $text);

        // Enregistrer l'image dans un fichier PNG
        $randomString = bin2hex(random_bytes(3)); // Génère une chaîne hexadécimale de 6 caractères
        $avatarName = $randomString . '-' . $login.'.png';
        $filename = 'public/images/avatars/' . $avatarName; // Chemin vers le dossier et nom du fichier d'avatar
        imagepng($canvas, $filename);
        imagedestroy($canvas);

        return $avatarName;
    }
    public function register()
    {
        if(isset($_POST['login'])) {
            $error = [];
            $login = htmlspecialchars($_POST['login']);
            $email = htmlspecialchars($_POST['email']);
            $password = htmlspecialchars($_POST['password']);
            $password2 = htmlspecialchars($_POST['passwordConfirm']);

            if (!$this->verifyField('login')) {
                $error['login'] = "Veuillez entrer un login";
            }
            if (!$this->verifyField('email')) {
                $error['email'] = "Veuillez entrer une adresse email";
            }
            if (!$this->verifyField('password')) {
                $error['password'] = "Veuillez entrer un mot de passe";
            }
            if (!$this->verifyField('passwordConfirm')) {
                $error['passwordConfirm'] = "Veuillez confirmer votre mot de passe";
            }
            if (empty($error)) {
                $user = new AuthModel();
                if ($user->checkLogin($login) === false) {
                    if ($this->validEmail($email)) {
                        if ($user->checkEmail($email) === false) {
                            if ($this->validPassword($password) === true) {
                                if ($password === $password2) {
                                    $user->register($login, $password, $email);
                                    $id_user = $user->getId($login);
                                    $id = $id_user;
                                    $firstLetter = strtoupper(substr($login, 0, 1));
                                    $backgroundColor = sprintf('#%06X', mt_rand(0, 0xFFFFFF));
                                    $avatar = $this->generateAvatarImage($firstLetter, $backgroundColor, $login);
                                    $user->addAvatar($id, $avatar);
                                    $error['success'] = "Votre compte a bien été créé";
                                } else {
                                    $error['errorPasswordConfirm'] = "Les mots de passe ne correspondent pas";
                                }
                            } else {
                                $error['errorPassword'] = "Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre";
                            }
                        } else {
                            $error['errorEmail'] = "Cette adresse email est déjà utilisée";
                        }
                    } else {
                        $error['validEmail'] = "Veuillez entrer une adresse email valide";
                    }
                } else {
                    $error['errorLogin'] = "Ce login est déjà utilisé";
                }
            }
            header('Content-Type: application/json');
            echo json_encode($error);
        }
    }
}