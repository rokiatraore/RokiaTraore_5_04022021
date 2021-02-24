//Afficher les articles sur la page panier 
function affichageProduitPanier (){
    var produits = localStorage.getItem("produitDansLePanier");
    produits = JSON.parse(produits);
            
    var totalProduits = localStorage.getItem("totalPrix");
    totalProduits = JSON.parse(totalProduits);

    var containerproduits = document.querySelector('.produitAjouter');
    var containerTotalProduits = document.querySelector('.totalProduits');
           
    if(produits && containerproduits ){
        Object.values(produits).forEach(ficheProduit => {
            containerproduits.innerHTML += 
                `<div class="fiche" data-name=${ficheProduit.name}>
                    <i class="fas fa-times aa" ></i>
                    <img class="produit" src=${ficheProduit.picture}>
                    <span class="produit">${ficheProduit.name}</span>
                    <div class="prix">${ficheProduit.price}</div>
                    <div class="qty" >
                        <i class="fas fa-arrow-circle-up" ></i>
                        <span>${ficheProduit.qty}</span>
                        <i class="fas fa-arrow-alt-circle-down"></i>
                    </div>

                    <div class="total">${ficheProduit.price * ficheProduit.qty}</div>
                </div>`
            
            
        if (totalProduits && containerTotalProduits){
            containerTotalProduits.innerHTML = totalProduits;
        }
                    
        })


    }
}
affichageProduitPanier ()



/* ---------------------------- SUPPRIMER ARTICLE PANIER ----------------------------*/

var boutonSuppression = document.getElementsByClassName('aa')

for(var i=0;i< boutonSuppression.length;i++){
    boutonSuppression[i].addEventListener('click', supprimerArticle );
}

function supprimerArticle (){
    var ficheProduit = localStorage.getItem("produitDansLePanier");
    ficheProduit = JSON.parse(ficheProduit);

    var containerproduits = document.getElementsByClassName('fiche');

    for(var i=0; containerproduits.length; i++){
    var dataName = containerproduits[i].dataset.name;
    console.log(dataName)

    }
    

    /*if(ficheProduit == dataName){
        containerproduits.textContent = ` `;
        ficheProduit = {
            ...ficheProduit,
            [produit.name] : produit
        } 
        delete ficheProduit;
        localStorage.setItem("produitDansLePanier", delete Object.values(ficheProduit));
    }
    localStorage.setItem("produitDansLePanier",JSON.stringify(ficheProduit));  */

    
 

    /*if(produits != undefined && containerproduits){    
            containerproduits.textContent = ` `;
            localStorage.setItem("produitDansLePanier", delete Object.values(produits));
    }
    else{
        produit;
    }*/
}
