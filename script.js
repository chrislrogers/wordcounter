const input = document.getElementById('inputfield');
const counter = document.getElementById('counter');
const unique = document.getElementById('unique');
const results = document.getElementById("results");

input.addEventListener('input', function(e) { 
    update(e.target.value);
});

let uniqueWords = {};

function update(input) {
    let words = (clean(input).split(/\s/)).sort();    
    uniqueWords = {};
    let sorted = [];
    
    counter.innerHTML = count(words);
    unique.innerHTML = uniqueCount(words);
    results.innerHTML = '';
    
    sorted = Object.entries(uniqueWords).sort((a, b) => b[1] - a[1]);

    for (let i = 0; i < sorted.length; i++) {
        results.innerHTML +=`
            <tr>
                <td>${sorted[i][0]}</td>
                <td>${sorted[i][1]}</td>
            <tr>
        `;
    }
}

function uniqueCount(input) {
    let currentWord;
    let num = 0;
    
    for (let i = 0; i < input.length; i++) {
        currentWord = input[i].toLowerCase();
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
