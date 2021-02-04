/*const img = document.getElementById('img');

fetch('http://localhost:3000/images/teddy_1.jpg')
    .then(res => res.json())
    .then(data => image.src = data[0].url)*/

fetch('http://localhost:3000/api/teddies')
.then(res => res.json())

.then(data => {
    console.log(data);

    const html = data.map(produits =>{
        return `<tr>    
                    <td><img src=${produits.imageUrl} class="img-fluid img-thumbnail w-50"></td>  
                    <td>${produits.name}</td>
                    <td>${produits.description}</td>
                    <td>
                        <select>
                            <option>${produits.colors[0]}</option>
                            <option>${produits.colors[1]}</option>
                            <option>${produits.colors[2]}</option>
                            <option>${produits.colors[3]}</option>
                        </select>
                    </td>
                    <td>${produits.price}</td>
                </tr>`
    })
    console.log(html)
    document.getElementById('listeProduits').innerHTML = html
})


