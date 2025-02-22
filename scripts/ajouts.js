import { addIngredient, addPlat, getAllIngredients } from "./actions.js";
import { selectedIngredients } from "./ajouts_ingredients.js";

// Gere la page ajout.html ( interactions et actions... evenements )
export var currentIngredients = {};

export function ajouts_page() {
  const platButton = document.getElementById("platButton");
  const ingredientButton = document.getElementById("ingredientButton");
  const img = document.getElementById("file");
  const btn_add = document.getElementById("btn_add");
  var file = null;

  const showPlat = () => {
    document.getElementById("plats").style.display = "block";
    document.getElementById("ingredient").style.display = "none";
  };
  const get_All_ingredients = () => {
    getAllIngredients().then((ingredients) => {
      ingredients.forEach((ingredient) => {
        const ingredientElement = document.createElement("option");
        ingredientElement.value = ingredient.$id;
        ingredientElement.innerText = ingredient.nom;
        currentIngredients = {
          ...currentIngredients,
          [ingredient.$id]: ingredient,
        };
        document.getElementById("options").appendChild(ingredientElement);
      });
    });
  };
  const showIngredient = () => {
    document.getElementById("plats").style.display = "none";
    document.getElementById("ingredient").style.display = "block";
  };
  const previewImage = (event) => {
    file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const previewContainer = document.getElementById("custum-file-upload");
        previewContainer.style.background = `url(${e.target.result}) center center / cover`;
      };

      reader.readAsDataURL(file);
    } else {
      previewContainer.classList.add("hidden"); // Cache le conteneur si aucun fichier n'est sélectionné
      imagePreview.src = ""; // Réinitialise l'image
    }
  };
  const add_in_database = async () => {
    const element = document.getElementById("ingredient");
    const computedStyle = window.getComputedStyle(element);

    if (computedStyle.display === "block") {
      const ingredientData = {
        nom: document.getElementById("general_title_name_input").value,
        description: document.getElementById("general_title_description_input")
          .value,
        quantite: parseFloat(
          document.getElementById("ingredient_quantite_input").value
        ),
      };

      addIngredient(ingredientData, file ? file : null);
    } else if (computedStyle.display !== "block") {
      const platData = {
        nom: document.getElementById("general_title_name_input").value,
        description: document.getElementById("general_title_description_input")
          .value,
        prix: parseFloat(document.getElementById("plats_prix_input").value),
        ingredients: JSON.stringify(selectedIngredients),
      };

      addPlat(platData, file ? file : null);
    }
  };

  platButton.addEventListener("click", () => {
    showPlat();
  });
  ingredientButton.addEventListener("click", () => {
    showIngredient();
  });
  img.addEventListener("change", previewImage);
  btn_add.addEventListener("click", add_in_database);
  get_All_ingredients();
}
