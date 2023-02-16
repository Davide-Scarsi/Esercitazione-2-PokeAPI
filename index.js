// MODALE

const modal = document.getElementById(`modal`)
const close_button = document.getElementById(`close`)



const box =  document.getElementById(`box`)

close_button.addEventListener(`click`, () =>{
	modal.classList.add(`d-none`)
})




const pokedex = document.getElementById('pokedex');
//fetching pokemon's name, image, type and id from pokeapi



let arrType = []



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

		let info_buttons = [...document.querySelectorAll(`.button`)]			
		
		info_buttons.map(el=>{
			el.addEventListener(`click`, () =>{
				modal.classList.remove(`d-none`)
			})
		
		})	


    });
};

// Displaying the pokemon details image, name, type in card
const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(
            (el) => `

		<div id="box" class="col-4 all-centered ">
			<div class="box all-centered flex-column text-black ${el.type}"> 
			<h2>${el.name}</h2>
			<img class="card-image" src="${el.image}"/>
			<button class="button">INFO</button>
			</div>
			
		</div>
    `
        )
        .join('');
		
		
		


		


    pokedex.innerHTML = pokemonHTMLString;
};


fetchPokemon()







