const input = document.getElementById('inputfield');
const counter = document.getElementById('counter');
const unique = document.getElementById('unique');
const results = document.getElementById("results");
const top1 = document.getElementById("top1");
const top2 = document.getElementById("top2");
const top3 = document.getElementById("top3");
const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const text3 = document.getElementById("text3");
const title1 = document.getElementById("title1");
const title2 = document.getElementById("title2");
const title3 = document.getElementById("title3");

const circumference = top1.r.baseVal.value * 2 * Math.PI;

top1.style.strokeDasharray = circumference;
top2.style.strokeDasharray = circumference;
top3.style.strokeDasharray = circumference;

input.addEventListener('input', function(e) { 
    update(e.target.value);
});

let uniqueWords = {};

function update(input) {
    let words = (clean(input).split(/\s/)).sort();    
    uniqueWords = {};
    let sorted = [];
    
    counter.innerHTML = count(words);
    if (count(words) !== 0) {
        unique.innerHTML = uniqueCount(words);
    } else {
        unique.innerHTML = '0';
    }
    results.innerHTML = '';
    
    sorted = Object.entries(uniqueWords).sort((a, b) => b[1] - a[1]);

    for (let i = 0; i < sorted.length; i++) {
        if (sorted[i][0] !== ''){
            results.innerHTML +=`
                <tr>
                    <td>${sorted[i][0]}</td>
                    <td>${sorted[i][1]}</td>
                <tr>
            `;
        }
    }
    if (sorted[0] !== undefined && (percent(count(words),sorted[0][1])) !== 0) {
        draw(percent(count(words),sorted[0][1]), top1);
        text1.innerHTML = percent(count(words),sorted[0][1]) + "%";
        title1.innerHTML = sorted[0][0];
    } else {
        draw(0, top1);
        text1.innerHTML = '';
        title1.innerHTML = '';
    }
    if (sorted[1] !== undefined) {
        draw(percent(count(words),sorted[1][1]), top2);
        text2.innerHTML = percent(count(words),sorted[1][1]) + "%";
        title2.innerHTML = sorted[1][0];
    } else {
        draw(0, top2);
        text2.innerHTML = '';
        title2.innerHTML = '';
    }
    if (sorted[2] !== undefined) {
        draw(percent(count(words),sorted[2][1]), top3);
        text3.innerHTML = percent(count(words),sorted[2][1]) + "%";
        title3.innerHTML = sorted[2][0];
    } else {
        draw(0, top3);
        text3.innerHTML = '';
        title3.innerHTML = '';
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

function draw(percentage, name) {
    name.style.strokeDashoffset = circumference - (percentage / 100) * circumference;
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

function percent(num, per) {
    let sum = ((per/num) * 100);
    if (sum === Infinity) {
        return 0;
    } else {
    return sum.toFixed(1)
    }
}
