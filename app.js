import { renderProduct } from "./components/productCard.js";

document.addEventListener("DOMContentLoaded", () => {
  let products = [];
  let currentPage = 1;
  let itemsPerPage = 10;
  let searchQuery = "";

  const searchInput = document.getElementById("search");
  searchInput.focus();
  const perPageSelect = document.getElementById("items-per-page");
  const paginationContainer = document.getElementById("pagination");
  const listContainer = document.getElementById("product-list");
  const toggleBtn = document.getElementById("themeToggle");
  const root = document.documentElement;

  const currentTheme = localStorage.getItem("theme") || "dark";
  root.setAttribute("data-theme", currentTheme);
  setIcon(currentTheme);

  toggleBtn.addEventListener("click", () => {
    const newTheme =
      root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setIcon(newTheme);
  });

  function setIcon(theme) {
    toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  let fuse;

  fetch("./ProductList.json")
    .then((res) => res.json())
    .then((data) => {
      products = data;

      fuse = new Fuse(products, {
        keys: ["GenericName", "DrugCode", "GroupName"],
        threshold: 0.6,
      });

      render();
    });

  searchInput.addEventListener(
    "input",
    debounce((e) => {
      searchQuery = e.target.value;
      currentPage = 1;
      render();
    }, 300)
  );

  perPageSelect.addEventListener("change", (e) => {
    itemsPerPage = Number(e.target.value);
    currentPage = 1;
    render();
  });

  function render() {
    const filtered = searchQuery
      ? fuse.search(searchQuery).map((result) => result.item)
      : products;

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const currentItems = filtered.slice(start, start + itemsPerPage);

    listContainer.innerHTML = currentItems
      .map((p) => renderProduct(p, searchQuery))
      .join("");

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    let pagesHtml = "";
    const visiblePages = Array.from(
      { length: totalPages },
      (_, i) => i + 1
    ).filter(
      (page) =>
        page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
    );

    visiblePages.forEach((page, idx) => {
      const prev = visiblePages[idx - 1];
      if (prev && page - prev > 1) {
        pagesHtml += `<span class="ellipsis">...</span>`;
      }

      pagesHtml += `
        <button 
          class="pagination-btn ${currentPage === page ? "active" : ""}" 
          onclick="goToPage(${page})"
        >
          ${page}
        </button>
      `;
    });

    paginationContainer.innerHTML = `
      <div class="pagination-wrapper">
        <button 
          ${currentPage === 1 ? "disabled" : ""} 
          onclick="goToPage(${currentPage - 1})" 
          class="pagination-btn"
        >
          Prev
        </button>
        ${pagesHtml}
        <button 
          ${currentPage === totalPages ? "disabled" : ""} 
          onclick="goToPage(${currentPage + 1})" 
          class="pagination-btn"
        >
          Next
        </button>
      </div>
    `;
  }

  window.goToPage = function (page) {
    currentPage = page;
    render();
  };

  function debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }
});
