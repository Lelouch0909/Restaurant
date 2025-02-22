// Actions et interactions pour la page home.html

import { getAllIngredients, getAllPlats } from "./actions.js";


export async function get_plats() {
    const orderGroup = document.getElementById("orders_group")

    
    orderGroup.innerHTML = "chargement..."
    const ingredients = await getAllIngredients()
    console.log("ingredients : ");
    console.log(ingredients);
    
    
    const plats = getAllPlats().then((plats)=>{
   
        plats.forEach((plat)=>{
            var nom_ingredient = ""
            const plat_ingredients = JSON.parse(plat.ingredients)
            plat_ingredients.forEach((ingredient)=>{
                console.log(ingredient);
                
            })
            

            const order = document.createElement("div")
            order.classList.add("order")

            order.innerHTML = `
            <div class="order_presentation">
                <img class="presentation_plat" src="${plat.photo_url}" alt="plat">
                <div class="presentation_details">
                    <div class="details_name">${plat.nom}</div>
                    <div class="detail_description">${plat.description}</div>
                    <div class="details_infos">
                        <div class="details_price">${plat.prix} FCFA</div>
                        <div class="details_qte">${plat.quantite} kg</div> 
                    </div>
                </div>
            </div>
            <div class="separator"></div>
            <div class="order_legende">
                <div class="ingredient">
                    <div class="ingredient_name">${nom_ingredient}</div>
                    <div class="ingredient_qte">${ingredient.quantite} kg</div>
                </div>
            </div>
            `
            orderGroup.innerHTML = ""
            orderGroup.appendChild(order)
        })
    })
    .catch(()=> {
        orderGroup.innerHTML = "Impossible de charger les elements; verifiez votre connection internet."

    })
   
    
}