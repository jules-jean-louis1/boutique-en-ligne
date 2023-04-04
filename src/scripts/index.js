import { displayError} from './function/function.js';
import { displaySuccess} from './function/function.js';
import { closeModalDialog} from './function/function.js';
import { loginFormHeader} from './function/function.js';
import {registerHeader} from './function/function.js';

const btnRegister = document.querySelector('#buttonRegisterHeader');
const btnLogin = document.querySelector('#buttonLoginHeader');

loginFormHeader(btnLogin);
registerHeader(btnRegister);

