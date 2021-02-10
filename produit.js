
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
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    var response = JSON.parse(this.responseText);
    console.log(response);

    var fiche = 
        `<figure>    
            <img src=${response.imageUrl}>
            <figcaption>
                <h2>${response.name}</h2>
                <p>${response.description}</p>
                <p>${response.price}</p>
            </figcaption> 
        </figure>`
    document.getElementById('produit').innerHTML = fiche

    //Liste déroulante des choix de couleurs  
    for(i=0; i < response.colors.length; i++){ 
        console.log(response.colors[i])  
        document.getElementById('couleur').innerHTML +=`<option>${response.colors[i]}</option>`         
    }; 

//Bouton Panier
let boutonPanier = document.getElementById('panier');

boutonPanier.addEventListener('click', ajoutArticlePanier );

function ajoutArticlePanier (event){
    console.log("Un clic est capté");
    console.log(event);
    nombreArticlePanier(response);
}

function actualisePage(){
    let nombreProduit = localStorage.getItem('nombreArticlePanier');

    if(nombreProduit){
        document.getElementById('compteurPanier').textContent =nombreProduit;
    }

}

//Sauvegarde des produits ajoutés au panier dans le localStorage
function nombreArticlePanier(response){
    console.log("Le produit ajouté :", response.name);
    let nombreProduit = localStorage.getItem('nombreArticlePanier');
    
    //Convertir string > number
    nombreProduit = parseInt(nombreProduit);

    console.log(nombreProduit)

   if(nombreProduit){
        localStorage.setItem('nombreArticlePanier',nombreProduit + 1);
        document.getElementById('compteurPanier').textContent =nombreProduit + 1;


    } else {
        localStorage.setItem('nombreArticlePanier',1);
        document.getElementById('compteurPanier').textContent = 1;
    }

}
actualisePage();
}
else{
    //console.log("Erreur");
    document.getElementById('erreur').innerHTML = "Erreur";
}

};
//Envoi de la requête
request.send();


