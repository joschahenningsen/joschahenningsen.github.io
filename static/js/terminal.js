let Terminal = (function () {
    // PROMPT_TYPE
    let history = [];
    let historyPointer = 0;
    let PROMPT_INPUT = 1, PROMPT_PASSWORD = 2, PROMPT_CONFIRM = 3;
    let inputPrompt = "<span class='error' style='font-size:.7em;'>\u26a1 </span> guest@joschas.page";
    let workingDir = "~";
    let inputPromptShape = "";
    let inputPromptHTML = "<span id='inputPromptUser'>" + inputPrompt + "</span>" + "<span id='inputPromptShapeUser'>" + inputPromptShape + "</span>";
    inputPromptHTML += "<span id='inputPromptLocation'>" + workingDir + "</span>" + "<span id='inputPromptShapeLocation'>" + inputPromptShape + "</span>";

    let fireCursorInterval = function (inputField, terminalObj) {
        let cursor = terminalObj._cursor;
        setTimeout(function () {
            if (inputField.parentElement && terminalObj._shouldBlinkCursor) {
                cursor.style.visibility = cursor.style.visibility === 'visible' ? 'hidden' : 'visible';
                fireCursorInterval(inputField, terminalObj)
            } else {
                cursor.style.visibility = 'visible'
            }
        }, 500)
    };

    let firstPrompt = true;
    let promptInput = function (terminalObj, message, PROMPT_TYPE, callback) {
        let shouldDisplayInput = (PROMPT_TYPE === PROMPT_INPUT);
        let inputField = document.createElement('input');
        let inputLabel = document.createElement('label');

        inputLabel.style.position = 'absolute';
        inputLabel.style.zIndex = '-100';
        inputLabel.style.outline = 'none';
        inputLabel.style.border = 'none';
        inputLabel.style.opacity = '0';
        inputLabel.style.fontSize = '0.2em';

        inputLabel.innerHTML="placeholder";
        inputLabel.appendChild(inputField);

        terminalObj._inputLine.textContent = '';
        terminalObj._inputPrompt.innerHTML = inputPromptHTML;
        terminalObj._input.style.display = 'block';
        terminalObj.html.appendChild(inputLabel);
        fireCursorInterval(inputField, terminalObj);

        if (message.length) terminalObj.print(PROMPT_TYPE === PROMPT_CONFIRM ? message + ' (y/n)' : message);

        inputField.onblur = function () {
            terminalObj._cursor.style.display = 'none'
        };

        inputField.onfocus = function () {
            inputField.value = terminalObj._inputLine.textContent.toLowerCase();
            terminalObj._cursor.style.display = 'inline'
        };

        terminalObj.html.onclick = function () {
            inputField.focus()
        };


        window.onclick = function(){
            inputField.focus();
        };


        inputField.onkeydown = function (e) {
            if (e.which === 37 || e.which === 39 || e.which === 38 || e.which === 40 || e.which === 9) {
                e.preventDefault()
            } else if (shouldDisplayInput && e.which !== 13) {
                setTimeout(function () {
                    terminalObj._inputPrompt.innterHTML = inputPromptHTML;
                    terminalObj._inputLine.textContent = inputField.value.toLowerCase()
                }, 1)
            }
        };

        inputField.onkeyup = function (e) {
            if (PROMPT_TYPE === PROMPT_CONFIRM || e.which === 13) {
                terminalObj._input.style.display = 'none';
                let inputValue = inputField.value.toLowerCase();
                if (inputValue!=="" && history.length === 0){
                    history[historyPointer++] = inputValue;
                }else if (inputValue!=="" && history[history.length-1]!==inputValue) {
                    history[history.length] = inputValue;
                    historyPointer = history.length;
                }
                if (shouldDisplayInput) terminalObj.printUser(inputValue);
                terminalObj.html.removeChild(inputLabel);
                if (typeof (callback) === 'function') {
                    if (PROMPT_TYPE === PROMPT_CONFIRM) {
                        callback(inputValue.toUpperCase()[0] === 'Y')
                    } else callback(inputValue)
                }
            }else if(e.key==='ArrowUp'){
                if (historyPointer>0) {
                    inputField.value = history[--historyPointer];
                    terminalObj._inputPrompt.innterHTML = inputPromptHTML;
                    terminalObj._inputLine.textContent = inputField.value.toLowerCase()
                }
            }else if(e.key==='ArrowDown'){
                let val = "";
                if (historyPointer<history.length-1) {
                    val = history[++historyPointer]
                }
                inputField.value = val;
                terminalObj._inputPrompt.innterHTML = inputPromptHTML;
                terminalObj._inputLine.textContent = inputField.value.toLowerCase()
            }
        };

        if (firstPrompt) {
            firstPrompt = false;
            setTimeout(function () {
                inputField.focus()
            }, 50)
        } else {
            inputField.focus()
        }
    };

    let TerminalConstructor = function (id) {
        this.html = document.createElement('div');
        this.html.className = 'Terminal';
        if (typeof (id) === 'string') {
            this.html.id = id
        }

        this._innerWindow = document.createElement('div');
        this._output = document.createElement('p');
        this._inputPrompt = document.createElement('span');
        this._inputPrompt.innterHTML = inputPromptHTML;
        this._inputLine = document.createElement('span'); //the span element where the users input is put
        this._cursor = document.createElement('span');
        this._input = document.createElement('p'); //the full element administering the user input, including cursor

        this._shouldBlinkCursor = true;

        this.print = function (message) {
            var newLine = document.createElement('div');
            newLine.innerHTML = message;
            this._output.appendChild(newLine)
        };

        this.printUser = function (message) {
            var newLine = document.createElement('div');
            newLine.innerHTML = inputPromptHTML + message;
            this._output.appendChild(newLine)
        };

        this.input = function (message, callback) {
            promptInput(this, message, PROMPT_INPUT, callback)
        };

        this.password = function (message, callback) {
            promptInput(this, message, PROMPT_PASSWORD, callback)
        };

        this.confirm = function (message, callback) {
            promptInput(this, message, PROMPT_CONFIRM, callback)
        };

        this.clear = function () {
            this._output.innerHTML = ''
        };

        this.sleep = function (milliseconds, callback) {
            setTimeout(callback, milliseconds)
        };

        this.setTextSize = function (size) {
            this._output.style.fontSize = size;
            this._input.style.fontSize = size
        };

        this.setTextColor = function (col) {
            this.html.style.color = col;
            this._cursor.style.background = col
        };

        this.setBackgroundColor = function (col) {
            this.html.style.background = col
        };

        this.setWidth = function (width) {
            this.html.style.width = width
        };

        this.setHeight = function (height) {
            this.html.style.height = height
        };

        this.blinkingCursor = function (bool) {
            bool = bool.toString().toUpperCase();
            this._shouldBlinkCursor = (bool === 'TRUE' || bool === '1' || bool === 'YES')
        };

        this._input.appendChild(this._inputPrompt);
        this._input.appendChild(this._inputLine);
        this._input.appendChild(this._cursor);
        this._innerWindow.appendChild(this._output);
        this._innerWindow.appendChild(this._input);
        this.html.appendChild(this._innerWindow);

        this.setBackgroundColor('black');
        this.setTextColor('white');
        this.setTextSize('1em');
        this.setWidth('100%');
        this.setHeight('100%');

        this.html.style.fontFamily = 'Monaco, Courier';
        this.html.style.margin = '0';
        this._innerWindow.style.padding = '10px';
        this._input.style.margin = '0';
        this._output.style.margin = '0';
        this._cursor.style.background = 'white';
        this._cursor.innerHTML = 'C'; //put something in the cursor..
        this._cursor.style.display = 'none'; //then hide it
        this._input.style.display = 'none'
    };

    return TerminalConstructor
}());
