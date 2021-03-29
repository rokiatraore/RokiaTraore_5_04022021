
//Récupération du paramètre URL
const position = window.location.href.indexOf('?');
const idUrl = window.location.href.substring(position + 1);
console.log(idUrl)

// Création d'un nouvel objet de type XMLHttpRequest
let request = new XMLHttpRequest(); 

//Ouvrir une connexion vers API
request.open('GET', 'http://localhost:3000/api/teddies/'+idUrl);

//Récupération des résultats de la requête
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE) {
      if (this.status == 200) {
        //Conversion JSON > JS
        const response = JSON.parse(this.responseText);
        console.log(response)
    
    /* ---------------------------- STRUCTURE FICHE PRODUIT ----------------------------*/

        document.getElementById('produit').innerHTML += 
            `<h1 class="titreFicheProduit">${response.name}</h1>
            <div class="containerFicheProduit">
                <div class="imgFicheProduit">    
                    <img src=${response.imageUrl}>
                </div>
                <div class="descriptionFicheProduit">
                    <h4>${response.price/100}.00€</h4>
                    <p class ="description">${response.description}</p>
                    <form class="optionCouleur">
                        <label classe="titreOptionCouleur">Choisir la couleur :</label>
                        <select name="couleur" id="couleur"></select>
                    </form>
                    <div class="containerBtnAjoutPanier">
                        <a href="#" id="btnAjouterPanier">Ajouter au panier</a>
                    </div>
                </div> 
            </div>`

        //Liste déroulante des choix de couleurs  
        for(i=0; i < response.colors.length; i++){ 
            document.getElementById('couleur').innerHTML +=`<option>${response.colors[i]}</option>`         
        };
        
    /* ---------------------------- BOUTON AJOUTER AU PANIER ----------------------------*/
        
        //Sélection du bouton dans le code
        let btnAjouterPanier = document.getElementById('btnAjouterPanier');

        //Réaction au clic de l'utilisateur sur le bouton "ajouter au panier" par l'appel d'une fonction
        btnAjouterPanier.addEventListener('click', ajoutArticlePanier );
        
        //  Appel des fonctions
        function ajoutArticlePanier (){
            nombreArticlePanier();
            produitLocalStorage ();
            totalPrix();
        };

        /* ----- Fonction : Sauvegarder le nombre de produits ajoutés au panier dans le localStorage ----- */
        function nombreArticlePanier(){
            let nombreProduit = localStorage.getItem('nombreArticlePanier');
     
            //Convertion string > number
            nombreProduit = parseInt(nombreProduit);

            if(nombreProduit){
                localStorage.setItem('nombreArticlePanier',nombreProduit + 1);
                document.querySelector('.compteurPanier').textContent =nombreProduit + 1;
            } 
            else {
                localStorage.setItem('nombreArticlePanier',1);
                document.querySelector('.compteurPanier').textContent = 1;
            }
        };

        /* ----- Fonction : 
        .Sauvegarder le nom du produit ajouté au panier dans le local storage,
        .Modifier la couleur 
        .Augmenter la quantité d'un produit,
        .Ajouter un nouveau produit selectionné dans le local storage.----- */
        function produitLocalStorage (){
            let ficheProduit = JSON.parse(localStorage.getItem("produitDansLePanier"));
            console.log(ficheProduit)

            //Mettre les choix de la couleur dans une variable
            let optionsCouleur = document.getElementById("couleur");

            //Mettre la valeur de l'option selectionné dans une variable
            let option = optionsCouleur.value;

            //Ajouter propriété qty et couleur dans l'objet
            let produit = {
                picture : response.imageUrl,
                colors : option,
                name : response.name,
                price : response.price/100,
                description : response.description,
                id : response._id,
                qty : 0
            }; 
            console.log(produit)

            
            if(ficheProduit != null){
              
                //Si le produit n'existe pas alors créer une nouvelle fiche produit
                if(ficheProduit[`${produit.colors}-${produit.name}`] == undefined){
                    ficheProduit = {
                        ...ficheProduit,
                        [`${produit.colors}-${produit.name}`] : produit
                        
                    }
                    console.log("conditions 3 - Créer fiche en cas de nouveau produit");
                }
                //Si le nom du produit du LocalStorage sont identique et la couleur différente alors créer un nouvelle fiche produit 
                else if (ficheProduit[`${produit.colors}-${produit.name}`].name == produit.name && 
                        ficheProduit[`${produit.colors}-${produit.name}`].colors !== produit.colors){
                    ficheProduit = {
                        ...ficheProduit,
                        [`${produit.colors}-${produit.name}`] : produit
                         
                    }
                    console.log("conditions 4 - Créer une fiche si le nom est similaire mais couleur différente");
                } 

                //Si le produit existe dans le LocalStorage alors incrémenter 1 à qty
                ficheProduit[`${produit.colors}-${produit.name}`].qty += 1;
                console.log("conditions 2 - incrémenter + 1 qty fiche existente");
            }
            //Sinon créer une fiche  
            else {
                produit.qty = 1;
                ficheProduit = {
                    [`${produit.colors}-${produit.name}`] : produit
                }
                console.log("conditions 1 - Créer un fiche");
            }
            //Stocker les données dans le localStorage
            localStorage.setItem("produitDansLePanier",JSON.stringify(ficheProduit));  
        };

        /* ----- Fonction : Mettre à jour le prix total des articles ajouté ----- */
        function totalPrix(){
            let prix = localStorage.getItem("totalPrix");

            //S'il y a un prix afficher alors additioner le prix du produit 
            if(prix != null){
                prix = parseInt(prix);
                localStorage.setItem("totalPrix", prix + response.price/100)
            }
            //Sinon si c'est le 1er produit ajouté, afficher le prix du produit
            else{
                localStorage.setItem("totalPrix", response.price/100);
            } 
        }
        

        /* ----- Fonction : Garder la même valeur du panier en cas d'actualisation de la page ----- */
        function actualisePage(){
            let nombreProduit = localStorage.getItem('nombreArticlePanier');
            //Afficher le nombre de produit indiqué dans le localStorage
            if(nombreProduit){
                document.querySelector('.compteurPanier').textContent =nombreProduit;
            }
            }
            actualisePage();
    }
    //Notifier message "erreur" si la récupération de l'API a échouée
    else{
        console.log(this.readyState == XMLHttpRequest.DONE && this.status == 200)
        document.querySelector('.erreur').innerHTML = "Nous sommes désolés le serveur ne répond pas ";
    }
}
};
//Envoi de la requête
request.send();




