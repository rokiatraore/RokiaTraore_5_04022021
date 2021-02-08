//Demande de récupération des données
fetch('http://localhost:3000/api/teddies')

    //Première promesse : conversion du Body en JSON
    .then(res => {
        console.log(res);
        if(res.ok){
            res.json()
            //Deuxième promesse : Accéder aux données
            .then(dataProduits => {
                console.log(dataProduits);

                //Afficher les produits dans la page accueil HTML
                const listeProduits = dataProduits.map(produit => {
                   
                    return `<figure>    
                                <img src=${produit.imageUrl}>
                                <figcaption>
                                    <h2>${produit.name}</h2>
                                    <p>${produit.description}</p>
                                    <p>${produit.price}</p>
                                    <p>${produit.colors}</p>
                                    <a href="./produit.html?${produit._id}" onclick="verifier()">Voir le produit</a>
                                 </figcaption> 
                            </figure>`
    })
    
    console.log(listeProduits)
    document.getElementById('ficheProduit').innerHTML = listeProduits
})
    }

    //Gérer les erreurs en affichant un message à l'utilisateur
    else{
        console.log("Erreur");
        document.getElementById('erreur').innerHTML = "Erreur"
    }
})




