var myTerminal = new Terminal();
var indent = "<span class='indent'></span>"

window.onload = function() {
    document.getElementById("terminal").append(myTerminal.html);
    setup();
    readMessage();
}

function setup(){
    myTerminal.print("Hi,");
    myTerminal.print("I'm glad you made it this far!");
    myTerminal.print("Feel free to explore");
    myTerminal.print("(C) 🌈 Joscha Henningsen 2019");
    myTerminal.print("\u2063");
}

function readMessage(){
    myTerminal.input("", function (userInput) {messageReceived(userInput)});
}

function messageReceived(message){
    printlines(getResponse(message));
    readMessage();
}

function getResponse(input){
    switch(input){
        case "help":
            var res = "Available commands:\n";
            res += indent+"help\n";
            res += indent+"whoami\n";
            res += indent+"contact\n";
            res += indent+"projects\n";
            res += indent+"clear\n";
            res += indent+"exit\n";
            return res;
        case "whoami":
            var res = "Joscha Henningsen\n";
            res += "B.Sc. Informatics@TUM";
            return res;
        case "clear":
            myTerminal.clear();
            return "";
        case "rm -rf /":
            myTerminal.print("<span class='error'>segmentation fault (core dumped)</span>");
            myTerminal = null;
            return "";
        case "exit":
            window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
            return "";
        case "contact":
            var mail = caesarShift("ij@kptdibt.qbhf", -1);
            var ret = "Uhh, you want to get in touch? Awesome, I'm always up for a chat:<br><br>";
            ret += indent+"<a style='color:#fff;' href='mailto:"+mail+"'>"+mail+"</a> &lt-- click here<br>";
            ret += indent+"or here! --> <a style='color:#fff;' href='https://twitter.com/joschahen'>twitter.com/joschahen</a><br><br>";
            return ret
        default:
            return "<span class='error'>✘</span> command not found: "+input;
    }
}

async function printlines(lines){
    if(lines === ""){
        return;
    }
    var list = lines.split("\n");
    for(i = 0; i < list.length; i++){
        myTerminal.print(list[i]);
    }
}


function Sleep(milliseconds) {
   return new Promise(resolve => setTimeout(resolve, milliseconds));
}

//Don't want plaintext email adresses online
var caesarShift = function(str, amount) {
	if (amount < 0)
		return caesarShift(str, amount + 26);
	var output = '';
	for (var i = 0; i < str.length; i ++) {
		var c = str[i];
		if (c.match(/[a-z]/i)) {
			var code = str.charCodeAt(i);
			if ((code >= 65) && (code <= 90))
				c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
			else if ((code >= 97) && (code <= 122))
				c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
		}
		output += c;
	}
	return output;
};
