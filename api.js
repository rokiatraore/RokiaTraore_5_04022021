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
        console.log(response);}
        else{
            messageErreur.innerHTML = "Erreur";
        }
    }
    };
    request.send();