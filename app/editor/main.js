function lineNumbers(numLines){
    var text = "";
    for (var i = 1; i <= numLines; i++){
        text += i + "\n";
    }
    document.getElementById("line-numbers").value = text;
}

var text = $("#mytextarea").val();   
var lines = text.split(/\r|\r\n|\n/);
var count = lines.length;
lineNumbers(count+1);
var area = document.getElementById("mytextarea");
if (area.addEventListener) {
    area.addEventListener('input', function() {
        var text = $("#mytextarea").val();   
        var lines = text.split(/\r|\r\n|\n/);
        var count = lines.length;
        lineNumbers(count+1);
    }, false);
}
document.getElementById("mytextarea").onscroll = function(){
    document.getElementById("line-numbers").scrollTo(0,document.getElementById("mytextarea").scrollTop);
};


document.getElementById('mytextarea').addEventListener('keydown', function(e) {
    if (e.key == "'"){
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;
        this.value = this.value.substring(0, start) + "''" + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
    }
    else if (e.key == '"'){
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;
        this.value = this.value.substring(0, start) + '""' + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
    }
    else if (e.key == '{'){
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;
        this.value = this.value.substring(0, start) + "{}" + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
    }
    else if (e.key == '('){
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;
        this.value = this.value.substring(0, start) + "()" + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
    }
    else if (e.key == '['){
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;
        this.value = this.value.substring(0, start) + "[]" + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
    }
    else if (e.key == 'Tab') {
      e.preventDefault();
      var start = this.selectionStart;
      var end = this.selectionEnd;
      this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
      this.selectionStart =
        this.selectionEnd = start + 4;
    }
    else if (e.key === "Enter") {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;
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
        console.log(lastLine);
        var currentLine = this.value.substring(0, start).substring(content.lastIndexOf("\n")+1);
        if (document.getElementById("mytextarea").value.charAt(document.getElementById("mytextarea").selectionStart-1) == "{" && document.getElementById("mytextarea").value.charAt(document.getElementById("mytextarea").selectionStart) == "}"){
            spaces += '    \n' + spaces;
            numSpaces += 4;
        }
        this.value = this.value.substring(0, start) + "\n" + spaces + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + numSpaces + 1;
        var text = $("#mytextarea").val();   
        var lines = text.split(/\r|\r\n|\n/);
        var count = lines.length;
        lineNumbers(count+1);
        this.blur();
        this.focus();
    }
});