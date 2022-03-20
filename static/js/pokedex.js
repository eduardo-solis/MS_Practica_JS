const fetchPokemon = () => {
    
    const pokeName = document.getElementById('pokeName');
    const pokemon  = document.getElementById('pokemon');
    const tipo  = document.getElementById('tipo');

    const hp = document.getElementById('hp');
    const attack = document.getElementById('ataque');
    const defense = document.getElementById('defensa');
    const sp_attack = document.getElementById('sp_ataque');
    const sp_defense = document.getElementById('sp_defensa');
    const speed = document.getElementById('speed');

    const movimientos = document.getElementById('movimientos');

    let pokeInput = pokeName.value.toLowerCase();
    
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;

    fetch(url).then((res) => {
        //console.log(res);

        if(res.status != '200') {
            console.log(res);
            pokeImage('./assets/missingno.png');
        }
        else {
            return res.json();
        }

    }).then((data) => {

        console.log(data);
        let pokeImg = data.sprites.front_default;

        let idPokemon = data.id;
        let nombre = data.name;

        let listaTipos = data.types;
        let tipos = '| ';

        for(let i = 0; i < listaTipos.length; i++){
            tipos += `${listaTipos[i].type.name} | `;
        }

        let estadisticas = data.stats;

        for(let i = 0; i < estadisticas.length; i++){

            let valor = estadisticas[i].base_stat;
            
            switch(i){
                case 0:
                    hp.innerHTML = valor;
                    break;
                case 1:
                    attack.innerHTML = valor;
                    break;
                case 2:
                    defense.innerHTML = valor;
                    break;
                case 3:
                    sp_attack.innerHTML = valor;
                    break;
                case 4:
                    sp_defense.innerHTML = valor;
                    break;
                case 5:
                    speed.innerHTML = valor;
                    break;
            }

        }
        
        let listMoves = data.moves;
        let moves = '';
        for(let i = 0; i < listMoves.length; i++){
            moves += `${listMoves[i].move.name} <br>`;
        }

        pokeImage(pokeImg);
        pokemon.innerHTML = `Pokemon: #${idPokemon} ${nombre}`;
        tipo.innerHTML = `Tipo: ${tipos}`;
        movimientos.innerHTML = moves;
        

    })
}

const pokeImage = (url) => {
    const pokeImg = document.getElementById('pokeImg');
    pokeImg.src = url;
}