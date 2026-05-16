const actorsCards = document.querySelector(".actors__cards");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");
const themeBtn = document.querySelector("#themeBtn");

const API = "http://185.72.144.247:7757";


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

function getActors() {
  const request = new XMLHttpRequest();
  request.open("GET", API + "/actors");

  request.onload = function () {
    if (request.status === 200) {
      const data = JSON.parse(request.response);
      console.log("Загружено актёров:", data.length);
      
      actorsCards.innerHTML = "";
      data.forEach(actor => drawActor(actor));
    } else {
      console.error("Ошибка загрузки:", request.status);
      actorsCards.innerHTML = "<p>Ошибка загрузки актёров</p>";
    }
  };

  request.onerror = function () {
    console.error("Ошибка сети");
    actorsCards.innerHTML = "<p>Не удалось подключиться к серверу</p>";
  };

  request.send();
}

function drawActor(actor) {
  const card = document.createElement("div");
  card.classList.add("actors__card");

  const fullName = `${actor.name} ${actor.surname || ''}`.trim();
  
 
  const photoUrl = actor.image_URL ? API + actor.image_URL : "";

  card.innerHTML = `
    <img class="actors__img"
      src="${photoUrl}"
      alt="${fullName}"
      onerror="this.src='https://via.placeholder.com/200x300?text=Фото+не+доступно'">

    <h3 class="actors__name">${fullName}</h3>
  `;

  card.onclick = () => {
    modal.classList.add("active");

    modalContent.innerHTML = `
      <h2>${fullName}</h2>
      <img src="${photoUrl}" style="width:200px" 
           onerror="this.src='https://via.placeholder.com/200x300?text=Фото+не+доступно'">
    `;
  };

  actorsCards.appendChild(card);
}

modal.onclick = (e) => {
  if (e.target === modal) modal.classList.remove("active");
};


getActors();