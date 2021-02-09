
//Récupération du paramètre URL
var position = window.location.href.indexOf('?');
var idUrl = window.location.href.substring(position + 1);
//console.log(fin_url)

// Création d'un nouvel objet de type XMLHttpRequest
var request = new XMLHttpRequest(); 
//Ouvrir une connexion vers API
request.open('GET', 'http://localhost:3000/api/teddies/'+idUrl);
//Récupération des résultats de la requête
request.onreadystatechange = function() {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    var response = JSON.parse(this.responseText);
    console.log(response)

    for (let i in response.colors){
        console.log(response.colors[i]);

          var fiche = `
                <figure>    
                    <img src=${response.imageUrl}>
                    <figcaption>
                        <h2>${response.name}</h2>
                        <p>${response.description}</p>
                        <p>${response.price}</p>
                        <select>
                            <option>${response.colors[i]}</option> 
                        </select>   
                    </figcaption> 
                </figure>
    `
    }

  
document.getElementById('produit').innerHTML = fiche   
}
else{
    //console.log("Erreur");
    document.getElementById('erreur').innerHTML = "Erreur";
}
};

//Envoi de la requête
request.send();


//Bouton Panier
let boutonPanier = document.querySelectorAll('.panier');

let produits =[{
    
}]

for(let i=0; i < boutonPanier.length; i++){
    boutonPanier[i].addEventListener('click', () => {
        numeroCarte();

    })
}
function onloadNombreProduit(){
    let nombreProduit = localStorage.getItem('numeroCarte');

    if(nombreProduit){
        document.querySelector('.compteurPanier').textContent =nombreProduit;
    }

}
function numeroCarte(){
    let nombreProduit = localStorage.getItem('numeroCarte');
    
    //console.log(typeof nombreProduit);

    nombreProduit = parseInt(nombreProduit);
    //console.log(typeof nombreProduit);

    if(nombreProduit){
        localStorage.setItem('numeroCarte',nombreProduit + 1);
        document.querySelector('.compteurPanier').textContent =nombreProduit + 1;


    } else {
        localStorage.setItem('numeroCarte',1);
        document.querySelector('.compteurPanier').textContent = 1;
    }

}

onloadNombreProduit();