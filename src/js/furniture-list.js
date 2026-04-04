document.addEventListener('DOMContentLoaded', async () => {
  const BASE_URL = 'https://furniture-store-v2.b.goit.study/api';
  const PER_PAGE = 8;

  const refs = {
    furnitureList: document.querySelector('.furniture-list'),
    categoryButtons: document.querySelectorAll('.category-btn'),
    loadMoreBtn: document.querySelector('.load-more-btn'),
    loader: document.querySelector('.furniture-loader'),
  };

  if (
    !refs.furnitureList ||
    !refs.categoryButtons.length ||
    !refs.loadMoreBtn ||
    !refs.loader
  ) {
    console.error('Не знайдено елементи секції furniture');
    return;
  }

  let categories = [];
  let currentCategory = 'all';
  let currentPage = 1;
  let totalLoadedItems = 0;
  let totalItems = 0;

  function showLoader() {
    refs.loader.classList.remove('is-hidden');
  }

  function hideLoader() {
    refs.loader.classList.add('is-hidden');
  }

  function showLoadMoreButton() {
    refs.loadMoreBtn.classList.remove('is-hidden');
  }

  function hideLoadMoreButton() {
    refs.loadMoreBtn.classList.add('is-hidden');
  }

  function resetActiveButton() {
    refs.categoryButtons.forEach(button => {
      button.classList.remove('is-active');
    });
  }

  function normalizeText(value) {
    return String(value).trim().toLowerCase();
  }

  async function fetchCategories() {
    const response = await fetch(`${BASE_URL}/categories`);

    if (!response.ok) {
      throw new Error(`Помилка завантаження категорій: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data)) return data;
    if (Array.isArray(data.categories)) return data.categories;
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.items)) return data.items;

    throw new Error('Невідомий формат категорій');
  }

  function getCategoryIdByName(categoryName) {
    const foundCategory = categories.find(
      item => normalizeText(item.name) === normalizeText(categoryName)
    );

    return foundCategory ? foundCategory._id : null;
  }
});