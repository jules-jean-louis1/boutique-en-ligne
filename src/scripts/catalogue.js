import {displayErrorMessageFormUpdateProduct, loginFormHeader} from './function/function.js';
import {registerHeader} from './function/function.js';
import {formatDateSansh} from "./function/function.js";
import {searchHeader} from "./function/function.js";
import {Login} from "./function/function.js";

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
                    <p class="absolute flex items-center justify-center rounded-full h-4 w-4 bg-[#A87EE6FF]">
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
                    <div class="absolute flex flex-col items-around space-y-2">
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
                    <p class="absolute flex items-center justify-center rounded-full h-4 w-4 bg-[#A87EE6FF]">
                        <span class="text-white text-xs">${nbProduits}</span>
                    </p>
                `;
                const cartDivHeader = document.createElement("dialog");
                cartDivHeader.setAttribute('class', 'absolute top-[21vh] left-[78vw] transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white w-80 rounded-lg shadow-lg');
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

// Catalogue.js
const containerMessageAddCart = document.getElementById("containerMessageAddCart");
const containerCatalogue = document.getElementById("containerCatalogue");
const containerPage = document.getElementById("displayPagesCatalogue");
async function getDateProduct(categorie, subCategorie) {
    const params = new URLSearchParams();
    params.append('categorie', categorie);
    params.append('subCategorie', subCategorie);
    const response = await fetch(`src/php/fetch/catalogue/getDateProductFiltre.php?${params.toString()}`);
    const data = await response.json();
    dateSortieProduit.innerHTML = '';
    for (const date of data.displayYear) {
        dateSortieProduit.innerHTML += `
            <div class="flex justify-around w-2/3">
                <input type="checkbox" name="dateSortie" id="dateSortie" value="${date.annee}">
                <label for="dateSortie">${date.annee}</label>
                <p class="text-[#A87EE6FF]"> ${date.count}</p>
            </div>
            `;
    }
}
async function getSubCategorie() {
    const response = await fetch('src/php/fetch/catalogue/getSubCategorieFiltre.php');
    const data = await response.json();
    for (const subCategorie of data.displaySubCategories) {
        subCategories.innerHTML += `
            <option value="${subCategorie.id_subcategories}">${subCategorie.name_subcategories}</option>
            `;
    }
}
let categoriesSelect;

async function getCategorie() {
    const response = await fetch('src/php/fetch/catalogue/getCategorieFiltre.php');
    const data = await response.json();
    for (const subCategorie of data.displayCategories) {
        categoriesSelect.innerHTML += `
            <option value="${subCategorie.id_categories}">${subCategorie.name_categories}</option>
            `;
    }
    categoriesSelect.addEventListener('change', async () => {
        const selectedCategoryId = categoriesSelect.value;
        if (selectedCategoryId === '') {
            getSubCategorie();
        } else {
            const subCategoriesSelect = document.getElementById("subCategories");
            subCategoriesSelect.innerHTML = '<option value="">Genre...</option>';
            const response = await fetch(`src/php/fetch/catalogue/getSubCatByCat.php?categoryId=${selectedCategoryId}`);
            const data = await response.json();
            for (const subCategory of data.displaySubCategories) {
                subCategoriesSelect.innerHTML += `
                <option value="${subCategory.id_subcategories}">${subCategory.name_subcategories}</option>
            `;
            }
        }
    });
}
/*const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const currentPage = parseInt(urlParams.get('page')) || 1;*/

/*async function getPages(Date, order, categorie, subCategorie, currentPage) {
    const params = new URLSearchParams();
    params.append('date', Date);
    params.append('order', order);
    params.append('categorie', categorie);
    params.append('subCategorie', subCategorie);

    const response = await fetch(`src/php/fetch/catalogue/getPages.php?${params.toString()}`);
    const data = await response.json();
    if (currentPage > 1) {
        containerPage.innerHTML = `
      <li class="page-item">
        <button type="button" class="px-2 py-2 rounded-[14px] bg-[#a87ee6] text-white" id="pageButton${currentPage-1}" value="${currentPage-1}">
            <a class="page-link" href="catalogue.php?page=${currentPage-1}">
                <svg width="32" height="32" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-linejoin="round" stroke-width="1.125" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg" style="--darkreader-inline-stroke: #e8e6e3;" data-darkreader-inline-stroke=""><path d="M14 8L10 12L14 16"></path></svg>            
            </a>
        </button>
      </li>
    `;
    }
    containerPage.innerHTML += `
    <li class="page-item">
    <p class="px-4 py-2 rounded-[14px] border-2 border-[#a87ee6] text-white">${currentPage}</p>
    </li>
    `;
    // Affichage du bouton "Page suivante" si la page actuelle n'est pas la dernière
    if (currentPage < data.displayPages) {
        containerPage.innerHTML = `
      <li class="page-item">
        <button type="button" class="px-2 py-2 rounded-[14px] bg-[#a87ee6] text-white" id="pageButton${currentPage+1}" value="${currentPage+1}">
          <a class="page-link" href="catalogue.php?page=${currentPage+1}">
            <svg width="32" height="32" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-linejoin="round" stroke-width="1.125" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg" style="--darkreader-inline-stroke: #e8e6e3;" data-darkreader-inline-stroke=""><path d="M10 8L14 12L10 16"></path></svg>
          </a>
        </button>
      </li>
    `;
    }
}*/
async function getPages(Date, order, categorie, subCategorie) {
    const response = await fetch(`src/php/fetch/catalogue/getPages.php?date=${Date}&order=${order}&categorie=${categorie}&subCategorie=${subCategorie}`);
    const data = await response.json();
    if (containerPage) { // check if containerPage exists
        containerPage.innerHTML = ''; // clear containerPage
        for (let i = 1; i <= data.displayPages; i++) {
            containerPage.innerHTML += `
        <li class="page-item">
          <button type="button" class="px-4 py-2 rounded-[14px] bg-slate-100" id="pageButton${i}" value="${i}">
            <a class="page-link" href="catalogue.php?page=${i}">${i}</a>
          </button>
        </li>
        `;
        }
    }
}


function createFormFilter() {
    const containerFilterForm = document.getElementById("displayFilterCatalogue");
    const filterFormC = document.createElement('div');
    filterFormC.className = "h-full";
    containerFilterForm.appendChild(filterFormC);

    filterFormC.innerHTML = `
    <form id="filtrageForm" method="POST" class="flex flex-col justify-between items-strech text-white h-full p-4">
        <div class="flex flex-col">
            <select name="categorie" id="categorie" class="p-4 bg-[#1c1f26] rounded-[14px] border-[1px] border-[#a8b3cf33]">
                <option value="">Categorie</option>
            </select>
        </div>
        <div class="flex flex-col ">
            <select name="subCategories" id="subCategories" class="p-4 bg-[#1c1f26] rounded-[14px] border-[1px] border-[#a8b3cf33]">
                <option value="">Genre...</option>
            </select>
        </div>
        <div id="filtreSelectC" class="flex flex-col ">
            <select name="order" id="order" class="p-4 bg-[#1c1f26] rounded-[14px] border-[1px] border-[#a8b3cf33]">
                <option value="">Tirer par...</option>
                <option value="ASC_prix">Prix : les moins chers</option>
                <option value="DESC_prix">Prix : les plus chers</option>
                <option value="ASC_vente">Meilleures ventes</option>
                <option value="DESC_vente">Moins bonnes ventes</option>
                <option value="DESC_date">Date : les plus récents</option>
                <option value="ASC_date">Date : les plus anciens</option>
                <option value="ASC_rating">Note : Les meilleurs</option>
                <option value="DESC_rating">Note : Les moins bonnes</option>
            </select>
        </div>
        <div id="containerDateSortieProduit" class="pb-8 pt-2 border-t-[1px] border-[#a8b3cf33]">
            <div id="titreDateSortieProduit" class="flex items-center justify-between">
                <h6 class="text-white font-light">Date de sortie</h6>
                <svg width="38" height="24" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-linejoin="round" stroke-width="2.0526315789473686" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M7 12H17"></path></svg>
            </div>
            <div id="dateSortieProduit" class="flex flex-col items-stretch"></div>
        </div>
    </form>
    `;
    const dateSortieProduit = document.getElementById("dateSortieProduit");
    categoriesSelect = document.getElementById("categorie");
    const subCategoriesSelect = document.getElementById("subCategories");
    const Order = document.getElementById("order");
    const selectedCategoryValue = categoriesSelect.value;
    const selectedSubCategoryValue = subCategoriesSelect.value;
    categorie = selectedCategoryValue;
    subCategorie = selectedSubCategoryValue;
    getSubCategorie();
    getCategorie();
    getDateProduct(categorie, subCategorie);
}

async function filterForm(Page, Date, order, categorie, subCategorie) {
    const orderSelect = document.getElementById("order");
    const categoriesSelect = document.getElementById("categorie");
    const subCategoriesSelect = document.getElementById("subCategories");

    const selectedCategoryValue = categoriesSelect.value;
    const selectedSubCategoryValue = subCategoriesSelect.value;
    const selectedDateInput = document.querySelector('input[name="dateSortie"]:checked');
    const selectedDate = selectedDateInput ? selectedDateInput.value : '';


    Date = selectedDate;
    order = orderSelect.value || 'DESC_date';
    categorie = selectedCategoryValue;
    subCategorie = selectedSubCategoryValue;

    const params = new URLSearchParams();
    params.append('page', Page);
    params.append('date', Date);
    params.append('order', order);
    params.append('categorie', categorie);
    params.append('subCategorie', subCategorie);

    getDateProduct(categorie, subCategorie);
    console.log(params.toString());
    await fetch(`src/php/fetch/catalogue/getProductByFilter.php?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
            const containerProduct = document.getElementById("displayProduct");
            if (data.status === 'success') {
                containerProduct.innerHTML = '';
                for (let product of data.displayProducts) {
                    containerProduct.innerHTML += `
                        <div id="itemsProductContainer" class="w-60 flex justify-center mx-8">
                            <a href="produit.php?id=${product.id_product}">
                            <div id="wapperProduct" class="p-4">
                                <div id="itemsImgProduct">
                                    <div id="priceProduct" class="absolute mt-2 ml-2 rounded-full text-white bg-slate-900/90 w-fit p-1 hover:bg-[#a87ee6]">
                                        <p>${product.price_product}€</p>
                                    </div>
                                    <img src="src/images/products/${product.img_product}" alt="${product.name_product}" class="rounded-lg h-fit lg:h-72">
                                </div>
                                <div id="TitleProduct" class="flex items-center w-full justify-between">
                                    <div id="containerTitleProduct" class="flex flex-col items-start">
                                        <p class="font-bold text-white">${product.name_product.substring(0,22)}</p>
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
                for (let product of data.displayProducts) {
                    const formAddToCart = document.getElementById(`formAddToCart_${product.id_product}`);
                    formAddToCart.addEventListener('click', async (ev) => {
                        ev.preventDefault();
                        await fetch(`src/php/fetch/cart/addProductToCart.php?id=${product.id_product}&name=${product.name_product}&quantity=1`)
                            .then(response => response.json())
                            .then(data => {
                                if (data.status == 'success') {
                                    const diaog = document.createElement("dialog");
                                    diaog.setAttribute('class','fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-transparent');
                                    diaog.setAttribute('open', '');
                                    diaog.innerHTML = `
                                        <div class="w-full flex items-center py-3 px-2 space-x-3 bg-opacity-50 backdrop-filter backdrop-blur-lg hover:bg-opacity-75 hover:saturate-100 rounded-[14px] bg-[#cbf4f0] text-[#000] border-l-[3px] border-[#23a094]">
                                            <svg width="25" height="25" viewBox="0 0 24 24" stroke="#23a094" fill="#fff" class="p-0.5 bg-white items-center rounded-full" stroke-linejoin="round" stroke-width="1.736842105263158" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M16.253 10.1109L11.8891 14.4749C11.4986 14.8654 10.8654 14.8654 10.4749 14.4749L7.99999 12M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"></path></svg>
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
                    });
                }
            }
            if (data.status === 'error') {
                containerProduct.innerHTML = `
                    <div id="errorProduct" class="flex flex-col items-center justify-center h-full">
                        <p class="text-white font-light text-2xl">Aucun produit ne correspond à votre recherche</p>
                    </div>
                    `;
            }
        });
    containerPage.innerHTML += '';
    getPages(Date, order, categorie, subCategorie);
}





const searchParams = new URLSearchParams(window.location.search);
let Page = searchParams.get("page");
if (Page === null) {
    Page = 1;
}
let Date = '';
let order = "DESC_date";
let categorie = '';
let subCategorie = '';
createFormFilter();

filterForm(Page, order, categorie, subCategorie);

cartHeader();

const filtrageForm = document.getElementById("filtrageForm");
filtrageForm.addEventListener('change', async (ev) => {
    ev.preventDefault();
    filterForm(Page, Date, order, categorie, subCategorie);
});
