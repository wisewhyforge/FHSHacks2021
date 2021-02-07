const trigger = [
//0 
["sound", "echo", "audio", "speaker", "microphone"],
//1
["lag", "freeze", "disconnect", "crash"],
//2
["webcam", "camera"]
];

const reply = [
//0 
[
	"Limit your applications producing noise to be only from Zoom.", 
	"Disable or move external speakers connected to the computer.", 
	"Check to see if you have the correct microphone you want selected.",
	"Check to see if you have the correct speakers you want selected.\n To check if you have the right speaker selected, click the volume icon and it should tell you the name of the computer's internal speaker."
	], 
//1
[
    "Limit CPU usage by closing any unnecesary backrgound apps and removing any virtual backgrounds or filters.",
    "For ChromeOS make sure you are selected on the Zoom window when getting admitted to the meeting to prevent Zoom from crashing.",
    "Check your connection speed by going to settings-> statistics, check if the latency is high. If so, try limiting network usage.",
	"If zoom is consistently being slow even after all devices using the network have been keeping usage at a minimum you might want to invest in a higher bandwidth WiFi.",
	"Check your internet connection.",
	"Make sure you have the latest Zoom version.",
	"If the application persistently stops working, try running using the website version of zoom. In order to do this, on your zoom \"Launch Meeting\" Website click on the \"Launch Meeting\" button twice. If the Zoom app fails twice then, there should be a link where you can click on the \"Join from the Browser\" link."
  ],
 //2
[
    "Check Zoom Settings: See if you are connected with the camera buttons located on the lower left-hand side of the screen.",
  ], 
];

const alternative = [
  "Sorry I didn't quite get that. Please try again.",
  "In can't find what you were looking for.",
  "I don't understand..."
];

document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input")
    inputField.addEventListener("keydown", function(e) {
        if (e.code === "Enter") {
            let input = document.getElementById("input").value;
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
	.replace(/ing /g, " ")
    .replace(/ please/g, "");
	console.log(text);
//compare arrays
//then search keyword
//then random alternative

  if (compare(trigger, reply, text).length != 0) {
    product = compare(trigger, reply, text);
  }else {
	singularAlternative = [];
	singularAlternative.push(alternative[Math.floor(Math.random()*alternative.length)]);
    product = singularAlternative;
  }

	//document.getElementById("chatbot").innerHTML = product;
   // speak(product);

    //clear input value
    document.getElementById("input").value = "";
  console.log("Stuff: " + product);
  //update DOM
  addChat(input, product);
}

function compare(triggerArray, replyArray, text) {
  let item = "";
  var keywords = [];
  var responses = [];
  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y < triggerArray[x].length; y++) {
      if (text.includes(triggerArray[x][y])) {
		if(triggerArray[x][y] == "echo"){
			responses.push(reply[x][0]);
			responses.push(reply[x][1]);
		}else if(triggerArray[x][y] == "microphone"){
			responses.push(reply[x][2]);
			//responses.push
		}else if(x==0){
			responses.push(reply[x][3]);
		}else if(triggerArray[x][y] == "disconnect"){
			responses.push(reply[x][1]);
			responses.push(reply[x][4]);
		}else if(triggerArray[x][y] == "crash"){
			responses.push(reply[x][1]);
			responses.push(reply[x][5]);
			responses.push(reply[x][6]);
		}else{
			responses.push(reply[x][0]);
		}
      }
    }
  }
  console.log(keywords.toString());
  console.log(responses.toString());
  
  return responses;
}

function addChat(input, product) {
  const mainDiv = document.getElementById("main");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.innerHTML = `You: <span id="user-response">${input}</span>`;
  console.log(mainDiv);
  mainDiv.appendChild(userDiv);

  for(var x = 0; x < product.length; x++){
	solution = product[x]
	let botDiv = document.createElement("div");
	botDiv.id = "bot";
	botDiv.innerHTML = `Chatbot: <span id="bot-response">${solution}</span>`;
	mainDiv.appendChild(botDiv);
  }
}