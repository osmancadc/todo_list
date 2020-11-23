import * as accessController from './accessController.js';

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_form = document.querySelector('.sign-in-form');
const sign_up_form = document.querySelector('.sign-up-form');


sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

sign_in_form.addEventListener("submit", (e) => {
  e.preventDefault()
  accessController.validateUser('osmancadc', '1234', (granted, data) => {
    if (granted) {
      sessionStorage.setItem('id', data.id);
      sessionStorage.setItem('token', data.token);
      accessController.validateSession()
    } else
      document.querySelector('#error-login').classList.remove('hidden')
  })
})

sign_up_form.addEventListener("submit", (e) => {
  e.preventDefault()

  let username = document.querySelector('#user-register').value
  let name = document.querySelector('#name-register').value
  let password = document.querySelector('#password-register').value
  let email = document.querySelector('#email-register').value

  
  accessController.createUser(username, name,password,email, (created) => {
    if (created) {
      document.querySelector('#success-register').classList.remove('hidden')
    } else
      document.querySelector('#error-register').classList.remove('hidden')
  })
})


accessController.validateSession()