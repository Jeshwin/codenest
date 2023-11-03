var tabs = {
    1:{
        "filename": "Tab1.css",
        "content": "This is some css content.",
        "cursorStart": 0,
        "cursorEnd": 0
    },
    2:{
        "filename": "Tab2.html",
        "content": "This is some html content.",
        "cursorStart": 0,
        "cursorEnd": 0
    },
    3:{
        "filename": "Tab2.html",
        "content": "This is some html content.",
        "cursorStart": 0,
        "cursorEnd": 0
    },
    4:{
        "filename": "python.py",
        "content": "This is some Python content.",
        "cursorStart": 0,
        "cursorEnd": 0
    },
    5:{
        "filename": "stuffsssssssssssss.java",
        "content": "This is some Java content.",
        "cursorStart": 0,
        "cursorEnd": 0
    },
    6:{
        "filename": "othersssssssssssssssssssssssssssssssssss.c",
        "content": "This is some C content.",
        "cursorStart": 0,
        "cursorEnd": 0
    },
    7:{
        "filename": "mainnnnnnnnnnnnnnnnnnnn.cpp",
        "content": "This is some C++ content.",
        "cursorStart": 0,
        "cursorEnd": 0
    }
}
var lastFilename = null;
var lastContent = null;
let currentTab = 1;
var theme = "dark";
var tabLength = 4;

function setTheme(){
    var r = document.querySelector(':root');
    if (theme == "dark"){
        r.style.setProperty('--text', '#f1f5f9');
        r.style.setProperty('--bg2', '#0f172a');
        r.style.setProperty('--bg1', '#020617');
        r.style.setProperty('--bg3', '#1e293b');
        r.style.setProperty('--red', 'red');
    }
    else{
        r.style.setProperty('--text', '#0f172a');
        r.style.setProperty('--bg1', '#f8fafc');
        r.style.setProperty('--bg2', '#e2e8f0');
        r.style.setProperty('--bg3', '#e2e8f0');
        r.style.setProperty('--red', '#FF6464');
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
updateLineNumbers();

for (var i = 1; i <= Object.keys(tabs).length; i++){
    var tab = document.createElement('div');
    tab.innerHTML = `<text>Tab1.css</text><span class="close-tab">&#66338;</span>`;
    tab.setAttribute('name',i);
    tab.firstChild.setAttribute('name',i);
    tab.children[1].setAttribute('name',i);
    tab.firstChild.innerHTML = tabs[i].filename;
    document.getElementById("menubar").appendChild(tab);
    tab.className = "tab";
    tab.addEventListener('click', function(e){
        if (currentTab != e.target.getAttribute('name')){
            tabs[currentTab].cursorStart = document.getElementById("mytextarea").selectionStart;
            tabs[currentTab].cursorEnd = document.getElementById("mytextarea").selectionEnd;
            tabs[currentTab].content = document.getElementById("mytextarea").value;

            document.getElementById("mytextarea").value = tabs[e.target.getAttribute('name')]["content"];
            document.getElementById("mytextarea").blur();
            document.getElementById("mytextarea").focus();
            document.getElementById("mytextarea").selectionStart = tabs[e.target.getAttribute('name')]["cursorStart"];;
            document.getElementById("mytextarea").selectionEnd = tabs[e.target.getAttribute('name')]["cursorEnd"];;
            currentTab = e.target.getAttribute('name');
            var allTabs = document.getElementsByClassName('tab');
            for (var i = 0; i < allTabs.length; i++){
                allTabs[i].classList.remove("selected-tab");
            }
            if (e.target.parentNode.className.includes("tab")){
                e.target.parentNode.classList.add("selected-tab");
            }
            else {
                e.target.classList.add("selected-tab");
            }
            
        }
    });
    tab.children[1].addEventListener('click', function(e){
        e.target.parentNode.firstChild.value;
        e.target.parentNode.remove();
    });
}
document.getElementById("menubar").firstChild.classList.add("selected-tab");
document.getElementById("mytextarea").value = tabs[1]["content"];