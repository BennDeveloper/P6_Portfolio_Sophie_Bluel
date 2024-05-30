

////////////////// VARIABLES  ////////////////////
const inputTitle = document.getElementById('title'); 


const divGallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");
const btnAddModal = document.querySelector(".btn-border button")
const modalAddworks = document.querySelector(".modalAddWorks")
const modalContent = document.querySelector(".modalContent")
const arrowLeft = document.querySelector(".fa-arrow-left")
const xmarkAddModal = document.querySelector(".modalAddWorks .fa-xmark")
const modalWorks = document.querySelector(".modalWorks")

let categorys;
let works;

/////////// QUAND L'UTILISATEUR ET CONNECTE ///////////////


const token = window.localStorage.getItem("token");   // recherche le donnée "token" dans le stockage local du navigateur et l'assigne à la constante 'token'.

const modifier = document.querySelector(".projet-titre .modifier");
const displayFilter = document.querySelector("#portfolio .filters")
const logout = document.querySelector("header .logout");
const header = document.querySelector("header")
const containerModals = document.querySelector(".containerModals")
const xmark = document.querySelector(".fa-xmark")


/////////// modal add works ///////////////

const form = document.querySelector(".modalAddWorks form");
const title = document.querySelector(".modalAddWorks #title");
const category = document.querySelector(".modalAddWorks #category");


/////////////// prévisualisation de l'image ///////////////

const previewImage = document.querySelector(".containerFile img")
const inputFile = document.querySelector(".containerFile input")
const iconFile = document.querySelector(".containerFile .fa-image")
const pFile = document.querySelector(".containerFile p")
const labelFile = document.querySelector(".containerFile label");
const containerFile = document.querySelector(".containerFile")


load();



