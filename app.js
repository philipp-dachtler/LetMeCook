// app.js
document.addEventListener('DOMContentLoaded', async () => {
  // IDB Initialisierung
  const db = await idb.openDB('RecipesDB', 1, {
    upgrade(db) {
      db.createObjectStore('recipes', { keyPath: 'id', autoIncrement: true });
    }
  });
  
  // Navigation
  document.getElementById('btn-new').addEventListener('click', showRecipeForm);
  document.getElementById('btn-gallery').addEventListener('click', showGallery);
  
  // Rezept-Formular Logik
  const recipeForm = document.getElementById('recipe-form');
  recipeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const recipe = {
      title: document.getElementById('title').value,
      ingredients: document.getElementById('ingredients').value,
      steps: document.getElementById('steps').value,
      image: await toBase64(document.getElementById('image').files[0]),
      created: new Date()
    };
    
    await db.add('recipes', recipe);
    recipeForm.reset();
    alert('Rezept gespeichert!');
  });
  
  // Hilfsfunktionen
  async function showGallery() {
    const recipes = await db.getAll('recipes');
    const content = document.getElementById('content');
    content.innerHTML = '<h2>Meine Rezepte</h2>';
    
    const gallery = document.createElement('div');
    gallery.className = 'gallery-grid';
    
    recipes.forEach(recipe => {
      const card = document.createElement('div');
      card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <p>${recipe.ingredients.substring(0, 100)}...</p>
      `;
      gallery.appendChild(card);
    });
    
    content.appendChild(gallery);
  }
  
  function showRecipeForm() {
    document.getElementById('content').innerHTML = 
      document.querySelector('template#recipe-form').innerHTML;
  }
});
