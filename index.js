const trigger = [
//0 
["sound", "echo", "audio", "speaker", "microphone"],
//1
["lag", "freeze", "disconnect", "crash"],
//2
["what is going on", "what is up"],
//3
["happy", "good", "well", "fantastic", "cool"],
//4
["bad", "bored", "tired", "sad"],
//5
["tell me story", "tell me joke"],
//6
["thanks", "thank you"],
//7
["bye", "good bye", "goodbye"]
];

const reply = [
//0 
[
	"Limit your applications producing noise to be only from Zoom.", 
	"Disable or move external speakers connected to the computer.", 
	"Check to see if you have the correct microphone you want selected."
	], 
//1
[
    "Limit CPU usage by closing any unnecesary backrgound apps and removing any virtual backgrounds or filters.",
    "For ChromeOS make sure you are selected on the Zoom window when getting admitted to the meeting to prevent Zoom from crashing.",
    "Check your connection speed by going to settings-> statistics, check if the latency is high. If so, try limiting network usage.",
	"If zoom is consistently being slow even after all devices using the network have been keeping usage at a minimum you might want to invest in a higher bandwidth WiFi."
  ],
//2
[
    "Nothing much",
    "Exciting things!"
  ],
//3
["Glad to hear it"],
//4
["Why?", "Cheer up buddy"],
//5
["What about?", "Once upon a time..."],
//6
["You're welcome", "No problem"],
//7
["Goodbye", "See you later"],
];

const alternative = [
  "Same",
  "Go on...",
  "Try again",
  "I'm listening...",
  "Bro..."
];

document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input")
    inputField.addEventListener("keydown", function(e) {
        if (e.code === "Enter") {
            let input = document.getElementById("input").value;
			//document.getElementById("user").innerHTML = input;
            output(input)
    }
  });
});

function output(input) {
  let product;
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
  text = text
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "");

//compare arrays
//then search keyword
//then random alternative

  if (compare(trigger, reply, text)) {
    product = compare(trigger, reply, text);
  } else if (text.match(/robot/gi)) {
    product = robot[Math.floor(Math.random() * robot.length)];
  } else {
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

	//document.getElementById("chatbot").innerHTML = product;
   // speak(product);

    //clear input value
    document.getElementById("input").value = "";

  //update DOM
  addChat(input, product);
}

function compare(triggerArray, replyArray, text) {
  let item;
  var keywords = [];
  var responses = [];
  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y < triggerArray[x].length; y++) {
      if (text.includes(triggerArray[x][y])) {
        keywords.push(triggerArray[x][y]);
		if(triggerArray[x][y] == "echo"){
			responses.push(reply[x][0]);
			responses.push(reply[x][1]);
		}
      }
    }
  }
  console.log(keywords.toString());
  console.log(responses.toString());
  return item;
}

function addChat(input, product) {
  const mainDiv = document.getElementById("main");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.innerHTML = `You: <span id="user-response">${input}</span>`;
  mainDiv.appendChild(userDiv);

  let botDiv = document.createElement("div");
  botDiv.id = "bot";
  botDiv.innerHTML = `Chatbot: <span id="bot-response">${product}</span>`;
  mainDiv.appendChild(botDiv);
  //speak(product);
}