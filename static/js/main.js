let myTerminal = new Terminal();
const indent = "<span class='indent'></span>";
const whoamiObj = {
    "name": "Joscha Henningsen",
    "birthday": "23.09.1998",
    "placeOfBirth": "Hamburg, Germany",
    "location": "Munich, Germany",
    "education:": {
        "albertSchweitzerGymnasium": {
            "type": "Middle School",
            "location": "Hamburg",
            "from": "2008",
            "to": "2015"
        },
        "gymnasiumCorvestraße": {
            "type": "High School",
            "location": "Hamburg",
            "from": "2015",
            "to": "2017"
        },
        "TUM": {
            "type": "Bachelor Studies, Informatics",
            "location": "Munich",
            "from": "2018",
            "to": "2021(expected)"
        }
    },
    "work": {
        "TUM": {
            "type": "teaching",
            "title": "Tutor: Praktikum Grundlagen der Programmierung",
            "location": "Munich",
            "period": "Winter Semester 2019/20"
        }
    }
};
const whoamiStr = JSON.stringify(whoamiObj, undefined, 2);

window.onload = function () {
    document.getElementById("terminal").append(myTerminal.html);
    myTerminal.print("Hi,");
    myTerminal.print("I'm glad you made it this far!");
    myTerminal.print("Feel free to explore");
    myTerminal.print("(C) Joscha Henningsen " + new Date().getFullYear() + " 🌈");
    myTerminal.print("\u2063");
    if (navigator.userAgent.includes("Googlebot")) {
        printAll();
    }
    readMessage();
};

function printAll() {
    printLines(getResponse("whoami", false));
    printLines(getResponse("ls", false));
    printLines(getResponse("help", false));
    printLines(getResponse("contact", false));
    printLines(getResponse("projects", false));
    printLines(getResponse("fortune", false));
}

function readMessage() {
    myTerminal.input("", function (userInput) {
        messageReceived(userInput)
    });
}

function messageReceived(message) {
    printLines(getResponse(message, false));
    readMessage();
}


//Don't want plaintext email addresses online
let caesarShift = function (str, amount) {
    if (amount < 0)
        return caesarShift(str, amount + 26);
    let output = '';
    for (let i = 0; i < str.length; i++) {
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

function getResponse(input) {
    switch (input) {
        case "ls":
            return "rain.out\nskills.md";
        case "help":
            let res = "Available commands:\n";
            res += indent + "help\n";
            res += indent + "ls\n";
            res += indent + "whoami\n";
            res += indent + "contact\n";
            res += indent + "projects\n";
            res += indent + "clear\n";
            res += indent + "exit\n\n";
            res += indent + "And more ;)\n";

            return res;
        case "whoami":
            //return "<pre>\n" + syntaxHighlight(whoamiStr) + "</pre>\n";
            return '<span class="indent"></span><span class="highlight2">"name"</span>: <span class="highlight1">"Joscha Henningsen"</span>,\n<span class="indent"></span><span class="highlight2">"birthday"</span>: <span class="highlight1">"23.09.1998"</span>,\n<span class="indent"></span><span class="highlight2">"placeOfBirth"</span>: <span class="highlight1">"Hamburg, Germany"</span>,\n<span class="indent"></span><span class="highlight2">"location"</span>: <span class="highlight1">"Munich, Germany"</span>,\n<span class="indent"></span>\n<span class="indent"></span><span class="highlight2">"education:"</span>: {\n<span class="indent"></span><span class="indent"></span><span class="highlight2">"albertSchweitzerGymnasium"</span>: {\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"type"</span>: <span class="highlight1">"Middle School"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"location"</span>: <span class="highlight1">"Hamburg"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"from"</span>: <span class="highlight1">"2008"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"to"</span>: <span class="highlight1">"2015"</span>\n<span class="indent"></span><span class="indent"></span>},\n<span class="indent"></span><span class="indent"></span><span class="highlight2">"gymnasiumCorvestraße"</span>: {\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"type"</span>: <span class="highlight1">"High School"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"location"</span>: <span class="highlight1">"Hamburg"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"from"</span>: <span class="highlight1">"2015"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"to"</span>: <span class="highlight1">"2017"</span>\n<span class="indent"></span><span class="indent"></span>},\n<span class="indent"></span><span class="indent"></span><span class="highlight2">"TUM"</span>: {\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"type"</span>: <span class="highlight1">"Bachelor Studies, Informatics"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"location"</span>: <span class="highlight1">"Munich"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"from"</span>: <span class="highlight1">"2018"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"to"</span>: <span class="highlight1">"2021(expected)"</span>\n<span class="indent"></span><span class="indent"></span>}\n<span class="indent"></span>},\n<span class="indent"></span>\n<span class="indent"></span><span class="highlight2">"work"</span>: {\n<span class="indent"></span><span class="indent"></span><span class="highlight2">"TUM"</span>: {\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"type"</span>: <span class="highlight1">"Tutor: Praktikum Grundlagen der Programmierung"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"location"</span>: <span class="highlight1">"Munich"</span>,\n<span class="indent"></span><span class="indent"></span><span class="indent"></span><span class="highlight2">"period"</span>: <span class="highlight1">"Winter Semester 2019/20"</span>\n<span class="indent"></span><span class="indent"></span>}\n<span class="indent"></span>}\n}';
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
            const mail = caesarShift("kptdib.ifoojohtfo@dt.uvn.fev", -1);
            const tme = caesarShift("u.nf/kptdibifoojohtfo", -1);
            let ret = "Uhh, you want to get in touch? Awesome, I'm always up for a chat:<br><br>";
            ret += indent + "<a target='_blank' style='color:#fff;' href='mailto:" + mail + "'>" + mail + "</a> &lt-- click here<br>";
            ret += indent + "or here! --&gt <a target='_blank' style='color:#fff;' href='https://twitter.com/joschahen'>twitter.com/joschahen</a><br>";
            ret += indent + "<a target='_blank' style='color:#fff;' href='https://" + tme + "'>" + tme + "</a> &lt-- maybe even there<br><br>";
            return ret;
        case "./rain.out":
            const script = document.createElement('script');
            script.onload = function () {
                const rainP5 = new p5(rainSketch);
                if (document.getElementById("defaultCanvas0") !== null) {
                    document.getElementById("defaultCanvas0").style.visibility = "visible";
                }
            };
            script.src = "https://cdn.jsdelivr.net/npm/p5@0.10.2/lib/p5.min.js";
            document.head.appendChild(script);
            return "loading...";
        case "projects":
            return "Want to take a look at the stuff i've been building? Cool!\n<a target='_blank' style='color:#fff;' href='https://github.com/joschahenningsen'>This</a> is my GitHub. Unfortunately there is not to much on yet but stay tuned anyways!";
        case "cat skills.md":
            return '# Languages:\n<span class="indent"></span>- Java ☕\n<span class="indent"></span>- Android on Java and Kotlin (Also a little bit of Dart) 📱\n<span class="indent"></span>- PHP 🐘\n<span class="indent"></span>- JavaScript & node.js\n<span class="indent"></span>- C \n<span class="indent"></span>- Python 🐍\n<span class="indent"></span>- SQL 💽\n<span class="indent"></span>\n# Tools:\n<span class="indent"></span>- git 🧑‍🤝‍🧑\n<span class="indent"></span>- npm 🎁\n<span class="indent"></span>- composer 📦\n<span class="indent"></span>- Continuous integration with GitHub Actions 🔥 or Bamboo\n<span class="indent"></span>- Docker 🐳\n<span class="indent"></span>- JetBrains IDEs\n<span class="indent"></span>\n# Office:\n<span class="indent"></span>- LaTeX 📝\n<span class="indent"></span>- Various spreadsheet stuff\n<span class="indent"></span>';
        case "fortune":
            printLines(httpGet("https://fortune.joschas.page"), true);
            return "";
        default:
            return "<span class='error'>✘</span> command not found: " + input.split(" ")[0] + " for help consult \"help\"";
    }
}

async function printLines(lines, escapeSpaces) {
    if (lines === "") {
        return;
    }
    let list = lines.split("\n");
    for (let i = 0; i < list.length; i++) {
        if (escapeSpaces) {
            list[i] = list[i].split(" ").join("&nbsp;");
        }
        myTerminal.print(list[i]);
    }
}

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function syntaxHighlight(jsonStr) {
    jsonStr = jsonStr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return jsonStr.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = '';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'highlight1';
            } else {
                cls = 'highlight2';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '"> ' + match + '</span>';
    });
}

function httpGet(url) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}
