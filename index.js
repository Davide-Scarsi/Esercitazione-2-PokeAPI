const pokedex = document.getElementById('pokedex');


// PAGE BUTTONS
// --------------------------------------------------------------------------------

let minPagRange = 1
let maxPagRange = 21


const buttonPageOne = document.getElementById(`pag-one`)
buttonPageOne.addEventListener((`click`), (e)=>{
	buttonSelector(buttonPageOne)
})

const buttonPageTwo = document.getElementById(`pag-two`)
buttonPageTwo.addEventListener((`click`), (e)=>{
	buttonSelector(buttonPageTwo)
})

const buttonPageThree = document.getElementById(`pag-three`)
buttonPageThree.addEventListener((`click`), (e)=>{
	buttonSelector(buttonPageThree)
})

const buttonPageFour = document.getElementById(`pag-four`)
buttonPageFour.addEventListener((`click`), (e)=>{
	buttonSelector(buttonPageFour)
})

const buttonPageFive = document.getElementById(`pag-five`)
buttonPageFive.addEventListener((`click`), (e)=>{
	buttonSelector(buttonPageFive)
})


function buttonSelector(button){
	let selectActive = document.querySelector(`.active`)
	selectActive.classList.remove(`active`)
	button.classList.add(`active`)

	pokedex.innerHTML = ""
	minPagRange = (button.value*21)+1
	maxPagRange = (button.value*21)+21
	fetchPokemon()
}




// --------------------------------------------------------------------------------

const fetchPokemon = () => {
	const promises = [];
	for (let i = minPagRange; i <= maxPagRange; i++) {
		const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
		promises.push(fetch(url).then((res) => res.json()));
	}

	Promise.all(promises).then((results) => {

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
	const modal = document.getElementById(`modal`)
	const modalBox = document.getElementById(`modal-box`)
	const info_buttons = [...document.querySelectorAll(`.button`)]
	modalBox.classList.add(`inner_modal_box`)

	info_buttons.map(elm => {

			elm.addEventListener(`click`, () => {
				modal.classList.remove(`d-none`)


				pokemon.map((el, i) => {
					let compiledModul = document.createElement(`div`)
					compiledModul.classList.add(`all-centered`,`flex-column`)
					let close_button = document.createElement(`span`)
					close_button.innerHTML += `<span id="close" class="material-symbols-outlined x-button">close</span>`


					if (elm.id == i+1) {
						compiledModul.innerHTML = `						 

						<h2 class="pokemon-name">${el.name}</h2>
						<img class="card-image-modal" src="${el.image}"/>
						<span>TYPE: ${el.type}</span> 
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







