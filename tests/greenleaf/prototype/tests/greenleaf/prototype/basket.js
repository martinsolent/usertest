// Tiny shared basket for the sample prototype (kept in localStorage)
const Basket = {
  get() { try { return JSON.parse(localStorage.getItem('greenleaf-basket') || '[]'); } catch (e) { return []; } },
  add(item) { const b = Basket.get(); b.push(item); localStorage.setItem('greenleaf-basket', JSON.stringify(b)); Basket.show(); },
  clear() { localStorage.removeItem('greenleaf-basket'); Basket.show(); },
  show() { document.querySelectorAll('.basket-count').forEach(el => el.textContent = Basket.get().length); }
};
document.addEventListener('DOMContentLoaded', Basket.show);
