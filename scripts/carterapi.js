//Main carterapi handler
function carterapi(query) {
    fetch("https://api.carterapi.com" +"/v0/chat", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            api_key: 'ACkV4oMoriyLSGxYG6LUhaueX4pnRIJG',
            'query': query,
            'uuid': "user-id-123",
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let triggerFound = false;
        for (let i = 0; i < data.triggers.length; i++) {
            const element = data.triggers[i];
            if(element.score >= 0.62) {
                triggerFound = true;
                eval(`${element.type}("${query}")`);
            } 

            if(i == data.triggers.length - 1 && triggerFound == false) {
                playAudio(data.output.text);
            }
        }
    });
}

//Play audio
function playAudio(text) {
    var audio = new Audio("https://api.carterapi.com/v0/speak/ACkV4oMoriyLSGxYG6LUhaueX4pnRIJG/" + text);
    audio.play();
}

//Triggers
function weather(inputSentence) {
    weatherFromSentence(inputSentence)
    .then(data => {
        const sentence = `In ${data.city} the temperature is ${Math.floor(data.weather.main.temp)} degrees, with ${data.weather.info.description}`;
        playAudio(sentence)
    })
}

function time() {
    const date = new Date();
    const time = date.getHours() + " " + date.getMinutes();
    playAudio(`the time is ${time}`)
}

function music(inputSentence) {
    const query = inputSentence.replace("play ", "");
    fetch("https://www.googleapis.com/youtube/v3/search?key=AIzaSyCk4DztX4RNPfT_QPrFoXNlsugabfg78mY&part=snippet&type=video&q=" + query)
    .then(response => response.json())
    .then(data => {
        const title = data.items[0].snippet.title.replace("/", "");
        fetch("https://youtube-mp36.p.rapidapi.com/dl?id=" + data.items[0].id.videoId, {
            method: 'GET',
            headers: {
                "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
                "x-rapidapi-key": "da4b723be6msha2b57cbd3339f2ap17c0c6jsn33b74a15587f"
            }
        })
        .then(response => response.json())
        .then(data => {
            playAudio(title)
            setTimeout(() => {
                var audio = new Audio(data.link);
                audio.play();
            }, 3000);
        });
    });
}