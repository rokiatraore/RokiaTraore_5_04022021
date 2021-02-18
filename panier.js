// Création d'un nouvel objet de type XMLHttpRequest
var request = new XMLHttpRequest();

//Ouvrir une connexion vers API
request.open('GET', 'http://localhost:3000/api/teddies/');

//Récupération des résultats de la requête
request.onreadystatechange = function(){
    if (this.readyState == XMLHttpRequest.DONE){
     if(this.status == 200) {
        //Conversion JSON > JS
        var response = JSON.parse(this.responseText);
        console.log(response);

        //Ajout de l'objet qty au produit
        var produit = {
            picture : response.imageUrl,
            colors : response.colors,
            name : response.name,
            price : response.price/100,
            description : response.description,
            qty : 0
        };

        //Afficher les articles sur la page panier 
        function affichageProduitPanier (){
            var produits = localStorage.getItem("produitDansLePanier");
            produits = JSON.parse(produits);
            
            var totalProduits = localStorage.getItem("totalPrix");
            totalProduits = JSON.parse(totalProduits);

            var containerproduits = document.querySelector('.produitAjouter');
            var containerTotalProduits = document.querySelector('.totalProduits');
           
            if(produits && containerproduits ){
                Object.values(produits).map(ficheProduit => {
                    containerproduits.innerHTML += `
                    <div class="fiche">
                        <img class="produit" src=${ficheProduit.picture}>
                        <span class="produit">${ficheProduit.name}</span>
                    <div class="prix">${ficheProduit.price}</div>
                    <div class="qty">${ficheProduit.qty}</div>
                    <div class="total">${ficheProduit.price * ficheProduit.qty}</div>
                    </div>
                    `

                    if (totalProduits && containerTotalProduits){
                        containerTotalProduits.innerHTML = totalProduits;
                    }
                    
                })

            }
        }
affichageProduitPanier ()
    }
    //Notifier message "erreur" si la récupération de l'API a échouée
    else{
        messageErreur.innerHTML = "Erreur";
    }
}   
};
request.send();