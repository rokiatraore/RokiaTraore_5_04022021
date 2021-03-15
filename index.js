const messageErreur = document.getElementById('erreur');
const ficheProduit = document.getElementById('products');

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

        //Afficher les produits dans la page accueil HTML
        response.forEach ( produit => {
            ficheProduit.innerHTML += 
            `
            <article class="product">
                <div class="containerProduct">
                    <img src=${produit.imageUrl} alt = "Nounours" class="imgProduct">
                    <a class="btnVoirProduit" data-id="1" href="./produit.html?${produit._id}">Voir le produit</a>
                </div>
                <h3>${produit.name}</h3>
                <h4>${produit.price/100}.00€</h4>
            </article>
            
            `
            

        });
    }
    //Notifier message "erreur" si la récupération de l'API a échouée
    else{
        messageErreur.innerHTML = "Erreur";
    }
}
};
request.send();