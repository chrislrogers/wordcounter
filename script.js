const input = document.getElementById('inputfield');
const counter = document.getElementById('counter');
const unique = document.getElementById('unique');

input.addEventListener('input', function(e) { 
    update(e.target.value);
});

let uniqueWords = {};

function update(input) {
    let words = (clean(input).split(/\s/)).sort();    
    uniqueWords = {};
    
    counter.innerHTML = count(words);
    unique.innerHTML = uniqueCount(words);
}

function uniqueCount(words) {
    let currentWord;
    let num = 0;
    
    for (let i = 0; i < words.length; i++) {
        currentWord = words[i].toLowerCase();
        if (uniqueWords[currentWord] === undefined) {
            uniqueWords[currentWord] = 1;
            num++;
        } else {
            uniqueWords[currentWord]++;
        }
    }
    return num;
}

function clean(input) {
    let str;
    str = input.replace(/[?.!,"\(\)<>]/g, "");
    str = str.replace(/[\n\r]/g, " ");
    str = str.trim();
    return str;
}

function count(input) {
    let num = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== '') {
            num++;
        }
    }
    return num;
}
