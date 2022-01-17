const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const form = document.querySelector("form");

function validate(event){
    event.preventDefault();

    const firstName = firstNameValidation();
    const lastName = lastNameValidation();
    const email = emailValidation();
    const message = messageValidation();

    if(firstName && lastName && email && message){
        console.log("Firstname : ", firstNameInput.value);
        console.log("LastName : ", lastNameInput.value);
        console.log("Email : ", emailInput.value);
        console.log("Message : ", messageInput.value);
        closeModal();
        form.reset();
    }
}

function displayModal() {
    const modal = document.getElementById("contact_modal");
    const main = document.querySelector("main");
	modal.style.display = "block";
    main.style.display = "none";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    const main = document.querySelector("main");
    modal.style.display = "none";
    main.style.display = "block";
}

function isValid(input) {
    input.parentElement.setAttribute("data-error-visible", "false");
}

function errorMessage(input) {
    input.parentElement.setAttribute("data-error-visible", "true");
}

function firstNameValidation(){
    if(firstNameInput.value.length < 2){
        errorMessage(firstNameInput);
        return false;
    } else {
        isValid(firstNameInput);
        return true;
    }
}

function lastNameValidation(){
    if(lastNameInput.value.length < 2){
        errorMessage(lastNameInput);
        return false;
    } else {
        isValid(lastNameInput);
        return true;
    }
}

function emailValidation(){
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(regex.test(emailInput.value)){
        isValid(emailInput);
        return true;   
    } else {
        errorMessage(emailInput);
        return false;
    }
}

function messageValidation(){
    if(messageInput.value.length < 20){
        errorMessage(messageInput);
        return false;
    } else {
        isValid(messageInput);
        return true;
    }
}

firstNameInput.addEventListener("input", firstNameValidation);
lastNameInput.addEventListener("input", lastNameValidation);
emailInput.addEventListener("input", emailValidation);
messageInput.addEventListener("input", messageValidation);