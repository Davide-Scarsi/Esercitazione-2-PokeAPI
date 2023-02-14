// OGGETTI SELEZIONATI
let SClose
let SButton
let SModul

const limit = 300 





const newInput = document.createElement(`input`)
newInput.type = "text"
newInput.id = "inputId"
SBox.appendChild(newInput)


const newButton = document.createElement(`button`)
SBox.appendChild(newButton)
newButton.id = "buttonId"
newButton.innerHTML += `CONFERMA`


let error = "ERRORE"
const newError = document.createElement(`h1`)
newError.id = "ErrorId"
newError.classList.add(`error`,`all-centered`,`flex-column`)
newError.innerHTML = `${error}<p>inserisci numeri da 0 a ${limit}</p>` 





let MaxPokemons = 0 // da azzerare

newInput.addEventListener("change", (e) => {
	if(Number(e.target.value)>limit+1){

	
		return SBox.appendChild(newError)

	}
	document.getElementById("inputId")
	MaxPokemons += Number(e.target.value)
})






const APISource = `https://pokeapi.co/api/v2`

const pokeContainer = document.getElementById(`cardsContainer`)


const galleryURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/`

let pokeName = []




function start() {

	for (let i = 1; i < MaxPokemons + 1; i++) {
		fetch(`${APISource}/pokemon/${i}`)

			.then((response) => response.json())
			.then((data) => {
				pokeName.push(data.species.name)

				pokeContainer.innerHTML += `<div  class="card text-black all-centered" style="width: 18rem;">
                
                <img class="card-img-top pokeImg " src="${galleryURL}${i}.png" alt="Card image cap">
                
                <div class="card-body">
                <h5 class="card-title">${data.species.name}</h5>
                <p id="abilities" class="card-text">Abilità: ${data.abilities[0].ability.name} </p>
                <p id="abilities" class="card-text">Peso: ${data.weight} </p>
                <p id="abilities" class="card-text">Altezza: ${data.height} </p>
                <a href="#" confronto="${data.species.name}" class="btn btn-primary button">IMMAGINE</a>
                </div>
                </div>`
			})
	}
}




function start2 (){

	fetch(`${APISource}/pokemon/?limit=${limit}&offset=0.`)

		.then((response) => response.json())
		.then((data) => {


			SClose = document.querySelectorAll("span.close")
			SButton = document.querySelectorAll("a.button")
			SModul = document.getElementById(`modul`)

			for (let i = 0; i < SButton.length; i++) {            // CICLARE I PULSANTI ABILITÁ SELEZIONATI
				SButton[i].addEventListener(`click`, (e) => {
					SModul.classList.remove('d-none')

					data.results.map((el, i) => {

						if (el.name === e.target.attributes.confronto.nodeValue) {

							SModul.innerHTML = `<h1 class="display-1 h1-modul position-relative">Pokemon
                                      <span class="material-symbols-outlined close">
                                        close
                                      </span>
                                    </h1>
                                    <div class="box-modul all-centered text-black flex-column">
                                      <h1>${el.name}</h1>
                                      <img class="card-img-top pokeImgModul " src="${galleryURL}${i + 1}.png" alt="Card image cap">
                                    </div>`
						}
					})


					SClose = document.querySelectorAll("span.close")


					for (let i = 0; i < SClose.length; i++) {
						SClose[i].addEventListener(`click`, (e) => {
							SModul.classList.add('d-none')
							SModul.innerHTML = ""

						})
					}

				})

			}

		})


}

newButton.addEventListener("click", () => {
	document.getElementById("ButtonId")
	start()
	start2()
	newInput.classList.add(`d-none`)
	newButton.classList.add(`d-none`)

})







