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



function checkInput(input) {
    const small = input.nextElementSibling;
    if (input.value.trim() === '') {
        input.classList.add('input_error');
        small.innerHTML = `
    <div class="flex space-x-2">
        <svg width="20" height="20" viewBox="0 0 24 24" stroke="#ff0303" fill="none" stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M10.2202 4.4703C10.9637 3.02048 13.036 3.02048 13.7795 4.4703L20.5062 17.5874C21.1887 18.9183 20.2223 20.5 18.7266 20.5H5.27316C3.77747 20.5 2.81101 18.9183 3.49352 17.5874L10.2202 4.4703Z"></path><path d="M11.5191 13.3173L10.5493 9.92306C10.274 8.95934 10.9976 8.00001 11.9999 8.00001C13.0021 8.00001 13.7258 8.95934 13.4504 9.92306L12.4806 13.3173C12.3425 13.8009 11.6573 13.8009 11.5191 13.3173Z"></path><path d="M12.9999 17C12.9999 17.5523 12.5522 18 11.9999 18C11.4476 18 10.9999 17.5523 10.9999 17C10.9999 16.4477 11.4476 16 11.9999 16C12.5522 16 12.9999 16.4477 12.9999 17Z"></path></svg>
        <p class="text-red-500">Champ Requis</p>
    </div>
    `;
        return false;
    } else {
        input.classList.remove('input_error');
        small.innerHTML = '';
        return true;
    }
}
// Recap JS
// Recapitulatif de la commande

async function diplayShippingInfo() {
    const containerShippingInfo = document.getElementById("containerInfoShipping");
    await fetch('src/php/fetch/cart/recapShipping.php')
        .then(response => response.json())
        .then(data => {
            containerShippingInfo.innerHTML = '';
            if (data.status == true) {
                for (let info of data.info) {
                    containerShippingInfo.innerHTML += `
                    <div id="containerCoordonnées" class="rounded-[14px] bg-[#1a1f25] hover:bg-[#21262D] border-[1px] border-[#a8b3cf33]">
                        <div class="border-[1px] rounded-t-[14px] border-b-[#a8b3cf33] border-t-transparent border-x-transparent bg-[#a87ee6]">
                            <p class="text-white text-lg p-2">Vos coordonnées</p>
                        </div>
                        <div class="flex flex-row">
                            <div class="flex flex-col items-start space-y-2 w-1/2 p-2">
                                <div>
                                    <p class="text-[#a87ee6] font-semibold">Votre adresse de livraison</p>
                                </div>
                                <div>
                                    <p class="text-[#a8b3cf] text-sm font-meduim">${info.nom_client} ${info.prenom_client}</p>
                                    <p class="text-[#a8b3cf] text-sm">${info.adresse_client}</p>
                                    <p class="text-[#a8b3cf] text-sm">${info.code_postal_client} ${info.ville_client}</p>
                                    <p class="text-[#a8b3cf] text-sm">${info.pays_client}</p>
                                </div>
                            </div>
                            <div class="flex flex-col items-start space-y-2 w-1/2 p-2">
                                <div>
                                    <p class="text-[#a87ee6] font-semibold">Votre adresse de facturation</p>
                                </div>
                                <div>
                                    <p class="text-[#a8b3cf] text-sm">${info.adresse_client}</p>
                                    <p class="text-[#a8b3cf] text-sm">${info.code_postal_client} ${info.ville_client}</p>
                                    <p class="text-[#a8b3cf] text-sm">${info.pays_client}</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    `;
                }
            }
        });
}

async function recapCart() {
    const containerRecap = document.getElementById("containerCart");
    await fetch('src/php/fetch/cart/getCart.php')
        .then(response => response.json())
        .then(data => {
            containerRecap.innerHTML = '';
                if (data.status == 'success_connected') {
                    const total = data.total;
                    const nbProduits = data.countProducts;
                    containerRecap.innerHTML = `
                    <div class="">
                        <h2 class="text-white font-semibold text-2xl">Récapitulatif de votre commmande</h2>
                    </div>
                    <div class="flex flex-col items-center space-y-2 w-full">
                        <div class="flex flex-row items-center justify-between w-full">
                            <div id="total_items_cart">
                                <p class="text-[#a8b3cf]">Vous avez ${nbProduits} articles dans votre panier</p>
                            </div>
                        </div>
                        <div id="displayproductsInCart" class="w-full"></div>
                        <div id="containerTotalCart" class="flex items-center justify-between w-full">
                            <div>
                                <button type="button" class="bg-[#a87ee6] text-white font-semibold bg-[#1a1f25] hover:bg-[#21262D] py-6 px-4 rounded-[14px]">
                                    <a href="cart.php" class="flex items-center space-x-2">
                                        <svg width="32" height="32" viewBox="0 0 24 24" stroke="#a8b3cf" fill="none" stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M18 12H6M6 12L10 8M6 12L10 16"></path></svg>
                                        Retour au panier
                                    </a>
                                </button>
                            </div>
                            <div>
                                <div class="bg-[#a87ee6] text-white font-semibold bg-[#1a1f25] hover:bg-[#21262D] py-[1.65rem] px-4 rounded-[14px]">
                                <p class="flex items-center space-x-2">
                                        <span class="text-[#a8b3cf]">Total :</span>
                                        <span id="totalCart" class="text-white font-extrabold">${total} €</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                    const displayproductsInCart = document.getElementById("displayproductsInCart");
                    for (const product of data.products) {
                        displayproductsInCart.innerHTML += `
                    <div class="flex flex-row items-center justify-between px-5 py-3 my-2 rounded-[14px] bg-[#1a1f25] hover:bg-[#21262D]">
                        <div class="flex flex-row items-center">
                            <img src="src/images/products/${product.img_product}" alt="${product.img_product}" class="h-12 rounded-lg">
                            <p class="text-[#a8b3cf] ml-5">${product.name_product}</p>
                        </div>
                        <div class="flex flex-col items-center">
                            <p class="text-[#a8b3cf] text-2xl">${product.price_product} €</p>
                            <p class="text-[#a8b3cf] text-sm">Quantité :${product.quantity_product}</p>
                        </div>
                    </div>
                    `;
                    }
                }
        });
}
async function cardDetail() {
    const containerPayment = document.getElementById("containerPayment");
    containerPayment.innerHTML = `
    <div class="flex flex-col items-start space-y-2 p-3 rounded-l-[14px] bg-[#a87ee6] h-full">
        <h2 class="text-white font-semibold text-2xl">Paiment</h2>
        <h6 class="text-slate-200">Choisissez votre mode de paiement</h6>
        <form action="" method="post" class="flex flex-col justify-around h-3/4" id="formPayerCart">
            <div class="flex justify-around">
                <div>
                    <label for="visa">
                        <svg width="1em" height="1em" id="Payment_Icons" data-name="Payment Icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38" class="w-14 h-12 pointer-events-none svg_card"><title>visa-outline</title><path d="M33,8a4,4,0,0,1,4,4V26a4,4,0,0,1-4,4H5a4,4,0,0,1-4-4V12A4,4,0,0,1,5,8H33m0-1H5a5,5,0,0,0-5,5V26a5,5,0,0,0,5,5H33a5,5,0,0,0,5-5V12a5,5,0,0,0-5-5Z"/><path d="M15.76,15.56l-2.87,6.89H11L9.61,17a.75.75,0,0,0-.42-.61,7.69,7.69,0,0,0-1.74-.59l0-.2h3a.84.84,0,0,1,.82.71l.74,4,1.84-4.69Zm7.33,4.64c0-1.81-2.5-1.91-2.48-2.73,0-.24.24-.51.75-.57a3.32,3.32,0,0,1,1.75.3l.31-1.46a4.93,4.93,0,0,0-1.66-.3c-1.75,0-3,.93-3,2.28,0,1,.88,1.54,1.55,1.87s.92.56.92.86c0,.46-.55.66-1.06.67a3.66,3.66,0,0,1-1.82-.43L18,22.2a5.41,5.41,0,0,0,2,.36c1.86,0,3.07-.92,3.08-2.36m4.62,2.25h1.63l-1.42-6.89H26.41a.82.82,0,0,0-.76.51L23,22.45h1.86l.36-1h2.27Zm-2-2.44.94-2.58L27.2,20Zm-7.44-4.45-1.46,6.89H15.06l1.46-6.89Z"/></svg>
                        <input type="radio" name="visa" id="visa" value="visa"  style="display: none;">
                    </label>
                </div>
                <div>
                    <label for="paypal">
                        <svg width="1em" height="1em" id="Payment_Icons" data-name="Payment Icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38" class="w-14 h-12 pointer-events-none svg_card"><title>paypal-outline</title><path d="M33,8a4,4,0,0,1,4,4V26a4,4,0,0,1-4,4H5a4,4,0,0,1-4-4V12A4,4,0,0,1,5,8H33m0-1H5a5,5,0,0,0-5,5V26a5,5,0,0,0,5,5H33a5,5,0,0,0,5-5V12a5,5,0,0,0-5-5Z"/><path d="M10.42,16a1.88,1.88,0,0,0-1.5-.53H6.85a.28.28,0,0,0-.28.24L5.73,21a.18.18,0,0,0,.17.2h1A.28.28,0,0,0,7.17,21l.23-1.44a.28.28,0,0,1,.28-.24h.65a2.12,2.12,0,0,0,2.35-2A1.58,1.58,0,0,0,10.42,16ZM9.15,17.39c-.11.74-.68.74-1.22.74H7.62l.21-1.39A.18.18,0,0,1,8,16.59h.15c.37,0,.72,0,.9.22A.68.68,0,0,1,9.15,17.39Zm5.94,0h-1a.16.16,0,0,0-.17.15l0,.28-.07-.1a1.37,1.37,0,0,0-1.16-.42,2.27,2.27,0,0,0-2.21,2,1.91,1.91,0,0,0,.37,1.53,1.53,1.53,0,0,0,1.24.51,1.89,1.89,0,0,0,1.37-.57l0,.27a.17.17,0,0,0,.17.2h.89a.28.28,0,0,0,.28-.24l.53-3.41A.17.17,0,0,0,15.09,17.36ZM13.71,19.3a1.11,1.11,0,0,1-1.12.95.82.82,0,0,1-.66-.27.86.86,0,0,1-.16-.7,1.12,1.12,0,0,1,1.11-1,.83.83,0,0,1,.66.28A.86.86,0,0,1,13.71,19.3Zm6.64-1.94h-1a.28.28,0,0,0-.24.13l-1.37,2-.58-1.95a.3.3,0,0,0-.28-.21h-1a.18.18,0,0,0-.17.23l1.1,3.24-1,1.46a.17.17,0,0,0,.14.27h1a.29.29,0,0,0,.24-.12l3.3-4.81A.17.17,0,0,0,20.35,17.36ZM25.14,16a1.88,1.88,0,0,0-1.5-.53H21.57a.28.28,0,0,0-.28.24L20.46,21a.17.17,0,0,0,.17.2h1.06a.19.19,0,0,0,.19-.17l.24-1.51a.28.28,0,0,1,.28-.24h.66a2.13,2.13,0,0,0,2.35-2A1.61,1.61,0,0,0,25.14,16Zm-1.26,1.42c-.12.74-.68.74-1.23.74h-.31l.22-1.39a.16.16,0,0,1,.17-.15h.14c.37,0,.73,0,.91.22A.68.68,0,0,1,23.88,17.39Zm5.93,0h-1a.17.17,0,0,0-.17.15l0,.28-.07-.1a1.39,1.39,0,0,0-1.17-.42,2.29,2.29,0,0,0-2.21,2,1.91,1.91,0,0,0,.37,1.53,1.54,1.54,0,0,0,1.25.51,1.89,1.89,0,0,0,1.37-.57l0,.27a.17.17,0,0,0,.17.2h.89a.28.28,0,0,0,.28-.24L30,17.56A.18.18,0,0,0,29.81,17.36ZM28.43,19.3a1.09,1.09,0,0,1-1.11.95.83.83,0,0,1-.67-.27.85.85,0,0,1-.15-.7,1.11,1.11,0,0,1,1.1-1,.8.8,0,0,1,.83,1Zm3.67-3.86h-1a.18.18,0,0,0-.17.14L30.13,21a.17.17,0,0,0,.17.2h.85a.28.28,0,0,0,.28-.24l.84-5.33A.18.18,0,0,0,32.1,15.44Z"/></svg>
                        <input type="radio" name="paypal" id="paypal" value="paypal"  style="display: none;">
                    </label>
                </div>
                <div>
                    <label for="mastercard">
                        <input type="radio" name="mastercard" id="mastercard" value="mastercard"  style="display: none;">
                        <svg width="1em" height="1em" id="Payment_Icons" data-name="Payment Icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38" class="w-14 h-12 pointer-events-none svg_card"><title>mastercard-outline</title><path d="M33,8a4,4,0,0,1,4,4V26a4,4,0,0,1-4,4H5a4,4,0,0,1-4-4V12A4,4,0,0,1,5,8H33m0-1H5a5,5,0,0,0-5,5V26a5,5,0,0,0,5,5H33a5,5,0,0,0,5-5V12a5,5,0,0,0-5-5Z"/><path d="M18.11,15.08a4.75,4.75,0,1,0,0,7.84,5.93,5.93,0,0,1,0-7.84Z"/><circle cx="22.56" cy="19" r="4.75"/></svg><title>paypal-outline</title><path d="M33,8a4,4,0,0,1,4,4V26a4,4,0,0,1-4,4H5a4,4,0,0,1-4-4V12A4,4,0,0,1,5,8H33m0-1H5a5,5,0,0,0-5,5V26a5,5,0,0,0,5,5H33a5,5,0,0,0,5-5V12a5,5,0,0,0-5-5Z"/><path d="M10.42,16a1.88,1.88,0,0,0-1.5-.53H6.85a.28.28,0,0,0-.28.24L5.73,21a.18.18,0,0,0,.17.2h1A.28.28,0,0,0,7.17,21l.23-1.44a.28.28,0,0,1,.28-.24h.65a2.12,2.12,0,0,0,2.35-2A1.58,1.58,0,0,0,10.42,16ZM9.15,17.39c-.11.74-.68.74-1.22.74H7.62l.21-1.39A.18.18,0,0,1,8,16.59h.15c.37,0,.72,0,.9.22A.68.68,0,0,1,9.15,17.39Zm5.94,0h-1a.16.16,0,0,0-.17.15l0,.28-.07-.1a1.37,1.37,0,0,0-1.16-.42,2.27,2.27,0,0,0-2.21,2,1.91,1.91,0,0,0,.37,1.53,1.53,1.53,0,0,0,1.24.51,1.89,1.89,0,0,0,1.37-.57l0,.27a.17.17,0,0,0,.17.2h.89a.28.28,0,0,0,.28-.24l.53-3.41A.17.17,0,0,0,15.09,17.36ZM13.71,19.3a1.11,1.11,0,0,1-1.12.95.82.82,0,0,1-.66-.27.86.86,0,0,1-.16-.7,1.12,1.12,0,0,1,1.11-1,.83.83,0,0,1,.66.28A.86.86,0,0,1,13.71,19.3Zm6.64-1.94h-1a.28.28,0,0,0-.24.13l-1.37,2-.58-1.95a.3.3,0,0,0-.28-.21h-1a.18.18,0,0,0-.17.23l1.1,3.24-1,1.46a.17.17,0,0,0,.14.27h1a.29.29,0,0,0,.24-.12l3.3-4.81A.17.17,0,0,0,20.35,17.36ZM25.14,16a1.88,1.88,0,0,0-1.5-.53H21.57a.28.28,0,0,0-.28.24L20.46,21a.17.17,0,0,0,.17.2h1.06a.19.19,0,0,0,.19-.17l.24-1.51a.28.28,0,0,1,.28-.24h.66a2.13,2.13,0,0,0,2.35-2A1.61,1.61,0,0,0,25.14,16Zm-1.26,1.42c-.12.74-.68.74-1.23.74h-.31l.22-1.39a.16.16,0,0,1,.17-.15h.14c.37,0,.73,0,.91.22A.68.68,0,0,1,23.88,17.39Zm5.93,0h-1a.17.17,0,0,0-.17.15l0,.28-.07-.1a1.39,1.39,0,0,0-1.17-.42,2.29,2.29,0,0,0-2.21,2,1.91,1.91,0,0,0,.37,1.53,1.54,1.54,0,0,0,1.25.51,1.89,1.89,0,0,0,1.37-.57l0,.27a.17.17,0,0,0,.17.2h.89a.28.28,0,0,0,.28-.24L30,17.56A.18.18,0,0,0,29.81,17.36ZM28.43,19.3a1.09,1.09,0,0,1-1.11.95.83.83,0,0,1-.67-.27.85.85,0,0,1-.15-.7,1.11,1.11,0,0,1,1.1-1,.8.8,0,0,1,.83,1Zm3.67-3.86h-1a.18.18,0,0,0-.17.14L30.13,21a.17.17,0,0,0,.17.2h.85a.28.28,0,0,0,.28-.24l.84-5.33A.18.18,0,0,0,32.1,15.44Z"/></svg>
                    </label>
                </div>
            </div>
            <div>
                <input type="text" name="cardOwner" id="cardOwner" placeholder="Titulaire de la carte" class="w-full p-2 bg-transparent border-b-2 border-b-white text-white placeholder-white">
            </div>
            <div>
                <input type="number" name="cardNumber" id="cardNumber" placeholder="Numéro de carte"  class="w-full p-2 bg-transparent border-b-2 border-b-white text-white placeholder-white">
            </div>
            <div class="flex space-x-2">
                <div class="flex flex-col w-1/2">
                    <label for="cardDate" class="text-white">Date d'expiration</label>
                    <input type="date" name="cardDate" id="cardDate" class="p-2 bg-transparent border-b-2 border-b-white text-white placeholder-white">
                </div>
                <div class="flex flex-col w-1/2">
                    <label for="cardCvc" class="text-white">CVC</label>
                    <input type="number" name="cardCvc" id="cardCvc" placeholder="CVC" class="p-2 bg-transparent border-b-2 border-b-white text-white placeholder-white">
                </div>
            </div>
            <div class="flex justify-start py-4">
                <button type="submit" class="bg-slate-800/10 text-white font-extrabold py-4 p-2 rounded-md w-full uppercase">Payer</button>
            </div>
        </form>
    </div>
    `;
    const form = document.getElementById('formPayerCart');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const containerMessageCart = document.getElementById('containerMessageCart');
        const dialog = document.createElement('dialog');
        dialog.className = 'rounded-[14px] text-white w-full max-w-[800px]';
        dialog.setAttribute('id', 'dialog');
        dialog.setAttribute('open', 'true');
        containerMessageCart.appendChild(dialog);
        dialog.innerHTML = `
        <div class="flex flex-col space-y-2 px-8 py-2 bg-[#1a1f25] hover:bg-[#21262D] border-2 border-white rounded-[14px]">
            <div class="flex justify-end">
                <button class="p-4" id="closeDialog">
                    <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z" fill="currentcolor" fill-rule="evenodd"></path></svg>
                </button>
            </div>
            <div id="containerDialog"></div>
        </div>
        `;
        fetch('src/php/fetch/order/insertOrder.php')
        .then(response => response.json())
        .then(data => {
            const containerDialog = document.getElementById('containerDialog');
                if(data.status == 'success') {
                    containerDialog.innerHTML = `
                    <div class="flex flex-col space-y-2 items-center mb-4">
                        <div id="animation-container" data-animation-path="public/images/iconAnim/icons8-ok.json" class="h-40"></div>
                        <h1 class="text-2xl font-bold">Commande effectuée avec succès</h1>
                        <p class="text-sm">Veuillez patienter pendant que nous traitons votre commande</p>
                        <p class="text-lg">Vous pouvez consulter votre commande depuis votre <a href="profil.php" class="underline decoration-1">page profil</a></p>
                    </div>
                    `;
                }
                if (data.status == 'error') {
                    containerDialog.innerHTML = `
                    <div class="flex flex-col space-y-2">
                        <h1 class="text-2xl font-bold">Une erreur est survenue</h1>
                    </div>
                    `;
                }
        })
        const closeDialog = document.getElementById('closeDialog');
        closeDialog.addEventListener('click', () => {
            dialog.close();
            dialog.remove();
            dialog.innerHTML = '';
        });
    });
}


recapCart();
diplayShippingInfo();
cardDetail();