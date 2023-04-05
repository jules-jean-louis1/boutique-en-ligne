// Importation des modules
import { loginFormHeader} from './function/function.js';
import {registerHeader} from './function/function.js';
import { displayError} from './function/function.js';
import { displaySuccess} from './function/function.js';


//Fonction de modifiacation du profil
async function modifyProfil() {
    const containerProfile = document.querySelector('#containerFormProfilInfo');
    await fetch('src/php/fetch/profil/getClientInfo.php')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            containerProfile.innerHTML = '';
            containerProfile.innerHTML = `
            <div class="containerFormProfilInfo">
                <form action="" method="post" id="formModifyProfilInfo">
                <div id="containerprofil">
                    <label for="login">login</label>
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
                    <label for="pays">Pays</label>
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
                        console.log(data);
                        let message = document.querySelector('#errorMsg');
                        if (data.status === 'success') {
                            console.log("ok")
                            message.innerHTML = data.message;
                            displaySuccess(message);
                            modifyProfil();
                        }
                        if (data.status === 'error') {
                            console.log("error")
                            message.innerHTML = data.message;
                            displayError(message);
                        }
                    })
            });
        });
}
modifyProfil();