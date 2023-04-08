import { displayError} from './function/function.js';
import { displaySuccess} from './function/function.js';
const DisplayInfo = document.querySelector('#dislpayInfoProduct');
const containerAddCategory = document.querySelector('#containerAddCategory');
const containerAddSubCategory = document.querySelector('#containerAddSubCategory');
const buttonGestionProduct = document.querySelector('#buttonSeeProduct');
const buttionGestionCategores = document.querySelector('#buttonSeeCategories');
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
async function gestionProduit() {
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
        <div>
            <div id="modal-header" class="flex justify-around">
                <h5 class="modal-title" id="exampleModalLabel">Ajouter un produit</h5>
                <button type="button" id="btncloseDialog" data-bs-dismiss="modal" aria-label="Close">&times;</button>
            </div>
            <div class="modal-body">
                <form action="" method="post" id="formAddProduct" enctype="multipart/form-data">
                    <div id="modalAddProduct">
                        <label for="nameProduct">Nom du produit</label>
                        <input type="text" name="nameProduct" id="nameProduct" class="bg-slate-100 p-2 rounded-lg" required>
                    </div>
                    <div id="modalAddProduct">
                        <label for="descriptionProduct">Description du produit</label>
                        <textarea name="descriptionProduct" id="descriptionProduct" cols="30" rows="10" class="bg-slate-100 p-2 rounded-lg" required></textarea>
                    </div>
                    <div id="modalAddProduct">
                        <label for="priceProduct">Prix du produit</label>
                        <input type="number" name="priceProduct" id="priceProduct" placeholder="Prix en euro" class="bg-slate-100 p-2 rounded-lg" required>
                    </div>
                    <div id="modalAddProduct">
                        <label for="stockProduct">Stock du produit</label>
                        <input type="number" name="stockProduct" id="stockProduct" placeholder="Stock en nombre" class="bg-slate-100 p-2 rounded-lg" required>
                    </div>
                    <div id="modalAddProduct">
                        <label for="imageProduct">Image du produit</label>
                        <input type="file" name="imageProduct" id="imageProduct" required>
                    </div>
                    <div id="modalAddProduct">
                        <label for="releasedDate">Date de sortie :</label>
                        <input type="date" name="releasedDate" id="releasedDate" class="bg-slate-100 p-2 rounded-lg" required>
                    </div>
                    <div id="modalAddProduct">
                        <label for="categoryProduct">Catégorie du produit :</label>
                        <input type="text" placeholder="Ajouter une catégorie" id="searchSubCategories" class="bg-slate-100 p-2 rounded-lg">
                        <div id="displaySearchSubCategories"></div>
                    </div>
                </form>
            </div>
        </div>
    `;
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
                            const subCategoryId = result.getAttribute('data-id');
                            const subCategoryName = result.querySelector('p').textContent;
                            searchSubCategories.value = subCategoryName;
                            // Faites quelque chose avec l'ID de sous-catégorie sélectionné
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
            await fetch('src/php/fetch/product/addProduct.php', {
                method: 'POST',
                body: new FormData(formAddProduct)
            })
        })
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
// fonction d'affichage des produits
gestionProduit();

// fonction d'affichage des catégories
gestionCategory();

// fonction d'affichage des sous-catégories
gestionSubCategories();