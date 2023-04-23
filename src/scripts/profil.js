// Importation des modules
import { loginFormHeader} from './function/function.js';
import {registerHeader} from './function/function.js';
import { displayError} from './function/function.js';
import { displaySuccess} from './function/function.js';
import {formatDateSansh} from "./function/function.js";
import { displaySuccessMessageFormUpdateProduct } from './function/function.js';
import { messagePopup } from "./function/function.js";

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
async function searchHeader() {
    let query = SearchBarHeader.value;
    if (query.length > 0) {
        await fetch (`src/php/fetch/produit/searchBarProduct.php?query=${query}`)
            .then(response => response.json())
            .then(data => {
                const containerHeaderSearch = document.getElementById("containerSearchBarResultHeader");
                if (data.status === 'error') {
                    containerHeaderSearch.innerHTML = `
                <div class="absolute top-14 transform -translate-y-1/2 w-[50%] mt-1.5 bg-[#2D323C] hover:border-[#A87EE6FF] border-[1px] border-[#a8b3cf33] z-10 rounded-lg">
                    <p class="text-center text-[#a8b3cf] py-2">Aucun résultat</p>
                </div>
                `;
                }
                if (data.status === 'success') {
                    containerHeaderSearch.innerHTML = '';
                    for (const product of data.data) {
                        containerHeaderSearch.innerHTML += `
                    <div class="absolute top-16 transform -translate-y-1/2 w-[50%] mt-1.5 bg-[#2D323C] hover:border-[#A87EE6FF] border-[1px] border-[#a8b3cf33] z-10 rounded-lg">
                        <a href="produit.php?id=${product.id_product}" class="flex flex-row items-center justify-between p-2 ">
                            <div class="flex items-center">
                                <img src="src/images/products/${product.img_product}" alt="${product.img_product}" class="h-10">
                                <div class="flex flex-col items-start ml-2">
                                    <p class="text-white">${product.name_product}</p>
                                    <small class="text-[#a8b3cf]">${product.name_subcategories}</small>
                                </div>
                            </div>
                            <p class="text-sm text-[#a8b3cf]">${product.price_product} €</p>
                        </a>
                    </div>
                    `;
                    }
                }
            });
    } else {
        const containerHeaderSearch = document.getElementById("containerSearchBarResultHeader");
        containerHeaderSearch.innerHTML = '';
    }
}
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


// Cart.js

// Récupérer les données du produit
async function cartHeader() {
    const cartButtonHeader = document.getElementById("cartHeader");
    const notifCartHeader = document.getElementById("notifCartHeader");
    await fetch('src/php/fetch/cart/displayCartInfoHeader.php')
        .then(response => response.json())
        .then(data => {
            if (data.status == 'success_not_connected') {
                const total = data.total;
                const nbProduits = data.countProducts;
                notifCartHeader.innerHTML = `
                    <p class="absolute rounded-full bg-[#A87EE6FF] px-1">
                        <span class="text-white text-xs">${nbProduits}</span>
                    </p>
                `;
                const cartDivHeader = document.createElement("dialog");
                cartDivHeader.setAttribute('class', 'absolute top-[17%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white w-80 rounded-lg shadow-lg');

                cartButtonHeader.addEventListener('mouseenter', () => {
                    cartDivHeader.setAttribute('open', '');
                    cartDivHeader.innerHTML = '';
                    cartDivHeader.innerHTML = `
                    <div class="flex flex-col items-around space-y-2">
                        <div class="mt-2">
                            <p class="text-[#a8b3cf]">Total : ${total} €</p>
                        </div>
                        <div id="containerCartHeader"></div>
                        <div class="h-10 flex items-center justify-center pb-2">
                            <a href="cart.php" class="bg-[#A87EE6FF] text-white px-5 py-2 rounded-lg">Voir le panier</a>
                        </div>
                    </div>
                    `;
                    const containerCartHeader = document.getElementById("containerCartHeader");
                    for (const product of data.products) {
                        containerCartHeader.innerHTML += `
                        <div class="flex flex-row justify-between px-5 py-3 border-b-[1px] border-[#e5e7eb]">
                            <div class="flex flex-row items-center">
                                <img src="src/images/products/${product.img_product}" alt="${product.img_product}" class="h-12 rounded-lg">
                                <p class="text-[#a8b3cf] ml-5">${product.name_product}</p>
                            </div>
                            <div class="flex flex-col items-start">
                                <p class="text-[#a8b3cf] text-2xl">${product.price_product} €</p>
                                <p class="text-[#a8b3cf] text-sm">Quantité :${product.quantity_product}</p>
                            </div>
                        </div>
                        `;
                    }

                });
                cartButtonHeader.appendChild(cartDivHeader);
                cartButtonHeader.addEventListener('mouseleave', () => {
                    cartDivHeader.removeAttribute('open');
                });

            }
            if (data.status == 'success_connected') {
                const total = data.total;
                const nbProduits = data.countProducts;
                notifCartHeader.innerHTML = `
                    <p class="absolute rounded-full bg-[#A87EE6FF] px-1">
                        <span class="text-white text-xs">${nbProduits}</span>
                    </p>
                `;
                const cartDivHeader = document.createElement("dialog");
                cartDivHeader.setAttribute('class', 'absolute top-[17%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white w-80 rounded-lg shadow-lg');

                cartButtonHeader.addEventListener('mouseenter', () => {
                    cartDivHeader.setAttribute('open', '');
                    cartDivHeader.innerHTML = '';
                    cartDivHeader.innerHTML = `
                    <div class="flex flex-col items-around space-y-2">
                        <div class="mt-2">
                            <p class="text-[#a8b3cf]">Total : ${total} €</p>
                        </div>
                        <div id="containerCartHeader"></div>
                        <div class="h-10 flex items-center justify-center pb-2">
                            <a href="cart.php" class="bg-[#A87EE6FF] text-white px-5 py-2 rounded-lg">Voir le panier</a>
                        </div>
                    </div>
                    `;
                    const containerCartHeader = document.getElementById("containerCartHeader");
                    for (const product of data.products) {
                        containerCartHeader.innerHTML += `
                        <div class="flex flex-row justify-between px-5 py-3 border-b-[1px] border-[#e5e7eb]">
                            <div class="flex flex-row items-center">
                                <img src="src/images/products/${product.img_product}" alt="${product.img_product}" class="h-12 rounded-lg">
                                <p class="text-[#a8b3cf] ml-5">${product.name_product}</p>
                            </div>
                            <div class="flex flex-col items-start">
                                <p class="text-[#a8b3cf] text-2xl">${product.price_product} €</p>
                                <p class="text-[#a8b3cf] text-sm">Quantité :${product.quantity_product}</p>
                            </div>
                        </div>
                        `;
                    }
                });
                cartButtonHeader.appendChild(cartDivHeader);
                cartButtonHeader.addEventListener('mouseleave', () => {
                    cartDivHeader.removeAttribute('open');
                });
            }
            if (data.status == 'error') {
                notifCartHeader.innerHTML = '';
                const cartDivHeader = document.createElement("dialog");
                cartDivHeader.setAttribute('class', 'absolute top-[17%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white w-80 rounded-lg shadow-lg');
                cartDivHeader.addEventListener('mouseenter', () => {
                    cartDivHeader.setAttribute('open', '');
                    cartDivHeader.innerHTML = `
                    <div class="flex flex-col items-center space-y-2">
                        <div class="mt-2">
                            <p class="text-[#a8b3cf]">Votre panier est vide</p>
                        </div>
                    </div>
                    `;
                });
                cartButtonHeader.appendChild(cartDivHeader);
                cartButtonHeader.addEventListener('mouseleave', () => {
                    cartDivHeader.removeAttribute('open');
                });
            }
        });
}

cartHeader();

// Récupération des éléments du DOM
const btnDisplayProfil = document.querySelector('#buttonFormProfilInfo');
const btnCommandeProfil = document.querySelector('#buttonFormCommandeInfo');

//Fonction de modifiacation du profil
async function modifyProfil() {
    const containerProfile = document.querySelector('#containerFormProfilInfo');
    await fetch('src/php/fetch/profil/getClientInfo.php')
        .then(response => response.json())
        .then(data => {
            containerProfile.innerHTML = '';
            containerProfile.innerHTML = `
            <div id="wapperFormProfilInfo" class="w-fit h-[50%]">
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
                <form action="" method="post" id="formModifyAvatarInfo" class="flex flex-col items-center">
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
            `;
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

async function commandeClient() {
    const sectionCommande = document.querySelector('#containerCommande');
    await fetch('src/php/fetch/profil/commandeClient.php')
        .then(response => response.json())
        .then(data => {

        });
}

// Fonction d'affichage du profil
const sectionProfil = document.querySelector('#itemsModifProfil');
btnDisplayProfil.addEventListener('click', () => {
    modifyProfil();
});
