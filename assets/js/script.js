document.querySelector(".busca").addEventListener("submit", async (event) => {
    event.preventDefault();

    let input = document.querySelector(".searchInput").value;

    if(input !== "") {
        clearInfo();
        showWarning();

        // URL da API
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=94c9e87a312c5d0fc21a0136bb931d5b&units=metric&lang=pt_br`;
        let results = await fetch(url);
        // converte o resultado para um objeto
        let json = await results.json();

        // pega os dados da API
        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                tempMin: json.main.temp_min,
                tempMax: json.main.temp_max,
                sencTermica: json.main.feels_like,
                umidade: json.main.humidity,
                velocidadeVento: json.wind.speed,
                description: json.weather[0].description
            })
        } else { 
            clearInfo();
            alert("Cidade não encontrada."); 
        } 
    } else {
        clearInfo();
    }

});

// mostra as informações na tela
function showInfo(json) {
    // tira a tela de carregamento
    document.querySelector(".c-loader").classList.add("hidden");

    // preenche as informações do clima
    document.querySelector(".city").innerHTML = `${json.name}, ${json.country}`; // cidade
    document.querySelector(".temp--atual").innerHTML = `${json.temp.toFixed(0)}°c`; // temperatura atual
    document.querySelector(".temp--min--max").innerHTML = `${json.tempMin.toFixed(0)}°c / ${json.tempMax.toFixed(0)}°c ` // mínima e máxima
    document.querySelector(".speedVento").innerHTML = `${json.velocidadeVento} km/h`; // velocidade do vento
    document.querySelector(".valorUmidade").innerHTML = `${json.umidade}%`; // umidade
    document.querySelector(".sencTermica").innerHTML = `${json.sencTermica.toFixed(0)}°c`; // sensação térmica
    document.querySelector(".temp--desc").innerHTML = `${json.description}`; // descrição do clima
    document.querySelector(".icon").setAttribute("src", `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`) // ícone do clima

    // mostra a tela de informações
    document.querySelector(".infos").classList.remove("hidden");
    document.querySelector(".more--infos").classList.remove("hidden");
}

function clearInfo() {
    // tela de carregamento
    document.querySelector(".c-loader").classList.remove("hidden");
    document.querySelector(".c-loader").classList.add("hidden");

    // informações
    document.querySelector(".infos").classList.add("hidden");
    document.querySelector(".more--infos").classList.add("hidden");
}

// tela de carregamento
function showWarning() {
    document.querySelector(".c-loader").classList.remove("hidden");
}

