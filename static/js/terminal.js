const Terminal = (function () {
    // PROMPT_TYPE
    let isBlinking = false;
    const PROMPT_INPUT = 1, PROMPT_PASSWORD = 2, PROMPT_CONFIRM = 3;
    const inputPrompt = "<span class='error'>❤ </span> guest@joschas.page";
    const workingDir = "~";
    const inputPromptShape = "";
    let inputPromptHTML = "<span id='inputPromptUser'>" + inputPrompt + "</span>" + "<span id='inputPromptShapeUser'>" + inputPromptShape + "</span>";
    inputPromptHTML += "<span id='inputPromptLocation'>" + workingDir + "</span>" + "<span id='inputPromptShapeLocation'>" + inputPromptShape + "</span>";

    const fireCursorInterval = function (inputField, terminalObj) {
        const cursor = terminalObj._cursor;
        setTimeout(function () {
            cursor.style.visibility = cursor.style.visibility === 'visible' ? 'hidden' : 'visible';
            fireCursorInterval(inputField, terminalObj);
        }, 500);
    };

    let firstPrompt = true;
    let promptInput = function (terminalObj, message, PROMPT_TYPE, callback) {
        const shouldDisplayInput = (PROMPT_TYPE === PROMPT_INPUT);
        const inputLabel = document.createElement('label');
        inputLabel.setAttribute('for', 'inputBox');
        inputLabel.style.opacity = '0';

        const inputField = document.createElement('input');
        inputField.setAttribute('id', 'inputBox');
        inputField.style.position = 'absolute';
        inputField.style.zIndex = '-100';
        inputField.style.outline = 'none';
        inputField.style.border = 'none';
        inputField.style.opacity = '0';
        inputField.style.fontSize = '0.2em';
        inputField.setAttribute("autocomplete", "off");
        inputLabel.appendChild(inputField);
        inputLabel.appendChild(document.createTextNode("Intentionally invisible"));

        terminalObj._inputLine.textContent = '';
        terminalObj._inputPrompt.innerHTML = inputPromptHTML;
        terminalObj._input.style.display = 'block';
        terminalObj.html.appendChild(inputLabel);
        if (!isBlinking) {
            isBlinking = true;
            fireCursorInterval(inputField, terminalObj);
        }

        if (message.length) terminalObj.print(PROMPT_TYPE === PROMPT_CONFIRM ? message + ' (y/n)' : message);

        inputField.onblur = function () {
            terminalObj._cursor.style.display = 'none';
        };

        inputField.onfocus = function () {
            inputField.value = terminalObj._inputLine.textContent.toLowerCase();
            terminalObj._cursor.style.display = 'inline';
        };

        terminalObj.html.onclick = function () {
            inputField.focus();
        };

        inputField.onkeydown = function (e) {
            if (e.which === 37 || e.which === 39 || e.which === 38 || e.which === 40 || e.which === 9) {
                e.preventDefault();
            } else if (shouldDisplayInput && e.which !== 13) {
                setTimeout(function () {
                    terminalObj._inputPrompt.innterHTML = inputPromptHTML;
                    terminalObj._inputLine.textContent = inputField.value.toLowerCase();
                }, 1);
            }
        };

        inputField.onkeyup = function (e) {
            if (PROMPT_TYPE === PROMPT_CONFIRM || e.which === 13) {
                terminalObj._input.style.display = 'none';
                const inputValue = inputField.value.toLowerCase();
                if (shouldDisplayInput) terminalObj.printUser(inputValue);
                terminalObj.html.removeChild(inputLabel);
                if (typeof (callback) === 'function') {
                    if (PROMPT_TYPE === PROMPT_CONFIRM) {
                        callback(inputValue.toUpperCase()[0] === 'Y');
                    } else callback(inputValue);
                }
            }
        };
        if (firstPrompt) {
            firstPrompt = false;
            setTimeout(function () {
                inputField.focus();
            }, 50)
        } else {
            inputField.focus();
        }
    };

    return function (id) {
        this.html = document.createElement('div');
        this.html.className = 'Terminal';
        if (typeof (id) === 'string') {
            this.html.id = id;
        }

        this._innerWindow = document.createElement('div');
        this._output = document.createElement('p');
        this._inputPrompt = document.createElement('span');
        this._inputPrompt.innterHTML = inputPromptHTML;
        this._inputLine = document.createElement('span');
        this._cursor = document.createElement('span');
        this._input = document.createElement('p');

        this._shouldBlinkCursor = true;

        this.print = function (message) {
            const newLine = document.createElement('div');
            newLine.innerHTML = message;
            this._output.appendChild(newLine);
        };

        this.printUser = function (message) {
            const newLine = document.createElement('div');
            newLine.innerHTML = inputPromptHTML + message;
            this._output.appendChild(newLine);
        };

        this.input = function (message, callback) {
            promptInput(this, message, PROMPT_INPUT, callback);
        };

        this.password = function (message, callback) {
            promptInput(this, message, PROMPT_PASSWORD, callback);
        };

        this.confirm = function (message, callback) {
            promptInput(this, message, PROMPT_CONFIRM, callback);
        };

        this.clear = function () {
            this._output.innerHTML = '';
        };

        this.sleep = function (milliseconds, callback) {
            setTimeout(callback, milliseconds);
        };

        this.setTextSize = function (size) {
            this._output.style.fontSize = size;
            this._input.style.fontSize = size;
        };

        this.setTextColor = function (col) {
            this.html.style.color = col;
            this._cursor.style.background = col;
        };

        this.setBackgroundColor = function (col) {
            this.html.style.background = col;
        };

        this.setWidth = function (width) {
            this.html.style.width = width;
        };

        this.setHeight = function (height) {
            this.html.style.height = height;
        };

        this.blinkingCursor = function (bool) {
            bool = bool.toString().toUpperCase();
            this._shouldBlinkCursor = (bool === 'TRUE' || bool === '1' || bool === 'YES');
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
        this._input.style.display = 'none';
    }
}());
