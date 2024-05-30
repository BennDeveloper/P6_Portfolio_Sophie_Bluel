





async function load() {

        await displayWorks();
        await displayWorkModal();
        await displayCategorysButtons();
        await filterCategory();
        await displayCategoryModal();
        DisplayAddModal();
        affichageMenu();
        evenementsModal();
}
    


    function affichageMenu() {
        if (token) {
            // connecté
            // on cache les filtres, on affaiche logout et on supprime le lien de login.html
            logout.textContent = "logout";
            logout.removeAttribute('href');
            
            displayFilter.style.display = "none";
    
             // création de l'entête
            const enTete = document.createElement("div");
            enTete.classList.add("en-tete");                // Ajout de la classe "en-tete" pour styliser avec CSS
            header.appendChild(enTete); // Insérer l'entête au début du header
    
    
             // Création du titre "Mode Edition"
            const titreEnTete = document.createElement("h2");
            titreEnTete.textContent = "Mode édition";
    
            // Création de l'icône Font Awesome
            const icone = document.createElement("i");
            icone.classList.add("fa-regular", "fa-pen-to-square"); // Classe de l'icône Font Awesome
    
            // Ajout de l'icône à l'élément titre
            enTete.appendChild(icone);
    
            // Ajout du titre à l'en-tête
             enTete.appendChild(titreEnTete);
    
            // ajout btn modifier
            modifier.textContent = "modifier"
            const iconeEdition = document.createElement("i");
            iconeEdition.classList.add("fa-regular", "fa-pen-to-square");
            modifier.appendChild(iconeEdition);
    
            // au click du lien on supprime le token
            logout.addEventListener("click", () => {
                
                localStorage.removeItem("token");
                window.location = "index.html";
            });
            
        }
        else {
            /// déconnecté
            // on affiche les filtres, on remet le lient et on change logout en login
            logout.textContent = "login";
            logout.href = "login.html";
            displayFilter.style.display = "flex";
    
        }
    }

    function evenementsModal() {
        //affichage de la modale au click sur modifier
        modifier.addEventListener("click",()=>{
            containerModals.style.display = "flex";
        })

        xmark.addEventListener("click",()=>{
            containerModals.style.display = "none";
        })

        containerModals.addEventListener("click",(e)=>{
            //console.log(e.target.className);
            if (e.target.className == "containerModals") {
                containerModals.style.display = "none";  
            }
        })
    }

      /* Affichage et gestion de la galerie d'images dans la modale 1 */
    async function displayWorkModal() {
       

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
    




///////////  FONCTION QUI RETOURNE LE TABLEAU WORKS  ///////////////

async function getWorks(){                                                 //fonction asynchrone
    const response = await fetch("http://localhost:5678/api/works");       //attendre que la promesse retournée par la fonction fetch() soit résolue //fetch() est utilisée pour envoyer une requête HTTP GET à l'URL spécifiée, pour récupérer des données.
   return await response.json();                                            //  retourne les données récupérées sous forme de JSON
}






////////////////// AFFICHAGE DES WORKS DANS LE DOM ///////////////


async function displayWorks() {                       //// défini une fontion affichage works  * */
    divGallery.innerHTML = "";
    works = await getWorks();                         /// 1 attendre que la promesse retournée par la fonction getWorks() soit résolue
                                                      /// 2 recuperer les donnees à partir de la fonction getWorks()/(response.json) et les stocker dans la variable 'Works'
    works.forEach((work) => {                         /// 3 creation d'une boucle pour parcourir chaque élément de la liste Works.         
      createWorks(work);                              /// 4 Appelle la fonction crateWorks() pour chaque work
    
    });
}


function createWorks(work){                                         /// 1 créer et afficher dynamiquement des éléments HTML représentant chaque work
        const figureWork = document.createElement("figure");        /// 2 Crée des éléments <figure><img><figcaption> dans le DOM et les stocker dans les variable (figureWork)(figureWork)(figCaption).
        const imgWork = document.createElement("img");
        const figCaption = document.createElement("figcaption");

        imgWork.src = work.imageUrl;  
                                    /// 3  Définit la source de l'image et le texte alternatif et le texte à afficher
        imgWork.alt = work.title;
        figCaption.textContent = work.title; 


        figureWork.appendChild(imgWork);                         // <img> enfant de l'élément <figure>
        figureWork.appendChild(figCaption);                      // <figcaption> enfant de l'élément <figure>
        figureWork.dataset.id = work.id;                         // //Cette ligne ajoute un attribut data-id à l'élément <figure> et lui assigne la valeur work.id. Cela permet de stocker l'ID du travail directement dans l'élément HTML pour une utilisation ultérieure.

        divGallery.appendChild(figureWork);                      // <figure> enfant de l'élément divGallery ou la calss ".gallery"
    }


    
        
///////////  RECUP LE TABLEAU DES CATIGORIES ///////////

//*envoie une requête GET et retourne les données récupérées sur les catégories sous forme de JSON

async function getCategorys() {                                                     // 1 fonction asynchrone
    const response = await fetch("http://localhost:5678/api/categories");           // 2 attendre que la promesse retournée par la fonction fetch() soit résolue. // fetch() est utilisée pour envoyer une requête HTTP GET à l'URL spécifiée, dans ce cas "http://localhost:5678/api/categories", pour récupérer des données sur les catégories.fetch() est utilisée pour envoyer une requête HTTP GET à l'URL spécifiée, pour récupérer des données sur les catégories.
    return await response.json();                                                   // 3 await pour attendre que la promesse retournée par la méthode response.json()
}

/////////// AFFICHAGE DES btn DE CATIGORIE ///////////

async function displayCategorysButtons(){                   // fonction pour gerer l'affichage des btn
    categorys = await getCategorys();                // 1 cela récupère les données sur les catégories à partir de la fonction getCategorys() et les stocke dans la variable categorys.
    console.log(categorys);

    categorys.forEach(category => {                        // 2  forEach est utilisée pour parcourir les éléments d'une liste

        const btn = document.createElement("button");      // 3 a chaque fois qu'va faire un tour  Crée un élément <button> dans le DOM et le stocke dans la variable btn.

        btn.textContent = category.name;                   // 4 Définit le texte à afficher dans le bouton en utilisant le nom de la catégorie.
        btn.id = category.id;                              // 5 Définit l'ID du bouton en utilisant l'ID de la catégorie

        if (category.id === 0) {
            btn.classList.add("special-color"); // Ajoute la classe spéciale au bouton "Tous"
        }

        filters.appendChild(btn);                          // 6 Ajoute l'élément "button"/btn en tant qu'enfant de l'élément dans le document HTML qui a la classe "filters".
});

        // Ajout manuel du bouton "Tous" avec l'ID 0
        const btnTous = document.getElementById("0");
        btnTous.classList.add("special-color");

}




/////////// FILTRIE AU CLICK ///////////////

async function filterCategory() {

                                               // 1 obtenir les données sur les œuvres à partir de la fonction asynchrone getWorks() /tableau works.
    const buttons = document.querySelectorAll(".filters button");   // 2 selectioner tous les bouton qui ont la classe "filters" et et les stocker dans la variable buttons
    buttons.forEach((button) => {                                   // 3 parcourir tous les boutons et ajouter un écouteur d'événements pour le clic à chaque bouton.
        button.addEventListener("click",(e) => {              // 4 a chaque fois qu'on va cliquer sur un btn
         
            btnId = e.target.id;  // enregestrer liformation suivente (e=regarde target=sur quoi tu cliques id=tu m'affiches son ID)
              
            // Supprime la classe spéciale de tous les boutons
            buttons.forEach(btn => btn.classList.remove("special-color"));
            // Ajoute la classe spéciale au bouton cliqué
            e.target.classList.add("special-color");


            divGallery.innerHTML = "";      // supprime toutes les photos actuellement affichées et met a zero               
                                                     
            let worksFilter = works;         // declaration d'une condition
            if (btnId !== "0") {                                 // si le btnId est different de 0 faire le trie suivent
                worksFilter = works.filter((work)=> {     // la methode filer cree un nouvau tableau   (tu verifies sur quel bouton j'ai appuyé et si ça correspond a la catégorie du btn tu verifies et tu laisses passer et enregistres dans un tableau )
                  
                    return work.categoryId == btnId;                // retourner la categoryId si elle est egale a au btn ID
                });
                 
            }
            worksFilter.forEach(work => {                  // recuperer le tableau tri par catigorie et apre parcourir pur chaque work avec forEach 
                createWorks(work)                             // afficher chaque work de se tri 
            });

            console.log(btnId);

        });
    });
    console.log(buttons);
}













