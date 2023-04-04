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
                w-[26.25rem] px-4 py-5 flex flex-col space-y-2">
    <div id="containerCloseDialog" class="flex flex-row justify-between items-center">
        <p>
            <span class="text-lg font-bold">Inscrivez-vous sur E-commerce</span>
        </p>
        <button type="button" id="closeDialog" class="py-2 px-4 hover:bg-slate-200 rounded-full">&times;</button>
    </div>
    <div class="flex flex-col">
        <label for="login" class="px-[4px] py-[3px]">Login</label>
        <input type="text" name="login" id="login" placeholder="Entrez votre login" class="p-2 bg-[#52586633] rounded-[8px] text-sm">
    </div>
    <div class="flex flex-col">
        <label for="login" class="px-[4px] py-[3px]">E-mail</label>
        <input type="text" name="email" id="E-mail" placeholder="Entrez votre E-mail" class="p-2 bg-[#52586633] rounded-[8px] text-sm">
    </div>
    <div class="flex flex-col">
        <label for="password" class="px-[4px] py-[3px]">Mot de passe</label>
        <input type="password" name="password" id="password" placeholder="Entrez votre password" class="p-2 bg-[#52586633] rounded-[8px] text-sm">
    </div>
    <div class="flex flex-col">
        <label for="passwordConfirm" class="px-[4px] py-[3px]">Confirmer le mot de passe</label>
        <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirmer le mot de passe" class="p-2 bg-[#52586633] rounded-[8px] text-sm">
    </div>
    <div id="containerMessageProfil" class="h-[85px] w-full">
        <div id="errorMsg"></div>
    </div>
    <div id="containerSubmit">
        <button type="submit" name="submit" id="submit" class="p-2 rounded-lg bg-[#AC1DE4] font-semibold text-white">Inscription</button>
    </div>
</form>
