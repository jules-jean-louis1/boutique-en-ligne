import { loginFormHeader} from './function/function.js';
import {registerHeader} from './function/function.js';
import {formatDateSansh} from "./function/function.js";
import { displaySuccessMessageFormUpdateProduct } from './function/function.js';
import { displayErrorMessageFormUpdateProduct } from './function/function.js';
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
    loginFormHeader(btnLogin);
}


// Cart.js

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
// Récupérer les données du produit
async function cartHeader() {
    const cartButtonHeader = document.getElementById("cartHeader");
    const notifCartHeader = document.getElementById("notifCartHeader");
    await fetch('src/php/fetch/cart/displayCartInfoHeader.php')
        .then(response => response.json())
        .then(data => {
            if (data.status == 'success_not_connected' || data.status == 'success_connected') {
                const total = data.total;
                const nbProduits = data.countProducts;
                notifCartHeader.innerHTML = `
                    <p class="absolute rounded-full bg-purple-500 px-1">
                        <span class="text-white text-xs">${nbProduits}</span>
                    </p>
                `;

                let cartDivHeader = document.getElementById("cartDivHeader");
                if (!cartDivHeader) {
                    cartDivHeader = document.createElement("dialog");
                    cartDivHeader.setAttribute('class', 'fixed top-10 left-1/2 lg:left-1/5 transform -translate-x-1/5 lg:-translate-x-1/2 z-50 bg-white w-80 rounded-lg shadow-lg');
                    cartDivHeader.setAttribute('id', 'cartDivHeader');
                    cartButtonHeader.appendChild(cartDivHeader);
                }

                cartButtonHeader.addEventListener('mouseenter', () => {
                    cartDivHeader.setAttribute('open', '');
                    cartDivHeader.innerHTML = `
                        <div class="flex flex-col items-center space-y-2">
                            <div class="mt-2">
                                <p class="text-gray-500">Total : ${total} €</p>
                            </div>
                            <div id="containerCartHeader"></div>
                            <div class="h-10 flex items-center justify-center pb-2">
                                <a href="cart.php" class="bg-purple-500 text-white px-5 py-2 rounded-lg">Voir le panier</a>
                            </div>
                        </div>
                    `;
                    const containerCartHeader = document.getElementById("containerCartHeader");
                    containerCartHeader.innerHTML = '';
                    for (const product of data.products) {
                        containerCartHeader.innerHTML += `
                            <div class="flex flex-row justify-between px-5 py-3 border-b border-gray-200">
                                <div class="flex flex-row items-center">
                                    <img src="src/images/products/${product.img_product}" alt="${product.img_product}" class="h-12 rounded-lg">
                                    <p class="text-gray-500 ml-5">${product.name_product}</p>
                                </div>
                                <div class="flex flex-col items-start">
                                    <p class="text-gray-500 text-2xl">${product.price_product} €</p>
                                    <p class="text-gray-500 text-sm">Quantité :${product.quantity_product}</p>
                                </div>
                            </div>
                        `;
                    }
                });
                cartButtonHeader.addEventListener('mouseleave', () => {
                    cartDivHeader.removeAttribute('open');
                });
            }
            if (data.status == 'error') {
                notifCartHeader.innerHTML = '';
            }
        });
}



cartHeader();




// Page cart.php
async function getCart() {
    const containerCart = document.getElementById("containerCart");
    await fetch('src/php/fetch/cart/getCart.php')
        .then(response => response.json())
        .then(data => {
            containerCart.innerHTML = '';
            if (data.status == 'success_connected') {
                const total = data.total;
                const nbProduits = data.countProducts;
                containerCart.innerHTML = `
                    <div class="flex flex-col items-center space-y-2 w-full">
                        <div class="flex flex-row items-center justify-between w-9/12">
                            <div id="total_items_cart">
                                <p class="text-[#a8b3cf]">Vous avez ${nbProduits} articles dans votre panier</p>
                            </div>
                            <div id="total_prix">
                                <p class="text-[#a8b3cf]">Total : ${total} €</p>
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
                const btnVerifyInfoUsers = document.getElementById("btnVerifyInfoUsers");
                btnVerifyInfoUsers.addEventListener('click', async () => {
                    await fetch('src/php/fetch/client/verifyInfoUsers.php')
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            if (data.verify === true) {
                                const containerMessageCart = document.getElementById("containerMessageCart");
                                const dialogCompleteInfo = document.createElement("dialog");
                                dialogCompleteInfo.setAttribute('id', 'dialog');
                                dialogCompleteInfo.className = 'bg-white w-[80%] rounded-lg shadow-lg p-2';
                                containerMessageCart.appendChild(dialogCompleteInfo);
                                dialogCompleteInfo.showModal();
                                dialogCompleteInfo.innerHTML = '';
                                for (let info of data.info) {
                                    dialogCompleteInfo.innerHTML += `
                                    <div class="flex flex-col items-center space-y-2">
                                        <div class="mt-2 flex flex-row justify-between items-center w-full px-4">
                                            <p class="text-[#a8b3cf]">Veuillez renseigner votre profil.</p>
                                            <button id="btnCloseDialog" class="p-2 hover:bg-slate-100 rounded-lg">
                                                <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none reply_svg"><path d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z" fill="currentcolor" fill-rule="evenodd"></path></svg>
                                            </button>
                                        </div>
                                        <div class="flex flex-row items-center justify-between w-9/12">
                                            <form action="" method="post" id="formCompleteInfo" class="flex flex-col space-y-2">
                                                <div class="flex flex-row space-x-4">
                                                    <div>
                                                        <label for="nom_client">Nom</label>
                                                        <input type="text" value="${info.nom_client}" name="nom_client" placeholder="Votre Nom" class="p-2 rounded-[14px] bg-slate-100">
                                                        <small id="errorSmall" class="text-red-500"></small>
                                                    </div>
                                                    <div>
                                                        <label for="prenom_client">Prénom</label>
                                                        <input type="text" value="${info.prenom_client}" name="prenom_client" placeholder="Votre Prénom" class="p-2 rounded-[14px] bg-slate-100">
                                                        <small id="errorSmall" class="text-red-500"></small>
                                                    </div>
                                                </div>
                                                <div class="flex flex-row space-x-4">
                                                    <div>
                                                        <label for="mobile_client">Tel. mobile (optionel)</label>
                                                        <input type="text" value="${info.mobile_client}" placeholder="Votre mobile" name="mobile_client" class="p-2 rounded-[14px] bg-slate-100">
                                                        <small id="errorSmall" class="text-red-500"></small>
                                                    </div>
                                                    <div>
                                                        <label for="pays_client">Pays</label>
                                                        <input type="text" value="${info.pays_client}" placeholder="Votre Pays" name="pays_client" class="p-2 rounded-[14px] bg-slate-100">
                                                        <small id="errorSmall" class="text-red-500"></small>
                                                    </div>
                                                </div>
                                                <div class="flex flex-col w-full">
                                                    <label for="adresse_client">Adresse</label>
                                                    <input type="text" value="${info.adresse_client}" placeholder="Votre Adresse" name="adresse_client" class="p-2 rounded-[14px] bg-slate-100">
                                                    <small id="errorSmall" class="text-red-500"></small>
                                                </div>
                                                <div class="flex flex-row space-x-4">
                                                    <div>
                                                        <label for="ville_client">Ville</label>
                                                        <input type="text" value="${info.ville_client}" placeholder="Votre Ville" name="ville_client" class="p-2 rounded-[14px] bg-slate-100">
                                                        <small id="errorSmall" class="text-red-500"></small>
                                                    </div>
                                                    <div>
                                                        <label for="code_postal_client">Code Postal</label>
                                                        <input type="text" value="${info.code_postal_client}" placeholder="Votre Code Postal" name="code_postal_client" class="p-2 rounded-[14px] bg-slate-100">
                                                        <small id="errorSmall" class="text-red-500"></small>
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

                                    nom_client_input.addEventListener('input', () => { checkInput(nom_client_input) });
                                    prenom_client_input.addEventListener('input', () => { checkInput(prenom_client_input) });
                                    pays_client_input.addEventListener('input', () => { checkInput(pays_client_input) });
                                    ville_client_input.addEventListener('input', () => { checkInput(ville_client_input) });
                                    adresse_client_input.addEventListener('input', () => { checkInput(adresse_client_input) });
                                    code_postal_client_input.addEventListener('input', () => { checkInput(code_postal_client_input) });

                                    const btnUpdateInfo = document.getElementById("formCompleteInfo");
                                    btnUpdateInfo.addEventListener('submit', async (ev) => {
                                        ev.preventDefault();
                                        const message = document.getElementById("errorMsg");
                                        if (checkInput(nom_client_input) === false && checkInput(prenom_client_input)  === false && checkInput(pays_client_input) === false && checkInput(adresse_client_input) === false && checkInput(code_postal_client_input) === false && checkInput(ville_client_input) === false) {
                                            message.innerHTML = `<p class="text-red-500">Veuillez remplir tous les champs</p>`;
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
            }
            if (data.status == 'success_not_connected') {
                const total = data.total;
                const nbProduits = data.countProducts;
                containerCart.innerHTML = `
                    <div class="flex flex-col items-center space-y-2 w-full">
                        <div class="flex flex-row items-center justify-between w-9/12">
                            <div id="total_items_cart">
                                <p class="text-[#a8b3cf]">Vous avez ${nbProduits} articles dans votre panier</p>
                            </div>
                            <div id="total_prix">
                                <p class="text-[#a8b3cf]">Total : ${total} €</p>
                            </div>
                        </div>
                        <div id="displayproductsInCart" class="w-9/12"></div>
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
                        loginFormHeader(btnLoginCart)
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
                                <button class="bg-[#e04337] text-white px-5 py-2 rounded-lg font-extrabold" id="btnSigninCart">S'inscrire</button>
                            `;
                        }
                    });
                const btnLoginCart = document.getElementById("btnLoginCart");
                if (btnLoginCart) {
                    btnLoginCart.addEventListener('click', (ev) => {
                        loginFormHeader(btnLoginCart);
                    });
                }
                const btnSigninCart = document.getElementById("btnSigninCart");
                if (btnSigninCart) {
                    btnSigninCart.addEventListener('click', (ev) => {
                        registerHeader(btnSigninCart);
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