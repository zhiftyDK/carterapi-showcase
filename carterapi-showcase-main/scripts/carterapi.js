//Speech recognition
const recognition = new webkitSpeechRecognition();
recognition.lang = 'en-US';

//Button to start my AI
const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", () => {
    recognition.start();
});

//Speech recognition results
recognition.onresult = function(event) {
    const result = event.results[0][0].transcript.toLowerCase();;
    console.log(result);
    carterApi(result);
    //  if(result.includes("azaban")) {
    //      const processedResult = result.replace("azaban ", "");
    //      carterApi(processedResult);
    //  }
}

//Restart recogniton on end
recognition.onend = function() {
    console.log("Ended");
    recognition.start();
}

//Play audio
function playAudio(text) {
    var audio = new Audio("https://api.carterapi.com/v0/speak/0K60xcaSkGjeb1xrRilIlId6AHOfIC8J/" + text);
    audio.play();
    return audio;
}

//Main carterapi handler
function carterApi(query) {
    fetch("https://api.carterapi.com" +"/v0/chat", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            api_key: '0K60xcaSkGjeb1xrRilIlId6AHOfIC8J',
            'query': query,
            'uuid': "user-id-123"
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

//Triggers
function weather(inputSentence) {
    weatherFromSentence(inputSentence, "f4e80e2071fcae0bd7c122d2f82fd284")
    .then(data => {
        const sentence = `The temperature in ${data.city} is ${Math.floor(data.weather.main.temp)} degrees, with ${data.weather.info.description}`;
        playAudio(sentence);
        console.log(data);
    })
}

function time() {
    const date = new Date();
    const time = date.getHours() + " " + date.getMinutes();
    playAudio(`the time is ${time}`);
}

async function name(inputSentence) {
    console.log(inputSentence);
    const name = await ner(inputSentence)
    console.log(name);
    playAudio("From now on, i will call you" + name);
}

const mediaPlayer = new Audio();
function music(inputSentence) {
    const query = inputSentence.replace("play ", "");
    fetch("https://www.googleapis.com/youtube/v3/search?key=AIzaSyCk4DztX4RNPfT_QPrFoXNlsugabfg78mY&part=snippet&type=video&q=" + query)
    .then(response => response.json())
    .then(data => {
        //window.open("https://youtube.com/watch?v=" + data.items[0].id.videoId);
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
            const announcer = playAudio("playing " + title);
            announcer.onended = () => {
                mediaPlayer.src = data.link;
                mediaPlayer.play();
            };
        });
    });
}

function pause() {
    mediaPlayer.pause();
}

function play() {
    mediaPlayer.play();
}