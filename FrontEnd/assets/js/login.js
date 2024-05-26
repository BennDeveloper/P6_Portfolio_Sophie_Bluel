

// variables Globales pour le login//
const email = document.querySelector("form #email");
const password = document.querySelector("form #password");
const messageErreur = document.querySelector("#contact p");
const formLogin = document.querySelector(".login-form");     // sélectionne le formulaire de classe "login-form" dans le document HTML.




function loginListener() {                                       // fonction loginListener
    formLogin.addEventListener("submit", async function (e) {    // ajouter addEventListener sur levenement submit (il se déclenchera lorsque l'utilisateur cliquera sue le bouton Se connecter)
      e.preventDefault()                                         // bloquer le comportement par défaut (ne recharge plus la page)
      //
      const login = {                                            // enregestrer dans une variable qui(crée un objet JavaScript avec les valeurs de l'email et du mot de passe entrés dans le formulaire.)
        email: email.value,
        password: password.value,
      };
      //
      const chargeUtile = JSON.stringify(login);                   //convertit l'objet login en chaîne JSON pour l'envoyer dans la requête HTTP.
      //
      const response = await fetch("http://localhost:5678/api/users/login", {    //envoie une requête HTTP POST à l'URL http://localhost:..... avec les données d'identification (email et mot de passe) dans le corps de la requête.
        method: "POST",                                                          //  la méthode HTTP utilisée est POST. les données seront envoyées au serveur pour traitement.
        headers: { "Content-type": "application/json" },                         //  les en-têtes de la requête.le contenu envoyé est de type JSON.
        body: chargeUtile,
      });
      user = await response.json();                                              //  analyse la réponse HTTP comme JSON et la stocke dans la variable user.
      console.log(user);                                                         // affiche les données utilisateur dans la console.
      if (response.ok) {                                       // Cette structure conditionnelle vérifie si la réponse HTTP est réussie (code d'état 200-299).
        window.localStorage.setItem("token", user.token);     //  Si c'est le cas, elle stocke le token d'authentification dans le stockage local du navigateur (localStorage). Sinon, elle applique des styles d'erreur aux champs d'email et de mot de passe du formulaire.
        window.location.href = "index.html"
      } else {                                                  
        messageErreur.textContent = "Erreur dans l’identifiant ou le mot de passe";

       
      }

    });
  }

  loginListener()

