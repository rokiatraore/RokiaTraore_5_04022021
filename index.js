const messageErreur = document.getElementById('erreur');
const ficheProduit = document.getElementById('ficheProduit');

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
            `<figure>    
                <img src=${produit.imageUrl}>
                <figcaption>
                    <h2>${produit.name}</h2>
                    <p>${produit.description}</p>
                    <p>${produit.price}</p>
                    <p>${produit.colors}</p>
                    <a href="./produit.html?${produit._id}">Voir le produit</a>
                </figcaption> 
            </figure>`
            

        });
    }
    //Notifier message "erreur" si la récupération de l'API a échouée
    else{
        messageErreur.innerHTML = "Erreur";
    }
}
};
request.send();