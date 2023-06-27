import { loginFormHeader} from './function/function.js';
import {registerHeader} from './function/function.js';
import {formatDateSansh} from "./function/function.js";
import { displaySuccessMessageFormUpdateProduct } from './function/function.js';
import { displayErrorMessageFormUpdateProduct } from './function/function.js';
import { messagePopup } from "./function/function.js";
import {Login} from "./function/function.js";
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
            titlePageCart.innerHTML = `Panier - ${data[0].login_users}`;
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
    Login(btnLogin);
}
cartHeader();

// Cart.js



// Récupérer les données du produit






function checkInput(input, selector) {
    selector.innerHTML = '';
    if (input.value.trim() === '') {
        input.classList.add('input_error');
        selector.innerHTML = `<div class="flex space-x-2">
                                                <svg width="20" height="20" viewBox="0 0 24 24" stroke="#ff0303" fill="none" stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M10.2202 4.4703C10.9637 3.02048 13.036 3.02048 13.7795 4.4703L20.5062 17.5874C21.1887 18.9183 20.2223 20.5 18.7266 20.5H5.27316C3.77747 20.5 2.81101 18.9183 3.49352 17.5874L10.2202 4.4703Z"></path><path d="M11.5191 13.3173L10.5493 9.92306C10.274 8.95934 10.9976 8.00001 11.9999 8.00001C13.0021 8.00001 13.7258 8.95934 13.4504 9.92306L12.4806 13.3173C12.3425 13.8009 11.6573 13.8009 11.5191 13.3173Z"></path><path d="M12.9999 17C12.9999 17.5523 12.5522 18 11.9999 18C11.4476 18 10.9999 17.5523 10.9999 17C10.9999 16.4477 11.4476 16 11.9999 16C12.5522 16 12.9999 16.4477 12.9999 17Z"></path></svg>
                                                <p class="text-red-500">Champ Requis</p>
                                            </div>`;
        return false;
    } else {
        input.classList.remove('input_error');
        selector.innerHTML = '';
        return true;
    }
}

// Page cart.php
async function getCart() {
    const containerCart = document.getElementById("containerCart");
    await fetch('src/php/fetch/cart/getCart.php')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            containerCart.innerHTML = '';
            if (data.status == 'success_connected') {
                const total = data.total;
                const nbProduits = data.countProducts;
                containerCart.innerHTML = `
                    <div class="flex flex-col items-center space-y-2 w-full">
                        <div class="flex flex-row items-center justify-between w-9/12 text-white">
                            <div id="total_items_cart" class="bg-[#1c1f26] px-6 py-6 border border-[#a8b3cf33] rounded-[12px]">
                                <p class="">Vous avez <b class="font-bold">${nbProduits}</b> articles dans votre panier</p>
                            </div>
                            <div id="total_prix" class="bg-[#1c1f26] px-6 py-6 border border-[#a8b3cf33] rounded-[12px]">
                                <p class="font-regular">Total : <b class="font-bold">${total}</b> €</p>
                            </div>
                        </div>
                        <div id="displayproductsInCart" class=" w-9/12"></div>
                    </div>
                    <div id="containerBtnLoginSigin"></div>
                `;
                const containerBtnLoginSigin = document.getElementById("containerBtnLoginSigin");
                containerBtnLoginSigin.innerHTML = `
                    <div class="flex flex-row items-center justify-center w-full mt-6">
                        <button id="btnVerifyInfoUsers" class="bg-[#A87EE6FF] text-white px-5 py-2 rounded-lg">Passer la commande</button>
                    </div>
                    `;
                // Cree un tableau avec les id et les quantités des produits
                let QuantityProduct = [];
                for (let product of data.products) {
                    QuantityProduct.push({id: product.id_product, quantity: product.quantity_product});
                }
                // Créez une instance de URLSearchParams
                const params = new URLSearchParams();
                // Parcourez le tableau et ajoutez les paramètres à l'instance URLSearchParams
                QuantityProduct.forEach((product) => {
                    params.append('id[]', product.id);
                    params.append('quantity[]', product.quantity);
                });
                const btnVerifyInfoUsers = document.getElementById("btnVerifyInfoUsers");
                btnVerifyInfoUsers.addEventListener('click', async () => {
                    await fetch(`src/php/fetch/client/verifyInfoUsers.php?${params.toString()}`)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            if (data.status === 'error') {
                                const containerMessageCart = document.getElementById("containerMessageCart");
                                const dialogCompleteInfo = document.createElement("dialog");
                                dialogCompleteInfo.setAttribute('id', 'dialog');
                                dialogCompleteInfo.className = 'w-[50%] rounded-[14px] shadow-lg p-2 bg-[#1c1f26] border border-[#a8b3cf33]';
                                containerMessageCart.appendChild(dialogCompleteInfo);
                                dialogCompleteInfo.showModal();
                                containerMessageCart.classList.add('bg-overlay-quaternary-onion');
                                dialogCompleteInfo.innerHTML = '';
                                    dialogCompleteInfo.innerHTML += `
                                    <div class="flex flex-col items-center space-y-2">
                                        <div class="mt-2 flex flex-row justify-between items-center w-full px-4 border-b border-[#a8b3cf33]">
                                            <h2 class="text-white text-xl">Produit non disponible en quantité suffisante</h2>
                                            <button id="btnCloseDialog" class="p-2 hover:bg-slate-800 rounded-lg">
                                                <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none reply_svg"><path d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z" fill="currentcolor" fill-rule="evenodd"></path></svg>
                                            </button>
                                        </div>
                                        <div id="productUnavaibleCart" class="flex flex-col items-center space-y-2"></div>
                                    </div>
                                    `;
                                    const productUnavaibleCart = document.getElementById("productUnavaibleCart");
                                    for (let product of data.infoProduct) {
                                        productUnavaibleCart.innerHTML += `
                                        <div class="flex items-start space-x-4 text-white">
                                                <img src="src/images/products/${product.img_product}" alt="${product.img_product}" class="h-20 rounded">
                                                <div class="flex flex-col items-start space-y-2">
                                                    <p class="font-semibold text-xl">${product.name_product}</p>
                                                    <p class="">
                                                        <span>Prix :</span>
                                                        <span class="font-semibold">${product.price_product}</span>
                                                    </p>
                                                    <p class="">
                                                        <span>Quantité :</span>
                                                        <span class="font-semibold">${product.quantity_product}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        `;
                                    }
                                    const btnCloseDialog = document.getElementById("btnCloseDialog");
                                    btnCloseDialog.addEventListener('click', () => {
                                        dialogCompleteInfo.close();
                                        containerMessageCart.classList.remove('bg-overlay-quaternary-onion');
                                        dialogCompleteInfo.innerHTML = '';
                                    });

                            }
                            if (data.verify === true) {
                                const containerMessageCart = document.getElementById("containerMessageCart");
                                const dialogCompleteInfo = document.createElement("dialog");
                                dialogCompleteInfo.setAttribute('id', 'dialog');
                                dialogCompleteInfo.className = 'w-[50%] rounded-[14px] shadow-lg p-2 bg-[#1c1f26] border border-[#a8b3cf33]';
                                containerMessageCart.appendChild(dialogCompleteInfo);
                                dialogCompleteInfo.showModal();
                                containerMessageCart.classList.add('bg-overlay-quaternary-onion');
                                dialogCompleteInfo.innerHTML = '';
                                for (let info of data.info) {
                                    dialogCompleteInfo.innerHTML += `
                                    <div class="flex flex-col items-center space-y-2">
                                        <div class="mt-2 flex flex-row justify-between items-center w-full px-4 border-b border-[#a8b3cf33]">
                                            <h2 class="text-white text-xl">Veuillez renseigner votre profil.</h2>
                                            <button id="btnCloseDialog" class="p-2 hover:bg-slate-100 rounded-lg">
                                                <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none reply_svg"><path d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z" fill="currentcolor" fill-rule="evenodd"></path></svg>
                                            </button>
                                        </div>
                                        <div class="flex flex-row items-center justify-between w-9/12">
                                            <form action="" method="post" id="formCompleteInfo" class="flex flex-col space-y-4 w-full pb-4">
                                                <div class="flex flex-row justify-between space-x-4">
                                                    <div>
                                                        <div class="relative">
                                                        <input type="text" value="${info.nom_client}" name="nom_client" placeholder="Votre Nom" class="px-2.5 pt-4 pb-1 text-white bg-[#31333a] hover:bg-[#21262D] rounded-[14px] textField_form focus:outline-none w-full">
                                                        <label for="nom_client" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Nom</label>
                                                        </div>
                                                        <small id="alertNom" class="flex items-center text-red-500 h-6 py-1 text-sm"></small>
                                                    </div>
                                                    <div class="relative">
                                                        <input type="text" value="${info.prenom_client}" name="prenom_client" placeholder="Votre Prénom" class="px-2.5 pt-4 pb-1 text-white bg-[#31333a] hover:bg-[#21262D] rounded-[14px] textField_form focus:outline-none w-full">
                                                        <label for="prenom_client" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Prénom</label>
                                                        <small id="alertPrenom" class="flex items-center text-red-500 h-6 py-1 text-sm"></small>
                                                    </div>
                                                </div>
                                                <div class="flex flex-row justify-between space-x-4">
                                                    <div class="relative">
                                                        <input type="text" value="${info.mobile_client}" placeholder="Votre mobile" name="mobile_client" class="px-2.5 pt-4 pb-1 text-white bg-[#31333a] hover:bg-[#21262D] rounded-[14px] textField_form focus:outline-none w-full">
                                                        <label for="mobile_client" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Tel. mobile (optionel)</label>
                                                        <small id="alertMobile" class="flex items-center text-red-500 h-6 py-1 text-sm"></small>
                                                    </div>
                                                    <div class="relative">
                                                        <input type="text" value="${info.pays_client}" placeholder="Votre Pays" name="pays_client" class="px-2.5 pt-4 pb-1 text-white bg-[#31333a] hover:bg-[#21262D] rounded-[14px] textField_form focus:outline-none w-full">
                                                        <label for="pays_client" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Pays</label>
                                                        <small id="alertPays" class="flex items-center text-red-500 h-6 py-1 text-sm"></small>
                                                    </div>
                                                </div>
                                                <div class="flex flex-col w-full">
                                                    <div class="relative">
                                                        <input type="text" value="${info.adresse_client}" placeholder="Votre Adresse" name="adresse_client" class="px-2.5 pt-4 pb-1 text-white bg-[#31333a] hover:bg-[#21262D] rounded-[14px] textField_form focus:outline-none w-full">
                                                        <label for="adresse_client" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Adresse</label>
                                                        <small id="alertAdresse" class="flex items-center text-red-500 h-6 py-1 text-sm"></small>
                                                    </div>
                                                </div>
                                                <div class="flex flex-row justify-between space-x-4">
                                                    <div class="relative">
                                                        <input type="text" value="${info.ville_client}" placeholder="Votre Ville" name="ville_client" class="px-2.5 pt-4 pb-1 text-white bg-[#31333a] hover:bg-[#21262D] rounded-[14px] textField_form focus:outline-none w-full">
                                                        <label for="ville_client" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Ville</label>
                                                        <small id="alertVille" class="flex items-center text-red-500 h-6 py-1 text-sm"></small>
                                                    </div>
                                                    <div class="relative">
                                                        <input type="text" value="${info.code_postal_client}" placeholder="Votre Code Postal" name="code_postal_client" class="px-2.5 pt-4 pb-1 text-white bg-[#31333a] hover:bg-[#21262D] rounded-[14px] textField_form focus:outline-none w-full">
                                                        <label for="code_postal_client" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Code Postal</label>
                                                        <small id="alertZip" class="flex items-center text-red-500 h-6 py-1 text-sm"></small>
                                                    </div>
                                                </div>
                                                <div id="errorMsg" class="w-full h-fit"></div>
                                                <div class="flex flex-row items-center justify-start w-9/12 mt-6">
                                                    <button id="btnUpdateInfo" type="submit" class="bg-[#A87EE6FF] text-white px-5 py-2 rounded-[14px]">Mettre à jour et passer la commande</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    `;



                                    let nom_client_input = document.querySelector('[name="nom_client"]');
                                    let prenom_client_input = document.querySelector('[name="prenom_client"]');
                                    let pays_client_input = document.querySelector('[name="pays_client"]');
                                    let ville_client_input = document.querySelector('[name="ville_client"]');
                                    let adresse_client_input = document.querySelector('[name="adresse_client"]');
                                    let code_postal_client_input = document.querySelector('[name="code_postal_client"]');

                                    const smallNom = document.querySelector('#alertNom');
                                    const smallPrenom = document.querySelector('#alertPrenom');
                                    const smallPays = document.getElementById("alertPays");
                                    const smallVille = document.getElementById("alertVille");
                                    const smallAdresse = document.getElementById("alertAdresse");
                                    const smallZip = document.getElementById("alertZip");


                                    nom_client_input.addEventListener('input', () => { checkInput(nom_client_input, smallNom) });
                                    prenom_client_input.addEventListener('input', () => { checkInput(prenom_client_input, smallPrenom) });
                                    pays_client_input.addEventListener('input', () => { checkInput(pays_client_input, smallPays) });
                                    ville_client_input.addEventListener('input', () => { checkInput(ville_client_input, smallVille) });
                                    adresse_client_input.addEventListener('input', () => { checkInput(adresse_client_input, smallAdresse) });
                                    code_postal_client_input.addEventListener('input', () => { checkInput(code_postal_client_input, smallZip) });

                                    const btnUpdateInfo = document.getElementById("formCompleteInfo");
                                    btnUpdateInfo.addEventListener('submit', async (ev) => {
                                        ev.preventDefault();
                                        const message = document.getElementById("errorMsg");
                                        if (checkInput(nom_client_input, smallNom) === false && checkInput(prenom_client_input, smallPrenom)  === false && checkInput(pays_client_input, smallPays) === false && checkInput(adresse_client_input, smallAdresse) === false && checkInput(code_postal_client_input, smallZip) === false && checkInput(ville_client_input, smallVille) === false) {
                                            message.innerHTML = `<div class="flex items-center py-3 px-2 rounded-[14px] bg-[#DC110154] text-[#D8000C] border-l-[3px] border-[#D8000C]">
                                                                    <img src="public/images/icones/danger-red-stroke-2.svg" alt="" class="w-5 h-5">
                                                                    <small class="text-lg">Veuillez remplir tous les champs</small>
                                                                </div>`;
                                        } else {
                                            await fetch('src/php/fetch/profil/updateInfoClient.php', {
                                                method: 'POST',
                                                body: new FormData(btnUpdateInfo)
                                            })
                                            .then(response => response.json())
                                            .then(data => {
                                                console.log(data);
                                                if (data.status === 'success') {
                                                    displaySuccessMessageFormUpdateProduct(message, data.message);
                                                    setTimeout(() => {
                                                        window.location.href = 'recapCart.php';
                                                    }, 2000);
                                                }
                                                if (data.status === 'error') {
                                                    displayErrorMessageFormUpdateProduct(message, data.message);
                                                }
                                            });
                                        }

                                    });
                                    const btnCloseDialog = document.getElementById("btnCloseDialog");
                                    btnCloseDialog.addEventListener('click', () => {
                                        dialogCompleteInfo.close();
                                        containerMessageCart.classList.remove('bg-overlay-quaternary-onion');
                                        dialogCompleteInfo.innerHTML = '';
                                    });
                                }
                            }
                            if (data.verify === false) {
                                window.location.href = 'recapCart.php';
                            }
                        });
                });
                const displayproductsInCart = document.getElementById("displayproductsInCart");
                for (const product of data.products) {
                    displayproductsInCart.innerHTML += `
                    <div class="flex xl:flex-row flex-col items-center justify-between px-5 py-3 border-[1px] border-[#a8b3cf33] bg-[#1c1f26] rounded-[14px] my-3">
                        <div class="flex xl:flex-row items-center w-10/12 justify-between pr-4">
                            <div class="flex flex-row items-center">
                                <img src="src/images/products/${product.img_product}" alt="${product.img_product}" class="h-12 rounded">
                                <p class="text-[#a8b3cf] ml-5">${product.name_product}</p>
                            </div>
                            <div class="flex flex-col items-center">
                                <p class="text-[#a8b3cf] text-2xl">${product.price_product} €</p>
                                <p class="text-[#a8b3cf] text-sm">Quantité :${product.quantity_product}</p>
                            </div>
                        </div>
                        <div id="actionOnProduct" class="flex justify-end space-x-2">
                            <form action="" method="POST" id="formModifyProduct_${product.id_product}" class="flex flex-row items-center space-x-2">
                                <input type="hidden" name="id_product" value="${product.id_product}">
                                <input type="number" name="quantity_product" id="quantity_product" class="bg-[#000] text-white p-3 rounded-lg w-[55px]" min="1" max="${product.quantite_product}" value="${product.quantity_product}">
                                <button class="bg-[#a87ee6] text-white px-5 py-3 rounded-lg font-bold" type="submit" id="modifyProduct_${product.id_product}" data-id-cat="${product.id_product}">
                                    Modifier
                                </button>
                            </form>
                            <button class="bg-[#a87ee6] text-white px-4 py-2 rounded-lg font-extrabold" id="deleteProduct_${product.id_product}" data-id-cat="${product.id_product}">
                                <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z" fill="currentcolor" fill-rule="evenodd"></path></svg>
                            </button>
                        </div>
                    </div>
                    `;
                }
                for ( const product of data.products) {
                    const btnDeleteProduct = document.querySelector(`#deleteProduct_${product.id_product}`);
                    btnDeleteProduct.addEventListener('click', async (ev) => {
                        ev.preventDefault();
                        await fetch(`src/php/fetch/cart/deleteProductFormCart.php?id_product=${product.id_product}`)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                if (data.status == 'success') {
                                    getCart();
                                    cartHeader();
                                    messagePopup('Votre produit a bien été supprimé', 'success');
                                }
                            });
                    });
                    const formModifyProduct = document.querySelector(`#formModifyProduct_${product.id_product}`);
                    formModifyProduct.addEventListener('submit', async (ev) => {
                        ev.preventDefault();
                        const formData = new FormData(formModifyProduct);
                        const quantity_product = formData.get('quantity_product');
                        await fetch(`src/php/fetch/cart/modifyProduct.php?id_product=${product.id_product}&quantity_product=${quantity_product}`)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                if (data.status == 'success') {
                                    getCart();
                                    cartHeader();
                                    messagePopup('Votre produit a bien été modifié', 'success');
                                }
                                if (data.status == 'error') {
                                    messagePopup('Quantité invalide', 'error');
                                }
                            });
                    });
                }
            }
            if (data.status == 'success_not_connected') {
                const total = data.total;
                const nbProduits = data.countProducts;
                containerCart.innerHTML = `
                    <div class="flex flex-col items-center space-y-2 w-full">
                        <div class="flex flex-row items-center justify-between w-9/12 text-white">
                            <div id="total_items_cart">
                                <p class="font-bold">Vous avez ${nbProduits} articles dans votre panier</p>
                            </div>
                            <div id="total_prix" class="bg-[#1c1f26]">
                                <p class="font-bold">Total : ${total} €</p>
                            </div>
                        </div>
                        <div id="displayproductsInCart" class="w-full xl:w-9/12"></div>
                    </div>
                    <div id="containerBtnLoginSigin" class="flex justify-center mt-6"></div>
                `;
                const displayproductsInCart = document.getElementById("displayproductsInCart");
                for (const product of data.products) {
                    displayproductsInCart.innerHTML += `
                    <div class="flex flex-row items-center justify-between px-5 py-3 border-b-[1px] border-[#e5e7eb]">
                        <div class="flex flex-row items-center">
                            <img src="src/images/products/${product.img_product}" alt="${product.img_product}" class="h-12 rounded-lg">
                            <p class="text-[#a8b3cf] ml-5">${product.name_product}</p>
                        </div>
                        <div class="flex flex-col items-center">
                            <p class="text-[#a8b3cf] text-2xl">${product.price_product} €</p>
                            <p class="text-[#a8b3cf] text-sm">Quantité :${product.quantity_product}</p>
                        </div>
                        <div id="actionOnProduct" class="flex justify-end space-x-2">
                            <form action="" method="POST" id="formModifyProduct_${product.id_product}" class="flex flex-row items-center space-x-0.5">
                                <input type="hidden" name="id_product" value="${product.id_product}">
                                <input type="number" name="quantity_product" id="quantity_product" class="bg-[#000] text-white p-2 rounded-lg w-[55px]" min="1" max="${product.quantite_product}" value="${product.quantity_product}">
                                <button class="bg-[#ce3df3] text-white px-5 py-2 rounded-lg font-bold" type="submit" id="modifyProduct_${product.id_product}" data-id-cat="${product.id_product}">
                                    Modifier
                                </button>
                            </form>
                            <button class="bg-[#e04337] text-white px-5 py-2 rounded-lg font-extrabold" id="deleteProduct_${product.id_product}" data-id-cat="${product.id_product}">Supprimer</button>
                        </div>
                    </div>
                    `;
                }
                for ( const product of data.products) {
                    const btnDeleteProduct = document.querySelector(`#deleteProduct_${product.id_product}`);
                    btnDeleteProduct.addEventListener('click', async (ev) => {
                        ev.preventDefault();
                        await fetch(`src/php/fetch/cart/deleteProductFormCart.php?id_product=${product.id_product}`)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                if (data.status == 'success') {
                                    getCart();
                                    cartHeader();
                                    messagePopup('Votre produit a bien été supprimé', 'success');
                                }
                            });
                    });
                    const formModifyProduct = document.querySelector(`#formModifyProduct_${product.id_product}`);
                    formModifyProduct.addEventListener('submit', async (ev) => {
                        ev.preventDefault();
                        const formData = new FormData(formModifyProduct);
                        const quantity_product = formData.get('quantity_product');
                        await fetch(`src/php/fetch/cart/modifyProduct.php?id_product=${product.id_product}&quantity_product=${quantity_product}`)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                if (data.status == 'success') {
                                    getCart();
                                    cartHeader();
                                    messagePopup('Votre produit a bien été modifié', 'success');
                                }
                                if (data.status == 'error') {
                                    messagePopup('Quantité invalide', 'error');
                                }
                            });
                    });
                }
                const containerBtnLogin = document.getElementById("containerBtnLoginSigin");
                if (total > 0) {
                    containerBtnLogin.innerHTML = `
                        <button class="bg-[#ce3df3] text-white px-5 py-2 rounded-lg font-bold" id="btnLoginCart">Connectez-vous</button>
                    `;
                    const btnLoginCart = document.getElementById("btnLoginCart");
                    btnLoginCart.addEventListener('click', () => {
                        Login(btnLoginCart)
                    });
                } else {
                    containerBtnLogin.innerHTML = `
                        <a href="login.php" class="bg-[#ce3df3] text-white px-5 py-2 rounded-lg font-bold">Se connecter</a>
                    `;
                }
            }
            if (data.status == 'error') {
                containerCart.innerHTML = `
                    <div class="flex flex-col items-center space-y-2 w-full">
                        <div class="flex flex-row items-center justify-between w-9/12">
                            <div id="total_items_cart">
                                <p class="text-[#a8b3cf]">Vous avez 0 articles dans votre panier</p>
                            </div>
                            <div id="total_prix">
                                <p class="text-[#a8b3cf]">Total : 0 €</p>
                            </div>
                        </div>
                        <div id="displayproductsInCart" class=" w-9/12">
                            <p class="text-[#a8b3cf]">Votre panier est vide</p>
                        </div>
                    </div>
                    <div id="containerBtnLoginSigin" class="flex justify-center space-x-4"></div>
                `;
                fetch ('src/php/fetch/client/isConnected.php')
                    .then(response => response.json())
                    .then(data => {
                        if (data.status == 'success') {
                            const containerBtnLogin = document.getElementById("containerBtnLoginSigin");
                            containerBtnLogin.innerHTML = `
                                <a href="catalogue.php" class="bg-[#ce3df3] text-white px-5 py-2 rounded-lg font-bold">Ajouter des produits</a>
                            `;
                        }
                        if (data.status == 'error') {
                            const containerBtnLogin = document.getElementById("containerBtnLoginSigin");
                            containerBtnLogin.innerHTML = `
                                <button class="bg-[#ce3df3] text-white px-5 py-2 rounded-lg font-bold" id="btnLoginCart">Se connecter</button>
                            `;
                        }
                    });
                const btnLoginCart = document.getElementById("btnLoginCart");
                if (btnLoginCart) {
                    btnLoginCart.addEventListener('click', (ev) => {
                        Login(btnLoginCart);
                    });
                }
            }
        });
}
async function similarProducts() {
    const containerSimilarProducts = document.getElementById("productSimilar");
    await fetch('src/php/fetch/produit/displayLastProduct.php')
        .then(response => response.json())
        .then(data => {
            for (let product of data.lastProduct) {
                containerSimilarProducts.innerHTML += `
                <div id="itemsProductContainer" class="w-60 flex justify-center mx-2">
                            <a href="produit.php?id=${product.id_product}">
                            <div id="wapperProduct" class="p-4">
                                <div id="itemsImgProduct">
                                    <div id="priceProduct" class="absolute mt-2 ml-2 rounded-full text-white bg-slate-900/90 w-fit p-1">
                                        <p>${product.price_product}€</p>
                                    </div>
                                    <img src="src/images/products/${product.img_product}" alt="${product.name_product}" class="rounded-lg h-fit lg:h-72">
                                </div>
                                <div id="TitleProduct" class="flex items-center w-full justify-between">
                                    <div id="containerTitleProduct" class="flex flex-col items-start">
                                        <p class="font-bold text-white">${product.name_product}</p>
                                        <p class="font-light text-[#a8b3cf]">${product.name_subcategories}</p>
                                    </div>
                                    <div id="containerButtonAddToCart">
                                        <form action="" method="post" id="formAddToCart_${product.id_product}">
                                            <input type="hidden" name="id_product" value="${product.id_product}">
                                            <input type="hidden" name="name_product" value="${product.name_product}">
                                            <button id="buttonAddToCart_${product.id_product}" class="text-white rounded-full" type="submit">
                                                <svg width="40" height="40" viewBox="0 0 24 24" stroke="#a87ee6" fill="none" stroke-linejoin="round" stroke-width="1.105263157894737" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M6.99999 12H12M12 12H17M12 12V6.99999M12 12V17M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z"></path></svg>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            </a>
                        </div>
                    `;
            }
        });
}

getCart();