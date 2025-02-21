async function loadSection(pageId) {
    try {
      const response = await fetch(`/pages/${pageId}.html`);
      if (!response.ok) throw new Error(`Impossible de charger ${pageId}.html`);
  
      const content = await response.text();
  
      document.getElementById('main-content').innerHTML = content;
      history.pushState({ section: pageId }, '', `#${pageId}`);
      initializePageScripts(pageId);

    } catch (error) {
      console.error(error);
      document.getElementById('main-content').innerHTML = `<p>Erreur lors du chargement du contenu.</p>`;
    }
  }
  
  document.querySelectorAll('.menu_list .items').forEach((item) => {
    item.addEventListener('click', () => {
      const pageId = item.getAttribute('data-section');
      loadSection(pageId);
    });
  });

  window.onload = () => {
    const hash = window.location.hash.slice(1);   
    loadSection(hash || 'home');
  };
  
  window.onpopstate = () => {
    const hash = window.location.hash.slice(1);
    loadSection(hash || 'home');
  };

// Fonction pour initialiser les scripts spécifiques à chaque page
function initializePageScripts(pageId) {
  if (pageId === 'ajout') {
    import('./ajouts_ingredients.js').then((module) => {
      module.initializeAjoutIngredients();
    });
  }
}