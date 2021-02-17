// Création d'un nouvel objet de type XMLHttpRequest
var request = new XMLHttpRequest(); 

//Ouvrir une connexion vers API
request.open('GET', 'http://localhost:3000/api/teddies/'+idUrl);

//Récupération des résultats de la requête
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE ) {
      if (this.status == 200) {
     //Conversion JSON > JS 
    var response = JSON.parse(this.responseText);

    //Ajout de l'objet qty au produit
    var produit = 
    {
        picture : response.imageUrl,
        color : response.colors,
        name : response.name,
        price : response.price/100,
        description : response.description,
        qty : 0
    };
    
    
    //Sélection du bouton dans le code
    var boutonPanier = document.getElementById('panier');
    //Réaction au clic de l'utilisateur sur le bouton "ajouter au panier" par l'appel d'une fonction
    boutonPanier.addEventListener('click', ajoutArticlePanier );

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

    /*1. Sauvegarder le nom du produit ajouté au panier dans le local storage,
     3. Augmenter la quantité d'un produit,
    2. Ajouter un nouveau produit selectionné dans le local storage*/
    function produitLocalStorage (){
        var produits = localStorage.getItem("produitDansLePanier");
        produits = JSON.parse(produits);

        if(produits != null){
            if(produits[produit.name] == undefined){
                produits = {
                    ...produits,
                    [produit.name] : produit
                } 
            }
            produits[produit.name].qty += 1;
        }  
        else {
            produit.qty = 1;
            produits = {
                [produit.name] : produit
            }
        }
        localStorage.setItem("produitDansLePanier",JSON.stringify(produits));  
    };

    //Mettre à jour le prix total des articles ajouté
    function totalPrix(){
        var prix = localStorage.getItem("totalPrix");

        if(prix != null){
            prix = parseInt(prix);
            localStorage.setItem("totalPrix", prix + produit.price)
        }
        else{
            localStorage.setItem("totalPrix", produit.price);
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
        document.getElementById('erreur').innerHTML = "Erreur";
    }
}
};
//Envoi de la requête
request.send();




