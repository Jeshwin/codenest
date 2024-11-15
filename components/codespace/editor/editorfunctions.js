const tabLength = 4;

function lineNumbers(numLines) {
    var text = "";
    for (var i = 1; i <= numLines; i++) {
        text += i + "\n";
    }
    document.getElementById("line-numbers").value = text;
}

export function updateLineNumbers() {
    var text = document.getElementById("mytextarea").value;
    var lines = text.split(/\r|\r\n|\n/);
    var count = lines.length;
    if (count >= 1000) {
        document.getElementById("line-numbers").style.width = "6ch";
    }
    if (count >= 10000) {
        document.getElementById("line-numbers").style.width = "7ch";
    }
    if (count >= 100000) {
        document.getElementById("line-numbers").style.width = "8ch";
    }
    if (count >= 1000000) {
        document.getElementById("line-numbers").style.width = "9ch";
    }
    lineNumbers(count);
}

export function readKey(e) {
    var el = document.getElementById("mytextarea");

    if (
        e.key == "'" ||
        e.key == '"' ||
        e.key == "{" ||
        e.key == "(" ||
        e.key == "[" ||
        e.key == "Tab" ||
        e.key == "Enter"
    ) {
        e.preventDefault();
        var start = el.selectionStart;
        var end = el.selectionEnd;
    }

    if (e.key == "'") {
        el.value =
            el.value.substring(0, start) + "''" + el.value.substring(end);
        el.selectionStart = start + 1;
        el.selectionEnd = start + 1;
    } else if (e.key == '"') {
        el.value =
            el.value.substring(0, start) + '""' + el.value.substring(end);
        el.selectionStart = start + 1;
        el.selectionEnd = start + 1;
    } else if (e.key == "(") {
        el.value =
            el.value.substring(0, start) + "()" + el.value.substring(end);
        el.selectionStart = start + 1;
        el.selectionEnd = start + 1;
    } else if (e.key == "[") {
        el.value =
            el.value.substring(0, start) + "[]" + el.value.substring(end);
        el.selectionStart = start + 1;
        el.selectionEnd = start + 1;
    } else if (e.key == "{") {
        el.value =
            el.value.substring(0, start) + "{}" + el.value.substring(end);
        el.selectionStart = start + 1;
        el.selectionEnd = start + 1;
    } else if (e.key == "Tab") {
        var spaces = "";
        for (var i = 0; i < tabLength; i++) {
            spaces += " ";
        }
        el.value =
            el.value.substring(0, start) + spaces + el.value.substring(end);
        el.selectionStart = start + tabLength;
        el.selectionEnd = start + tabLength;
    } else if (e.key === "Enter") {
        var line = el.value.substring(0, end);
        var lastLine = line.substring(line.lastIndexOf("\n") + 1);
        var numSpaces = 0;
        while (lastLine.charAt(0) == " ") {
            lastLine = lastLine.substring(1);
            numSpaces++;
        }
        var spaces = "";
        for (var i = 0; i < numSpaces; i++) {
            spaces += " ";
        }
        if (
            el.value.charAt(el.selectionStart - 1) == "{" &&
            el.value.charAt(el.selectionStart) == "}"
        ) {
            var spaces2 = "";
            for (var i = 0; i < tabLength; i++) {
                spaces2 += " ";
            }
            spaces += spaces2 + "\n" + spaces;
            numSpaces += tabLength;
        }
        el.value =
            el.value.substring(0, start) +
            "\n" +
            spaces +
            el.value.substring(end);
        el.selectionStart = start + numSpaces + 1;
        el.selectionEnd = start + numSpaces + 1;
        var count = el.value.split(/\r|\r\n|\n/).length;
        lineNumbers(count);
        el.blur();
        el.focus();
    }

    updateLineNumbers();
}
