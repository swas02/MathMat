const consoleInput = document.querySelector(".console-input");
const historyContainer = document.querySelector(".console-history");

const help = "For any help type ':help' to view available options."

// Add result to page
function addResult(inputAsString, output, status) {
    const inputLogElement = document.createElement("div");
    const outputLogElement = document.createElement("div");
    let outputAsString;
    if (output.__proto__.type === "DenseMatrix") {
        outputLogElement.append(createMatrixTable(JSON.parse(output)));
    } else {
        outputAsString = output.toString();
        outputLogElement.textContent = outputAsString;
    }

    inputLogElement.classList.add("console-input-log");
    outputLogElement.classList.add("console-output-log");
    outputLogElement.classList.add(status);

    if (inputAsString != '') {
        inputLogElement.textContent = inputAsString;
        historyContainer.append(inputLogElement);
    }
    historyContainer.append(outputLogElement);
}

// Intro

function intro() {
    addResult('', '𝔐𝔞𝔱𝔥🔢𝔐𝔞𝔱', 'intro');
    addResult('', help, 'info');
}
const parser = math.parser();
intro()



// Event listner
consoleInput.addEventListener("keyup", (e) => {
    const code = consoleInput.value;
    if (code.length === 0) {
        return;
    }

    if (e.key === "Enter") {
        try {
            addResult(code, checkInMyFn(code.split(' ').join('')), 'response');
        } catch (error) {
            try {
                addResult(code, parser.evaluate(code), 'response');
            } catch (err) {
                addResult(code, err, 'error');
                addResult('', help, 'info');
            }
        }

        // try {
        //     addResult(code, parser.evaluate(code), 'response');
        // } catch (err) {
        //     addResult(code, err, 'error');
        // }


        consoleInput.value = "";
        historyContainer.scrollTop = historyContainer.scrollHeight;
    }
});


// user fn

function checkInMyFn(code) {
    const menu = [':help', ':about', ':v', ':reset', ':clear', ':getVar', ':matrix.new'];

    if (menu.indexOf(code) > -1) {
        switch (code) {
            case ':help':
                text = "Help";
                break;
            case ':about':
                text = "Developed by Swastik";
                break;
            case ':v':
                text = "Alpha";
                break;
            case ':reset':
                text = '';
                parser.clear();
                clearConsole();
                break;
            case ':clear':
                text = ''
                clearConsole()
                break;
            case ':getVar':
                text = JSON.stringify(parser.getAll())
                break;
            case ':matrix.new':
                text = fnMatrix.new();
                
                break;
            default:
                text = "No value found";
        }

        if (text != '')
            return text
        // return menu.indexOf(code.split(".")[0])
    }
    else
        throw new Error('Sending to Math.JS!');
}
function clearConsole() {
    setTimeout(() => {
        historyContainer.innerHTML = '';
        intro()

    }, 10);
}

const fnMatrix = {
    new: function () {
        console.log('set new matrix');
        document.querySelector('.console').style.display = 'none'
        return 'Opening GUI'
    }
};