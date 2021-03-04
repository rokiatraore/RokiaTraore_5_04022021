
//Récupération du paramètre URL
var position = window.location.href.indexOf('?');
var idUrl = window.location.href.substring(position + 1);
//console.log(idUrl)

// Création d'un nouvel objet de type XMLHttpRequest
var request = new XMLHttpRequest(); 

//Ouvrir une connexion vers API
request.open('GET', 'http://localhost:3000/api/teddies/'+idUrl);

//Récupération des résultats de la requête
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE) {
      if (this.status == 200) {
        //Conversion JSON > JS
        var response = JSON.parse(this.responseText);
    
    /* ---------------------------- STRUCTURE FICHE PRODUIT ----------------------------*/

        document.getElementById('produit').innerHTML += 
            `<figure>    
                <img src=${response.imageUrl}>
                <figcaption>
                    <h2>${response.name}</h2>
                    <p>${response.description}</p>
                    <p>${response.price/100}.00€</p>
                </figcaption> 
            </figure>`

        //Liste déroulante des choix de couleurs  
        for(i=0; i < response.colors.length; i++){ 
            document.getElementById('couleur').innerHTML +=`<option>${response.colors[i]}</option>`         
        };
        
    /* ---------------------------- BOUTON AJOUTER AU PANIER ----------------------------*/
        
        //Sélection du bouton dans le code
        var boutonPanier = document.getElementById('panier');

        //Réaction au clic de l'utilisateur sur le bouton "ajouter au panier" par l'appel d'une fonction
        boutonPanier.addEventListener('click', ajoutArticlePanier );
        
        //  Appel des fonctions
        function ajoutArticlePanier (){
            nombreArticlePanier();
            produitLocalStorage ();
            totalPrix();
        };

        //Sauvegarder le nombre de produits ajoutés au panier dans le localStorage
        function nombreArticlePanier(){
            var nombreProduit = localStorage.getItem('nombreArticlePanier');
     
            //Convertion string > number
            nombreProduit = parseInt(nombreProduit);

        if(nombreProduit){
                localStorage.setItem('nombreArticlePanier',nombreProduit + 1);
                document.getElementById('compteurPanier').textContent =nombreProduit + 1;
            } 
            else {
                localStorage.setItem('nombreArticlePanier',1);
                document.getElementById('compteurPanier').textContent = 1;
            }
        };

        /*.Sauvegarder le nom du produit ajouté au panier dans le local storage,
        .Modifier la couleur 
        .Augmenter la quantité d'un produit,
        .Ajouter un nouveau produit selectionné dans le local storage.*/
        function produitLocalStorage (){

            var ficheProduit = JSON.parse(localStorage.getItem("produitDansLePanier"));

            //Mettre les choix du formulaire dans une variable
            var optionCouleur = document.getElementById("couleur");
            console.log(optionCouleur);

            //Mettre la valeur de l'option selectionné dans une variable
            var option = optionCouleur.value;

            //Ajouter propriété qty et couleur dans l'objet
            var produit = {
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
                if(ficheProduit[produit.name] == undefined){
                    ficheProduit = {
                        ...ficheProduit,
                        [produit.name] : produit
                        
                    }
                    console.log("c3");
                }
                else if (ficheProduit[produit.name].name == produit.name && ficheProduit[produit.name].colors !== produit.colors){
                    ficheProduit = {
                        ...ficheProduit,
                        [produit.name] : produit
                        
                    }
                    console.log("c4");

                }
                ficheProduit[produit.name].qty += 1;
                console.log("c2");
                
            }  
            else {
                produit.qty = 1;
                ficheProduit = {
                    [produit.name] : produit
                }
                console.log("c1");

            }

            localStorage.setItem("produitDansLePanier",JSON.stringify(ficheProduit)); 

             
        };

        //Mettre à jour le prix total des articles ajouté
        function totalPrix(){
            var prix = localStorage.getItem("totalPrix");

            if(prix != null){
                prix = parseInt(prix);
                localStorage.setItem("totalPrix", prix + response.price/100)
            }
            else{
                localStorage.setItem("totalPrix", response.price/100);
            } 
        }
        

        //Garder la même valeur du panier en cas d'actualisation de la page
        function actualisePage(){
            let nombreProduit = localStorage.getItem('nombreArticlePanier');

            if(nombreProduit){
                document.getElementById('compteurPanier').textContent =nombreProduit;
            }
            }
            actualisePage();

            

    }
    //Notifier message "erreur" si la récupération de l'API a échouée
    else{
        console.log(this.readyState == XMLHttpRequest.DONE && this.status == 200)
        document.getElementById('erreur').innerHTML = "Erreur";
    }
}
};
//Envoi de la requête
request.send();




