// Importation des modules
import { loginFormHeader} from './function/function.js';
import {registerHeader} from './function/function.js';
import { displayError} from './function/function.js';
import { displaySuccess} from './function/function.js';


// Récupération des éléments du DOM
const btnDisplayProfil = document.querySelector('#buttonFormProfilInfo');

//Fonction de modifiacation du profil
async function modifyProfil() {
    const containerProfile = document.querySelector('#containerFormProfilInfo');
    await fetch('src/php/fetch/profil/getClientInfo.php')
        .then(response => response.json())
        .then(data => {
            containerProfile.innerHTML = '';
            containerProfile.innerHTML = `
            <div class="wapperFormProfilInfo">
                <form action="" method="post" id="formModifyProfilInfo">
                <div id="containerprofil">
                    <label for="login">Nom d'utilisateur</label>
                    <input type="text" name="login" id="login" value="${data[0].login_users}" class="p-2 bg-slate-100">
                </div>
                <div id="containerprofil">
                    <label for="email">email</label>
                    <input type="email" name="email" id="email" value="${data[0].email_users}" class="p-2 bg-slate-100">
                </div>    
                <div id="containerprofil">
                    <label for="password">password</label>
                    <input type="password" name="password" id="password" value="" class="p-2 bg-slate-100">
                </div>
                <div id="containerprofil">
                    <label for="passwordConfirm">passwordConfirm</label>
                    <input type="password" name="passwordConfirm" id="passwordConfirm" value="" class="p-2 bg-slate-100">
                </div>
                <div id="containerprofil">
                    <label for="firstname">Nom</label>
                    <input type="text" name="surname" id="surname" value="${data[0].nom_client}" class="p-2 bg-slate-100">
                </div>
                <div id="containerprofil">
                    <label for="lastname">Prénom</label>
                    <input type="text" name="firstname" id="firstname" value="${data[0].prenom_client}" class="p-2 bg-slate-100">
                </div>
                <div id="containerprofil">
                    <label for="phone">Téléphone</label>
                    <input type="tel" name="phone" id="phone"  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" value="${data[0].mobile_client}" class="p-2 bg-slate-100">
                </div>
                <div id="containerprofil">
                    <label for="address">Adresse</label>
                    <input type="text" name="address" id="address" value="${data[0].adresse_client}" class="p-2 bg-slate-100">
                </div>
                <div id="containerprofil">
                    <label for="city">Ville</label>
                    <input type="text" name="city" id="city" value="${data[0].ville_client}" class="p-2 bg-slate-100">
                </div>
                <div id="containerprofil">
                    <label for="zipcode">Code postal</label>
                    <input type="text" name="zipcode" id="zipcode" value="${data[0].code_postal_client}" class="p-2 bg-slate-100">
                </div>
                <div id="containerprofil">
                    <label for="country">Pays</label>
                    <input type="text" name="country" id="country" value="${data[0].pays_client}" class="p-2 bg-slate-100">
                </div>
                <div id="containerMessageProfil" class="h-[65px] max-w-[330px]">
                    <div id="errorMsg" class="w-full"></div>
                </div>
                <div id="containerprofil">
                    <button type="submit" id="btnModifyProfilInfo" class="bg-green-500 p-2 rounded-lg">Modifier</button>
                </div>
                </form>
            </div>
            <div id="wapperFormAvatarInfo">
                <form action="" method="post" id="formModifyAvatarInfo">
                    <div id="containerProfilAvatar">
                        <img src="src/images/avatars/${data[0].avatar_users}" alt="avatar" class="w-24 h-24 rounded-full">
                    </div>
                    <div class="flex flex-col border-[1px] border-slate-300 p-2 rounded-lg">
                        <input class="form-control" type="file" name="uploadfile" class="p-2 rounded-xl bg-[#E9E9E9] accept="image/png,image/jpeg"/>
                    </div>
                    <div id="containerMessageProfil" class="h-[65px] max-w-[330px]">
                        <div id="errorMsgAvatar" class="w-full"></div>
                    </div>
                    <button type="submit" id="upload" name="upload" class="p-2 rounded-lg bg-[#9E15D9] text-white w-full">
                        Update Avatar
                    </button>
                </form>
            </div>
            `;
            const profilForm = document.querySelector('#formModifyProfilInfo');
            profilForm.addEventListener('submit', async (ev) => {
                ev.preventDefault();
                await fetch('src/php/fetch/profil/modifyProfil.php', {
                    method: 'POST',
                    body: new FormData(profilForm)
                })
                    .then(response => response.json())
                    .then(data => {
                        let message = document.querySelector('#errorMsg');
                        if (data.status === 'success') {
                            console.log("ok")
                            message.innerHTML = data.message;
                            displaySuccess(message);
                            modifyProfil();
                        }
                        if (data.status === 'error') {
                            for (let i = 0; i < data.message.length; i++) {
                                message.innerHTML = data.message[i];
                                displayError(message);
                            }
                        }
                    })
            });
        });
    const btnModifyAvatar = document.querySelector('#formModifyAvatarInfo');
    btnModifyAvatar.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        await fetch('src/php/fetch/profil/modifyAvatar.php', {
            method: 'POST',
            body: new FormData(btnModifyAvatar)
        })
            .then(response => response.json())
            .then(data => {
                let message = document.querySelector('#errorMsgAvatar');
                if (data.status === 'avatarUp') {
                    message.innerHTML = data.message;
                    displaySuccess(message);
                    modifyProfil();
                }
                if (data.status === 'error') {
                    message.innerHTML = data.message;
                    displayError(message);
                }
            })
    })

}

// Fonction d'affichage du profil
modifyProfil();