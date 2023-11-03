var theme = "dark";
var tabLength = 4;
var start = "This\nis\nthe\nstarting\n    info";

function setTheme(){
    var r = document.querySelector(':root');
    if (theme == "dark"){
        r.style.setProperty('--text', '#f1f5f9');
        r.style.setProperty('--bg2', '#0f172a');
        r.style.setProperty('--bg1', '#020617');
    }
    else{
        r.style.setProperty('--text', '#0f172a');
        r.style.setProperty('--bg1', '#f8fafc');
        r.style.setProperty('--bg2', '#e2e8f0');
    }
}
function lineNumbers(numLines){
    var text = "";
    for (var i = 1; i <= numLines; i++){
        text += i + "\n";
    }
    document.getElementById("line-numbers").value = text;
}
function updateLineNumbers(){
    var text = $("#mytextarea").val();   
    var lines = text.split(/\r|\r\n|\n/);
    var count = lines.length;
    lineNumbers(count);
}

document.getElementById("mytextarea").addEventListener('input',updateLineNumbers,false);
document.getElementById("mytextarea").addEventListener("paste", updateLineNumbers, false);

document.getElementById('mytextarea').addEventListener('keydown', function(e) {
    var el = document.getElementById('mytextarea');

    if (e.key == "'" || e.key == '"' || e.key == '{' || e.key == "(" || e.key == "[" || e.key == "Tab" || e.key == "Enter"){
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;
    }
    if (e.key == "'"){
        this.value = this.value.substring(0, start) + "''" + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
    }
    else if (e.key == '"'){
        this.value = this.value.substring(0, start) + '""' + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
    }
    else if (e.key == '{'){
        this.value = this.value.substring(0, start) + "{}" + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
    }
    else if (e.key == '('){
        this.value = this.value.substring(0, start) + "()" + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
    }
    else if (e.key == '['){
        this.value = this.value.substring(0, start) + "[]" + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
    }
    else if (e.key == 'Tab') {
        var spaces = '';
        for (var i = 0; i < tabLength; i++){
            spaces += ' ';
        }
        this.value = this.value.substring(0, start) + spaces + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + tabLength;
    }
    else if (e.key === "Enter") {
        var content = this.value;
        var line = this.value.substring(0, end);
        var lastLine = line.substring(line.lastIndexOf("\n")+1);
        var numSpaces = 0;
        while (lastLine.charAt(0) == ' '){
            lastLine = lastLine.substring(1);
            numSpaces++;
        }
        spaces = "";
        for (var i = 0; i < numSpaces; i++){
            spaces += ' ';
        }
        if (document.getElementById("mytextarea").value.charAt(document.getElementById("mytextarea").selectionStart-1) == "{" && document.getElementById("mytextarea").value.charAt(document.getElementById("mytextarea").selectionStart) == "}"){
            var spaces2 = '';
            for (var i = 0; i < tabLength; i++){
                spaces2 += ' ';
            }
            spaces += spaces2 + '\n' + spaces;
            numSpaces += tabLength;
        }
        this.value = this.value.substring(0, start) + "\n" + spaces + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + numSpaces + 1;
        var text = $("#mytextarea").val();   
        var lines = text.split(/\r|\r\n|\n/);
        var count = lines.length;
        lineNumbers(count);
        this.blur();
        this.focus();
    }
    updateLineNumbers();
});


document.getElementById("mytextarea").onscroll = function(){
    document.getElementById("line-numbers").scrollTo(0,document.getElementById("mytextarea").scrollTop);
    updateLineNumbers();
};

setTheme();
document.getElementById("mytextarea").value = start;
updateLineNumbers();