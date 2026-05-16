const burger = document.querySelector(".header__menu-burger");
const menuList = document.querySelector(".header__menu-list");
const moviesCards = document.querySelector(".movies__cards");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const pageText = document.querySelector(".movies__page");

const themeBtn = document.querySelector("#themeBtn");

let page = 1;

burger.addEventListener("click", function () {
  menuList.classList.toggle("menu-list--active");
});


if (themeBtn) {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });
}

function draw_card(film) {
  const card = document.createElement("div");
  card.classList.add("movies__card");

  card.innerHTML = `
    <img class="movies__card-img"
      src="http://185.72.144.247:7757${film.poster_URL}"
      alt="${film.title}">

    <h3>${film.title}</h3>

    <p>${film.year} год</p>
    <p>Рейтинг: ${film.rating}</p>

    <a href="film.html?id=${film.id}">Перейти</a>
  `;

  moviesCards.appendChild(card);
}

async function get_films(pageNumber) {
  try {
    moviesCards.innerHTML = "";

    const res = await fetch(`http://185.72.144.247:7757/films?page=${pageNumber}`);

    if (!res.ok) throw new Error(res.status);

    const data = await res.json();

    data.forEach(draw_card);

  } catch (err) {
    console.error(err);
  }
}

nextBtn.onclick = () => {
  page++;
  pageText.textContent = page;
  get_films(page);
};

prevBtn.onclick = () => {
  if (page > 1) {
    page--;
    pageText.textContent = page;
    get_films(page);
  }
};

get_films(page);