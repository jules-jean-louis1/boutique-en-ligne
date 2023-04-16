import { displayError} from './function/function.js';
import { displaySuccess} from './function/function.js';
import { closeModalDialog} from './function/function.js';
import { loginFormHeader} from './function/function.js';
import {registerHeader} from './function/function.js';

const btnRegister = document.querySelector('#buttonRegisterHeader');
const btnLogin = document.querySelector('#buttonLoginHeader');
const buttonProfilHeader = document.getElementById("buttonProfilHeader");
const menuProfilHeader = document.getElementById("menuProfilHeader");
const profilInfoHeader = document.getElementById("infoUserNavBar");

// Ajout d'un écouteur d'événement sur le clic du bouton
buttonProfilHeader.addEventListener("click", function(event) {
    // Empêche la propagation de l'événement pour éviter la fermeture immédiate du menu
    event.stopPropagation();
    // Ajout ou suppression de la classe "hidden" sur la liste ul
    menuProfilHeader.classList.toggle("hidden");
});

// Ajout d'un écouteur d'événement sur le document entier pour fermer le menu lors d'un clic à l'extérieur
document.addEventListener("click", function(event) {
    // Si l'élément cliqué n'est ni le bouton de profil ni le menu
    if (!event.target.closest("#buttonProfilHeader") && !event.target.closest("#menuProfilHeader")) {
        // Ajout de la classe "hidden" sur la liste ul
        menuProfilHeader.classList.add("hidden");
    }
});
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
if (profilInfoHeader) {
    displayUserInfoHeader();
}
if (btnRegister) {
    registerHeader(btnRegister);
}
if (btnLogin) {
    loginFormHeader(btnLogin);
}


