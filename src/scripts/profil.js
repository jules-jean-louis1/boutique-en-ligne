// Importation des modules
import { loginFormHeader} from './function/function.js';
import {registerHeader} from './function/function.js';
import { displayError} from './function/function.js';
import { displaySuccess} from './function/function.js';
import {formatDateSansh} from "./function/function.js";
import { displaySuccessMessageFormUpdateProduct } from './function/function.js';
import { messagePopup } from "./function/function.js";
import { searchHeader} from "./function/function.js";
import {cartHeader} from "./function/function.js";

const btnRegister = document.querySelector('#buttonRegisterHeader');
const btnLogin = document.querySelector('#buttonLoginHeader');
const buttonProfilHeader = document.getElementById("buttonProfilHeader");
const menuProfilHeader = document.getElementById("menuProfilHeader");
const profilInfoHeader = document.getElementById("infoUserNavBar");
const SearchBarHeader = document.getElementById("search_bar_form");
const FormSearchBarHeader = document.getElementById("searchBarFormHeader");
const containerMessageCart = document.getElementById("containerMessageAddCart");

// Ajout d'un écouteur d'événement sur le clic du bouton
if (buttonProfilHeader) {
    buttonProfilHeader.addEventListener("click", function(event) {
        // Empêche la propagation de l'événement pour éviter la fermeture immédiate du menu
        event.stopPropagation();
        // Ajout ou suppression de la classe "hidden" sur la liste ul
        menuProfilHeader.classList.toggle("hidden");
    });
}

// Ajout d'un écouteur d'événement sur le document entier pour fermer le menu lors d'un clic à l'extérieur
if (menuProfilHeader) {
    document.addEventListener("click", function(event) {
        // Si l'élément cliqué n'est ni le bouton de profil ni le menu
        if (!event.target.closest("#buttonProfilHeader") && !event.target.closest("#menuProfilHeader")) {
            // Ajout de la classe "hidden" sur la liste ul
            menuProfilHeader.classList.add("hidden");
        }
    });
}
// Fonction pour lancer la recherche
// Fonction pour afficher les infos de l'utilisateur dans le header
async function displayUserInfoHeader() {
    await fetch('src/php/fetch/client/displayUserById.php')
        .then(response => response.json())
        .then(data => {
            const titlePageCart = document.querySelector('title');
            titlePageCart.innerHTML = `Profil - ${data[0].login_users}`;
            for (const user of data) {
                profilInfoHeader.innerHTML = `
            <p>${user.login_users}</p>
            <img src="src/images/avatars/${user.avatar_users}" alt="${user.avatar_users}" class="h-6 rounded-full">
            `;
            }
        });
}
FormSearchBarHeader.addEventListener('keyup', (ev) => {
    ev.preventDefault();
    searchHeader();
});
if (profilInfoHeader) {
    displayUserInfoHeader();
}
if (btnRegister) {
    registerHeader(btnRegister);
}
if (btnLogin) {
    loginFormHeader(btnLogin);
}
cartHeader()

// Cart.js

// Récupérer les données du produit

// Récupération des éléments du DOM
const btnDisplayProfil = document.querySelector('#buttonFormProfilInfo');
const btnDisplayCommande = document.querySelector('#buttonFormCommandeInfo');

// Affichage Informations Profil
async function displayProfil() {
    const containerProfile = document.querySelector('#containerInfoUsers');
    await fetch('src/php/fetch/profil/getClientInfoProfil.php')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
            containerProfile.innerHTML = '';
            containerProfile.innerHTML = `
            <div class="flex space-x-2">
                <img src="src/images/avatars/${data[0].avatar_users}" class="h-36 rounded-full" id="profile-image">
                <div class="flex flex-col justify-around">
                    <p class="text-white font-semibold text-lg">@${data[0].login_users}</p>
                    <p class="text-[#a8b3cf]">${data[0].email_users}</p>
                    <p class="text-sm font-light">
                        <span class="text-[#a8b3cf]">Inscrit depuis le </span>
                        <span class="text-[#a8b3cf]">${formatDateSansh(data[0].created_at_users)}</span>
                    </p>
                    <p class="p-2 w-full bg-[#1c1f26] text-white rounded-[14px] text-center">
                        <span class="">Vos commande :</span>
                        <span class="font-semibold">${data[0].nombre_commandes}</span>
                    </p>
                </div>
            </div>
            `;
            }
                console.log(data);
        });
}
//Fonction de modifiacation du profil
async function modifyProfil() {
    const containerProfile = document.querySelector('#containerFormProfilInfo');
    await fetch('src/php/fetch/profil/getClientInfo.php')
        .then(response => response.json())
        .then(data => {
            containerProfile.innerHTML = '';
            containerProfile.innerHTML = `
        <div class="flex flex-col pt-12">
            <div class="flex flex-row justify-between items-center">
                <div id="wapperFormProfilInfo" class="w-fit h-fit">
                    <form action="" method="post" id="formModifyProfilInfo" class="flex flex-col space-y-2">
                        <div class="flex items-center justify-between space-x-2">
                            <div id="containerprofil" class="relative">
                                <input type="text" name="login" id="login" value="${data[0].login_users}" class="px-2.5 pt-4 pb-1 text-white bg-[#1a1f25] hover:bg-[#21262D] rounded-[14px] border-l-2 border-[#a87ee6]">
                                <label for="login" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Nom d'utilisateur</label>
                            </div>
                            <div class="relative">
                                <input type="email" name="email" id="email" value="${data[0].email_users}" class="text-white px-2.5 pt-4 pb-1 bg-[#1a1f25] hover:bg-[#21262D] rounded-[14px] border-l-2 border-[#a87ee6]">
                                <label for="email" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Email</label>
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="relative">
                                <input type="password" name="password" id="password" value="" class="text-white px-2.5 pt-4 pb-1 bg-[#1a1f25] hover:bg-[#21262D] rounded-[14px] border-l-2 border-[#a87ee6]">
                                <label for="password" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Password</label>
                            </div>
                            <div class="relative">
                                <input type="password" name="passwordConfirm" id="passwordConfirm" value="" class="text-white px-2.5 pt-4 pb-1 bg-[#1a1f25] hover:bg-[#21262D] rounded-[14px] border-l-2 border-[#a87ee6]">
                                <label for="passwordConfirm" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Confirm Password</label>
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="relative">
                                <input type="text" name="surname" id="surname" value="${data[0].nom_client}" class="text-white px-2.5 pt-4 pb-1 bg-[#1a1f25] hover:bg-[#21262D] rounded-[14px] border-l-2 border-[#a87ee6]">
                                <label for="surname" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Nom</label>
                            </div>
                            <div class="relative">
                                <input type="text" name="firstname" id="firstname" value="${data[0].prenom_client}" class="text-white px-2.5 pt-4 pb-1 bg-[#1a1f25] hover:bg-[#21262D] rounded-[14px] border-l-2 border-[#a87ee6]">
                                <label for="firstname" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Prénom</label>
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="relative">
                                <input type="tel" name="phone" id="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" value="${data[0].mobile_client}" class="text-white px-2.5 pt-4 pb-1 bg-[#1a1f25] hover:bg-[#21262D] rounded-[14px] border-l-2 border-[#a87ee6]">
                                <label for="phone" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Téléphone</label>
                            </div>
                            <div class="relative">
                                <input type="text" name="zipcode" id="zipcode" value="${data[0].code_postal_client}" class="text-white px-2.5 pt-4 pb-1 bg-[#1a1f25] hover:bg-[#21262D] rounded-[14px] border-l-2 border-[#a87ee6]">
                                <label for="zipcode" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Code postal</label>
                            </div>
                        </div>
                        <div class="relative">
                            <input type="text" name="address" id="address" value="${data[0].adresse_client}" class=" w-full text-white px-2.5 pt-4 pb-1 bg-[#1a1f25] hover:bg-[#21262D] rounded-[14px] border-l-2 border-[#a87ee6]">
                            <label for="address" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Adresse</label>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="relative">
                                <input type="text" name="country" id="country" value="${data[0].pays_client}" class="text-white px-2.5 pt-4 pb-1 bg-[#1a1f25] hover:bg-[#21262D] rounded-[14px] border-l-2 border-[#a87ee6]">
                                <label for="country" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Pays</label>
                            </div>
                            <div class="relative">
                                <input type="text" name="city" id="city" value="${data[0].ville_client}" class="text-white px-2.5 pt-4 pb-1 bg-[#1a1f25] hover:bg-[#21262D] rounded-[14px] border-l-2 border-[#a87ee6]">
                                <label for="city" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Ville</label>
                            </div>
                        </div>
                    <div id="containerMessageProfil" class="h-[65px] max-w-[330px]">
                        <div id="errorMsg" class="w-full"></div>
                    </div>
                    <div id="containerprofil">
                        <button type="submit" id="btnModifyProfilInfo" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-[14px]">Modifier vos informations</button>
                    </div>
                    </form>
                </div>
                <div id="wapperFormAvatarInfo">
                    <div class="">
                        <h2 class="text-white font-bold text-xl">Modifier votre avatar</h2>
                        <p class="text-gray-500 text-sm">Votre avatar doit être au format .png ou .jpg</p>
                    </div>
                    <form action="" method="post" id="formModifyAvatarInfo" class="flex flex-col items-center" enctype="multipart/form-data">
                        <div id="containerProfilAvatar" class="p-2">
                            <img src="src/images/avatars/${data[0].avatar_users}" alt="avatar" class="w-24 h-24 rounded-full">
                        </div>
                        <div class="flex flex-col border border-gray-300 p-2 rounded-lg">
                          <label for="uploadfile" class="mb-1 text-gray-500 font-medium">Sélectionner un fichier</label>
                          <div class="relative">
                            <input class="sr-only" type="file" name="uploadfile" id="uploadfile" accept="image/png,image/jpeg">
                            <label for="uploadfile" class="inline-block w-full px-4 py-2 text-white font-bold tracking-wide bg-[#0E1217] border-2 border-white rounded-lg cursor-pointer hover:bg-[#21262D] transition duration-200 ease-in-out">
                              Choisir un fichier
                            </label>
                            <span class="filename text-gray-500"></span>
                          </div>
                        </div>
                        <div id="containerMessageProfil" class="h-[65px] max-w-[330px]">
                            <div id="errorMsgAvatar" class="w-full"></div>
                        </div>
                        <button type="submit" id="upload" name="upload" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-[14px]">
                            Modifier votre avatar
                        </button>
                    </form>
                </div>
            </div>
            <div id="wapperFormPasswordInfo">
                <form action="" method="post" id="formDeleteUser" class="flex flex-col items-center">
                    <button type="submit" id="btnModifyPasswordInfo" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[14px]">Supprimer votre compte</button>
                </form>
            </div>
        </div>
            `;
            const formDeleteUser = document.querySelector('#formDeleteUser');
            formDeleteUser.addEventListener('submit', async (ev) => {
                ev.preventDefault();
                await fetch('src/php/fetch/client/deleteUser.php', {
                    method: 'POST',
                    body: new FormData(formDeleteUser)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'success') {
                            window.location.href = 'index.php';
                        } else {
                            let message = document.querySelector('#errorMsg');
                            message.innerHTML = data.message;
                            displayError(message);
                        }
                    });
            });
            const input = document.querySelector('input[name="uploadfile"]');
            const filenameSpan = document.querySelector('.filename');

            input.addEventListener('change', () => {
                filenameSpan.textContent = input.files[0].name;
            });
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
                            message.innerHTML = data.message;
                            displaySuccess(message);
                            modifyProfil();
                            displayUserInfoHeader();
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
async function commandeClient() {
    const sectionCommande = document.querySelector('#containerCommande');
    await fetch('src/php/fetch/profil/commandeClient.php')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            sectionCommande.innerHTML = '';
            if (data.status === 'error') {
                sectionCommande.innerHTML = `<div class="flex flex-col items-center justify-center w-full h-[300px]">
                        <p class="text-white text-xl font-bold">${data.message}</p>
                        </div>`;
            }
            if (data.status === 'success') {
                let orders = data.order
                orders.forEach(item => {
                    let commande = item.Commande;
                    let detailCommande = item.DetailCommande;
                    let total = item.totalItems;

                    // Créer une balise <div> unique pour chaque commande
                    let containerItemCommande = document.createElement('div');
                    containerItemCommande.classList.add('w-full', 'p-2');

                    for (let i = 0; i < detailCommande.length; i++) {
                        containerItemCommande.innerHTML += `
                        <div class="flex items-center justify-between text-white w-full rounded-[14px] bg-[#0e1217] my-2 px-4 py-2">
                            <div class="flex items-center space-x-4">
                                <img src="src/images/products/${detailCommande[i].img_product}" alt="image produit" class="h-16">
                                <div class="flex flex-col items-start">
                                    <p class="font-semibold text-xl">${detailCommande[i].name_product}</p>
                                    <p class="text-[#a8b3cf] text-sm">${detailCommande[i].name_subcategories}</p>
                                </div>
                            </div>
                            <div class="flex flex-col items-center">
                                <p class="font-semibold text-xl">${detailCommande[i].price_product} €</p>
                                <p class="text-[#a8b3cf] text-sm">Quantité :${detailCommande[i].quantite_produit}</p>
                            </div>
                        </div>`;
                    }

                    // Ajouter la balise <div> à la section de commande correspondante
                    sectionCommande.innerHTML += `
                        <div class="flex flex-col items-center rounded-[14px] border-[1px] border-[#a8b3cf33] bg-[#1c1f26] my-4">
                            <div class="flex items-center justify-between text-white w-full bg-[#a87ee6] rounded-t-[14px] p-4">
                                <p>Date de la commande: ${formatDateSansh(commande[0].date_commande)}</p>
                                <p>Nombre d'article: ${total}</p>
                                <p>Statut: ${commande[0].statue_commande}</p>
                                <p>Montant: ${commande[0].motant_commande} €</p>
                            </div>
                            <div id="containerItemCommande-${commande[0].id_commande}"></div>
                        </div>`;
                    // Récupérer la balise <div> correspondant aux détails de commande
                    let containerItemCommandeElement = document.querySelector(`#containerItemCommande-${commande[0].id_commande}`);
                    containerItemCommandeElement.appendChild(containerItemCommande);
                });
            }
        });
}

// Fonction d'affichage du profil
const sectionCommande = document.querySelector('#containerCommande');
const sectionProfil = document.querySelector('#itemsModifProfil');
displayProfil();
modifyProfil();
commandeClient();
btnDisplayProfil.addEventListener('click', () => {
    if (sectionProfil.classList.contains('hidden')) {
        sectionProfil.classList.remove('hidden');
        sectionCommande.classList.add('hidden');
    } else {
        sectionProfil.classList.add('hidden');
        sectionCommande.classList.remove('hidden');
    }
});
btnDisplayCommande.addEventListener('click', () => {
    if (sectionCommande.classList.contains('hidden')) {
        sectionCommande.classList.remove('hidden');
        sectionProfil.classList.add('hidden');
    } else {
        sectionCommande.classList.add('hidden');
        sectionProfil.classList.remove('hidden');
    }
});
