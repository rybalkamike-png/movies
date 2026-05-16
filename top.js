const moviesCards = document.querySelector(".movies__cards")

function draw_card(film){

moviesCards.innerHTML += `
<div class="movies__card">

<img class="movies__card-img"
src="http://185.72.144.247:7757${film.poster_URL}">

<h3 class="movies__card-title">${film.title}</h3>

<div class="movies__card-wrapper">
<p class="movies__card-data">${film.year} год</p>
<p class="movies__card-data">Рейтинг: ${film.rating}</p>
</div>

<a class="movies__card-link" href="movie.html?id=${film.id}">
Перейти
</a>

</div>
`
}

async function get_top_films(){

try{

const res = await fetch("http://185.72.144.247:7757/top25")
p
const data = await res.json()

data.forEach(film=>{
draw_card(film)
})

}
catch(err){
console.log(err)
}

}

window.addEventListener("load",function(){
get_top_films()
})