const pokedex = document.getElementById('pokedex');


// PAGE BUTTONS GENERATION
// --------------------------------------------------------------------------------

let minPagRange = 1
let maxPagRange = 21
let idRiser = 1 // serve a far coincidere l'id al variare della pagina quando si popola la modale

function generatePageButtons(){
	const prom = []
	prom.push(fetch(`https://pokeapi.co/api/v2/pokemon/`)
	.then((res) => res.json()));
	Promise.all(prom).then((results)=>{

	const count = results[0].count
	const ButtonsCounter = results[0].count/21

	const buttonsBox = document.getElementById(`buttons-box`)	

	let pageButtonsGroupIncreaser = 0
	let buttonCounter = 0

	
		for (let i = 0; i < count+1; i++) {
			
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
	
	})
}

// Formula per far coincidere l'output delle pagine con la lista pokemon 

generatePageButtons()

	
function buttonSelector(button){
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
// Back Button


// Next Button

function NextPageFunction(ButtonsCounter){
const NextPagesButton = document.getElementById(`buttonNext`)
const BackPagesButton = document.getElementById(`buttonBack`)
let counter = 1

	
	NextPagesButton.addEventListener((`click`), (e)=>{

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

	BackPagesButton.addEventListener((`click`), (e)=>{

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
			type: result.types.map((type) => type.type.name).join('_'),
			abilities: result.abilities.map((ability) => ability.ability.name).join(', '),
			height: result.height/10,
			weight: result.weight/10,
			id: result.id
		}));


		displayPokemon(pokemon); //#1
		populateModalTab(pokemon) //#2	

	});
};

// #1 - DISPLAY POKEMON FUNCTION
// --------------------------------------------------------------------------------
const displayPokemon = (pokemon) => {
	const pokemonHTMLString = pokemon
		.map(
			(el) => `

		<div id="box" class="col-12 col-md-6 col-lg-4 all-centered ">
			<div class="box all-centered flex-column text-black ${el.type}"> 
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
					close_button.innerHTML += `<span id="close" class="material-symbols-outlined x-button">close</span>`

					if (elm.id == i+idRiser) {
						compiledModul.innerHTML = `						 

						<h2 class="pokemon-name">${el.name}</h2>
						<img class="card-image-modal" src="${el.image}"/>
						<span>ID: ${el.id}</span> 
						<span>TYPE: ${el.type.split("_").join(" and ")}</span> 
						<div class="${el.type} pokemon-type-box-modal"></div>
						<div class="d-flex flex-column">
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
						modalBox.appendChild(compiledModul)

						close_button.addEventListener(`click`, () => {
							modal.classList.add(`d-none`)
							modalBox.innerHTML = ""
						})
					}
				})
			})
		})
}






fetchPokemon()


