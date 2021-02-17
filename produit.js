
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
        console.log(response);

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




