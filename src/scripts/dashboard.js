import { displayError} from './function/function.js';
import { displaySuccess} from './function/function.js';
import { formatDate } from "./function/function.js";
import { loginFormHeader} from './function/function.js';
import {registerHeader} from './function/function.js';
import {formatDateSansh} from "./function/function.js";

const btnRegister = document.querySelector('#buttonRegisterHeader');
const btnLogin = document.querySelector('#buttonLoginHeader');
const buttonProfilHeader = document.getElementById("buttonProfilHeader");
const menuProfilHeader = document.getElementById("menuProfilHeader");
const profilInfoHeader = document.getElementById("infoUserNavBar");
const SearchBarHeader = document.getElementById("search_bar_form");
const FormSearchBarHeader = document.getElementById("searchBarFormHeader");

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

// Fonction Dashboard Admin
// Declaration des variables pour les boutons
const buttonGestionProduct = document.querySelector('#buttonSeeProduct');
const buttionGestionCategores = document.querySelector('#buttonSeeCategories');
const buttonGestionCommande = document.querySelector('#buttonSeeCommandes');
const buttonGestionUser = document.querySelector('#buttonSeeUsers');

const containerdialogUpdateProduct = document.querySelector('#containerDialogFormUpdateProduct');
const containerAllDiv = document.querySelector('#containerModifyProduct');
let message = document.querySelector('#message');

// Fonction d'affichage des catégories
async function displayCategory(option) {
    await fetch('src/php/fetch/category/displayCategories.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(category => {
                option.innerHTML += `<option value="${category.id_categories}" class="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg hover:bg-opacity-75 hover:saturate-100">${category.name_categories}</option>`;
            });
        });
}
// Fonction pour affichage.des erreurs sous input
function displayErrorMessageInput(ParentSelector, ContentMessage) {
    const containerMessage = document.createElement('div');
    containerMessage.className = 'flex items-center space-x-2';
    containerMessage.innerHTML = `
        <img src="public/images/icones/danger-icones-red.svg" alt="" class="w-5 h-5">
        <small id="errorUpdateNameProduct" class="text-red-500">${ContentMessage}</small>`;
    ParentSelector.appendChild(containerMessage);
}

// Fonction pour affichage des erreurs sous le formulaire d'update des produits
function displayErrorMessageFormUpdateProduct(ParentSelector, ContentMessage) {
    ParentSelector.innerHTML = '';
    ParentSelector.innerHTML = `
    <div class="flex items-center py-3 px-2 rounded-lg bg-[#FEEFB3] text-[#D8000C] border-l-[3px] border-[#FEEFB3]">
        <img src="public/images/icones/danger-red-stroke-2.svg" alt="" class="w-5 h-5">
        <small class="text-lg">${ContentMessage}</small>
    </div>
    `;
}
function displaySuccessMessageFormUpdateProduct(ParentSelector, ContentMessage) {
    ParentSelector.innerHTML = '';
    ParentSelector.innerHTML = `
    <div class="flex items-center py-3 px-2 rounded-lg bg-[#DFF2BF] text-[#270] border-l-[3px] border-[#270]">
        <img src="public/images/icones/succes-circle-green-stroke-2.svg" alt="" class="w-5 h-5">
        <small class="text-lg">${ContentMessage}</small>
    </div>
    `;
}
// Fonction message popup
function messagePopup(message, status) {
    const body = document.querySelector('body');
    const dialog = document.createElement('dialog');
    dialog.setAttribute('id', 'dialog_message');
    dialog.className = 'd_message';
    body.appendChild(dialog);
    dialog.innerHTML = message;
    dialog.showModal();
    setTimeout(() => {
        dialog.close();
    }, 3000);

    if (status === 'success') {
        dialog.classList.add('success_dialog_message');
    } else if (status === 'error') {
        dialog.classList.add('error_dialog_message');
    }
}
// fonction de gestion des produits
async function addProduct() {
    const buttonAddProductContainer = document.createElement('div');
    buttonAddProductContainer.className = 'flex justify-center pt-2';
    buttonAddProductContainer.innerHTML = `
            <button type="button" class="bg-[#a87ee6] px-4 py-2 flex space-x-4 items-center text-white font-bold rounded-lg" id="buttonAddProduct">
            <svg width="32" height="32" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M6.99999 12H12M12 12H17M12 12V6.99999M12 12V17M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z"></path></svg>
            Ajouter un produit
            </button>
                `;
    containerAllDiv.appendChild(buttonAddProductContainer);

    const buttonAddProduct = document.querySelector('#buttonAddProduct');
    buttonAddProduct.addEventListener('click', () => {
        const body = document.querySelector('body');
        const dialog = document.createElement('dialog');
        dialog.setAttribute('id', 'dialog');
        dialog.className = 'dialog_modal w-10/12 bg-[#24272A] text-[#a8b3cf] rounded-lg shadow-lg';
        dialog.innerHTML = '';
        dialog.innerHTML = `
        <div class="w-full p-2 flex flex-col space-y-2">
            <div id="modal-header" class="flex justify-between items-center w-full px-3 py-1">
                <h5 class="text-white font-semibold text-lg" id="exampleModalLabel">Ajouter un produit</h5>
                <button type="button" id="btncloseDialog" data-bs-dismiss="modal" aria-label="Close" class="p-2 rounded-lg bg-[#41474c] text-[#A87EE6FF]">Fermer</button>
            </div>
            <div>
                <form action="" method="post" id="formAddProduct" enctype="multipart/form-data" class="flex flex-col space-y-2">
                    <div id="modalAddProduct">
                        <input type="text" name="nameProduct" id="nameProduct" class="w-full p-2 rounded-lg bg-[#41474c] hover:bg-[#464c51] border-l-4 border-[#a8b3cfa3] hover:border-[#A87EE6FF]" placeholder="Nom du produit">
                    </div>
                    <div id="modalAddProduct">
                        <textarea name="descriptionProduct" id="descriptionProduct" cols="30" rows="10" class="p-2 rounded-lg bg-[#41474c] hover:bg-[#464c51] border-l-4 border-[#a8b3cfa3] hover:border-[#A87EE6FF] w-full" placeholder="Description du produit"></textarea>
                    </div>
                    <div id="modalAddProduct" class="flex justify-between w-full space-x-2">
                        <input type="text" name="priceProduct" id="priceProduct" placeholder="Prix du produit en euro" class="w-1/2 p-2 rounded-lg bg-[#41474c] hover:bg-[#464c51] border-l-4 border-[#a8b3cfa3] hover:border-[#A87EE6FF]">
                        <input type="number" name="stockProduct" id="stockProduct" placeholder="Quantité disponible" class="w-1/2 p-2 rounded-lg bg-[#41474c] hover:bg-[#464c51] border-l-4 border-[#a8b3cfa3] hover:border-[#A87EE6FF]">
                    </div>
                    <div id="modalAddProduct" class="flex justify-between w-full space-x-2">
                        <div class="w-1/2 flex flex-col p-2 rounded-lg bg-[#41474c] hover:bg-[#464c51] border-l-4 border-[#a8b3cfa3] hover:border-[#A87EE6FF]">
                            <label for="releasedDate">Date de sortie </label>
                            <input type="date" name="releasedDate" id="releasedDate" class="p-2 rounded-lg bg-[#41474c] hover:bg-[#464c51]">
                        </div>
                        <div class="w-1/2 flex flex-col p-2 rounded-lg bg-[#41474c] hover:bg-[#464c51] border-l-4 border-[#a8b3cfa3] hover:border-[#A87EE6FF]">
                            <label for="imageProduct">Image du produit</label>
                            <input type="file" name="imageProduct" id="imageProduct" >
                        </div>
                    </div>
                    <div id="modalAddProduct" class="w-full">
                        <input type="hidden" name="subCategoryId" id="subCategoryId">
                        <input type="text" placeholder="Ajouter une sous-catégorie" id="searchSubCategories" class="w-full flex p-2 rounded-lg bg-[#41474c] hover:bg-[#464c51] border-l-4 border-[#a8b3cfa3] hover:border-[#A87EE6FF]">
                        <div id="displaySearchSubCategories"></div>
                    </div>
                    <div class="h-[45px]">
                        <div id="errorMsg"></div>
                    </div>
                    <div id="modalAddProduct">
                        <button type="submit" name="submitAddProduct" id="submitAddProduct" class="bg-[#A87EE6FF] p-2 rounded-lg text-[#fff] flex items-center">
                            <svg width="32" height="32" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M6.99999 12H12M12 12H17M12 12V6.99999M12 12V17M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z"></path></svg>
                        Ajouter ce produit
                        </button>
                    </div>
                </form>
            </div>
        </div>
            `;
        containerdialogUpdateProduct.appendChild(dialog);
        dialog.showModal();
        containerdialogUpdateProduct.classList.add('bg-overlay-quaternary-onion');
        let selectedSubCategoryId = null;

        const searchSubCategories = document.querySelector('#searchSubCategories');
        const displaySearchSubCategories = document.querySelector('#displaySearchSubCategories');
        searchSubCategories.addEventListener('input', () => {
            let query = searchSubCategories.value;
            fetch(`src/php/fetch/category/searchSubCategories.php?query=${query}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    displaySearchSubCategories.innerHTML = '';
                    for (let content of data.displaySubCategories) {
                        displaySearchSubCategories.innerHTML += `
                        <div class="search-result p-0.5 bg-slate-100" data-id="${content.id_subcategories}">
                            <p>${content.name_subcategories}</p>
                            <small>${content.name_categories}</small>
                        </div>
                    `;
                    }
                    // Ajouter un événement de clic sur chaque résultat de recherche
                    const searchResults = document.querySelectorAll('.search-result');
                    for (let result of searchResults) {
                        result.addEventListener('click', () => {
                            selectedSubCategoryId = result.getAttribute('data-id');
                            const subCategoryName = result.querySelector('p').textContent;
                            searchSubCategories.value = subCategoryName;
                            // Faites quelque chose avec l'ID de sous-catégorie sélectionné
                            document.querySelector('#subCategoryId').value = selectedSubCategoryId; // Mettre l'id sélectionné comme valeur de l'input caché
                            displaySearchSubCategories.innerHTML = ''; // Cacher les résultats de recherche
                        });
                    }
                });
        });
        const btnClose = document.querySelector('#btncloseDialog');
        btnClose.addEventListener('click', () => {
            dialog.close();
            containerdialogUpdateProduct.classList.remove('bg-overlay-quaternary-onion');
            containerdialogUpdateProduct.innerHTML = '';
        });

        const formAddProduct = document.querySelector('#formAddProduct');
        formAddProduct.addEventListener('submit', async (ev) => {
            ev.preventDefault();
            await fetch('src/php/fetch/produit/addProduct.php', {
                method: 'POST',
                body: new FormData(formAddProduct)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        dialog.close();
                        dialog.remove();
                        messagePopup(data.message, 'success');
                    }
                    if (data.status === 'error') {
                        let messageError = document.querySelector('#errorMsg');
                        for (let error of data.message) {
                            console.log(error);
                            messageError.innerHTML += error;
                            displayError(messageError);
                        }
                        setTimeout(() => {
                        messageError.innerHTML = '';
                        }, 3000);
                    }
                });
        })
    });
}

// Fonction d'affichage et modifications des produits
async function gestionProduct() {

    const containerFormProductSearch = document.createElement('div');
    containerFormProductSearch.className = 'flex justify-center text-white'
    const craftFormProductSearch = document.createElement('div');
    craftFormProductSearch.className = 'flex justify-center w-10/12 pt-6 pb-4 overflow-y-auto border-b-2 border-[#a8b3cfa3]';
    craftFormProductSearch.innerHTML = `
        <form action="" method="post" id="formProductSearch" class="w-full">
            <div class="flex justify-between w-full">
                <div id="modalAddProduct" class="flex flex-col">
                    <label for="searchCategory">Sélectionner une catégorie</label>
                    <select name="searchCategory" id="searchCategory" class="p-4 bg-[#1c1f26] rounded-[14px] border-[1px] border-[#a8b3cf33]">
                        <option value="0" class="bg-opacity-50 backdrop-filter backdrop-blur-lg hover:bg-opacity-75 hover:saturate-100">Selectionner</option>
                    </select>
                </div>
                <div id="modalAddProduct"  class="flex flex-col">
                    <label for="searchSubCategory">Sélectionner une sous-catégorie</label>
                    <select name="searchSubCategory" id="searchSubCategory" class="p-4 bg-[#1c1f26] rounded-[14px] border-[1px] border-[#a8b3cf33]">
                        <option value="0" class="bg-opacity-50 backdrop-filter backdrop-blur-lg hover:bg-opacity-75 hover:saturate-100">Selectionner</option>
                    </select>
                </div>
            </div>
        </form>
                `;
    containerFormProductSearch.appendChild(craftFormProductSearch);
    containerAllDiv.appendChild(containerFormProductSearch);
    const optionSearchCategory = document.querySelector('#searchCategory');
    const optionSearchSubCategory = document.querySelector('#searchSubCategory');
    displayCategory(optionSearchCategory);

    function updateSubCategories(categoryId) {
        const subCategorySelect = document.querySelector('#searchSubCategory');
        subCategorySelect.innerHTML = '<option value="0">Selectionner</option>';

        fetch(`src/php/fetch/category/displaySubCatFormCat.php?id=${categoryId}`)
            .then(response => response.json())
            .then(data => {
                for (let subCategory of data.displaySubCategories) {
                    const option = document.createElement('option');
                    option.value = subCategory.id_subcategories;
                    option.text = subCategory.name_subcategories;
                    subCategorySelect.appendChild(option);
                }
            })
            .catch(error => console.error(error));
    }

    optionSearchCategory.addEventListener('change', function(event) {
        const categoryId = event.target.value;
        updateSubCategories(categoryId);
    });

    function getProductsBySubCategoryId(subCategoryId) {
        return fetch(`src/php/fetch/produit/displayProductFormSubCat.php?subcategories_id=${subCategoryId}`)
            .then(response => response.json())
            .then(data => {
                return data.displayProducts;
            })
            .catch(error => console.error(error));
    }
    const subCategorySelect = document.querySelector('#searchSubCategory');
    subCategorySelect.addEventListener('change', async function() {
        const subCategoryId = subCategorySelect.value;
        const ContainerDisplayProduct = document.createElement('div');
        ContainerDisplayProduct.id = 'displayProduct';
        ContainerDisplayProduct.className = 'flex flex-col items-center justify-center';
        ContainerDisplayProduct.innerHTML = '';

        if (subCategoryId !== '0') {
            const products = await getProductsBySubCategoryId(subCategoryId);

                products.forEach(product => {
                    ContainerDisplayProduct.innerHTML += `
                <div class="w-10/12">
                    <div class="flex m-1 p-2 px-4 bg-[#43464c] rounded-[14px] border-[1px] border-[#a8b3cf33] text-white">
                        <div id="displayProductContainer" class="w-[12rem] flex flex-col">
                            <img src="src/images/products/${product.img_product}" alt="${product.name_product}" class="max-w-fit">
                        </div>
                        <div id="displayProductContainer">
                            <div class="flex flex-col space-y-1">
                                <div id="titre_produit" class="flex space-x-1">
                                    <h2 class="font-normal">Titre :</h2>
                                    <h2>${product.name_product}</h2>
                                </div>
                                <div id="description_produit" class="flex flex-col space-x-1 w-8/12">
                                    <h2 class="font-normal">A propos du jeu</h2>
                                    <h2>${product.description_product}</h2>
                                </div>
                            </div>
                            <div id="containerProductInformation" class="flex justify-between px-16">
                                <div id="prix_produit" class="flex space-x-0.5">
                                    <h2 class="font-normal text-white">Prix :</h2>
                                    <h2>${product.price_product} €</h2>
                                </div>
                                <div id="date_sortie_produit" class="flex space-x-0.5"> 
                                    <h2 class="font-normal text-white">Date de sortie :</h2>
                                    <h2>${formatDateSansh(product.released_date_product)}</h2>
                                </div>
                                <div id="categorie_produit" class="flex space-x-0.5">
                                    <h2 class="font-normal text-white">Genre :</h2>
                                    <h2>${product.name_subcategories}</h2>
                                </div>
                            </div>
                            <div id="containerProductInformation" class="flex justify-between px-16">
                                <div id="stock_produit" class="flex space-x-0.5">
                                    <h2 class="font-normal text-white">Stock :</h2>
                                    <h2>${product.quantite_product}</h2>
                                </div>
                                <div class="flex space-x-0.5">
                                    <h2 class="font-normal text-white">Nombre de vente :</h2> 
                                    <h2>${product.quantite_vendue}</h2>
                                </div>
                            </div>
                            <div id="containerBtnUpdateProduct" class="flex justify-between px-16">
                                <div id="wapperFormUpdateProduct">
                                    <button type="button" class="bg-green-500 text-white p-2 rounded-lg" id="btnUpdateProduct_${product.id_product}" data-id-product="${product.id_product}">Modifier</button>
                                </div>
                                <div id="wapperFormDeleteProduct">
                                    <button type="button" class="bg-orange-600 text-white p-2 rounded-lg" id="btnArchiverProduct_${product.id_product}" data-id-product="${product.id_product}">Archiver</button>
                                </div>
                                <div id="wapperFormDeleteProduct">
                                    <form action="" method="post" id="formDeleteProduct" class="flex flex-col space-y-2" data-id-product="${product.id_product}">
                                        <button type="button" class="bg-red-500 text-white p-2 rounded-lg" id="btnDeleteProduct">Supprimer</button>
                                    </form>
                                </div> 
                            </div>
                        </div>
                    </div>
                    `;
                    containerAllDiv.appendChild(ContainerDisplayProduct);
                    // Modifier un produit
                });
                for (let product of products) {
                    const btnUpdateProduct = document.querySelector(`#btnUpdateProduct_${product.id_product}`);
                    btnUpdateProduct.addEventListener('click',  (ev) => {
                        const dialogUpdateProduct = document.createElement('dialog');
                        containerdialogUpdateProduct.classList.add('bg-overlay-quaternary-onion');
                        dialogUpdateProduct.setAttribute('id', 'dialog');
                        dialogUpdateProduct.className = 'bg-white p-2 rounded-lg lg:w-9/12 w-3/4';
                        dialogUpdateProduct.innerHTML = `
                                <div class="flex flex-col space-y-2">
                                    <div id="dialogUpdateProductForm" class="flex justify-between">
                                        <h2 class="font-bold text-slate-700">Modifier un produit</h2>
                                        <button type="button" class="bg-red-500 text-white p-2 rounded-lg" id="btncloseDialogUpdate">&times;</button>
                                    </div>
                                    <form action="" method="post" id="formUpdateProduct" class="flex flex-col space-y-2" enctype="multipart/form-data" data-id-product="${product.id_product}">
                                        <div id="dialogUpdateProductForm" class="flex flex-col">
                                            <label for="updateNameProduct" class="font-normal text-slate-600">Titre du produit</label>
                                            <input type="text" name="updateNameProduct" id="updateNameProduct" value="${product.name_product}" class="bg-slate-100 p-2 rounded-lg">
                                            <small id="errorUpdateNameProduct" class="text-red-500 dummyClass"></small>
                                        </div>
                                        <div id="dialogUpdateProductForm" class="flex flex-col">
                                            <label for="updateDescriptionProduct">Description du produit</label>
                                            <textarea name="updateDescriptionProduct" id="updateDescriptionProduct" cols="30" rows="10"  class="bg-slate-100 p-2 rounded-lg">${product.description_product}</textarea>
                                            <small id="errorUpdateDescriptionProduct" class="text-red-500 dummyClass"></small>
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <div id="dialogUpdateProductForm" class="flex flex-col">
                                                <label for="updatePriceProduct">Prix du produit</label>
                                                <input type="text" name="updatePriceProduct" id="updatePriceProduct" value="${product.price_product}" class="bg-slate-100 p-2 rounded-lg">
                                                <small id="errorUpdatePriceProduct" class="text-red-500 dummyClass"></small>
                                            </div>
                                            <div id="dialogUpdateProductForm" class="flex flex-col">
                                                <label for="updateQuantiteProduct">Quantité du produit</label>
                                                <input type="number" name="updateQuantiteProduct" id="updateQuantiteProduct" value="${product.quantite_product}" class="bg-slate-100 p-2 rounded-lg">
                                                <small id="errorUpdateStockProduct" class="text-red-500 dummyClass"></small>
                                            </div>
                                        </div>
                                        <div id="dialogUpdateProductForm" class="flex flex-col">
                                            <label for="updateImgProduct">Image du produit</label>
                                            <div class="flex items-center justify-center">
                                                <img src="src/images/products/${product.img_product}" alt="Image du produit" class="w-20 h-20">
                                                <input type="hidden" name="updateImgProductName" id="updateImgProductName" value="${product.img_product}">
                                                <input type="file" name="updateImgProduct" id="updateImgProduct" value="${product.img_product}" class="bg-slate-100 p-2 rounded-lg">
                                            </div>
                                            <small id="errorUpdateImageProduct" class="text-red-500 dummyClass"></small>
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <div id="dialogUpdateProductForm" class="flex flex-col">
                                                <label for="updateReleasedDateProduct">Date de sortie du produit</label>
                                                <input type="date" name="updateReleasedDateProduct" id="updateReleasedDateProduct" value="${product.released_date_product}" class="bg-slate-100 p-2 rounded-lg">
                                                <small id="errorUpdateReleaseProduct" class="text-red-500 dummyClass"></small>
                                            </div>
                                            <div id="dialogUpdateProductForm" class="flex flex-col">
                                                <label for="updateSubCategory">Sous-catégorie</label>
                                                <input type="hidden" id="subCategoryId" name="subCategoryId" value="${product.subcategories_id}">
                                                <input type="text" name="updateSubCategory" id="updateSubCategory" value="${product.name_subcategories}" class="bg-slate-100 p-2 rounded-lg">
                                                <small id="errorUpdateCategoryProduct" class="text-red-500 dummyClass"></small>
                                                <div id="displaySearchSubCategories"></div>
                                            </div>
                                        </div>
                                        <div id="messageDialogUpdateProduct" class="h-12"></div>
                                        <div id="dialogUpdateProductForm">
                                            <button type="submit" class="bg-green-500 text-white p-2 rounded-lg" id="btnUpdateProduct">Modifier</button>
                                        </div>
                                        
                                    </form>
                                </div>
                            `;
                        containerdialogUpdateProduct.appendChild(dialogUpdateProduct);

                        dialogUpdateProduct.showModal();


                        const BtnCloseDialogUpdateProduct = document.getElementById('btncloseDialogUpdate');
                        BtnCloseDialogUpdateProduct.addEventListener('click', () => {
                            dialogUpdateProduct.close();
                            containerdialogUpdateProduct.classList.remove('bg-overlay-quaternary-onion');
                            containerdialogUpdateProduct.innerHTML = '';
                        });

                        let selectedSubCategoryId = null;

                        const searchSubCategories = document.querySelector('#updateSubCategory');
                        const displaySearchSubCategories = document.querySelector('#displaySearchSubCategories');
                        searchSubCategories.addEventListener('input', () => {
                            let query = searchSubCategories.value;
                            fetch(`src/php/fetch/category/searchSubCategories.php?query=${query}`)
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data);
                                    displaySearchSubCategories.innerHTML = '';
                                    for (let content of data.displaySubCategories) {
                                        displaySearchSubCategories.innerHTML += `
                        <div class="search-result p-0.5 bg-slate-100" data-id="${content.id_subcategories}">
                            <p>${content.name_subcategories}</p>
                            <small>${content.name_categories}</small>
                        </div>
                    `;
                                    }
                                    // Ajouter un événement de clic sur chaque résultat de recherche
                                    const searchResults = document.querySelectorAll('.search-result');
                                    for (let result of searchResults) {
                                        result.addEventListener('click', () => {
                                            selectedSubCategoryId = result.getAttribute('data-id');
                                            const subCategoryName = result.querySelector('p').textContent;
                                            searchSubCategories.value = subCategoryName;
                                            // Faites quelque chose avec l'ID de sous-catégorie sélectionné
                                            document.querySelector('#subCategoryId').value = selectedSubCategoryId; // Mettre l'id sélectionné comme valeur de l'input caché
                                            displaySearchSubCategories.innerHTML = ''; // Cacher les résultats de recherche
                                        });
                                    }
                                });
                        });
                        const formUpdateProduct = document.getElementById('formUpdateProduct');
                        formUpdateProduct.addEventListener('submit', async (e) => {
                            e.preventDefault();
                            await fetch(`src/php/fetch/produit/updateProduct.php?id_produits=${product.id_product}`, {
                                method: 'POST',
                                body: new FormData(formUpdateProduct)
                            }) .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                const nameInput = document.getElementById('updateNameProduct');
                                const descriptionInput = document.getElementById('updateDescriptionProduct');
                                const priceInput = document.getElementById('updatePriceProduct');
                                const quantiteInput = document.getElementById('updateQuantiteProduct');
                                const releasedDateInput = document.getElementById('updateReleasedDateProduct');
                                const imgInput = document.getElementById('updateImgProduct');
                                const subCategoryInput = document.getElementById('updateSubCategory');

                                const messageDialogUpdateProduct = document.getElementById('messageDialogUpdateProduct');
                                const smallMessageDummy = document.querySelectorAll('.dummyClass');
                                if (data.status === 'EmptyFields') {
                                    smallMessageDummy.forEach(message => {
                                        const containerMessage = document.createElement('div');
                                        containerMessage.className = 'flex items-center space-x-2';
                                        containerMessage.innerHTML = `
                                        <img src="public/images/icones/danger-icones-red.svg" alt="" class="w-5 h-5">
                                        <small id="errorUpdateNameProduct" class="text-red-500">Champs Requis</small>`;
                                        message.appendChild(containerMessage);
                                    });
                                    nameInput.classList.add('input_error');
                                    descriptionInput.classList.add('input_error');
                                    priceInput.classList.add('input_error');
                                    quantiteInput.classList.add('input_error');
                                    releasedDateInput.classList.add('input_error');
                                    imgInput.classList.add('input_error');
                                    subCategoryInput.classList.add('input_error');
                                    displayErrorMessageFormUpdateProduct(messageDialogUpdateProduct, 'Veuillez remplir tous les champs');
                                } if (data.status === 'EmptyName') {
                                    nameInput.classList.add('input_error');
                                    const smallName = document.getElementById('errorUpdateNameProduct');
                                    displayErrorMessageInput(smallName, 'Champs Requis');
                                    displayErrorMessageFormUpdateProduct(messageDialogUpdateProduct, 'Veuillez remplir le champs titre du produit');
                                } if (data.status === 'EmptyDescription') {
                                    descriptionInput.classList.add('input_error');
                                    const smallDescription = document.getElementById('errorUpdateDescriptionProduct');
                                    displayErrorMessageInput(smallDescription, 'Champs Requis');
                                    displayErrorMessageFormUpdateProduct(messageDialogUpdateProduct, 'Veuillez remplir le champs description du produit');
                                } if (data.status === 'EmptyPrice') {
                                    priceInput.classList.add('input_error');
                                    const smallPrice = document.getElementById('errorUpdatePriceProduct');
                                    displayErrorMessageInput(smallPrice, 'Champs Requis');
                                    displayErrorMessageFormUpdateProduct(messageDialogUpdateProduct, 'Veuillez remplir le champs prix du produit');
                                } if (data.status === 'EmptyQuantite') {
                                    quantiteInput.classList.add('input_error');
                                    const smallQuantite = document.getElementById('errorUpdateStockProduct');
                                    displayErrorMessageInput(smallQuantite, 'Champs Requis');
                                    displayErrorMessageFormUpdateProduct(messageDialogUpdateProduct, 'Veuillez remplir le champs quantité du produit');
                                } if (data.status === 'EmptyDateReleased') {
                                    releasedDateInput.classList.add('input_error');
                                    const smallReleasedDate = document.getElementById('errorUpdateReleasedDateProduct');
                                    displayErrorMessageInput(smallReleasedDate, 'Champs Requis');
                                    displayErrorMessageFormUpdateProduct(messageDialogUpdateProduct, 'Veuillez remplir le champs date de sortie du produit');
                                } if (data.status === 'EmptyImg') {
                                    imgInput.classList.add('input_error');
                                    const smallImg = document.getElementById('errorUpdateImgProduct');
                                    displayErrorMessageInput(smallImg, 'Champs Requis');
                                    displayErrorMessageFormUpdateProduct(messageDialogUpdateProduct, 'Veuillez remplir le champs image du produit');
                                } if (data.status === 'EmptySubCategoryId') {
                                    subCategoryInput.classList.add('input_error');
                                    const smallSubCategory = document.getElementById('errorUpdateSubCategory');
                                    displayErrorMessageInput(smallSubCategory, 'Champs Requis');
                                    displayErrorMessageFormUpdateProduct(messageDialogUpdateProduct, 'Veuillez remplir le champs sous-catégorie du produit');
                                } if (data.status === 'success') {
                                    displaySuccessMessageFormUpdateProduct(messageDialogUpdateProduct, 'Produit modifié avec succès');
                                    setTimeout(() => {
                                        dialogUpdateProduct.close();
                                        dialogUpdateProduct.remove();
                                    }, 3000);
                                }
                            });
                        });
                    });
                    const btnArchiverProduct = document.querySelector(`#btnArchiverProduct_${product.id_product}`);
                    btnArchiverProduct.addEventListener('click', async () => {
                        await fetch(`src/php/fetch/produit/archiveProduct.php?id_produits=${product.id_product}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.status === 'error') {
                                displayErrorMessageFormUpdateProduct(containerdialogUpdateProduct, 'Une erreur est survenue');
                            } if (data.status === 'success') {
                                displaySuccessMessageFormUpdateProduct(containerdialogUpdateProduct, 'Produit archivé avec succès');
                                setTimeout(() => {
                                    containerdialogUpdateProduct.innerHTML = '';
                                }, 3000);
                            }
                        });
                    });
                    }
            }
    });
}

// Fonction gestion de catégorie
async function gestionCategory() {
    const containerCategoriesAndSubCategories = document.createElement('div');
    containerCategoriesAndSubCategories.setAttribute('id', 'containerCategoriesAndSubCategories');
    containerCategoriesAndSubCategories.className = 'flex w-7/12 mx-auto pt-4';
    containerAllDiv.appendChild(containerCategoriesAndSubCategories);

    const wapperGestionCategory = document.createElement('div');
    wapperGestionCategory.setAttribute('id', 'wapperGestionCategory');
    containerCategoriesAndSubCategories.appendChild(wapperGestionCategory);

    const ContainerGestionCategory = document.createElement('div');
    ContainerGestionCategory.setAttribute('id', 'ContainerGestionCategory');
    ContainerGestionCategory.className = 'flex flex-col items-center p-3 border-1 border-gray-300 rounded-md';
    wapperGestionCategory.appendChild(ContainerGestionCategory);


    async function displayCategories() {
        await fetch('src/php/fetch/category/displayCategories.php')
            .then(response => response.json())
            .then(data => {
                ContainerGestionCategory.innerHTML = '';
                data.forEach(category => {
                    ContainerGestionCategory.innerHTML += `
                <div id="containerCategoryProduct" class="flex space-x-2 py-0.5">
                    <form action="" method="post" class="flex space-x-2" id="update_${category.id_categories}"  data-id-cat="${category.id_categories}">
                        <input type="text" name="nom" id="nom" placeholder="${category.name_categories}" class="p-2 rounded-[14px] bg-[#41474c] hover:bg-[#464c51] focus:outline-none textField_border hover:border-[#A87EE6FF]">
                        <button type="submit" class="text-[#A8B3CF] p-2 rounded-lg duration-100 ease-in hover:text-[#39e58c] hover:bg-[#1ddc6f3d]" name="btnUpdateCategory" id="btnUpdateCategory_${category.id_categories}">
                            <svg width="1.5em" height="1.5em" fill="#a8b3cf" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none">
                                <path d="M14.1824404,1.6172889 C16.3256165,-0.522826061 19.7912803,-0.520842405 22.0494443,1.51550529 L22.271142,1.72591728 L22.4818462,1.94787454 C24.4530473,4.13313365 24.5205684,7.44268703 22.5896371,9.5969067 L22.3827528,9.81554226 L10.6078507,21.5904402 C9.09044506,23.1026696 7.072424,23.9502567 4.9150063,23.9970158 L4.53291203,23.9970158 L0.0999260362,23.8991341 L0.00213362205,19.4661481 C-0.045784211,17.2940054 0.714752369,15.2394924 2.1489402,13.6637582 L2.40899765,13.3907309 L14.1824404,1.6172889 Z M11.9064782,6.72167754 L3.82321121,14.8049445 C2.69189074,15.9401436 2.05176733,17.4453872 2.00300766,19.0717655 L2.00164715,19.4220385 L2.05723408,21.9418261 L4.57702164,21.997413 L4.92729521,21.9960507 C6.43751089,21.9507562 7.84337465,21.3954025 8.94686226,20.4090477 L9.19605549,20.1738125 L17.2773343,12.0925337 L11.9064782,6.72167754 Z M18.2051113,2.00095629 C17.3386516,1.98283908 16.4781596,2.26385506 15.7950747,2.8481288 L15.5956429,3.03251278 L13.6967636,4.93139216 L19.0676197,10.3022483 L20.9685393,8.4013287 C22.3855182,6.98232025 22.3368069,4.62186337 20.8579051,3.14110678 C20.180157,2.46429378 19.3167369,2.08700734 18.4434061,2.013476 L18.2051113,2.00095629 Z" fill="currentcolor" fill-rule="evenodd"></path>
                            </svg>
                        </button>
                    </form>
                    <form action="" method="post" class="flex space-x-2" id="delete_${category.id_categories}"  data-id-cat="${category.id_categories}">
                        <button type="submit" class="text-[#A8B3CF] p-2 rounded-lg duration-100 ease-in hover:text-[#ff3b3b] hover:bg-[#ff606033]" name="btnDeleteCategory" id="btnDeleteCategory_${category.id_categories}">
                            <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z" fill="currentcolor" fill-rule="evenodd"></path></svg>                        
                        </button>
                    </form>
                </div>
                `;
                })
                data.forEach(category => {
                    const formUpdateCategory = document.querySelector(`#update_${category.id_categories}`);
                    formUpdateCategory.addEventListener('submit', async (ev) => {
                        ev.preventDefault();
                        let categoryId = ev.target.closest('form').getAttribute('data-id-cat');
                        let name = ev.target.querySelector('#nom').value;
                        await fetch(`src/php/fetch/category/updateCategory.php?id=${categoryId}&name=${name}`)
                            .then(response => response.json())
                            .then(data => {
                                if (data.status === 'success') {
                                    message.innerHTML = data.message;
                                    displaySuccess(message);
                                    displayCategories();
                                } else {
                                    message.innerHTML = data.message;
                                    displayError(message);
                                }
                            })
                    })
                    const formDeleteCategory = document.querySelector(`#delete_${category.id_categories}`);
                    formDeleteCategory.addEventListener('submit', async (ev) => {
                        ev.preventDefault();
                        let categoryId = ev.target.closest('form').getAttribute('data-id-cat');
                        // Afficher une boîte de dialogue de confirmation avant la suppression
                        if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ? Cette action supprimera également toutes les sous-catégories associées.")) {
                            await fetch(`src/php/fetch/category/supprCategory.php?id=${categoryId}`)
                                .then(response => response.json())
                                .then(data => {
                                    if (data.status === 'success') {
                                        message.innerHTML = data.message;
                                        displaySuccess(message);
                                        displayCategories();
                                    } else {
                                        message.innerHTML = data.message;
                                        displayError(message);
                                    }
                                })
                        }
                    })

                })
            })
    }
    displayCategories();
    const containerCreateBtnAddCategory = document.createElement('div');
    containerCreateBtnAddCategory.setAttribute('id', 'containerCreateBtnAddCategory');
    containerCreateBtnAddCategory.setAttribute('class', 'flex flex-col items-center justify-center');

    wapperGestionCategory.appendChild(containerCreateBtnAddCategory);
    containerCreateBtnAddCategory.innerHTML = `
        <button type="button" class="bg-transparent p-2 border-2 border-white rounded-[12px] w-full text-white flex items-center hover:bg-slate-900 text-center font-bold flex justify-center mx-2" id="btnAddCategory_">
            <svg width="32" height="32" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M6.99999 12H12M12 12H17M12 12V6.99999M12 12V17M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z"></path></svg>
            Ajouter une catégorie
        </button>
    `;

    const btnAddCategory = document.querySelector('#btnAddCategory_');
    btnAddCategory.addEventListener('click', () => {
        const formAddCategory = document.querySelector('#formAddCategory');
        formAddCategory.innerHTML = `
                <form action="" method="post" class="flex space-x-2 block mt-2" id="addCategory">
                    <input type="text" name="nom" id="nom" placeholder="Nom de la catégorie" class="bg-[#41474c] hover:bg-[#464c51] focus:outline-none textField_border hover:border-[#A87EE6FF] rounded-[14px] p-2">
                    <button type="submit" class="bg-green-500 p-2 rounded-lg text-white" name="btnAddCategory" id="btnAddCategory">
                        Ajouter
                    </button>
                </form>
                `;
        // Si le formulaire est déjà affiché, on le masque
        if (formAddCategory.style.display === 'block') {
            formAddCategory.style.display = 'none';
            btnAddCategory.textContent = 'Ajouter une catégorie';
        } else {
            // Sinon, on l'affiche
            formAddCategory.style.display = 'block';
            btnAddCategory.textContent = 'Annuler';
        }
        const FormAddCategorySubmit = document.querySelector('#addCategory');
        FormAddCategorySubmit.addEventListener('submit', async (e) => {
            e.preventDefault();
            await fetch('src/php/fetch/category/addCategory.php', {
                method: 'POST',
                body: new FormData(FormAddCategorySubmit)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        message.innerHTML = data.message;
                        displaySuccess(message);
                        displayCategories();
                    }
                    if (data.status === 'error') {
                        message.innerHTML = data.message;
                        displayError(message);
                    }
                })
        })
    })
    const formAddCategory = document.createElement('div');
    formAddCategory.setAttribute('id', 'formAddCategory');
    formAddCategory.setAttribute('class', 'flex space-x-2 block');
    containerCreateBtnAddCategory.appendChild(formAddCategory);
}

async function gestionSubCategories() {
    const containerCategoriesAndSubCategories = document.querySelector('#containerCategoriesAndSubCategories');
    const createContainerAddSubCategory = document.createElement('div');
    createContainerAddSubCategory.setAttribute('id', '__containerAddSubCategory');
    containerCategoriesAndSubCategories.appendChild(createContainerAddSubCategory);
    createContainerAddSubCategory.innerHTML = '';
    createContainerAddSubCategory.innerHTML = `
        <div id="containerAddSubCategory" class="flex space-x-2">
            <form id="formSubCategories" method="post">
                <label for="category" class="text-white">Sélectionnez une catégorie :</label>
                <select id="Categories" name="Categories" class="bg-[#41474c] hover:bg-[#464c51] focus:outline-none textField_border hover:border-[#A87EE6FF] rounded-[14px] p-2">
                    <option value="">Sélectionnez une catégorie</option>
                    <!-- Les options du select seront générées en JS -->
                </select>
            </form>
        </div>
        <div id="containerDisplaySubCategory" class="flex space-x-2">
            <!-- Les sous-catégories seront générées en JS -->
            <div id="displayListSubCategory"></div>
        </div>
        <div id="containerAddSubCategory" class="flex space-x-2"></div>
        `;
    const Categories = document.querySelector('#Categories');
    displayCategory(Categories);

    displaySubCategories();
    async function displaySubCategories() {
        const formSubCategories = document.querySelector('#formSubCategories');
        formSubCategories.addEventListener('change', async (ev) => {
            ev.preventDefault();
            await fetch(`src/php/fetch/category/displaySubCatFormCat.php?id=${Categories.value}`)
                .then(response => response.json())
                .then(data => {
                    const displayListSubCategory = document.querySelector('#displayListSubCategory');
                    displayListSubCategory.innerHTML = '';
                    for (let subCategory of data.displaySubCategories) {
                        displayListSubCategory.innerHTML += `
                    <div id="wapperSubCategory" class="flex space-x-2 py-0.5">
                        <form action="" method="post" id="formDisplaySubCategory_${subCategory.id_subcategories}">
                            <input type="text" name="nom" id="nom" value="${subCategory.name_subcategories}" class="bg-[#E9E9E9] rounded-lg p-2">
                            <button type="submit" class="bg-green-500 p-2 rounded-lg text-white" name="btnUpdateSubCategory" id="btnUpdateSubCategory_${subCategory.id_subcategories}">
                                Modifier
                            </button>
                        </form>
                        <form action="" method="post" class="flex space-x-2" id="delete_${subCategory.id_subcategories}"  data-id-cat="${subCategory.id_subcategories}">
                            <button type="submit" class="bg-red-500 p-2 rounded-lg text-white" name="btnDeleteSubCategory" id="btnDeleteSubCategory${subCategory.id_subcategories}">
                                Supprimer
                            </button>
                        </form>
                    </div>
                `;
                    }
                    for (let subCategory of data.displaySubCategories) {
                        const btnDeleteSubCategory = document.querySelector(`#btnDeleteSubCategory${subCategory.id_subcategories}`);
                        btnDeleteSubCategory.addEventListener('click', async (e) => {
                            e.preventDefault();
                            await fetch(`src/php/fetch/category/deleteSubCategory.php?id=${subCategory.id_subcategories}`)
                                .then(response => response.json())
                                .then(data => {
                                    if (data.status === 'success') {
                                        message.innerHTML = data.message;
                                        displaySuccess(message);
                                        displaySubCategories();
                                    }
                                    if (data.status === 'error') {
                                        message.innerHTML = data.message;
                                        displayError(message);
                                    }
                                })
                        })
                    }
                    for (let subCategory of data.displaySubCategories) {
                        const formModifySubCategory = document.querySelector(`#formDisplaySubCategory_${subCategory.id_subcategories}`);
                        formModifySubCategory.addEventListener('submit', async (ev) => {
                            ev.preventDefault();
                            await fetch(`src/php/fetch/category/updateSubCategory.php?id=${subCategory.id_subcategories}`, {
                                method: 'POST',
                                body: new FormData(formModifySubCategory)
                            })
                                .then(response => response.json())
                                .then(data => {
                                    if (data.status === 'success') {
                                        message.innerHTML = data.message;
                                        displaySuccess(message);
                                        displaySubCategories();
                                    }
                                    if (data.status === 'error') {
                                        message.innerHTML = data.message;
                                        displayError(message);
                                    }
                                })
                        })
                    }
                })
        })
    }
    const containerBtnAddSubCategory = document.querySelector('#containerAddSubCategory');
    const createBtnAddSubCategory = document.createElement('button');
    createBtnAddSubCategory.setAttribute('id', 'btnAddSubCategory_');
    createBtnAddSubCategory.setAttribute('class', 'bg-transparent p-2 border-2 border-white rounded-[12px] w-full text-white flex items-center hover:bg-slate-900 text-center font-bold flex justify-center');
    createBtnAddSubCategory.textContent = 'Ajouter une sous-catégorie';
    containerBtnAddSubCategory.appendChild(createBtnAddSubCategory);

    const formAddSubCategory = document.createElement('div');
    formAddSubCategory.setAttribute('id', 'formAddSubCategory');
    formAddSubCategory.setAttribute('class', 'flex space-x-2 block');
    containerCategoriesAndSubCategories.appendChild(formAddSubCategory);



    const btnAddSubCategory = document.querySelector('#btnAddSubCategory_');
    btnAddSubCategory.addEventListener('click', () => {
        const formAddSubCategory = document.querySelector('#formAddSubCategory');
        formAddSubCategory.innerHTML = `
        <form action="" method="post" class="flex space-x-2 block" id="addSubCategory">
            <input type="text" name="nom" id="nom" placeholder="Nom de la sous-catégorie" class="bg-[#E9E9E9] rounded-lg p-2">
            <button type="submit" class="bg-green-500 p-2 rounded-lg text-white" name="btnAddSubCategory" id="btnAddSubCategory">
                Ajouter
            </button>
        </form>
        `;
        // Si le formulaire est déjà affiché, on le masque
        if (formAddSubCategory.style.display === 'block') {
            formAddSubCategory.style.display = 'none';
            btnAddSubCategory.textContent = 'Ajouter une catégorie';
        } else {
            // Sinon, on l'affiche
            formAddSubCategory.style.display = 'block';
            btnAddSubCategory.textContent = 'Annuler';
        }
        const FormAddSubCategorySubmit = document.querySelector('#addSubCategory');
        FormAddSubCategorySubmit.addEventListener('submit', async (ev) => {
            ev.preventDefault();
            const categoryId = Categories.value;
            if (!categoryId) {
                console.error('Category ID is not defined');
                return;
            }
            await fetch(`src/php/fetch/category/addSubCategory.php?id=${categoryId}`, {
                method: 'POST',
                body: new FormData(FormAddSubCategorySubmit)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        message.innerHTML = data.message;
                        displaySuccess(message);
                        displaySubCategories();
                    }
                    if (data.status === 'error') {
                        message.innerHTML = data.message;
                        displayError(message);
                    }
                });
        });

    })
}
// Fonction pagination pour les utilisateurs
async function paginationUser(search, order, parentSelector) {
    await fetch(`src/php/fetch/dashboard/paginationUser.php?search=${search}&order=${order}`)
        .then(response => response.json())
        .then(data => {
            let pageUser = '';
            for (let i = 0; i < data.pages.length; i++) {
                const page = data.pages[i];
                if (page > 0) {
                    pageUser += `
                    <li class="flex p-2">
                        <button class="page-link px-4 py-2 rounded-[14px] bg-transparent border border-white font-light text-white" id="pageUser${page}">${page}</button>
                    </li>
                `;
                }
                parentSelector.innerHTML = pageUser;
            }
        })
}
const params = new URLSearchParams(window.location.search);
const page = params.get('page') || 1;
const search = params.get('search') || '';
const order = params.get('order') || 'DESC';
async function gestionUser(page, search, order) {
    const modiyprofil = document.querySelector('#containerModifyProduct');
    modiyprofil.className = 'flex flex-row justify-center items-center space-x-2';
    let wapperUserInfos1 = document.querySelector('#wapperUserInfos');
    if (wapperUserInfos1) {
        wapperUserInfos1.remove();
    }
    const wapperUserInfos = document.createElement('div');
    wapperUserInfos.setAttribute('id', 'wapperUserInfos');
    wapperUserInfos.className = 'flex flex-col justify-center items-around space-y-2 w-10/12';
    containerAllDiv.appendChild(wapperUserInfos);
    wapperUserInfos.innerHTML = '';

    const containerFormSearch = document.createElement('div');
    containerFormSearch.setAttribute('id', 'containerFormSearch');
    containerFormSearch.setAttribute('class', 'flex justify-between items-center');
    wapperUserInfos.appendChild(containerFormSearch);
    containerFormSearch.innerHTML = '';

    const containerUserInfo = document.createElement('div');
    containerUserInfo.setAttribute('id', 'containerUserInfo');
    containerUserInfo.setAttribute('class', 'flex flex-col space-y-2 py-3');
    wapperUserInfos.appendChild(containerUserInfo);
    containerUserInfo.innerHTML = '';

    const containerPagination = document.createElement('div');
    containerPagination.setAttribute('id', 'containerPagination');
    containerPagination.setAttribute('class', 'flex justify-center');
    wapperUserInfos.appendChild(containerPagination);
    containerPagination.innerHTML = '';

    containerFormSearch.innerHTML = `
        <form action="" method="post" class="flex justify-between items-center space-x-2 m-2 bg-[#242629] text-white w-full" id="formSearchUser">
            <input type="text" name="search" id="search" placeholder="Rechercher un utilisateur" class="p-2 rounded-lg bg-[#41474c] hover:bg-[#464c51] border-l-4 border-[#a8b3cfa3] hover:border-[#A87EE6FF]">
            <select name="order" id="order" class="p-2 rounded-lg bg-[#41474c] hover:bg-[#464c51] border-l-4 border-[#a8b3cfa3] hover:border-[#A87EE6FF]">
                <option value="DESC">Plus récent</option>
                <option value="ASC">Plus ancien</option>
            </select>
        </form>
    `;
    fetchUser(page, search, order);
    const searchInput = document.querySelector('#search');
    searchInput.addEventListener('keyup', (ev) => {
        search = ev.target.value;
        fetchUser(page, search, order);
    });

    const orderSelect = document.querySelector('#order');
    orderSelect.addEventListener('change', (ev) => {
        order = ev.target.value;
        fetchUser(page, search, order);
    });
    paginationUser(search = '', order = 'DESC', containerPagination);
}

async function fetchUser(page = 1, search = '', order = 'DESC') {

    console.log(page, search, order);
    const response = await fetch(`src/php/fetch/dashboard/gestionUser.php?page=${page}&search=${search}&order=${order}`);
    const data = await response.json();
    if (data.status === 'success') {
        const users = JSON.parse(data.users);
        containerUserInfo.innerHTML = '';
        let tableHtml = `
                <table class="text-white border border-[#a8b3cf33] rounded-[14px]">
                  <thead class="bg-[#0e1217]">
                    <tr class=" border border-[#a8b3cf33]">
                        <th class="p-2 border border-[#a8b3cf33]">Login</th>
                        <th class="p-2 border border-[#a8b3cf33]">Email</th>
                        <th class="p-2 border border-[#a8b3cf33]">Type de compte</th>
                        <th class="p-2 border border-[#a8b3cf33]">Date d'inscription</th>
                        <th class="p-2 border border-[#a8b3cf33]">Profil</th>
                        <th class="p-2 border border-[#a8b3cf33]">Suppression</th>
                    </tr>
                  </thead>
                  <tbody>
                `;
            for (let user of users) {
                    let optionHtml = '';
                    if (user.type_compte_users === 'administrateur') {
                        optionHtml = `
              <option value="client">client</option>
            `;
                    } else if (user.type_compte_users === 'client') {
                        optionHtml = `
              <option value="administrateur">administrateur</option>
            `;
            }
            tableHtml += `
                <tr class="py-2 border border-[#a8b3cf33]">
                    <td class="flex justify-center">
                        <div class="p-1 flex items-center space-x-2">
                            <img src="src/images/avatars/${user.avatar_users}" alt="" class="rounded-full w-6">
                            <p>${user.login_users}</p>
                        </div>
                    </td>
                    <td class="text-center">${user.email_users}</td>
                    <td class="flex justify-center items-center"> 
                        <div id="containerUpdateDroits_${user.id_users}" class="flex">
                            <form action="resources/assests/fetch/updateDroits.php" method="post" id="updateDroits_${user.id_users}" data-id="${user.id_users}" class="flex space-x-2 items-center">
                                <select name="droits" id="droits" class="p-4 bg-[#1c1f26] rounded-[14px] border-[1px] border-[#a8b3cf33]">
                                    <option value="${user.type_compte_users}">${user.type_compte_users}</option>
                                    ${optionHtml}
                                </select>
                                <div id="btnSubmit">
                                    <button type="submit" class="text-[#A8B3CF] p-2 rounded-lg duration-100 ease-in hover:text-[#39e58c] hover:bg-[#1ddc6f3d] ">
                                            <svg width="1.5em" height="1.5em" fill="#a8b3cf" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none">
                                                <path d="M14.1824404,1.6172889 C16.3256165,-0.522826061 19.7912803,-0.520842405 22.0494443,1.51550529 L22.271142,1.72591728 L22.4818462,1.94787454 C24.4530473,4.13313365 24.5205684,7.44268703 22.5896371,9.5969067 L22.3827528,9.81554226 L10.6078507,21.5904402 C9.09044506,23.1026696 7.072424,23.9502567 4.9150063,23.9970158 L4.53291203,23.9970158 L0.0999260362,23.8991341 L0.00213362205,19.4661481 C-0.045784211,17.2940054 0.714752369,15.2394924 2.1489402,13.6637582 L2.40899765,13.3907309 L14.1824404,1.6172889 Z M11.9064782,6.72167754 L3.82321121,14.8049445 C2.69189074,15.9401436 2.05176733,17.4453872 2.00300766,19.0717655 L2.00164715,19.4220385 L2.05723408,21.9418261 L4.57702164,21.997413 L4.92729521,21.9960507 C6.43751089,21.9507562 7.84337465,21.3954025 8.94686226,20.4090477 L9.19605549,20.1738125 L17.2773343,12.0925337 L11.9064782,6.72167754 Z M18.2051113,2.00095629 C17.3386516,1.98283908 16.4781596,2.26385506 15.7950747,2.8481288 L15.5956429,3.03251278 L13.6967636,4.93139216 L19.0676197,10.3022483 L20.9685393,8.4013287 C22.3855182,6.98232025 22.3368069,4.62186337 20.8579051,3.14110678 C20.180157,2.46429378 19.3167369,2.08700734 18.4434061,2.013476 L18.2051113,2.00095629 Z" fill="currentcolor" fill-rule="evenodd"></path>
                                            </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </td>
                    <td class="text-center">${formatDate(user.created_at_users)}</td>
                    <td class="text-center">
                        <div id="btnForUpdateUser" class="flex justify-center">
                            <button class="text-[#A8B3CF] p-2 rounded-lg duration-100 ease-in hover:text-[#2cdce6] hover:bg-[#0dcfdc3d] " id="btnDetailUser_${user.id_users}">
                                <svg width="1.5em" height="1.5em" viewBox="-2 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M10 0a6.333 6.333 0 0 1 6.333 6.333c0 2.087-1.02 4.002-2.728 5.203l-.234.155.404.132.402.147.14.06.341.162c3.045 1.52 5.062 4.421 5.317 7.73l.02.357.006.354v.47l-.006.152-.01.138-.018.154a2.89 2.89 0 0 1-2.45 2.414l-.225.023-.283.018-2.646-.586a1.334 1.334 0 0 1-1.044-1.371l.017-.15.396-2.382.021-.153a1.334 1.334 0 0 0-1.108-1.445l-.11-.013-.109-.004-4.786-.002-.155.004c-.642.042-1.158.541-1.234 1.128l-.01.148.003.128.016.146.406 2.446a1.334 1.334 0 0 1-.883 1.48l-.145.04-2.645.586-.376-.026-.172-.02C1.192 23.762.213 22.769.028 21.45l-.024-.236L0 21.028l.002-.479.008-.354c.155-3.542 2.364-6.678 5.818-8.227.265-.102.531-.194.798-.276l-.023-.013A6.333 6.333 0 0 1 10 0Zm0 19.333A1.333 1.333 0 1 1 10 22a1.333 1.333 0 0 1 0-2.667Zm.002-6.16c-1.153 0-2.306.22-3.459.662-2.563 1.153-4.278 3.48-4.514 6.128l-.021.32-.007.31-.001.44.003.13.02.136c.07.309.301.556.6.65l.13.032.09.006 1.746-.387-.302-1.823-.025-.181-.015-.182-.005-.183.007-.22a3.334 3.334 0 0 1 2.892-3.085l.215-.021.22-.007h4.85l.183.005a3.333 3.333 0 0 1 3.15 3.44l-.015.216-.03.217-.302 1.824 1.753.388.138-.02a.89.89 0 0 0 .657-.598l.03-.131.011-.138v-.47l-.005-.316-.02-.321c-.207-2.45-1.682-4.627-3.916-5.858l-.295-.155-.304-.144-.432-.155a9.47 9.47 0 0 0-3.027-.509ZM10 2a4.333 4.333 0 1 0 1.796 8.278l.269-.134.258-.153.221-.15A4.333 4.333 0 0 0 10 2Z"  fill="currentcolor" fill-rule="evenodd"></path></svg>
                            </button>
                        </div>
                    </td>
                    <td class="text-center">
                        <div id="btnForDeleteUser">
                            <button class="text-[#A8B3CF] p-2 rounded-lg duration-100 ease-in hover:text-[#ff3b3b] hover:bg-[#ff606033]" id="btnDeleteUser_${user.id_users}">
                                <svg width="32" height="32" viewBox="0 0 24 24" stroke="#a8b3cf" fill="none" stroke-linejoin="round" stroke-width="1.8" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M17.9997 18L19.7675 16.2322M17.9997 18L16.232 19.7678M17.9997 18L16.232 16.2322M17.9997 18L19.7675 19.7678M14.9997 14.1241C14.081 13.7227 13.0664 13.5 11.9997 13.5C8.5419 13.5 5.63061 15.84 4.76307 19.0229C4.4726 20.0886 5.39517 21 6.49974 21H12.9997M15.4997 7C15.4997 8.933 13.9327 10.5 11.9997 10.5C10.0667 10.5 8.49974 8.933 8.49974 7C8.49974 5.067 10.0667 3.5 11.9997 3.5C13.9327 3.5 15.4997 5.067 15.4997 7Z" fill="currentcolor" fill-rule="nonzero"></path></svg>
                            </button>
                        </div>
                    </td> 
                </tr>
                        `;
                        }
                        tableHtml += `
                  </tbody>
                </table>
                `;
                    containerUserInfo.innerHTML = tableHtml;
            for (let user of users) {
                const btnDeleteUser = document.querySelector(`#btnDeleteUser_${user.id_users}`);
                btnDeleteUser.addEventListener('click', async () => {
                    await fetch(`src/php/fetch/client/deleteUser.php?id=${user.id_users}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.status === 'success') {
                                message.innerHTML = data.message;
                                displaySuccess(message);
                                fetchUser();
                            }
                            if (data.status === 'error') {
                                message.innerHTML = data.message;
                                displayError(message);
                            }
                        })
                })
                const btnUpdateDroits = document.querySelector(`#updateDroits_${user.id_users}`);
                btnUpdateDroits.addEventListener('submit', async (ev) => {
                    ev.preventDefault();
                    const id = btnUpdateDroits.dataset.id;
                    await fetch(`src/php/fetch/client/updateDroits.php?id=${id}`, {
                        method: 'POST',
                        body: new FormData(btnUpdateDroits)
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.status === 'success') {
                                message.innerHTML = data.message;
                                displaySuccess(message);
                                gestionUser();
                            }
                        })
                })
                const btnDetailUser = document.querySelector(`#btnDetailUser_${user.id_users}`);
                if (btnDetailUser) {
                    btnDetailUser.addEventListener('click', async (ev) => {
                        ev.preventDefault();
                        await fetch(`src/php/fetch/client/getUser.php?id=${user.id_users}`)
                            .then(response => response.json())
                            .then(data => {
                              console.log(data);
                                containerdialogUpdateProduct.innerHTML = '';
                                if (data.status === 'success') {
                                    containerdialogUpdateProduct.classList.add('bg-overlay-quaternary-onion');
                                    const dialogDetailOrder = document.createElement('dialog');
                                    dialogDetailOrder.setAttribute('id', 'dialog');
                                    dialogDetailOrder.className = 'bg-[#0e1217] rounded-[14px] border border-[#a8b3cf33] lg:w-7/12 w-3/4';
                                    dialogDetailOrder.innerHTML = `
                                    <div class="flex flex-col justify-between items-center">
                                        <div class="flex w-full flex-row items-cente justify-between border-b border-[#a8b3cf33] p-3">
                                            <h1 class="text-2xl font-bold text-center text-white">Detail</h1>
                                            <div>
                                                <button type="button" id="btncloseDialogUpdate" class="text-[#a8b3cf] hover:text-[#A87EE6FF] float-right text-2xl">
                                                    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="#a8b3cf" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z" fill="currentcolor" fill-rule="evenodd"></path></svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="flex items-center w-full">
                                            <div id="displayDetailUser" class="flex flex-col w-full justify-around items-start text-white p-4"></div>
                                        </div>
                                    </div>
                                        `;
                                    containerdialogUpdateProduct.appendChild(dialogDetailOrder);
                                    dialogDetailOrder.showModal();
                                    const displayDetailUser = document.getElementById('displayDetailUser');
                                    displayDetailUser.innerHTML = '';
                                    for (let user of data.detailUser) {

                                        displayDetailUser.innerHTML += `  
                                       <div class="flex flex-row w-full space-x-16 py-2 px-24">
                                           <img src="src/images/avatars/${user.avatar_users}" alt="close" id="closeDialog" class="h-24 rounded-full">
                                            <div>
                                                <p class="font-bold text-xl">@${user.login_users}</p>
                                                <p>
                                                    <span class="font-bold">Date d'inscription:</span>
                                                    <span>${formatDateSansh(user.created_at_users)}</span>
                                                </p>
                                                <p>
                                                    <span class="font-bold">Avis poster:</span>
                                                    <span>${user.nb_avis}</span>
                                                </p>
                                                <p>
                                                    <span class="font-bold">Commentaires poster:</span>
                                                    <span>${user.nb_commentaires}</span>
                                                </p>
                                                <p>
                                                    <span class="font-bold">Commande :</span>
                                                    <span>${user.nb_commandes}</span>
                                                </p>
                                            </div>
                                        </div>
                                        `;
                                    }
                                    const btncloseDialogUpdate = document.querySelector('#btncloseDialogUpdate');
                                    btncloseDialogUpdate.addEventListener('click', () => {
                                        dialogDetailOrder.close();
                                        containerdialogUpdateProduct.classList.remove('bg-overlay-quaternary-onion');
                                        dialogDetailOrder.innerHTML = '';
                                    })
                                }
                            })
                    });
                }
            }
    } if (data.status === 'error') {
        containerUserInfo.innerHTML = 'Aucun utilisateur trouvé';
    }
}
async function fetchOrder(search, order) {
    await fetch(`src/php/fetch/dashboard/getOrderUser.php?search=${search}&order=${order}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const containerOrderUser = document.querySelector('#containerOrderUser');
            if (data.status === 'success') {
                let tableHtml = `
                <table class="text-white border border-[#a8b3cf33] rounded-[14px] w-full">
                  <thead class="bg-[#0e1217]">
                    <tr class=" border border-[#a8b3cf33]">
                        <th class="p-2 border border-[#a8b3cf33]">Utilisateur</th>
                        <th class="p-2 border border-[#a8b3cf33]">Date de la commande</th>
                        <th class="p-2 border border-[#a8b3cf33]">Status</th>
                        <th class="p-2 border border-[#a8b3cf33]">Montant</th>
                        <th class="p-2 border border-[#a8b3cf33]">Detail</th>
                        <th class="p-2 border border-[#a8b3cf33]">Suppression</th>
                    </tr>
                  </thead>
                  <tbody>
                `;
                for (let order of data.orders) {
                    let optionHtml = '';
                    if (order.statue_commande === 'En cours') {
                        optionHtml = `<option value="Expédiée">Expédiée</option>`;
                    }
                    tableHtml += `
                    <tr class="border border-[#a8b3cf33] text-center">
                        <td class="p-2 border border-[#a8b3cf33]">${order.login_users}</td>
                        <td class="p-2 border border-[#a8b3cf33]">${formatDateSansh(order.date_commande)}</td>
                        <td class="p-2 border border-[#a8b3cf33]">
                            <form action="" method="post" id="updateStatusOrder_${order.id_commande}">
                                <select name="statue_commande" id="statue_commande" class="p-2 rounded-lg bg-[#41474c] hover:bg-[#464c51] border-l-4 border-[#a8b3cfa3] hover:border-[#A87EE6FF]">
                                    <option value="${order.statue_commande}">${order.statue_commande}</option>
                                    ${optionHtml}
                                </select>
                                <button class="p-2 bg-[#242629] hover:bg-[#464c51] rounded-lg" type="submit" id="btnUpdateStatusOrder_${order.id_commande}">Modifier</button>
                            </form>
                        </td>
                        <td class="p-2 border border-[#a8b3cf33]">${order.motant_commande} €</td>
                        <td class="p-2 border border-[#a8b3cf33]">
                            <button class="p-2 bg-[#242629] hover:bg-[#464c51] rounded-lg" type="button" id="btnDetailOrder_${order.id_commande}">Detail</button>
                        </td>
                        <td class="p-2 border border-[#a8b3cf33]">
                            <button class="p-2 bg-[#242629] hover:bg-[#464c51] rounded-lg" type="button" id="btnDeleteOrder_${order.id_commande}">Supprimer</button>
                        </td>
                    `;
                }
                tableHtml += `
                  </tbody>
                </table>
                `;
                containerOrderUser.innerHTML = tableHtml;
                for (let order of data.orders) {
                    const alertMessage = document.querySelector('#alertMessage');
                    const btnUpdateStatusOrder = document.querySelector(`#updateStatusOrder_${order.id_commande}`);
                    btnUpdateStatusOrder.addEventListener('submit', async (ev) => {
                       ev.preventDefault();
                       await fetch(`src/php/fetch/dashboard/updateStatusOrder.php?id_commande=${order.id_commande}`, {
                            method: 'POST',
                            body: new FormData(btnUpdateStatusOrder)
                       })
                            .then(response => response.json())
                            .then(data => {
                               console.log(data);
                               if (data.status === 'success') {
                                      message.innerHTML = data.message;
                                      displaySuccess(message);
                                      fetchOrder(search, order);
                               }
                               if (data.status === 'error') {
                                      message.innerHTML = data.message;
                                      displayError(message);
                               }
                            });
                    });
                    const btnDetailOrder = document.querySelector(`#btnDetailOrder_${order.id_commande}`);
                    btnDetailOrder.addEventListener('click', async (ev) => {
                        ev.preventDefault();
                        console.log('Button clicked!');
                        await fetch(`src/php/fetch/dashboard/getDetailOrder.php?id_commande=${order.id_commande}`)
                            .then(response => response.json())
                            .then(data => {
                                containerdialogUpdateProduct.innerHTML = '';
                               if (data.status === 'success') {
                                   containerdialogUpdateProduct.classList.add('bg-overlay-quaternary-onion');
                                   const dialogDetailOrder = document.createElement('dialog');
                                   dialogDetailOrder.setAttribute('id', 'dialog');
                                   dialogDetailOrder.className = 'bg-[#0e1217] rounded-[14px] border border-[#a8b3cf33] lg:w-7/12 w-3/4';
                                   dialogDetailOrder.innerHTML = `
                            <div class="flex flex-col justify-between items-center">
                                <div class="flex w-full flex-row items-cente justify-between border-b border-[#a8b3cf33] p-3">
                                    <h1 class="text-2xl font-bold text-center text-white">Detail de la commande</h1>
                                    <div>
                                        <button type="button" id="btncloseDialogUpdate" class="text-[#a8b3cf] hover:text-[#A87EE6FF] float-right text-2xl">
                                            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="#a8b3cf" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z" fill="currentcolor" fill-rule="evenodd"></path></svg>
                                        </button>
                                    </div>
                                </div>
                                <div class="flex flex-col items-center w-full">
                                    <div id="displayDetailCart" class="flex flex-col w-full justify-around items-start text-white p-4"></div>
                                </div>
                            </div>
                            `;
                                   containerdialogUpdateProduct.appendChild(dialogDetailOrder);
                                   dialogDetailOrder.showModal();
                                   const displayDetailCart = document.getElementById('displayDetailCart');
                                   displayDetailCart.innerHTML = '';
                                   for (let detail of data.detailOrder) {

                                       displayDetailCart.innerHTML += `  
                                       <div class="flex flex-row w-full space-x-16 py-2 px-24">
                                           <img src="src/images/products/${detail.img_product}" alt="close" id="closeDialog" class="h-24">
                                            <div>
                                                <p>${detail.name_product}</p>
                                                <p>
                                                    <span class="font-bold">Quantité:</span>
                                                    <span>${detail.quantite_produit}</span>
                                                </p>
                                                <p>
                                                    <span class="font-bold">Prix:</span>
                                                    <span>${detail.price_product} €</span>
                                                </p>
                                            </div>
                                        </div>
                                        `;
                                   }



                                   const BtnCloseDialogUpdateProduct = document.getElementById('btncloseDialogUpdate');
                                   BtnCloseDialogUpdateProduct.addEventListener('click', () => {
                                       dialogDetailOrder.close();
                                       containerdialogUpdateProduct.classList.remove('bg-overlay-quaternary-onion');
                                       dialogDetailOrder.innerHTML = '';
                                   });
                               }
                            });
                    });

                    const btnDeleteOrder = document.querySelector(`#btnDeleteOrder_${order.id_commande}`);
                    btnDeleteOrder.addEventListener('click', async (ev) => {
                       ev.preventDefault();
                       await fetch(`src/php/fetch/dashboard/deleteOrder.php?id_commande=${order.id_commande}`)
                            .then(response => response.json())
                            .then(data => {
                               if (data.status === 'success') {
                                    message.innerHTML = data.message;
                                    displaySuccess(message);
                                    fetchOrder(search, order);
                               }
                            });
                    });
                }
            }
        });
}

async function OrderUser(search, order) {
    containerAllDiv.innerHTML = '';
    containerAllDiv.innerHTML = `
    <div class="w-full">
        <div class="flex justify-center">
            <div class="w-10/12">
                <h1 class="text-2xl font-bold text-center text-white">Gestion des commandes</h1>
                <div id="containerFormOrder">
                    <form action="" method="post" id="filterOrderAdmin" class="flex justify-between items-center space-x-2 m-2 bg-[#242629] text-white w-full">
                        <input type="text" name="search" id="search" placeholder="Rechercher un utilisateur" class="p-2 rounded-lg bg-[#41474c] hover:bg-[#464c51] border-l-4 border-[#a8b3cfa3] hover:border-[#A87EE6FF]">
                        <select name="order" id="order" class="p-2 rounded-lg bg-[#41474c] hover:bg-[#464c51] border-l-4 border-[#a8b3cfa3] hover:border-[#A87EE6FF]">
                            <option value="DESC">Plus récent</option>
                            <option value="ASC">Plus ancien</option>
                        </select>
                    </form>
                    <div id="alertMessage" class="h-8"></div>
                </div>
                <div id="containerOrderUser" class="flex justify-center"></div>
            </div>
        </div>
    </div>
    `;
    fetchOrder(search, order);
    const searchInput = document.querySelector('#search');
    searchInput.addEventListener('keyup', (ev) => {
        search = ev.target.value;
        fetchOrder(search, order);
    });
    const orderSelect = document.querySelector('#order');
    orderSelect.addEventListener('change', (ev) => {
        order = ev.target.value;
        fetchOrder(search, order);
    });
}


buttonGestionProduct.addEventListener('click', () => {
    containerAllDiv.innerHTML = '';
    const containerAddProduct = document.querySelector('#containerModifyProduct');
    containerAddProduct.classList.remove('flex');
    addProduct();
    gestionProduct();
});
buttionGestionCategores.addEventListener('click', () => {
    containerAllDiv.innerHTML = '';
    const containerAddProduct = document.querySelector('#containerModifyProduct');
    containerAddProduct.classList.remove('flex');
    gestionCategory();
    gestionSubCategories();
});
buttonGestionUser.addEventListener('click', () => {
    containerAllDiv.innerHTML = '';
    gestionUser(page, search, order);
});
buttonGestionCommande.addEventListener('click', () => {
    containerAllDiv.innerHTML = '';
    OrderUser(search, order);
});
gestionUser(page, search, order);