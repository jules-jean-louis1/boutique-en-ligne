// Fonction pour la gestion des messages d'erreurs
function displayError(message) {
    message.classList.add('alert-danger');
    message.classList.remove('alert-success');
    message.style.display = 'block';
    // Effacer le message après 3 secondes
    setTimeout(() => {
        message.style.display = 'none';
    }, 5000);
}

// Fonction pour la gestion des messages de success
function displaySuccess(message) {
    message.classList.add('alert-success');
    message.classList.remove('alert-danger');
    message.style.display = 'block';
    // Effacer le message après 3 secondes
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}
function displayErrorMessageFormUpdateProduct(ParentSelector, ContentMessage) {
    ParentSelector.innerHTML = '';
    ParentSelector.innerHTML = `
    <div class="flex items-center py-3 px-2 rounded-[14px] bg-[#DC110154] text-[#D8000C] border-l-[3px] border-[#D8000C]">
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
// Fonction qui permet de modifier le style de l'input number
function inputNumber(el) {
    let min = el.getAttribute('min') || false;
    let max = el.getAttribute('max') || false;

    let els = {};

    els.dec = el.previousElementSibling;
    els.inc = el.nextElementSibling;

    init(el);

    function init(el) {
        els.dec.addEventListener('click', decrement);
        els.inc.addEventListener('click', increment);

        function decrement() {
            let value = parseInt(el.value);
            value--;
            if(!min || value >= min) {
                el.value = value;
            }
        }

        function increment() {
            let value = parseInt(el.value);
            value++;
            if(!max || value <= max) {
                el.value = value;
            }
        }
    }
}

let inputNumbers = document.querySelectorAll('.input-number');
inputNumbers.forEach(inputNumber);

// Formatage de la date
function formatDate(timestamp) {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day} ${month} ${year} à ${hours}:${minutes}`;
}
function formatDateSansh(timestamp) {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${day} ${month} ${year}`;
}
// Input qui permet de faire la recherche

// Fonction Login
function loginFormHeader(BtnLogin) {
    BtnLogin.addEventListener('click', async (ev) => {
        ev.preventDefault();
        const body = document.querySelector('body');
        // Créer l'élément dialog
        const dialogLogin = document.createElement('dialog');
        dialogLogin.setAttribute('id', 'dialog_fixed');
        dialogLogin.className = 'dialog_modal border-[1px] border-[#a8b3cf33] rounded-[14px] p-2 bg-[#242629] bg-overlay bg-overlay-primary';
        body.appendChild(dialogLogin);
        dialogLogin.innerHTML = '';
        await fetch('src/php/fetch/registerLogin/login.php')
            .then(response => response.text())
            .then(data => {
                dialogLogin.innerHTML = data;
                // Afficher le dialog
                dialogLogin.showModal();
                // Fermer le dialog
                const closeDialog = document.querySelector('#closeDialog');
                closeDialog.addEventListener('click', (ev) => {
                    ev.preventDefault();
                    dialogLogin.close();
                });
                // Gestion du bouton "S'inscrire" sur la page de connexion
                const btnSignIn = document.querySelector('#btnSignIn')
                btnSignIn.addEventListener('click', async (ev) => {
                    ev.preventDefault();
                    registerHeader(btnSignIn);
                });
            });
        const formLogin = document.querySelector('#login-form');
        formLogin.addEventListener('submit', (ev) => {
            ev.preventDefault();
            fetch('src/php/fetch/registerLogin/login.php', {
                method: 'POST',
                body: new FormData(formLogin)
            })
                .then(response => response.json())
                .then(data => {
                    let message = document.querySelector('#errorMsg');
                    if (data.status === 'success') {
                        message.innerHTML = data.message;
                        displaySuccess(message);
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    }
                    if (data.status === 'error') {
                        message.innerHTML = data.message;
                        displayError(message);
                    }
                });
        });
    });
}
// Fonction Register
function registerHeader(BtnRegister) {
    BtnRegister.addEventListener('click', async (ev) => {
        const body = document.querySelector('body');
        // Créer l'élément dialog
        const dialog = document.createElement('dialog');
        dialog.setAttribute('id', 'dialog');
        dialog.className = 'dialog_modal dialog_modal border-[1px] border-[#a8b3cf33] rounded-[14px] p-2 bg-[#242629] bg-overlay bg-overlay-primary';
        body.appendChild(dialog);
        dialog.innerHTML = '';
        // Affichage du formulaire d'inscription
        await fetch('src/php/fetch/registerLogin/register.php')
            .then(response => response.text())
            .then(data => {
                // Insérer le contenu de la réponse dans l'élément dialog
                dialog.innerHTML = data;
                // Afficher le dialog
                dialog.showModal();
                document.addEventListener('click', (ev) => {
                    if (ev.target.id === 'closeDialog') {
                        closeModalDialog();
                    }
                });

            });
        const formRegister = document.querySelector('#resgister-form');
        formRegister.addEventListener('submit', (ev) => {
            ev.preventDefault();
            fetch('src/php/fetch/registerLogin/register.php', {
                method: 'POST',
                body: new FormData(formRegister)
            })
                .then(response => response.json())
                .then(data => {
                    let message = document.querySelector('#errorMsg');
                    if (data.status === 'success') {
                        message.innerHTML = data.message;
                        displaySuccess(message);
                    }
                    if (data.status === 'error') {
                        message.innerHTML = data.message;
                        displayError(message);
                    }
                });
        });
    });
}
function updateField(data, fieldName, fieldInput, smallField) {
    if (data[fieldName]) {
        fieldInput.addEventListener('keyup', () => {
            const fieldValue = fieldInput.value;
            if (fieldValue === ''){
                smallField.innerHTML = '';
                smallField.innerHTML = `${data[fieldName]}`;
                smallField.classList.add('text-red-500');
                fieldInput.classList.remove('textField_border');
                fieldInput.classList.add('textField_invalid');
            } else {
                smallField.innerHTML = '';
                fieldInput.classList.remove('textField_invalid');
                fieldInput.classList.add('textField_border');
            }
        });
        smallField.innerHTML = '';
        smallField.innerHTML = `${data[fieldName]}`;
        fieldInput.classList.remove('textField_border');
        smallField.classList.add('text-red-500');
        fieldInput.classList.add('textField_invalid');
    }
}


// Amelioration du formulaire d'inscription
async function Login(btnLogin) {
    const containerForm = document.getElementById("containerLoginRegisterForm");
    containerForm.innerHTML = '';
    function createDialog() {
        const dialog = document.createElement("dialog");
        dialog.setAttribute("id", "dialog");
        dialog.setAttribute("class", "w-[26.25rem] h-[55%] bg-[#202225] border-[1px] border-[#a8b3cf33] rounded-[14px] shadow-lg");
        dialog.innerHTML = '';

        const divBottom = document.createElement("div");
        divBottom.setAttribute("id", "divBottom");
        divBottom.setAttribute("class", "w-full flex items-center justify-center bg-[#202225] border-t-[1px] border-t-[#a8b3cf33] text-white");
        divBottom.innerHTML = `
            <div class="w-full flex items-center justify-center">
                <p class="text-sm" id="TextchangeLogin">Vous n'avez pas de compte ?</p>
                <button type="button" id="buttonLogin" class="p-4 bg-red rounded-lg">S'inscrire</button>
            </div>
        `;
        const Div = document.createElement("div");
        Div.setAttribute("id", "DivModifyText");
        Div.setAttribute("class", "py-2 px-4 w-full flex items-center justify-between bg-[#202225] border-b-[1px] border-b-[#a8b3cf33] text-white font-semibold text-lg");
        const Para = document.createElement("p")
        Para.setAttribute("id", "ParaModifyText");
        Para.textContent = "Se connecter sur Game+";

        const buttonClose = document.createElement("button");
        buttonClose.innerHTML = `
            <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z" fill="currentcolor" fill-rule="evenodd"></path></svg>
        `;
        buttonClose.setAttribute("id", "buttonClose");
        buttonClose.setAttribute("type", "button");
        buttonClose.setAttribute("class", "font-bold cursor-pointer select-none focus-outline justify-center flex z-1 rounded-[12px] hover:bg-[#a8b3cf1f]");

        const Divflex1 = document.createElement("div");
        Divflex1.setAttribute("class", "flex flex-1");

        const containerDiv = document.createElement("div");
        containerDiv.setAttribute("id", "containerDiv");
        containerDiv.setAttribute("class", "flex justify-center w-full h-[78%]");

        dialog.appendChild(Div);
        Div.appendChild(Para);
        Div.appendChild(buttonClose);
        dialog.appendChild(containerDiv);
        dialog.appendChild(Divflex1);
        dialog.appendChild(divBottom);
        containerForm.appendChild(dialog);
    }


    createDialog();
    const dialog = document.getElementById("dialog");
    const containerDiv = document.getElementById("containerDiv");
    btnLogin.addEventListener("click", () => {
        dialog.showModal();
        const buttonLogin = document.getElementById("buttonLogin");
        const ParaModifyText = document.getElementById("ParaModifyText");
        fetch('src/php/fetch/registerLogin/login.php')
            .then(response => response.text())
            .then(data => {
                containerDiv.innerHTML = data;
                const formLogin = document.querySelector('#login-form');
                formLogin.addEventListener('submit', (ev) => {
                    ev.preventDefault();
                    fetch('src/php/fetch/registerLogin/login.php', {
                        method: 'POST',
                        body: new FormData(formLogin)
                    })
                        .then(response => response.json())
                        .then(data => {
                            let message = document.querySelector('#errorMsg');
                            const loginInput = document.getElementById("login");
                            const passwordInput = document.getElementById("password");
                            // Small
                            const smallLogin = document.getElementById("errorLogin");
                            const smallPassword = document.getElementById("errorPassword");
                            updateField(data, 'login', loginInput, smallLogin);
                            updateField(data, 'password', passwordInput, smallPassword);

                            if (data.login || data.password) {
                                message.innerHTML = 'Veuillez remplir tous les champs';
                                displayError(message);
                            }
                            if (data.error) {
                                message.innerHTML = data.error;
                                displayError(message);
                            }
                            if (data.success) {
                                message.innerHTML = data.success;
                                displaySuccess(message);
                                setTimeout(() => {
                                    window.location.reload();
                                }, 1000);
                            }
                        });
                });
            });
        buttonLogin.addEventListener("click", () => {
            if (buttonLogin.textContent === "Connexion") {
                buttonLogin.textContent = "S'inscrire";
                ParaModifyText.textContent = "S'inscrire sur Game+";
                fetch('src/php/fetch/registerLogin/login.php')
                    .then(response => response.text())
                    .then(data => {
                        containerDiv.innerHTML ='';
                        containerDiv.innerHTML = data;
                        const formLogin = document.querySelector('#login-form');
                        formLogin.addEventListener('submit', (ev) => {
                            ev.preventDefault();
                            fetch('src/php/fetch/registerLogin/login.php', {
                                method: 'POST',
                                body: new FormData(formLogin)
                            })
                                .then(response => response.json())
                                .then(data => {
                                    let message = document.querySelector('#errorMsg');
                                    const loginInput = document.getElementById("login");
                                    const passwordInput = document.getElementById("password");
                                    // Small
                                    const smallLogin = document.getElementById("errorLogin");
                                    const smallPassword = document.getElementById("errorPassword");
                                    updateField(data, 'login', loginInput, smallLogin);
                                    updateField(data, 'password', passwordInput, smallPassword);

                                    if (data.login || data.password) {
                                        message.innerHTML = 'Veuillez remplir tous les champs';
                                        displayError(message);
                                    }
                                    if (data.error) {
                                        message.innerHTML = data.error;
                                        displayError(message);
                                    }
                                    if (data.success) {
                                        message.innerHTML = data.success;
                                        displaySuccess(message);
                                        setTimeout(() => {
                                            window.location.reload();
                                        }, 1000);
                                    }
                                });
                        });
                    })
            } else {
                buttonLogin.textContent = "Connexion";
                ParaModifyText.textContent = "S'inscrire sur Game+";
                fetch('src/php/fetch/registerLogin/register.php')
                    .then(response => response.text())
                    .then(data => {
                        containerDiv.innerHTML ='';
                        containerDiv.innerHTML = data;
                        const formRegister = document.querySelector('#resgister-form');
                        formRegister.addEventListener('submit', (ev) => {
                            ev.preventDefault();
                            fetch('src/php/fetch/registerLogin/register.php', {
                                method: 'POST',
                                body: new FormData(formRegister)
                            })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data);
                                    let message = document.querySelector('#errorMsg');
                                    const loginInput = document.getElementById("login");
                                    const emailInput = document.getElementById("E-mail");
                                    const passwordInput = document.getElementById("password");
                                    const passwordConfirmInput = document.getElementById("passwordConfirm");

                                    // Small
                                    const smallLogin = document.getElementById("errorLogin");
                                    const smallEmail = document.getElementById("errorEmail");
                                    const smallPassword = document.getElementById("errorPassword");
                                    const smallPasswordConfirm = document.getElementById("errorC_Password");

                                    updateField(data, 'login', loginInput, smallLogin);
                                    updateField(data, 'email', emailInput, smallEmail);
                                    updateField(data, 'password', passwordInput, smallPassword);
                                    updateField(data, 'passwordConfirm', passwordConfirmInput, smallPasswordConfirm);

                                    if (data.login || data.email || data.password || data.passwordConfirm) {
                                        message.innerHTML = 'Veuillez remplir tous les champs';
                                        displayError(message);
                                    }
                                    function displayMessage(data, field, message) {
                                        if (data[field]) {
                                            message.innerHTML = data[field];
                                            displayError(message);
                                        }
                                    }
                                    displayMessage(data, 'errorLogin', message);
                                    displayMessage(data, 'errorEmail', message);
                                    displayMessage(data, 'errorPassword', message);
                                    displayMessage(data, 'errorPasswordConfirm', message);
                                    displayMessage(data, 'validEmail', message);
                                    if (data.success) {
                                        message.innerHTML = data.success;
                                        displaySuccess(message);
                                    }
                                });
                        });
                    })
            }
        });
        const buttonClose = document.getElementById("buttonClose");
        buttonClose.addEventListener("click", () => {
            dialog.close();
        });
    });
}
function addSignInClickHandler() {
    const btnSignIn = document.querySelector('#btnSignIn')
    btnSignIn.addEventListener('click', async (ev) => {
        closeModalDialog();
        registerHeader(btnSignIn);
    });
}

function closeModalDialog() {
    let dialog = document.querySelector("#dialog");
    dialog.close();
    dialog.remove();
}
async function searchBarHeader() {

}
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
        dialog.remove();
    }, 2000);

    if (status === 'success') {
        dialog.classList.add('success_dialog_message');
    } else if (status === 'error') {
        dialog.classList.add('error_dialog_message');
    }
}

// Input qui permet de faire la recherche
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

export { displayError, displaySuccess, formatDate, formatDateSansh, loginFormHeader, registerHeader,
    closeModalDialog, displayErrorMessageFormUpdateProduct, displaySuccessMessageFormUpdateProduct,
    addSignInClickHandler, searchBarHeader, messagePopup, searchHeader, displayUserInfoHeader, cartHeader, Login};