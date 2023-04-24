<?php
session_start();
require_once "../../Classes/Client.php"; // On inclut la classe Client

if(isset($_POST['login'])) {
    $login = htmlspecialchars($_POST['login']);
    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['password']);
    $password2 = htmlspecialchars($_POST['passwordConfirm']);

    if(!empty($login) && !empty($email) && !empty($password) && !empty($password2)) {
        $client = new Client();
        if ($client->checkLogin($login) === false) {
            if ($client->validEmail($email)) {
                if ($client->checkEmail($email) === false) {
                    if ($client->validPassword($password) === true) {
                       if ($password === $password2) {
                           $client->register($login, $password, $email);
                            header("Content-Type: application/json");
                            echo json_encode(['status' => 'success', 'message' => 'Votre compte a bien été créé']);
                       } else {
                            header("Content-Type: application/json");
                            echo json_encode(['status' => 'error', 'message' => 'Les mots de passe ne correspondent pas']);
                       }
                    } else {
                        header("Content-Type: application/json");
                        echo json_encode(['status' => 'error', 'message' => 'Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial']);
                    }
                } else {
                    header("Content-Type: application/json");
                    echo json_encode(['status' => 'error', 'message' => 'Cette adresse email est déjà utilisée']);
                }
            } else {
                header("Content-Type: application/json");
                echo json_encode(['status' => 'error', 'message' => 'Veuillez entrer une adresse email valide']);
            }
        } else {
            header("Content-Type: application/json");
            echo json_encode(['status' => 'error', 'message' => 'Ce login est déjà utilisé']);
        }
    } else {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'error', 'message' => 'Veuillez remplir tous les champs']);
    }
    die();
}

?>

<form action="" method="post" id="resgister-form" class="rounded-lg h-full max-h-[calc(100vh-2.5rem)]
                mobileL:h-[40rem] mobileL:max-h-[calc(100vh-5rem)]
                w-[26.25rem] px-4 py-5 flex flex-col justify-around">
    <div class="relative">
        <input type="text" name="login" id="login" placeholder="Entrez votre login" class="px-2.5 pt-4 pb-1 text-white bg-[#52586633] hover:bg-[#31333a] rounded-[14px] border-l-2 border-[#a87ee6] w-full">
        <label for="login" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Login</label>
    </div>
    <div class="relative">
        <input type="text" name="email" id="E-mail" placeholder="Entrez votre E-mail" class="px-2.5 pt-4 pb-1 text-white bg-[#52586633] hover:bg-[#31333a] rounded-[14px] border-l-2 border-[#a87ee6] w-full">
        <label for="login" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">E-mail</label>
    </div>
    <div class="relative">
        <input type="password" name="password" id="password" placeholder="Entrez votre mot de passe" class="px-2.5 pt-4 pb-1 text-white bg-[#52586633] hover:bg-[#31333a] rounded-[14px] border-l-2 border-[#a87ee6] w-full">
        <label for="password" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Mot de passe</label>
    </div>
    <div class="relative">
        <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirmer le mot de passe" class="px-2.5 pt-4 pb-1 text-white bg-[#31333a] hover:bg-[#21262D] rounded-[14px] border-l-2 border-[#a87ee6] w-full">
        <label for="passwordConfirm" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Confirmer le mot de passe</label>
    </div>
    <div id="containerMessageProfil" class="h-[85px] w-full">
        <div id="errorMsg"></div>
    </div>
    <div id="containerSubmit">
        <button type="submit" name="submit" id="submit" class="p-2 rounded-[14px] bg-[#a87ee6] font-semibold text-white w-full">Inscription</button>
    </div>
</form>
