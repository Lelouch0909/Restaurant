export function initializeAjoutIngredients() {
  const addButton = document.getElementById('addOption');
  const selectedOptionsContainer = document.getElementById('selectedOptions');
  const resultElement = document.getElementById('result');
  const selectElement = document.getElementById('options');
  console.log(addButton);
  

  if (!addButton || !selectedOptionsContainer || !resultElement || !selectElement) {
    console.error("Éléments manquants pour la page 'ajout'.");
    return;
  }

  let selections = {};

  function addSelectedOption() {
    const selectedValue = selectElement.value;

    if (!selectedValue || selectedValue === "") {
      alert("Veuillez sélectionner une option.");
      return;
    }

    if (selections[selectedValue]) {
      alert("Cette option a déjà été ajoutée.");
      return;
    }

    const optionItem = document.createElement('div');
    optionItem.className = 'option-item';

    const label = document.createElement('label');
    label.textContent = selectedValue;

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = '1';
    quantityInput.value = '1';
    quantityInput.style.width = '50px';

    const removeButton = document.createElement('div');
    removeButton.textContent = '';

    removeButton.addEventListener('click', () => {
      optionItem.remove();
      delete selections[selectedValue]; //****************** */
      updateResult();
    });

    optionItem.appendChild(label);
    optionItem.appendChild(quantityInput);
    optionItem.appendChild(removeButton);

    selectedOptionsContainer.appendChild(optionItem);

    selections[selectedValue] = 1;

    quantityInput.addEventListener('input', () => {
      const quantity = parseInt(quantityInput.value) || 1;
      selections[selectedValue] = quantity;
      updateResult();
    });

    updateResult();
    console.log(selections);
    
  }

  function updateResult() {
    let resultText = '';
    let totalQuantity = 0;

    for (const [option, quantity] of Object.entries(selections)) {
      resultText += `${option}: ${quantity} unités\n`;
      totalQuantity += quantity;
    }

    if (resultText !== '') {
      resultElement.textContent = `Sélection actuelle :\n${resultText}\nTotal : ${totalQuantity} unités`;
    } else {
      resultElement.textContent = '';
    }
  }

  addButton.addEventListener('click', addSelectedOption);
}