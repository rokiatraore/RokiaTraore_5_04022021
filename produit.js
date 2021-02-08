

var position = window.location.href.indexOf('?');
var idUrl = window.location.href.substring(position + 1);
//console.log(fin_url)

/*fetch('http://localhost:3000/api/teddies/'+idUrl)

.then(res => {
    console.log(res);

    if(res.ok){
    res.json()

    .then(data => {

        console.log(data);
        const obj = JSON.parse(data);

        {
            console.log(obj.colors)
        }
        
        document.getElementById('produit').innerHTML = affiche;
      
})
}
else{
    console.log("Erreur");
    document.getElementById('erreur').innerHTML = "Erreur"
}
})*/



// Création d'un nouvel objet de type XMLHttpRequest
var request = new XMLHttpRequest(); 
//Ouvrir une connexion vers API
request.open('GET', 'http://localhost:3000/api/teddies/'+idUrl);
//Récupération des résultats de la requête
request.onreadystatechange = function() {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    var response = JSON.parse(this.responseText);
    console.log(response)

    var fiche = `
                <figure>    
                    <img src=${response.imageUrl}>
                    <figcaption>
                        <h2>${response.name}</h2>
                        <p>${response.description}</p>
                        <p>${response.price}</p>
                        <p>${response.colors}</p>     
                    </figcaption> 
                </figure>
    `
document.getElementById('erreur').innerHTML = fiche   
}
else{
    //console.log("Erreur");
    document.getElementById('erreur').innerHTML = "Erreur"
}
}

//Envoi de la requête
request.send();
