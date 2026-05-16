const poster = document.querySelector(".film__poster")
const title = document.querySelector(".film__title")
const year = document.querySelector(".film__year")
const rating = document.querySelector(".film__rating")
const description = document.querySelector(".film__description")

const params = new URLSearchParams(window.location.search)
const filmId = params.get("id")

async function getFilm(id){

try{

const res = await fetch(`http://185.72.144.247:7757/films/${id}`)

if(!res.ok){
throw new Error("Ошибка " + res.status)
}

const film = await res.json()

console.log(film)

poster.src = film.poster_URL
title.textContent = film.title
year.textContent = "Год: " + film.year
rating.textContent = "Рейтинг: " + film.rating
description.textContent = film.description

}

catch(err){
console.error(err)
}

}

getFilm(filmId)