var myTerminal = new Terminal();

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
    printlines(getResponse(message.substring(2)));
    readMessage();
}

function getResponse(input){
    switch(input){
        case "help":
            var res = "Available commands:\n";
            res += "help\n";
            res += "whoami\n";
            res += "contact\n";
            res += "projects\n";
            res += "clear\n";
            res += "exit\n";
            return res;
        case "whoami":
            var res = "Joscha Henningsen\n";
            res += "B.Sc. Informatics@TUM";
            return res;
        case "clear":
            myTerminal.clear();
            return "";
        case "rm -rf /":
            myTerminal.print("segmentation fault (core dumped)");
            myTerminal = null;
            return "";
        case "exit":
            window.location.replace("https://www.youtube.com/watch?v=DLzxrzFCyOs");
            return "";
        default:
            return "✘ command not found: "+input;
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
