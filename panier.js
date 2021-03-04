//Afficher les articles sur la page panier 
var produits = localStorage.getItem("produitDansLePanier");
produits = JSON.parse(produits);
            
var totalProduits = localStorage.getItem("totalPrix");
totalProduits = JSON.parse(totalProduits);

var containerproduits = document.querySelector('.produitAjouter');
var containerTotalProduits = document.querySelector('.totalProduits');

function affichageProduitPanier (){
    if(produits && containerproduits ){
        Object.values(produits).forEach(ficheProduit => {
            containerproduits.innerHTML += 
                `<div class="fiche" data-name="${ficheProduit.name}">
                    <button class="btnSupprimer"><i class="fas fa-times" ></i></button>
                    <img class="produit" src=${ficheProduit.picture}>
                    <span class="produit" id ="${ficheProduit.id}">${ficheProduit.name}</span>
                    <span class="couleur">${ficheProduit.colors}</span>
                    <div class="prix">${ficheProduit.price}</div>
                    <div class="qty" >
                        <button class="btnQtyDown" id=${ficheProduit.id} ><i class="fas fa-arrow-alt-circle-down " ></i></button>
                        <span class="qty">${ficheProduit.qty}</span>
                        <button class="btnQtyUp"id=${ficheProduit.id} ><i class="fas fa-arrow-circle-up"></i></button>
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

var boutonSuppression = document.querySelectorAll(".btnSupprimer");
console.log(boutonSuppression);

var tableauProduits = Object.values(produits)
console.log(tableauProduits)


for (i = 0; i<boutonSuppression.length; i++){
    boutonSuppression[i].addEventListener("click", supprimerArticle);

    function supprimerArticle(){
        for(i = 0; i < tableauProduits.length; i++){
            var nouveauTableauProduits = tableauProduits.filter(function(article) {
                return article.id !== tableauProduits[i].id
                
            });
            console.log("b")
        }
        localStorage.setItem("produitDansLePanier", JSON.stringify(nouveauTableauProduits))
        
        //Actualiser la page
        window.location.href = "panier.html";
    }
}

/* ---------------------------- BOUTON DOWN QTY ----------------------------*/

var btnQtyDown = document.querySelectorAll(".btnQtyDown")
console.log(btnQtyDown)


for(i = 0; i < btnQtyDown.length; i++){
    btnQtyDown[i].addEventListener("click", qtyDown);
 
}

function qtyDown(){
    diminuerQty(this);
    modifierNombreArticlePanierDown()
}

function diminuerQty(that){
    for(i = 0; i < tableauProduits.length; i++){
        if(tableauProduits[i].qty >= 0 && tableauProduits[i].id == that.id){
            var qtyDown = tableauProduits[i].qty -= 1;
            console.log(qtyDown + "b")
        }

        else if (tableauProduits[i].qty == 0){
            tableauProduits[i].qty = 0
            var supprimerLigne = tableauProduits.filter(function(supprimer){
                return supprimer.qty == 0
            })
            alert(supprimerLigne + "0" + tableauProduits)
            localStorage.setItem("produitDansLePanier", JSON.stringify(supprimerLigne))
        }

        //Modifier la prix total au clique
        var prix = localStorage.getItem("totalPrix");
        if(prix != null){
            prix = parseInt(prix);
            localStorage.setItem("totalPrix", prix - tableauProduits[i].price)
         }
        else{
            localStorage.setItem("totalPrix", tableauProduits[i].price);
        }      
    }
  
        
        
    
        localStorage.setItem("produitDansLePanier", JSON.stringify(produits))
       window.location.href = "panier.html"; 
}

//Modifier le nombre d'article dans le localStorage et sur la page panier
function modifierNombreArticlePanierDown(){
    var modifierNombreProduitDown = localStorage.getItem('nombreArticlePanier');
 
    //Convertion string > number
    modifierNombreProduitDown = parseInt(modifierNombreProduitDown);

if(modifierNombreProduitDown){
        localStorage.setItem('nombreArticlePanier',modifierNombreProduitDown - 1);
        document.getElementById('compteurPanier2').textContent =modifierNombreProduitDown - 1;
    } 
    else {
        localStorage.setItem('nombreArticlePanier',1);
        document.getElementById('compteurPanier2').textContent = 1;
    }
};

/* ---------------------------- BOUTON UP QTY ----------------------------*/

var btnQtyUp = document.querySelectorAll(".btnQtyUp")
console.log(btnQtyUp)

for(i = 0; i < btnQtyUp.length; i++){
    btnQtyUp[i].addEventListener("click", qtyUp);
} 

function qtyUp(){
    augmenterQty(this);
    modifierNombreArticlePanierUp();
   }

//Augmenter la qty au clique
function augmenterQty(that){
    for(i = 0; i < tableauProduits.length; i++){
        if(tableauProduits[i].qty >= 0 && tableauProduits[i].id == that.id){
            var qtyUp = tableauProduits[i].qty += 1;
            console.log(qtyUp)
        }
        /*var qtyUp = tableauProduits[i].qty += 1;
        console.log(qtyUp)*/
           
        //Modifier la prix total au clique
        var prix = localStorage.getItem("totalPrix");
        if(prix != null){
            prix = parseInt(prix);
            localStorage.setItem("totalPrix", prix + tableauProduits[i].price)
        }
        else{
            localStorage.setItem("totalPrix", tableauProduits[i].price);
        } 
            
    }
    localStorage.setItem("produitDansLePanier", JSON.stringify(produits))

    //Actualiser la page automatiquement
    window.location.href = "panier.html";
}

//Modifier le nombre d'article dans le localStorage et sur la page panier
function modifierNombreArticlePanierUp(){
    var modifierNombreProduit = localStorage.getItem('nombreArticlePanier');
 
    //Convertion string > number
    modifierNombreProduit = parseInt(modifierNombreProduit);

if(modifierNombreProduit){
        localStorage.setItem('nombreArticlePanier',modifierNombreProduit + 1);
        document.getElementById('compteurPanier2').textContent =modifierNombreProduit + 1;
    } 
    else {
        localStorage.setItem('nombreArticlePanier',1);
        document.getElementById('compteurPanier2').textContent = 1;
    }
};

//Garder la même valeur du panier en cas d'actualisation de la page
function actualisePage(){
    let nombreProduit = localStorage.getItem('nombreArticlePanier');

    if(nombreProduit){
        document.getElementById('compteurPanier2').textContent =nombreProduit;
    }
}
actualisePage();