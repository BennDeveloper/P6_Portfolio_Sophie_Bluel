
   
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



   /////////////// liste de catégories dans l'input select ///////////////


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




    /////////////// change la couleur du bouton lorsque j'Ajoute du texte a l'élément input///////////////

inputTitle.addEventListener('input', () => {   // Ajoute un écouteur d'événements pour l'événement input, qui se déclenche lorsque la valeur de l'élément input change
    const btn = document.querySelector('.btn');   // Sélectionne le bouton avec la classe 'btn'

    if (inputTitle.value.length > 0) {   // Vérifie si la longueur de la valeur de l'input est supérieure à 0
        btn.style.backgroundColor = '#1D6154';  // Change la couleur de fond du bouton en vert
    } else {
        btn.style.backgroundColor = '#A7A7A7';   // Sinon, change la couleur de fond du bouton en rouge
    }

});




    /////////////// ecouter le changement sur l'input file ///////////////

inputFile.addEventListener("change", () => {   //evenement change attaché a l'element inputFile événement elle se déclenche lorsque la valeur de l'élément input change, c'est-à-dire lorsqu'un fichier est sélectionné par l'utilisateur.
    const file = inputFile.files[0];       // la propriété file est un tableu contenant tous les fichiers selecctionnés et [0] pour obtenir le premier fichier séléctionné       
    if (file) {                             //Vérifie si un fichier a été effectivement sélectionné. Si file est défini (c'est-à-dire non null ou undefined), le bloc de code suivant s'exécute.
        const reader = new FileReader();       //Crée une nouvelle instance de FileReader, un objet permettant de lire le contenu des fichiers de manière asynchrone.  (FileReader: Une API JavaScript utilisée pour lire le contenu des fichiers (comme les images) en mémoire.)
        reader.onload = function(e){            //Description: Définit la source de l'image de prévisualisation (previewImage) sur le résultat de la lecture du fichier (e.target.result), qui est une URL de données représentant le fichier.  Contient les données du fichier sous forme d'URL de données (base64)./* Attribution de l'URL de la prévisualisation à la source de l'image */
            previewImage.src = e.target.result
            previewImage.style.display = "flex"
            labelFile.style.display = "none"
            iconFile.style.display = "none"
            pFile.style.display = "none"
            containerFile.style.padding = "0px"
            containerFile.style.gap = "0px"
        }
       reader.readAsDataURL(file);  //Demande au FileReader de lire le fichier en tant qu'URL de données. Une fois que la lecture est terminée, l'événement onload est déclenché.readAsDataURL: Méthode du FileReader qui lit le contenu d'un fichier et le représente sous forme de URL de données (base64).
    }
    
});

function resetContainerFile() {
    previewImage.src = "#"; // Réinitialiser la source de l'image
    previewImage.style.display = "none"; // Masquer l'image de prévisualisation
    labelFile.style.display = "flex"; // Réafficher le label
    iconFile.style.display = "flex"; // Réafficher l'icône
    pFile.style.display = "flex"; // Réafficher le texte
    containerFile.style.padding = ""; // Réinitialiser le padding
    containerFile.style.gap = ""; // Réinitialiser le gap
}




      ///////////////////post works///////////////


form.addEventListener("submit", async (e) => {           // écouteur d'événements sur le formulaire (form) . 
    e.preventDefault();                            // empêche la page de se recharger lors de la soumission.

    const formData = new FormData();          // crée un nouvel objet FormData à partir du formulaire (form). 


    console.log(title.value);                //Ajoute les données des champs title, category et le fichier image à l'objet FormData.
    console.log(category.value);
    console.log(inputFile.files[0]);


    formData.append("title", title.value);
    formData.append("category", category.value);
    formData.append("image", inputFile.files[0]);
 

    try {
        const response = await fetch("http://localhost:5678/api/works/", {
            method: "POST",
            body: formData,                      // le contenu de nous données (balise form)
            headers: {
                Authorization: `Bearer ${token}`  
            }
        });

        if (!response.ok) {              // si la réponse n'est pas correcte (statut HTTP en dehors de 200-299).
            throw new Error("Erreur lors de l'ajout du work."); //lance une erreur avec message ("....").
        }

        const data = await response.json();         // Convertit la réponse JSON en objet JavaScript.
        displayWorks()  ;                // Recharge les travaux dans la page d'accueil
        displayWorkModal();               // Recharge les travaux dans la modale
        spanSuccessWork(); /// affiche le message comment quoi la travail a bien été ajouté
        form.reset() // vider le formulaire
        document.getElementById("file").value = "";


        resetContainerFile();  /// jai apler la fonction qui remet le containerFile a ZERO
        
        console.log("Voici le work :", data);         // Affiche les données reçues dans la console
        
    } catch (error) {   // Attrape toute erreur survenue dans le bloc try.
        console.error("Erreur lors de l'ajout du work :", error.message);
    }
});



//////////// Affichage et gestion de la galerie d'images dans la modale 1 /////////////
async function displayWorkModal() {
       
    works = await getWorks();     
    modalWorks.innerHTML = "";
    
    works.forEach(projet => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const span = document.createElement("span");
        const trash = document.createElement("i");
        trash.classList.add("fa-solid", "fa-trash-can");
        trash.id = projet.id;

        /* Ajoute un gestionnaire d'événements au clic sur l'icône de corbeille */
        trash.addEventListener("click", () =>  {
            console.log("click");
            /* Récupèration du token d'authentification depuis la sessionStorage */
            const token = localStorage.getItem("token");
            /* Envoie une requête DELETE au serveur pour supprimer le projet */
            fetch(`http://localhost:5678/api/works/${projet.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then (res => {
                console.log(res)
                /* Suppression d'image dans la galerie */
                figure.remove();
                /* Suppression de l'image dans la page d'accueil */
                document.querySelector("figure[data-id='"+projet.id+"']").remove();
                /* Actualisation de la galerie d'image */
                
            })
            .catch (error => {
                console.error(error)
            })
        })

        img.src = projet.imageUrl;
        span.appendChild(trash);
        figure.appendChild(span);
        figure.appendChild(img);
        modalWorks.appendChild(figure);
    });
}




