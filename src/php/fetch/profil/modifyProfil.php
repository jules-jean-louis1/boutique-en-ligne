<?php
session_start();
require_once "../../Classes/Client.php"; // On inclut la classe Client

$errors = array();
$success = array();

if (!empty($_POST['login'])) {
    $login = htmlspecialchars($_POST['login']);
    if ($login == $_SESSION['login']) {
        $valid = true;
    } else {
        if ($login !== $_SESSION['login']) {
            $valid = false;
            if (strlen($login) < 3 || strlen($login) > 20) {
                $errors[] = "Votre login doit contenir entre 3 et 20 caractères";
            } else {
                $client = new Client();
                if ($client->checkLogin($login) === true) {
                    $errors[] = "Ce login est déjà utilisé";
                } else {
                    $client->modifyLogin($_SESSION['id'], $login);
                    $success[] = "Votre login a bien été modifié";
                }
            }
        }
    }
}

if (!empty($_POST['email'])) {
    $email = htmlspecialchars($_POST['email']);
    if ($email == $_SESSION['email']) {
        $valid = true;
    } else {
        if ($email !== $_SESSION['email']) {
            $valid = false;
            $client = new Client();
            if ($client->validEmail($email) === false) {
                $errors[] = "Cette adresse email n'est pas valide";
            } else {
                if ($client->lenghtEmail($email) === true) {
                    $errors[] = "Cette adresse email est trop longue";
                } else {
                    if ($client->checkEmail($email) === true) {
                        $errors[] = "Cette adresse email est déjà utilisée";
                    } else {
                        $client->modifyEmail($_SESSION['id'], $email);
                        $success[] = "Votre adresse email a bien été modifiée";
                    }
                }
            }
        }
    }
}
if(isset($password) && isset($passwordConfirm)) {
    $valid = false;
    if ($password !== $passwordConfirm) {
        $errors[] = "Les mots de passe ne correspondent pas";
    } else {
        if (strlen($password) < 8 && strlen($password) > 16) {
            $errors[] = "Le mot de passe doit contenir entre 8 et 16 caractères";
        } else {
            $client = new Client();
            if ($client->validPassword($password) === true) {
                $client->modifyPassword($_SESSION['id'], $password);
                $success[] = "Votre mot de passe a bien été modifié";
            } else {
                $errors[] = "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial";
            }
        }
    }
}
if (!empty($_POST['surname'])) {
    $nom = htmlspecialchars($_POST['surname']);
    if ($nom == $_SESSION['nom']) {
        $valid = true;
    } else {
        if ($nom !== $_SESSION['nom']) {
            $valid = false;
            if (strlen($nom) < 2 && strlen($nom) > 20) {
                $errors[] = "Le nom doit contenir entre 2 et 20 caractères";
            } else {
                $client = new Client();
                $client->modifyClientField($_SESSION['id'], 'nom', 'nom_client', $nom);
                $success[] = "Votre nom a bien été modifié";
            }
        }
    }
}
if (!empty($_POST['firstname'])) {
    $prenom = htmlspecialchars($_POST['firstname']);
    if ($prenom == $_SESSION['prenom']) {
        $valid = true;
    } else {
        if ($prenom !== $_SESSION['prenom']) {
            $valid = false;
            if (strlen($prenom) < 2 && strlen($prenom) > 20) {
                $errors[] = "Le prénom doit contenir entre 2 et 20 caractères";
            } else {
                $client = new Client();
                $client->modifyClientField($_SESSION['id'], 'prenom', 'prenom_client', $prenom);
                $success[] = "Votre prénom a bien été modifié";
            }
        }
    }
}
if (!empty($_POST['address'])) {
    $adresse = htmlspecialchars($_POST['address']);
    if ($adresse == $_SESSION['adresse']) {
        $valid = true;
    } else {
        if ($adresse !== $_SESSION['adresse']) {
            $valid = false;
            if (strlen($adresse) < 2 && strlen($adresse) > 150) {
                $errors[] = "L'adresse doit contenir entre 2 et 150 caractères";
            } else {
                $client = new Client();
                $client->modifyClientField($_SESSION['id'], 'adresse', 'adresse_client', $adresse);
                $success[] = "Votre adresse a bien été modifiée";
            }
        }
    }
}
if (!empty($_POST['city'])) {
    $ville = htmlspecialchars($_POST['city']);
    if ($ville == $_SESSION['ville']) {
        $valid = true;
    } else {
        if ($ville !== $_SESSION['ville']) {
            $valid = false;
            if (strlen($ville) < 2 && strlen($ville) > 50) {
                $errors[] = "La ville doit contenir entre 2 et 50 caractères";
            } else {
                $client = new Client();
                $client->modifyClientField($_SESSION['id'], 'ville', 'ville_client', $ville);
                $success[] = "Votre ville a bien été modifiée";
            }
        }
    }
}
if (!empty($_POST['zipcode'])) {
    $codePostal = htmlspecialchars($_POST['zipcode']);
    if ($codePostal == $_SESSION['code_postal']) {
        $valid = true;
    } else {
        if ($codePostal !== $_SESSION['code_postal']) {
            $valid = false;
            $client = new Client();
            if ($client->validZipCode($codePostal) === false) {
                $errors[] = "Le code postal n'est pas valide";
            } else {
                $client->modifyClientField($_SESSION['id'], 'code_postal', 'code_postal_client', $codePostal);
                $success[] = "Votre code postal a bien été modifié";
            }
        }
    }
}
if (!empty($_POST['country'])) {
    $pays = htmlspecialchars($_POST['country']);
    if ($pays == $_SESSION['pays']) {
        $valid = true;
    } else {
        if ($pays !== $_SESSION['pays']) {
            $valid = false;
            if (strlen($pays) < 2 && strlen($pays) > 50) {
                $errors[] = "Le pays doit contenir entre 2 et 50 caractères";
            } else {
                $client = new Client();
                $client->modifyClientField($_SESSION['id'], 'pays', 'pays_client', $pays);
                $success[] = "Votre pays a bien été modifié";
            }
        }
    }
}
if (!empty($errors)) {
    header("Content-Type: application/json");
    echo json_encode(['status' => 'error', 'message' => $errors]);
} elseif (!empty($success)) {
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'message' => $success]);
} else {
    // Aucune mise à jour n'a été effectuée
    $errors[] = "Aucune mise à jour n'a été effectuée";
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'message' => $errors]);
}
