// cookie.js
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('cookiesAccepted')) {
    document.body.appendChild(
      document.querySelector('template#cookie-banner').content.cloneNode(true)
    );
    
    document.getElementById('btn-accept').addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      document.querySelector('.cookie-banner').remove();
    });
    
    document.getElementById('btn-decline').addEventListener('click', () => {
      document.querySelector('.cookie-banner').remove();
    });
  }
});
