
    /////// MODAL ///////


    function DisplayAddModal() {
        btnAddModal.addEventListener("click",()=>{
            modalAddworks.style.display = "flex"
            modalContent.style.display = "none"
        })
        arrowLeft.addEventListener("click",()=>{
            modalAddworks.style.display = "none"
            modalContent.style.display = "flex"
        })

        xmarkAddModal.addEventListener("click",()=>{
            containerModals.style.display = "none"
            
        })
 
}



// lite de catégories dans l'input select
async function displayCategoryModal() {
    const select = document.querySelector(".modalAddWorks select")   // utilise document.querySelector pour sélectionner l'élément <select> à l'intérieur d'un élément avec la classe modalAddWorks et le stocke dans la constante select.
                                                                      // attend la résolution de la promesse retournée par la fonction getCategorys (qui est supposée retourner une liste de catégories) et stocke le résultat dans la constante categorys.
       categorys.forEach(category => {                                 //  Pour chaque catégorie dans la liste categorys, exécute la fonction suivante.
        const option = document.createElement("option")            // Crée un nouvel élément <option>.  
        option.value = category.id                            // Définit l'attribut value de l'option à l'ID de la catégorie.
        option.textContent = category.name                  //Définit le texte affiché de l'option au nom de la catégorie.       
        select.appendChild(option)                           // Ajoute l'élément <option> à l'élément <select>
       }) 
}

function spanSuccessWork(){
    const spanSuccess = document.createElement("span");
    spanSuccess.innerHTML = "Le travail a été ajouté avec succès.";
    modalAddworks.insertBefore(spanSuccess, form)

}



