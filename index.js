// MODALE

const modal = document.getElementById(`modal`)
const modalBox = document.getElementById(`modal`)
const box = document.getElementById(`box`)

const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
	const promises = [];
	for (let i = 1; i <= 150; i++) {
		const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
		promises.push(fetch(url).then((res) => res.json()));

	}

	Promise.all(promises).then((results) => {


		const pokemon = results.map((result) => ({
			name: result.name,
			image: result.sprites['front_default'],
			type: result.types.map((type) => type.type.name).join('_'),
			id: result.id
		}));

		displayPokemon(pokemon);

		let modalBox = document.getElementById(`modal-box`)
		let info_buttons = [...document.querySelectorAll(`.button`)]

		modalBox.classList.add(`inner_modal_box`)


		info_buttons.map(elm => {

			elm.addEventListener(`click`, () => {
				modal.classList.remove(`d-none`)


				results.map((el, i) => {
					let compiledModul = document.createElement(`div`)
					compiledModul.classList.add(`all-centered`,`flex-column`)
					let close_button = document.createElement(`span`)
					close_button.innerHTML += `<span id="close" class="material-symbols-outlined">close</span>`


					if (elm.id == i) {

						compiledModul.innerHTML = `

						 

						${results[i - 1].species.name}
						<span>img</span>
						<span>tipo</span>

						`	//----------------------------------------- SI RIPARTE DA QUI
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









	});
};

// --------------------------------------------------------------------------------
const displayPokemon = (pokemon) => {
	const pokemonHTMLString = pokemon
		.map(
			(el) => `

		<div id="box" class="col-4 all-centered ">
			<div class="box all-centered flex-column text-black ${el.type}"> 
			<h2>${el.name}</h2>
			<img class="card-image" src="${el.image}"/>
			<button id="${el.id}" class="button">INFO</button>
			</div>
			
		</div>
    `
		)
		.join('');

	pokedex.innerHTML = pokemonHTMLString;


}





fetchPokemon()







