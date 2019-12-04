let myTerminal = new Terminal();
let indent = "<span class='indent'></span>";

window.onload = function() {
    document.getElementById("terminal").append(myTerminal.html);
    setup();
    readMessage();
};

function setup(){
    myTerminal.print("Hi,");
    myTerminal.print("I'm glad you made it this far!");
    myTerminal.print("Feel free to explore");
    myTerminal.print("(C) Joscha Henningsen 2019");
    myTerminal.print("\u2063");
}

function readMessage(){
    myTerminal.input("", function (userInput) {messageReceived(userInput)});
}

function messageReceived(message){
    printLines(getResponse(message));
    readMessage();
}


//Don't want plaintext email addresses online
let caesarShift = function(str, amount) {
	if (amount < 0)
		return caesarShift(str, amount + 26);
    let output = '';
    for (let i = 0; i < str.length; i ++) {
        let c = str[i];
        if (c.match(/[a-z]/i)) {
            let code = str.charCodeAt(i);
            if ((code >= 65) && (code <= 90))
				c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
			else if ((code >= 97) && (code <= 122))
				c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
		}
		output += c;
	}
	return output;
};

function getResponse(input){
    switch(input){
    	case "ls":
	        return "snake.out";
	    case "./snake":
	        return "try again later";
        case "help":
            let res = "Available commands:\n";
            res += indent+"help\n";
            res += indent+"whoami\n";
            res += indent+"contact\n";
            res += indent+"projects\n";
            res += indent+"clear\n";
            res += indent+"exit\n";
            return res;
        case "whoami":
            return '{\n<span class="indent"></span><span class="highlight2">"name"</span>: <span class="highlight1">"Joscha Henningsen"</span>,\n<span class="indent"></span><span class="highlight2">"birthday"</span>: <span class="highlight1">"23.09.1998"</span>,\n<span class="indent"></span><span class="highlight2">"placeOfBirth"</span>: <span class="highlight1">"Hamburg, Germany"</span>,\n<span class="indent"></span><span class="highlight2">"location"</span>: <span class="highlight1">"Munich, Germany"</span>,\n<span class="indent"></span>\n<span class="indent"></span><span class="highlight2">"education:"</span>: {\n<span class="indent"></span><span class="indent"></span><span class="highlight2">"grundschuleGenslerstraße"</span>: {\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"type"</span>: <span class="highlight1">"Primary School"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"location"</span>: <span class="highlight1">"Hamburg"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"from"</span>: <span class="highlight1">"2004"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"to"</span>: <span class="highlight1">"2008"</span>\n<span class="indent"></span><span class="indent"></span>},\n<span class="indent"></span><span class="indent"></span><span class="highlight2">"albertSchweitzerGymnasium"</span>: {\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"type"</span>: <span class="highlight1">"Middle School"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"location"</span>: <span class="highlight1">"Hamburg"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"from"</span>: <span class="highlight1">"2008"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"to"</span>: <span class="highlight1">"2015"</span>\n<span class="indent"></span><span class="indent"></span>},\n<span class="indent"></span><span class="indent"></span><span class="highlight2">"gymnasiumCorvestraße"</span>: {\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"type"</span>: <span class="highlight1">"High School"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"location"</span>: <span class="highlight1">"Hamburg"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"from"</span>: <span class="highlight1">"2015"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"to"</span>: <span class="highlight1">"2017"</span>\n<span class="indent"></span><span class="indent"></span>},\n<span class="indent"></span><span class="indent"></span><span class="highlight2">"TUM"</span>: {\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"type"</span>: <span class="highlight1">"Bachelor Studies, Informatics"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"location"</span>: <span class="highlight1">"Munich"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"from"</span>: <span class="highlight1">"2018"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"to"</span>: <span class="highlight1">"2021(expected)"</span>\n<span class="indent"></span><span class="indent"></span>}\n<span class="indent"></span>},\n<span class="indent"></span>\n<span class="indent"></span><span class="highlight2">"work"</span>: {\n<span class="indent"></span><span class="indent"></span><span class="highlight2">"TUM"</span>: {\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"type"</span>: <span class="highlight1">"Tutor: Praktikum Grundlagen der Programmierung"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"location"</span>: <span class="highlight1">"Munich"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"period"</span>: <span class="highlight1">"Winter Semester 2019/20"</span>\n<span class="indent"></span><span class="indent"></span>}\n<span class="indent"></span>}\n}';
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
            let mail = caesarShift("ij@kptdibt.qbhf", -1);
            let ret = "Uhh, you want to get in touch? Awesome, I'm always up for a chat:<br><br>";
            ret += indent+"<a style='color:#fff;' href='mailto:"+mail+"'>"+mail+"</a> &lt-- click here<br>";
            ret += indent+"or here! --> <a style='color:#fff;' href='https://twitter.com/joschahen'>twitter.com/joschahen</a><br>";
            ret += indent+"<a style='color:#fff;' href='https://t.me/joschahenningsen'>t.me/joschahenningsen</a> <-- maybe even there<br><br>";
            return ret;
        default:
            return "<span class='error'>✘</span> command not found: "+input;
    }
}

async function printLines(lines){
    if(lines === ""){
        return;
    }
    let list = lines.split("\n");
    for(let i = 0; i < list.length; i++){
        myTerminal.print(list[i]);
    }
}


function Sleep(milliseconds) {
   return new Promise(resolve => setTimeout(resolve, milliseconds));
}
