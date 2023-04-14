import { displayError} from './function/function.js';
import { displaySuccess} from './function/function.js';
import { formatDate } from "./function/function.js";

const DisplayInfo = document.querySelector('#dislpayInfoProduct');
const containerAddCategory = document.querySelector('#containerAddCategory');
const containerAddSubCategory = document.querySelector('#containerAddSubCategory');
const buttonGestionProduct = document.querySelector('#buttonSeeProduct');
const buttionGestionCategores = document.querySelector('#buttonSeeCategories');
const containerdialogUpdateProduct = document.querySelector('#containerDialogFormUpdateProduct');
const containerAllDiv = document.querySelector('#containerModifyProduct');
let message = document.querySelector('#message');

// Fonction d'affichage des catégories
async function displayCategory(option) {
    await fetch('src/php/fetch/category/displayCategories.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(category => {
                option.innerHTML += `<option value="${category.id_categories}">${category.name_categories}</option>`;
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
// Fonction d'affichage des sous-catégories
async function displaySubCategory(option) {
    await fetch('src/php/fetch/category/displaySubCategory.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(subCategory => {
                option.innerHTML += `<option value="${subCategory.id_subcategories}">${subCategory.name_subcategories}</option>`;
            });
        });
}
// fonction de gestion des produits
async function addProduct() {
    const buttonAddProduct = document.createElement('button');
    buttonAddProduct.classList.add('btn', 'btn-primary', 'btn-sm', 'm-2');
    buttonAddProduct.textContent = 'Ajouter un produit';
    buttonAddProduct.setAttribute('id', 'buttonAddProduct');
    const containerButtonAddProduct = document.querySelector('#containerAddProduct');
    containerButtonAddProduct.appendChild(buttonAddProduct);

    buttonAddProduct.addEventListener('click', () => {
        const body = document.querySelector('body');
        const dialog = document.createElement('dialog');
        dialog.setAttribute('id', 'dialog');
        dialog.className = 'dialog_modal';
        body.appendChild(dialog);
        dialog.innerHTML = `
        <div class="w-5/6 p-2">
            <div id="modal-header" class="flex justify-around">
                <h5 class="modal-title" id="exampleModalLabel">Ajouter un produit</h5>
                <button type="button" id="btncloseDialog" data-bs-dismiss="modal" aria-label="Close">&times;</button>
            </div>
            <div class="modal-body">
                <form action="" method="post" id="formAddProduct" enctype="multipart/form-data">
                    <div id="modalAddProduct">
                        <label for="nameProduct">Nom du produit</label>
                        <input type="text" name="nameProduct" id="nameProduct" class="bg-slate-100 p-2 rounded-lg" >
                    </div>
                    <div id="modalAddProduct">
                        <label for="descriptionProduct">Description du produit</label>
                        <textarea name="descriptionProduct" id="descriptionProduct" cols="30" rows="10" class="bg-slate-100 p-2 rounded-lg"></textarea>
                    </div>
                    <div id="modalAddProduct">
                        <label for="priceProduct">Prix du produit</label>
                        <input type="text" name="priceProduct" id="priceProduct" placeholder="Prix en euro" class="bg-slate-100 p-2 rounded-lg">
                    </div>
                    <div id="modalAddProduct">
                        <label for="stockProduct">Stock du produit</label>
                        <input type="number" name="stockProduct" id="stockProduct" placeholder="Stock en nombre" class="bg-slate-100 p-2 rounded-lg">
                    </div>
                    <div id="modalAddProduct">
                        <label for="imageProduct">Image du produit</label>
                        <input type="file" name="imageProduct" id="imageProduct" >
                    </div>
                    <div id="modalAddProduct">
                        <label for="releasedDate">Date de sortie :</label>
                        <input type="date" name="releasedDate" id="releasedDate" class="bg-slate-100 p-2 rounded-lg">
                    </div>
                    <div id="modalAddProduct">
                        <label for="categoryProduct">Catégorie du produit :</label>
                        <input type="hidden" name="subCategoryId" id="subCategoryId">
                        <input type="text" placeholder="Ajouter une catégorie" id="searchSubCategories" class="bg-slate-100 p-2 rounded-lg">
                        <div id="displaySearchSubCategories"></div>
                    </div>
                    <div class="h-[45px]">
                        <div id="errorMsg"></div>
                    </div>
                    <div id="modalAddProduct">
                        <button type="submit" name="submitAddProduct" id="submitAddProduct" class="bg-green-500 p-2 rounded-lg text-white">Ajouter ce produit</button>
                    </div>
                </form>
            </div>
        </div>
    `;
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


        dialog.showModal();
        const btnClose = document.querySelector('#btncloseDialog');
        btnClose.addEventListener('click', () => {
            dialog.close();
            dialog.remove();
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
                    }
                });
        })
    });
}

// Fonction d'affichage et modifications des produits
async function gestionProduct() {

    const containerFormProductSearch = document.createElement('div');
    const craftFormProductSearch = document.createElement('div');
    craftFormProductSearch.innerHTML = `
        <form action="" method="post" id="formProductSearch">
            <div class="flex space-x-4">
                <div id="modalAddProduct">
                    <label for="searchCategory">Sélectionner une catégorie</label>
                    <select name="searchCategory" id="searchCategory" class="bg-slate-100 p-2 rounded-lg">
                        <option value="0">Selectionner</option>
                    </select>
                </div>
                <div id="modalAddProduct">
                    <label for="searchSubCategory">Sélectionner une sous-catégorie</label>
                    <select name="searchSubCategory" id="searchSubCategory" class="bg-slate-100 p-2 rounded-lg">
                        <option value="0">Selectionner</option>
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
        ContainerDisplayProduct.innerHTML = '';

        if (subCategoryId !== '0') {
            const products = await getProductsBySubCategoryId(subCategoryId);

                products.forEach(product => {
                    ContainerDisplayProduct.innerHTML += `
                    <div class="flex p-0.5">
                        <div id="displayProductContainer" class="w-[12rem] flex flex-col">
                            <h2 class="font-normal text-slate-700">Image du jeu :</h2>
                            <img src="src/images/products/${product.img_product}" alt="${product.name_product}" class="max-w-fit">
                        </div>
                        <div id="displayProductContainer">
                            <div class="flex flex-col space-y-1">
                                <div id="titre_produit" class="flex space-x-1">
                                    <h2 class="font-normal text-slate-700">Titre :</h2>
                                    <h2>${product.name_product}</h2>
                                </div>
                                <div id="description_produit" class="flex flex-col space-x-1 w-8/12">
                                    <h2 class="font-normal text-slate-700">Synopsis :</h2>
                                    <h2>${product.description_product}</h2>
                                </div>
                            </div>
                            <div id="containerProductInformation" class="flex justify-around">
                                <div id="prix_produit" class="flex space-x-0.5">
                                    <h2 class="font-normal text-slate-700">Prix :</h2>
                                    <h2>${product.price_product} €</h2>
                                </div>
                                <div id="date_sortie_produit" class="flex space-x-0.5"> 
                                    <h2 class="font-normal text-slate-700">Date de sortie :</h2>
                                    <h2>${product.released_date_product}</h2>
                                </div>
                                <div id="categorie_produit" class="flex space-x-0.5">
                                    <h2 class="font-normal text-slate-700">Genre :</h2>
                                    <h2>${product.name_subcategories}</h2>
                                </div>
                            </div>
                            <div id="containerProductInformation" class="flex justify-around">
                                <div id="stock_produit" class="flex space-x-0.5">
                                    <h2 class="font-normal text-slate-700">Stock :</h2>
                                    <h2>${product.quantite_product}</h2>
                                </div>
                                <div class="flex space-x-0.5">
                                    <h2 class="font-normal text-slate-700">Nombre de vente :</h2> 
                                    <h2>${product.quantite_vendue}</h2>
                                </div>
                            </div>
                            <div id="containerBtnUpdateProduct" class="flex justify-around">
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
                    `;
                    containerAllDiv.appendChild(ContainerDisplayProduct);
                    // Modifier un produit
                });
                for (let product of products) {
                    const btnUpdateProduct = document.querySelector(`#btnUpdateProduct_${product.id_product}`);
                    btnUpdateProduct.addEventListener('click',  (ev) => {
                        const dialogUpdateProduct = document.createElement('dialog');

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
                            dialogUpdateProduct.remove();
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
    async function displayCategories() {
        await fetch('src/php/fetch/category/displayCategories.php')
            .then(response => response.json())
            .then(data => {
                DisplayInfo.innerHTML = '';
                data.forEach(category => {
                    DisplayInfo.innerHTML += `
                <div id="containerCategoryProduct" class="flex space-x-2 py-0.5">
                    <form action="" method="post" class="flex space-x-2" id="update_${category.id_categories}"  data-id-cat="${category.id_categories}">
                        <input type="text" name="nom" id="nom" placeholder="${category.name_categories}" class="bg-[#E9E9E9] rounded-lg p-2">
                        <button type="submit" class="bg-green-500 p-2 rounded-lg text-white" name="btnUpdateCategory" id="btnUpdateCategory_${category.id_categories}">
                            Modifier
                        </button>
                    </form>
                    <form action="" method="post" class="flex space-x-2" id="delete_${category.id_categories}"  data-id-cat="${category.id_categories}">
                        <button type="submit" class="bg-red-500 p-2 rounded-lg text-white" name="btnDeleteCategory" id="btnDeleteCategory_${category.id_categories}">
                            Supprimer
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
    const createBtnAddCategory = document.createElement('button');
    createBtnAddCategory.setAttribute('id', 'btnAddCategory_');
    createBtnAddCategory.setAttribute('class', 'bg-green-500 p-2 rounded-lg text-white');
    createBtnAddCategory.textContent = 'Ajouter une catégorie';
    containerAddCategory.appendChild(createBtnAddCategory);

    const btnAddCategory = document.querySelector('#btnAddCategory_');
    btnAddCategory.addEventListener('click', () => {
        const formAddCategory = document.querySelector('#formAddCategory');
        formAddCategory.innerHTML = `
                <form action="" method="post" class="flex space-x-2 block" id="addCategory">
                    <input type="text" name="nom" id="nom" placeholder="Nom de la catégorie" class="bg-[#E9E9E9] rounded-lg p-2">
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
    containerAddCategory.appendChild(formAddCategory);
}

async function gestionSubCategories() {
    containerAddSubCategory.innerHTML = '';
    containerAddSubCategory.innerHTML = `
        <div id="containerAddSubCategory" class="flex space-x-2">
            <form id="formSubCategories" method="post">
                <label for="category">Sélectionnez une catégorie :</label>
                <select id="Categories" name="Categories" class="p-2 rounded-lg">
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
    createBtnAddSubCategory.setAttribute('class', 'bg-green-500 p-2 rounded-lg text-white');
    createBtnAddSubCategory.textContent = 'Ajouter une sous-catégorie';
    containerBtnAddSubCategory.appendChild(createBtnAddSubCategory);

    const formAddSubCategory = document.createElement('div');
    formAddSubCategory.setAttribute('id', 'formAddSubCategory');
    formAddSubCategory.setAttribute('class', 'flex space-x-2 block');
    containerAddSubCategory.appendChild(formAddSubCategory);



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
                    <li class="flex space-x-1">
                        <button class="page-link" id="pageUser${page}">${page}</button>
                    </li>
                `;
                }
                parentSelector.innerHTML = pageUser;
            }
        })
}
const params = new URLSearchParams(window.location.search);
const page = params.get('page') || 1;
// Fonction de gestion des utilisateurs
let search = '';
let order = 'DESC';
async function gestionUser(page, search, order) {

    const wapperUserInfos = document.createElement('div');
    wapperUserInfos.setAttribute('id', 'wapperUserInfos');
    containerAllDiv.appendChild(wapperUserInfos);

    const containerFormSearch = document.createElement('div');
    containerFormSearch.setAttribute('id', 'containerFormSearch');
    containerFormSearch.setAttribute('class', 'flex space-x-2');
    wapperUserInfos.appendChild(containerFormSearch);

    const containerUserInfo = document.createElement('div');
    containerUserInfo.setAttribute('id', 'containerUserInfo');
    containerUserInfo.setAttribute('class', 'flex flex-col space-y-2 py-3');
    wapperUserInfos.appendChild(containerUserInfo);
    containerUserInfo.innerHTML = '';

    const containerPagination = document.createElement('div');
    containerPagination.setAttribute('id', 'containerPagination');
    containerPagination.setAttribute('class', 'flex justify-center');
    wapperUserInfos.appendChild(containerPagination);

    containerFormSearch.innerHTML = `
        <form action="" method="post" class="flex items-center space-x-2" id="formSearchUser">
            <input type="text" name="search" id="search" placeholder="Rechercher un utilisateur" class="bg-[#E9E9E9] rounded-lg p-2">
            <label for="order">Date de création</label>
            <select name="order" id="order" class="bg-[#E9E9E9] rounded-lg p-2">
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
    paginationUser(search, order, containerPagination);
}

async function fetchUser(page, search, order) {
    const response = await fetch(`src/php/fetch/dashboard/gestionUser.php?page=${page}&search=${search}&order=${order}`);
    const data = await response.json();
    if (data.status === 'success') {
        const users = JSON.parse(data.users);
        containerUserInfo.innerHTML = '';
        for (let user of users) {
            let optionHtml = '';
            if (user.type_compte_users === 'administrateur') {
                optionHtml = `
                        <option value="utilisateur">client</option>
                    `;
            } else if (user.type_compte_users === 'client') {
                optionHtml = `
                        <option value="administrateur">administrateur</option>
                    `;
            }
                containerUserInfo.innerHTML += `
                <div class="flex items-center w-[90%] justify-between">
                    <tbody>
                        <tr>
                            <td>
                                <div class="p-1">
                                    ${user.id_users}
                                </div>
                                </td>
                            <td>
                                <div class="p-1 flex items-center space-x-2">
                                    <img src="src/images/avatars/${user.avatar_users}" alt="" class="rounded-full w-6">
                                    <p>${user.login_users}</p>
                                </div>
                            </td>
                            <td>${user.email_users}</td>
                            <td>
                                <div id="containerUpdateDroits_${user.id_users}" class="flex">
                                    <form action="resources/assests/fetch/updateDroits.php" method="post" id="updateDroits_${user.id_users}" data-id="${user.id_users}" class="flex space-x-2">
                                        <select name="droits" id="droits" class="p-2 bg-[#E9E9E9] rounded-lg">
                                            <option value="${user.type_compte_users}">${user.type_compte_users}</option>
                                            ${optionHtml}
                                        </select>
                                        <div id="btnSubmit">
                                            <button type="submit" class="hover:bg-[#39E58C98] p-2 rounded-lg duration-100 ease-in "
                                                    name="btnUpdateDroits" id="btnUpdateDroits">
                                                    <img src="public/images/icones/edit-color-font.svg" alt="" class="filter-green">
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </td>
                            <td>${formatDate(user.created_at_users)}</td>
                            <td>
                                <div id="btnForDeleteUser">
                                    <button class="hover:bg-[#FF000061] p-2 rounded-lg text-white" id="btnDeleteUser_${user.id_users}">
                                    <img src="public/images/icones/suppr-user.svg" alt="" class="filter-red">
                                    </button>
                                </div>
                            </td> 
                        </tr>
                    </tbody>
                </div>
                `;

        }
        for (let user of users) {
            const btnDeleteUser = document.querySelector(`#btnDeleteUser_${user.id_users}`);
            btnDeleteUser.addEventListener('click', async () => {
                await fetch(`src/php/fetch/client/deleteUser.php?id=${user.id_users}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
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
        }
    } if (data.status === 'error') {
        containerUserInfo.innerHTML = 'Aucun utilisateur trouvé';
    }

    // Do something with the fetched data
}


// fonction d'affichage des produits
addProduct();

// fonction d'affichage des catégories
gestionCategory();

// fonction d'affichage des sous-catégories
gestionSubCategories();

// fonction d'affichage des produits
gestionProduct();

// Fonction d'affichage des utilisateurs
gestionUser(page, search, order);


// Gestions de l'affichage grace au menu

buttionGestionCategores.addEventListener('click', () => {
    containerAllDiv.innerHTML = '';
    gestionCategory();
    gestionSubCategories();
});