import {displayErrorMessageFormUpdateProduct, loginFormHeader} from './function/function.js';
import {registerHeader} from './function/function.js';
import {formatDateSansh} from "./function/function.js";
import { displaySuccessMessageFormUpdateProduct } from './function/function.js';

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


// Produit.js
// Récupérer les elements du DOM
const containerDivProduct = document.getElementById("containerInformationProduits");
// Récupérer l'ID à partir de la query string
const searchParams = new URLSearchParams(window.location.search);
const URLid = searchParams.get("id");

// Afficher les étoiles
function afficherEtoiles(note) {
    let nbEtoiles = 5;
    let str = "";
    for (let i = 1; i <= nbEtoiles; i++) {
        if (i <= note) {
            str += "<i class='fas fa-star'></i>"; // étoile pleine
        } else {
            str += "<i class='far fa-star'></i>"; // étoile vide
        }
    }
    return str;
}

// Récupérer les données du produit
async function getProduct(URLid) {
    const containerProduct = document.createElement("div");
    containerProduct.classList.add("flex", "flex-col", "items-center", "justify-center");
    containerProduct.setAttribute("id", "containerProduct");
    containerDivProduct.appendChild(containerProduct);
    await fetch(`src/php/fetch/produit/getProductById.php?id=${URLid}`)
        .then(response => response.json())
        .then(data => {
            let options = '';
            for (let i = 1; i <= 10; i++) {
                options += `<option value="${i}">${i}</option>`;
            }
            const containerProduct = document.getElementById("containerProduct");
            for (const product of data.data) {
                containerProduct.innerHTML = `
            <div class="lg:w-9/12 w-11/12 border-[1px] border-[#a8b3cf33] rounded-lg">
                <div class="bg-[#A87EE6FF] h-96 absolute lg:w-9/12 lg:h-2/5 flex justify-center -z-50 rounded-t-lg"></div>
                <div class="flex lg:flex-row sm:flex-col sm:items-center justify-between px-16 py-6">
                    <div>
                        <img src="src/images/products/${product.img_product}" alt="${product.img_product}" class="lg:h-[30%] rounded-lg">
                    </div>
                    <div class="flex flex-col items-start lg:w-5/12 sm:w-[95%]">
                        <p class="text-center text-white rounded-lg p-1 bg-[#00000038]">${product.name_subcategories}</p>
                        <h1 class="text-6xl text-white mt-5 uppercase font-bold">${product.name_product}</h1>
                        <p class="text-[#a8b3cf] mt-5">${afficherEtoiles(product.rating_product)}</p>
                        <p class="mt-5">Synopsis : ${product.description_product}</p>
                        <div>
                            <p class="text-[#A87EE6FF] mt-2 font-bold text-6xl">${product.price_product} €</p>
                            <div id="containerFormAddProductToCart">
                                <form action="" method="post" id="formAddToCart">
                                    <input type="hidden" name="id" value="${product.id_product}">
                                    <input type="hidden" name="name" value="${product.name_product}">
                                    <select name="quantity" id="quantity" class="bg-[#2D323C] text-white px-5 py-2 rounded-lg mt-5">
                                        ${options}
                                    </select>
                                    <button type="submit" class="bg-[#A87EE6FF] text-white px-5 py-2 rounded-lg mt-5" id="buttonAddToCart">Ajouter au panier</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        <div class="">
                            <p class="text-[#a8b3cf]">Sortie le :</p>
                            <p class="text-[#a8b3cf] mt-2">${formatDateSansh(product.released_date_product)}</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
                let optionsDisponible = '';
                if (data.data.dispo_product === '1') {
                    optionsDisponible = `<button class="bg-[#A87EE6FF] text-white rounded-lg px-4 py-2" disabled>Ce produit n'est plus disponible</button>`;
                    containerProduct.innerHTML = optionsDisponible;
                }

                const titlePageProduct = document.querySelector("title");
                titlePageProduct.innerHTML = `${product.name_product}`;
                // Ajouter au panier
                const formAddToCart = document.getElementById("formAddToCart");
                formAddToCart.addEventListener('submit', (ev) => {
                    ev.preventDefault();
                    const id = formAddToCart.querySelector('[name="id"]').value;
                    const quantity = formAddToCart.querySelector('[name="quantity"]').value;
                    const name = formAddToCart.querySelector('[name="name"]').value;
                    addToCart(id, quantity, name);
                });
            }
            async function addToCart(id, quantity, name) {
                await fetch(`src/php/fetch/cart/addProductToCart.php?id=${id}&quantity=${quantity}&name=${name}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status == 'success') {
                            const diaog = document.createElement("dialog");
                            diaog.setAttribute('class','fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-transparent');
                            diaog.setAttribute('open', '');
                            diaog.innerHTML = `
                            <div class="flex items-center py-3 px-2 rounded-lg bg-[#DFF2BF] text-[#270] border-l-[3px] border-[#270]">
                                <img src="public/images/icones/succes-circle-green-stroke-2.svg" alt="" class="w-5 h-5">
                                <small class="text-lg">Produit ajouté au panier</small>
                            </div>
                            `;
                            containerMessageCart.appendChild(diaog);
                            setTimeout(() => {
                                containerMessageCart.innerHTML = '';
                            }, 2500);
                            cartHeader();
                        }
                    });
            }
        });
}
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
                cartDivHeader.setAttribute('id', 'cartDivHeader');

                cartDivHeader.innerHTML = '';
                cartButtonHeader.addEventListener('mouseenter', () => {
                    cartDivHeader.setAttribute('open', '');
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
                    cartDivHeader.innerHTML = '';
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
                cartDivHeader.setAttribute('id', 'cartDivHeader');

                cartButtonHeader.addEventListener('mouseenter', () => {
                    cartDivHeader.setAttribute('open', '');
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
                    cartDivHeader.innerHTML = '';
                });
            }
            if (data.status == 'error') {
                notifCartHeader.innerHTML = '';
                const cartDivHeader = document.createElement("dialog");
                cartDivHeader.setAttribute('class', 'absolute top-[17%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white w-80 rounded-lg shadow-lg');
                cartDivHeader.setAttribute('id', 'cartDivHeader');

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
                    cartDivHeader.innerHTML = '';
                });
            }
        });
}
async function Avis(){
    await fetch('src/php/fetch/client/isConnected.php')
    .then(response => response.json())
    .then(data => {
        const containerAddAvis = document.getElementById('containerAddAvis');
        if (data.status == 'error') {
            containerAddAvis.innerHTML = `
            <div class="flex flex-col items-center justify-center space-y-2">
                <button class="bg-[#A87EE6FF] text-white px-5 py-2 rounded-lg" id="buttonAddAvis">Vous devez être connecté pour ajouter un avis</button>
            </div>
            `;
            const buttonAddAvis = document.getElementById('buttonAddAvis');
            buttonAddAvis.addEventListener('click', (ev) => {
                ev.preventDefault();
                loginFormHeader(buttonAddAvis);
            });
        }
        if (data.status == 'success') {
            containerAddAvis.innerHTML = `
            <div class="flex flex-col items-center justify-center space-y-2 w-full">
                <form action="" method="post" id="formAddAvisClient" class="flex flex-col space-y-3">
                    <input type="hidden" name="id_product" value="${URLid}">
                    <input type="text" name="title_avis" id="title_avis" placeholder="Titre de l'avis" class="bg-slate-100 p-2 rounded-lg w-full">
                    <textarea name="content_avis" id="content_avis" cols="65" rows="6" placeholder="Contenu de l'avis" class="bg-slate-100 p-2 rounded-lg w-full"></textarea>
                    <select name="note_avis" id="note_avis" class="bg-slate-100 p-2 rounded-lg">
                        <option value="" selected>Note du produit</option>
                        <option value="0">0/5</option>
                        <option value="1">1/5</option>
                        <option value="2">2/5</option>
                        <option value="3">3/5</option>
                        <option value="4">4/5</option>
                        <option value="5">5/5</option>
                    </select>
                    <div id="errorMsg" class="h-12"></div>
                    <button type="submit" class="bg-[#A87EE6FF] text-white px-5 py-2 rounded-lg" id="buttonAddAvis">Ajouter un avis</button>
                </form>
            </div>
                `;
            const formAddAvisClient = document.getElementById('formAddAvisClient');
            formAddAvisClient.addEventListener('submit', async (ev) => {
                ev.preventDefault();
                await fetch('src/php/fetch/avis/addAvis.php', {
                    method: 'POST',
                    body: new FormData(formAddAvisClient)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const msg = document.getElementById('errorMsg');
                    if (data.status == 'error') {
                        msg.innerHTML = `
                        <div class="flex items-center py-3 px-2 rounded-lg bg-[#FF03032A] text-[#D8000C] border-l-[3px] border-[#ff0303]">
                            <img src="public/images/icones/danger-red-stroke-2.svg" alt="" class="w-5 h-5">
                            <small class="text-lg">${data.message}</small>
                        </div>
                        `;
                    }
                    if (data.status == 'success') {
                        msg.innerHTML = `
                        <div class="flex items-center py-3 px-2 rounded-lg bg-[#DFF2BF] text-[#270] border-l-[3px] border-[#270]">
                            <img src="public/images/icones/succes-circle-green-stroke-2.svg" alt="" class="w-5 h-5">
                            <small class="text-lg">${data.message}</small>
                        </div>
                        `;
                    }
                });
            });
        }

    });
}
async function displayAvis() {
    await fetch ('src/php/fetch/client/isConnected.php')
    .then(response => response.json())
    .then(data => {
        const containerAvisClient = document.getElementById('containerAvisClients');
        if (data.status == 'success') {
            const Users_id = data.id;
            fetch ('src/php/fetch/avis/getAvis.php?id_product='+URLid)
            .then(response => response.json())
            .then(data => {
                if (data.status == 'success') {
                    containerAvisClient.innerHTML = '';
                    for (let avis of data.avis) {
                        const avisContainer = document.createElement('div');
                        avisContainer.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'space-y-2', 'border-[1px]', 'border-[#a8b3cf33]', 'rounded-lg', 'w-[80%]', 'p-4', 'mb-2');
                        avisContainer.innerHTML = `
                            <div class="flex flex-row justify-between w-full">
                                <p class="text-[#000] font-semibold">${avis.titre_avis}</p>
                                <p class="text-[#a8b3cf]">${formatDateSansh(avis.created_at)}</p>
                            </div>
                            <div class="w-full flex flex-row justify-between">
                                <div class="flex flex-row space-x-2">
                                    <img src="src/images/avatars/${avis.avatar_users}" alt="" class="w-6 h-6 rounded-full">
                                    <p class="text-[#a8b3cf]">${avis.login_users}</p>
                                </div>
                                <div class="flex flex-row justify-end w-full">
                                    <p class="text-[#a8b3cf]">${avis.note_avis}/5</p>
                                </div>
                            </div>
                            <div class="w-full flex flex-row justify-start">
                                <p class="text-[#a8b3cf]">${avis.commentaire_avis}</p>
                            </div>
                            <div class="flex flex-row w-full justify-end">
                                <div>
                                    <button class="bg-[#A87EE6FF] text-white px-5 py-2 mx-2 rounded-lg bg-transparent" id="buttonRepondreAvis_${avis.id_avis}">
                                        <svg width="1em" height="1em" viewBox="0 0 24 24" stroke="#39e58c" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 pointer-events-none"><path d="M8.084 3.217a35.447 35.447 0 017.05-.078l.782.078.279.031c1.089.121 1.885.372 2.606.828a4.516 4.516 0 011.664 1.86c.336.69.5 1.423.53 2.361l.005.321v3.975a4.493 4.493 0 01-3.545 4.392l-.207.04-2.089.346-2.86 2.992-.147.135c-.986.789-2.399.623-3.205-.324-.532-.625-.616-1.34-.51-2.29l.029-.224.038-.254.033-.187-1.332-.189a5.011 5.011 0 01-1.677-.55l-.253-.146-.243-.16a4.777 4.777 0 01-1.491-1.721 4.935 4.935 0 01-.532-1.972l-.009-.3V8.618c0-1.096.162-1.915.535-2.683.375-.77.94-1.4 1.664-1.859.649-.41 1.359-.655 2.288-.788l.318-.04.28-.031zm7.666 1.491a33.948 33.948 0 00-6.752-.075l-.748.075-.28.031c-.915.102-1.481.297-1.97.606a3.016 3.016 0 00-1.116 1.247c-.228.468-.357.989-.38 1.76l-.004.266v3.563c0 .577.134 1.116.375 1.587.242.471.592.874 1.024 1.18.37.263.801.453 1.276.554l.242.043 1.98.283c.339.048.457.096.575.175.119.078.262.187.27.386l-.002.024-.013.08-.164.741-.064.333c-.111.63-.167 1.332.09 1.634.263.309.7.39 1.037.187l.089-.062 2.998-3.135.13-.101.092-.063.077-.04.08-.03.035-.01.087-.02L17 15.545a2.993 2.993 0 002.495-2.77l.005-.182V8.618c0-.921-.13-1.506-.384-2.026A3.016 3.016 0 0018 5.345c-.44-.278-.943-.464-1.706-.572l-.265-.034-.279-.03zm-.55 6.294l.093.005c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005c-.398-.044-.707-.36-.707-.745 0-.38.301-.694.691-.744l.109-.007h6.4zm0-3.5l.093.004c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005C8.309 8.953 8 8.637 8 8.252c0-.38.301-.694.691-.744l.109-.007h6.4z" fill="currentcolor" fill-rule="evenodd"></path></svg>
                                    </button>
                                </div>
                                <div class="callToAction flex space-x-2"></div>
                                
                            </div>
                            <div id="replyAvisClient" class="w-full ml-6 p-4 mr-2"></div>
                        `;
                        const callToAction = avisContainer.querySelector('.callToAction');
                        if (avis.users_id === Users_id) {
                            callToAction.innerHTML = `
                                <div class="flex flex-row justify-between w-full">
                                    <button class="bg-[#A87EE6FF] text-white px-5 py-2 rounded-lg mx-2 bg-transparent" id="buttonEditAvis_${avis.id_avis}">
                                        <svg width="24" height="24" viewBox="0 0 24 24" stroke="#2cdce6" fill="none" stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M15 9H5C3.89543 9 3 9.89543 3 11V13C3 14.1046 3.89543 15 5 15H15M15 9H19C20.1046 9 21 9.89543 21 11V13C21 14.1046 20.1046 15 19 15H15M15 9V12M15 9V5.5M15 15V12M15 15V18.5M6.5 12H15M15 5.5H17.5M15 5.5H12.5M15 18.5H17.5M15 18.5H12.5"></path></svg>
                                    </button>
                                    <button class="bg-[#A87EE6FF] text-white px-5 py-2 rounded-lg mx-2 bg-transparent" id="buttonDeleteAvis_${avis.id_avis}">
                                        <svg width="24" height="24" viewBox="0 0 24 24" stroke="#e04337" fill="none" stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M11.9999 14.5L14.4999 12M14.4999 12L16.9999 9.5M14.4999 12L16.9999 14.5M14.4999 12L11.9999 9.5M3.39862 12.7282L8.71112 17.7282C8.89662 17.9028 9.14175 18 9.39648 18H18.9999C20.1045 18 20.9999 17.1046 20.9999 16V8C20.9999 6.89543 20.1045 6 18.9999 6L9.39648 6C9.14175 6 8.89662 6.09721 8.71112 6.2718L3.39862 11.2718C2.97911 11.6666 2.97911 12.3334 3.39862 12.7282Z"></path></svg>
                                    </button>
                                </div>
                            `;
                        }
                        containerAvisClient.appendChild(avisContainer);
                        fetch ('src/php/fetch/avis/getReplyAvis.php?id_avis='+avis.id_avis)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            const replyAvisClient = document.getElementById('replyAvisClient');
                            if (data.commentaire && data.commentaire.length > 0) {
                                for (let commentaire of data.commentaire) {
                                    replyAvisClient.innerHTML += `
                                    <div class="flex flex-row justify-between w-full border-l-2 border-slate-200">
                                        <div class="flex flex-col py-4 px-2">
                                        <div class="flex flex-row py-1 space-x-2">
                                            <img src="src/images/avatars/${commentaire.avatar_users}" alt="" class="w-6 h-6 rounded-full">
                                            <p class="font-semibold">Par ${commentaire.login_users}</p>
                                        </div>
                                        <p class="flex flex-row">
                                            <span>${commentaire.content_comment}</span>
                                        </p>
                                        </div>
                                        
                                    </div>
                                    `;
                                }
                            }
                        });
                    }
                    for (let avis of data.avis) {
                        const buttonEditAvis = document.querySelector(`#buttonEditAvis_${avis.id_avis}`);
                        if (buttonEditAvis) {
                            buttonEditAvis.addEventListener('click', async (ev) => {
                                ev.preventDefault();
                                const containerDialogAvis = document.getElementById('containerDialogAvis');
                                const dialogAvis = document.createElement('dialog');
                                dialogAvis.setAttribute('id', 'dialog_fixed');
                                dialogAvis.className = 'dialog_modal w-10/12 bg-[#24272A] text-[#a8b3cf] rounded-lg shadow-lg';
                                containerDialogAvis.appendChild(dialogAvis);
                                dialogAvis.innerHTML = `
                                    <div class="p-2">
                                        <div class="flex flex-row justify-between">
                                            <p>Modifier Avis</p>
                                            <button class="close" id="closeDialogAvis">&times;</button>
                                        </div>
                                        <form action="" method="post" id="formEditAvisClient" class="flex flex-col items-center justify-center space-y-2">
                                            <input type="hidden" name="id_avis" value="${avis.id_avis}">
                                            <input type="hidden" name="id_product" value="${avis.id_product}">
                                            <input type="text" name="title_avis" id="title_avis" placeholder="Titre de l'avis" class="bg-slate-100 p-2 rounded-lg" value="${avis.titre_avis}">
                                            <textarea name="content_avis" id="content_avis" cols="30" rows="10" placeholder="Contenu de l'avis" class="bg-slate-100 p-2 rounded-lg">${avis.commentaire_avis}</textarea>
                                            <select name="note_avis" id="note_avis" class="bg-slate-100 p-2 rounded-lg">
                                                <option value="${avis.note_avis}" selected>${avis.note_avis}</option>
                                                <option value="0">0/5</option>
                                                <option value="1">1/5</option>
                                                <option value="2">2/5</option>
                                                <option value="3">3/5</option>
                                                <option value="4">4/5</option>
                                                <option value="5">5/5</option>
                                            </select>
                                            <div id="errorMsg" class="h-12"></div>
                                            <button type="submit" class="bg-[#A87EE6FF] text-white px-5 py-2 rounded-lg" id="buttonAddAvis">Modifier un avis</button>
                                        </form>
                                    </div>
                                `;
                                const formEditAvisClient = document.getElementById('formEditAvisClient');
                                formEditAvisClient.addEventListener('submit', async (ev) => {
                                    ev.preventDefault();
                                    await fetch(`src/php/fetch/avis/editAvis.php?id_avis=${avis.id_avis}`, {
                                        method: 'POST',
                                        body: new FormData(formEditAvisClient)
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.status == 'error') {
                                            const errorMsg = document.getElementById('errorMsg');
                                            displayErrorMessageFormUpdateProduct(errorMsg, data.message);
                                        }
                                        if (data.status == 'success') {
                                            dialogAvis.close();
                                            dialogAvis.remove();
                                            displayAvis();
                                        }
                                    });
                                });
                                dialogAvis.showModal();
                                const closeDialogAvis = document.getElementById('closeDialogAvis');
                                closeDialogAvis.addEventListener('click', (ev) => {
                                    ev.preventDefault();
                                    dialogAvis.close();
                                    dialogAvis.remove();
                                });
                            });
                        }
                        const buttonDeleteAvis = document.querySelector(`#buttonDeleteAvis_${avis.id_avis}`);
                        if (buttonDeleteAvis) {
                            buttonDeleteAvis.addEventListener('click', async (ev) => {
                                ev.preventDefault();
                                await fetch(`src/php/fetch/avis/deleteAvis.php?id_avis=${avis.id_avis}`)
                                .then(response => response.json())
                                .then(data => {
                                    if (data.status == 'success') {
                                        displayAvis();
                                    }
                                });
                            });
                        }
                        const buttonRepondreAvis = document.querySelector(`#buttonRepondreAvis_${avis.id_avis}`);
                        if (buttonRepondreAvis) {
                            buttonRepondreAvis.addEventListener('click', async (ev) => {
                                ev.preventDefault();
                                const containerDialogAvis = document.getElementById('containerDialogAvis');
                                const dialogAvis = document.createElement('dialog');
                                dialogAvis.setAttribute('id', 'dialog_fixed');
                                dialogAvis.className = 'dialog_modal w-10/12 bg-[#24272A] text-[#a8b3cf] rounded-lg shadow-lg';
                                containerDialogAvis.appendChild(dialogAvis);
                                dialogAvis.innerHTML = `
                                    <div class="p-2">
                                        <div class="flex flex-row justify-between">
                                                <h3>Votre commentaire</h3>
                                                <button class="close" id="closeDialogAvis">&times;</button>
                                            </div>
                                        <div>
                                        <div>
                                            <img src="src/images/avatars/${avis.avatar_users}" alt="" class="w-6 h-6 rounded-full">
                                            <p class="text-[#a8b3cf]">${avis.login_users}</p>
                                        </div>
                                        <div>
                                            <p class="text-[#a8b3cf]">${avis.titre_avis}</p>
                                            <p class="text-[#a8b3cf]">${avis.commentaire_avis}</p>
                                        </div>
                                        <div>
                                            <p>Réponse à ${avis.login_users}</p>
                                        </div>
                                        </div>
                                        <form action="" method="post" id="formAddReplyAvisClient" class="flex flex-col items-center justify-center space-y-2">
                                            <input type="hidden" name="id_product" value="${URLid}">
                                            <input type="hidden" name="parent_avis" value="${avis.id_avis}">
                                            <textarea name="content_avis" id="content_avis" cols="30" rows="10" placeholder="Contenu de l'avis" class="bg-slate-100 p-2 rounded-lg"></textarea>
                                            <div id="errorMsg" class="h-12"></div>
                                            <button type="submit" class="bg-[#A87EE6FF] text-white px-5 py-2 rounded-lg" id="buttonAddAvis">Répondre</button>
                                        </form>
                                    </div>
                                `;
                                dialogAvis.showModal();
                                const closeDialogAvis = document.getElementById('closeDialogAvis');
                                closeDialogAvis.addEventListener('click', (ev) => {
                                    ev.preventDefault();
                                    dialogAvis.close();
                                    dialogAvis.remove();
                                });
                                const formAddReplyAvisClient = document.getElementById('formAddReplyAvisClient');
                                formAddReplyAvisClient.addEventListener('submit', async (ev) => {
                                    ev.preventDefault();
                                    await fetch(`src/php/fetch/avis/addReplyAvis.php?id_avis=${avis.id_avis}`, {
                                        method: 'POST',
                                        body: new FormData(formAddReplyAvisClient)
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.status == 'error') {
                                            const errorMsg = document.getElementById('errorMsg');
                                            displayErrorMessageFormUpdateProduct(errorMsg, data.message);
                                        }
                                        if (data.status == 'success') {
                                            dialogAvis.close();
                                            dialogAvis.remove();
                                            displayAvis();
                                        }
                                    });
                                });
                            });
                        }
                    }
                }
            });
        }
        if (data.status == 'error') {
            fetch ('src/php/fetch/avis/getAvis.php?id_product='+URLid)
                .then(response => response.json())
                .then(data => {
                    containerAvisClient.innerHTML = '';
                    for (let avis of data.avis) {
                        const avisContainer = document.createElement('div');
                        avisContainer.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'space-y-2', 'border-[1px]', 'border-[#a8b3cf33]', 'rounded-lg', 'w-[80%]', 'p-4', 'mb-2');
                        avisContainer.innerHTML = `
                            <div class="flex flex-row justify-between w-full">
                                <p class="text-[#000] font-semibold">${avis.titre_avis}</p>
                                <p class="text-[#a8b3cf]">${formatDateSansh(avis.created_at)}</p>
                            </div>
                            <div class="w-full flex flex-row justify-between">
                                <div class="flex flex-row space-x-2">
                                    <img src="src/images/avatars/${avis.avatar_users}" alt="" class="w-6 h-6 rounded-full">
                                    <p class="text-[#a8b3cf]">${avis.login_users}</p>
                                </div>
                                <div class="flex flex-row justify-end w-full">
                                    <p class="text-[#a8b3cf]">${avis.note_avis}/5</p>
                                </div>
                            </div>
                            <div class="w-full flex flex-row justify-start">
                                <p class="text-[#a8b3cf]">${avis.commentaire_avis}</p>
                            </div>
                            <div class="flex flex-row w-full justify-end">
                                <div>
                                    <button class="bg-[#A87EE6FF] text-white px-5 py-2 mx-2 rounded-lg bg-transparent" id="buttonRepondreAvis_${avis.id_avis}">
                                        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 pointer-events-none reply_svg"><path d="M8.084 3.217a35.447 35.447 0 017.05-.078l.782.078.279.031c1.089.121 1.885.372 2.606.828a4.516 4.516 0 011.664 1.86c.336.69.5 1.423.53 2.361l.005.321v3.975a4.493 4.493 0 01-3.545 4.392l-.207.04-2.089.346-2.86 2.992-.147.135c-.986.789-2.399.623-3.205-.324-.532-.625-.616-1.34-.51-2.29l.029-.224.038-.254.033-.187-1.332-.189a5.011 5.011 0 01-1.677-.55l-.253-.146-.243-.16a4.777 4.777 0 01-1.491-1.721 4.935 4.935 0 01-.532-1.972l-.009-.3V8.618c0-1.096.162-1.915.535-2.683.375-.77.94-1.4 1.664-1.859.649-.41 1.359-.655 2.288-.788l.318-.04.28-.031zm7.666 1.491a33.948 33.948 0 00-6.752-.075l-.748.075-.28.031c-.915.102-1.481.297-1.97.606a3.016 3.016 0 00-1.116 1.247c-.228.468-.357.989-.38 1.76l-.004.266v3.563c0 .577.134 1.116.375 1.587.242.471.592.874 1.024 1.18.37.263.801.453 1.276.554l.242.043 1.98.283c.339.048.457.096.575.175.119.078.262.187.27.386l-.002.024-.013.08-.164.741-.064.333c-.111.63-.167 1.332.09 1.634.263.309.7.39 1.037.187l.089-.062 2.998-3.135.13-.101.092-.063.077-.04.08-.03.035-.01.087-.02L17 15.545a2.993 2.993 0 002.495-2.77l.005-.182V8.618c0-.921-.13-1.506-.384-2.026A3.016 3.016 0 0018 5.345c-.44-.278-.943-.464-1.706-.572l-.265-.034-.279-.03zm-.55 6.294l.093.005c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005c-.398-.044-.707-.36-.707-.745 0-.38.301-.694.691-.744l.109-.007h6.4zm0-3.5l.093.004c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005C8.309 8.953 8 8.637 8 8.252c0-.38.301-.694.691-.744l.109-.007h6.4z" fill="currentColor" fill-rule="evenodd"></path></svg>
                                    </button>
                                </div>
                            </div>
                            <div id="replyAvisClient" class="w-full ml-6 p-4 mr-2"></div>
                        `;
                        containerAvisClient.appendChild(avisContainer);
                        fetch ('src/php/fetch/avis/getReplyAvis.php?id_avis='+avis.id_avis)
                            .then(response => response.json())
                            .then(data => {
                                const replyAvisClient = document.getElementById('replyAvisClient');
                                if (data.commentaire && data.commentaire.length > 0) {
                                    for (let commentaire of data.commentaire) {
                                        replyAvisClient.innerHTML += `
                                    <div class="flex flex-row justify-between w-full border-l-2 border-slate-200">
                                        <div class="flex flex-col py-4 px-2">
                                        <div class="flex flex-row py-1 space-x-2">
                                            <img src="src/images/avatars/${commentaire.avatar_users}" alt="" class="w-6 h-6 rounded-full">
                                            <p class="font-semibold">Par ${commentaire.login_users}</p>
                                        </div>
                                        <p class="flex flex-row">
                                            <span>${commentaire.content_comment}</span>
                                        </p>
                                        </div>
                                        
                                    </div>
                                    `;
                                    }
                                }
                            });
                        const buttonRepondreAvis = document.getElementById('buttonRepondreAvis_'+avis.id_avis);
                        buttonRepondreAvis.addEventListener('click', () => {
                            loginFormHeader(buttonRepondreAvis);
                        });
                    }
                });
        }
    });
}

Avis();
displayAvis();
cartHeader();
getProduct(URLid);
