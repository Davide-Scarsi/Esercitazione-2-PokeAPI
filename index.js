// ----- LEGENDA -----
// CODICI COLORE RGB POKEMON
// GENERAZIONE DINAMICA BOTTONI PAGINA - FORMULA PER DETERMINARE I RANGE
// NEXT BUTTON / BACK BUTTON
// CRAZIONE OGGETTO "POKEMON" CON TUTTI I DATI ESSENZIALI (DENTRO A UNA PROMISE)
// FORMULA PER POPOLARE IL SITO ENTRO UN GERTO RANGE
// FORMULA PER POPOLARE LA MODALE AL CLICK


// Oggetto contenente i codici colori dei diversi tipi di Pokemon

const rgbValue = {
	normal: "rgb(80, 77, 77)",
    grass: "#52a846",
    fire: "rgb(153, 34, 34)",
    poison: "#f94bff",
    flying: "#d3c7d3",
    water: "rgb(92, 180, 240)",
    bug: "rgb(133, 12, 106)",
    fairy: "rgb(239, 240, 161)",
    electric: "rgb(240, 240, 5)",
    ground: "rgb(92, 61, 3)",
    fighting: "rgb(100, 16, 30)",
    psychic: "rgb(255, 0, 140)",
    rock: "rgb(66, 56, 42)",
    steel: "rgb(138, 121, 131)",
    dragon: "rgb(0, 255, 179)",
    dark: "rgb(32, 32, 32)",
    ghost: "rgb(36, 14, 97)",
    ice: "rgb(195, 228, 236)"
}


// PAGE BUTTONS GENERATION
// --------------------------------------------------------------------------------

let minPagRange = 1
let maxPagRange = 21
let idRiser = 1 // serve a far coincidere l'id al variare della pagina quando si popola la modale

function generatePageButtons(){
	
	const count = 1008
	const ButtonsCounter = 1008/21

	const buttonsBox = document.getElementById(`buttons-box`)	

	let pageButtonsGroupIncreaser = 0
	let buttonCounter = 0
	
		for (let i = 0; i < count; i++) {
			
			let groups = `group-${pageButtonsGroupIncreaser}`
			
			if(i % 21 === 0){

				const newButton = document.createElement(`button`)
				newButton.classList.add(`page-button`, `${groups}`)
				newButton.value = i/21
				newButton.innerHTML = `${(i/21)+1}`
				newButton.addEventListener((`click`), (e)=>{
					buttonSelector(newButton)
				})
				buttonCounter++

				if(i>104){
					newButton.classList.add(`d-none`)
				}				
				
				if (buttonCounter % 5 === 0) {
					pageButtonsGroupIncreaser = pageButtonsGroupIncreaser+1
				}
				
				buttonsBox.appendChild(newButton)
				
				if (i===0) { // regola aggiuntiva per il primo bottone
					newButton.classList.add(`active`)
				}							
			}
		}
	
		NextPageFunction(ButtonsCounter)
	
}

generatePageButtons()

function buttonSelector(button){ // Formula per far coincidere l'output delle pagine con la lista pokemon 
	let selectActive = document.querySelector(`.active`)
	selectActive.classList.remove(`active`)
	button.classList.add(`active`)

	pokedex.innerHTML = ""
	minPagRange = (button.value*21)+1
	maxPagRange = (button.value*21)+21
	fetchPokemon()
	idRiser = (button.value*21)+1
}

// --------------------------------------------------------------------------------

// Next Button

function NextPageFunction(ButtonsCounter){
const NextPagesButton = document.getElementById(`buttonNext`)
const BackPagesButton = document.getElementById(`buttonBack`)
let counter = 1
	
	NextPagesButton.addEventListener((`click`), ()=>{

		if ((counter)<(ButtonsCounter/5)){

			let AllbuttonSelected = [...document.querySelectorAll(`.group-${counter}`)]
			AllbuttonSelected.map(el=>{
				el.classList.remove(`d-none`)	
				
			})
			counter++

			AllbuttonSelected = [...document.querySelectorAll(`.group-${counter-2}`)]
			AllbuttonSelected.map(el=>{
				el.classList.add(`d-none`)	
			

			})
		}

		if(counter===2){
			BackPagesButton.classList.remove(`d-none`) //mostra bottone per tornare indietro con le pagine
		}

	})

	// Back Button

	BackPagesButton.addEventListener((`click`), ()=>{

		if (counter>=2) {

			let AllbuttonSelected = [...document.querySelectorAll(`.group-${counter-2}`)]
				AllbuttonSelected.map(el=>{
					el.classList.remove(`d-none`)	
					
				})
				counter--
	
				AllbuttonSelected = [...document.querySelectorAll(`.group-${counter}`)]
				AllbuttonSelected.map(el=>{
					el.classList.add(`d-none`)	
				
	
				})

		if(counter===1){
			BackPagesButton.classList.add(`d-none`) //mostra bottone per tornare indietro con le pagine
		}

		}

	})

}


// --------------------------------------------------------------------------------
// Creazione Array di oggetti "pokemon" contenente dati pokemon essenziali

const pokedex = document.getElementById('pokedex');
const fetchPokemon = () => {
	const promises = [];
	for (let i = minPagRange; i <= maxPagRange; i++) {
		const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
		promises.push(fetch(url).then((res) => res.json()));
	}

	Promise.all(promises).then((results) => { // per avere l'array di funzioni restituito con lo stesso ordine uso Promise.all

		const pokemon = results.map((result) => ({
			name: result.name,
			image: result.sprites['front_default'],
			imageShiny: result.sprites['front_shiny'],
			type: result.types.map((type) => type.type.name).join('_'),
			abilities: result.abilities.map((ability) => ability.ability.name).join(', '),
			height: result.height/10,
			weight: result.weight/10,
			id: result.id
		}));

		pokemon.map(el=>{ // creazione di colori RGB per ogni tipo
			let arrType = Array(...el.type.split("_"))
			if (arrType.length === 1){arrType = Array(arrType[0],arrType[0])}
			el.rgbArrayType = arrType.map(el =>  rgbValue[el]) 
		})



		displayPokemon(pokemon); //#1
		populateModalTab(pokemon) //#2	

	});
}

fetchPokemon()




// #1 - DISPLAY POKEMON FUNCTION
// --------------------------------------------------------------------------------
const displayPokemon = (pokemon) => {
	const pokemonHTMLString = pokemon
		.map(
			(el) => `

		<div id="box" class="col-12 col-md-6 col-lg-4 all-centered ">
			<div style="background: linear-gradient(110deg, ${el.rgbArrayType[0]} 55%, ${el.rgbArrayType[1]} 55%)" class="main-card-image all-centered flex-column }"> 
			<h2 class="pokemon-name">${el.name}</h2>
			<img class="card-image" src="${el.image}"/>
			<span id="${el.id}" class="button material-symbols-outlined i-button">zoom_in</span>
			</div>
			
		</div>
    `
		)
		.join('');

	pokedex.innerHTML = pokemonHTMLString;
}

// #2 - POPULATE MODAL FUNCTION
// --------------------------------------------------------------------------------

const populateModalTab = (pokemon) => {

	
	const modalBox = document.getElementById(`modal-box`) //seleziono box della modale
	modalBox.classList.add(`inner_modal_box`) 
	
	const info_buttons = [...document.querySelectorAll(`.button`)] 

	info_buttons.map(elm => {	
		elm.addEventListener(`click`, () => {
				const modal = document.getElementById(`modal`)
				modal.classList.remove(`d-none`)


				pokemon.map((el, i) => {
					
					let compiledModul = document.createElement(`div`)
					compiledModul.classList.add(`all-centered`,`flex-column`)
					let close_button = document.createElement(`span`)
					close_button.id = `close`
					close_button.classList.add(`material-symbols-outlined`,`x-button`)
					close_button.innerHTML += `close`

					let shiny_button = document.createElement(`span`)
					shiny_button.classList.add(`material-symbols-outlined`,`shiny-button`)
					shiny_button.innerHTML += `diamond`




					

					if (elm.id == i+idRiser) {
						compiledModul.innerHTML = `						 

						<h2 class="pokemon-name">${el.name}</h2>
						<img id="classicImg"class="card-image-modal" src="${el.image}"/>					
						<img id="shinyImg" class="card-image-modal d-none" src="${el.imageShiny}"/>
						<span>ID: ${el.id}</span> 
						<span>TYPE: ${el.type.split("_").join(" and ")}</span> 
						<div style="background: linear-gradient(110deg, ${el.rgbArrayType[0]} 55%, ${el.rgbArrayType[1]} 55%)" class="pokemon-type-box-modal"></div>
						<div class="d-flex flex-column poke-info-modal">
							<div class="d-flex">
								<span class="m-2">ABILITIES:</span>
								<span class="m-2"> ${el.abilities}</span> 
							</div>
							<div class="d-flex">
								<span class="m-2">HEIGHT:</span>
								<span class="m-2"> ${el.height} m.</span> 
							</div>
							<div class="d-flex">
								<span class="m-2">WEIGHT:</span>
								<span class="m-2"> ${el.weight} Kg.</span> 
							</div>
						</div>

						`	
						modalBox.appendChild(close_button)
						modalBox.appendChild(shiny_button)
						modalBox.appendChild(compiledModul)

						close_button.addEventListener(`click`, () => {
							modal.classList.add(`d-none`)
							modalBox.innerHTML = ""
						})
						
						let toggle = false
						shiny_button.addEventListener(`click`, () => {
							if (toggle===false) {
								let classicImg = document.getElementById(`classicImg`)
								classicImg.classList.add(`d-none`)
								let shinyImg = document.getElementById(`shinyImg`)
								shiny_button.classList.add(`active-toggle`)
								shinyImg.classList.remove(`d-none`)
								toggle = true
								
							} else if (toggle===true){
								classicImg.classList.remove(`d-none`)
								shiny_button.classList.remove(`active-toggle`)
								shinyImg.classList.add(`d-none`)
								toggle = false
							}
						})
					}
				})
			})
		})
}






