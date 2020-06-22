let cells = document.querySelectorAll('#field td');
let blockToWinner = document.querySelector('.result_img');
let resultOverlay = document.querySelector('.result_overlay');
let resultDraw = document.querySelector('.result_draw');
let resultChampion = document.querySelector('.result_win');
let resultModal = document.querySelector('.result_modal');
let btnYes = document.querySelector('.yes_please');
let btnNo = document.querySelector('.damn_no');
let overall = document.querySelectorAll('.overall');
let single = document.querySelector('.single');
let multi = document.querySelector('.multi');
let mod = document.querySelectorAll('.modify');
let allIcons = document.querySelectorAll('.border');


let count = 0;
function start(mass) {
    mass.forEach(elem => {
        elem.addEventListener('click', function step (){
            if (count % 2 == 0) {
                elem.innerHTML = `<img src="src/img/${playerOne}.png">`;
                elem.setAttribute('data', `${playerOne}`);
            } else {
                elem.innerHTML = `<img src="src/img/${playerTwo}.png">`;
                elem.setAttribute('data', `${playerTwo}`);
            }
            this.removeEventListener('click', step);
            if (isVictory(cells)) {
                let winner = this.getAttribute('data');
                resultOverlay.classList.remove('hide');
                resultChampion.classList.remove('hide');
                blockToWinner.innerHTML = `<img src="src/img/${winner}.png">`;
            } else if (count == 8){
                resultOverlay.classList.remove('hide');
                resultDraw.classList.remove('hide');
            }
            count++;
        });
    });
    
}
start(cells);


function isVictory(cells) {
    let combs = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let comb of combs) {
        if ( cells[comb[0]].innerHTML == cells[comb[1]].innerHTML && 
            cells[comb[1]].innerHTML == cells[comb[2]].innerHTML &&
            cells[comb[0]].innerHTML != '') {
                // например: comb[0] это все крестики, comb[1], тоже все крестки и comb[2] тоде все крестики, тогда выигрыш! comb[i] -  это колонки массива combs
            console.log('Есть победитель!');
            return true;
        }
    }
    console.log('Победителя пока нет!');
    return false;
}
///////////////////////////////////////////////////////////////////


let icons1 = document.querySelectorAll('.icon-1');
let icons2 = document.querySelectorAll('.icon-2');
let btn = document.querySelector('.btn');
let overlay = document.querySelector('.overlay');
let check1;
let check2;
let playerOne;
let playerTwo;


icons1.forEach( (elem) => {
    elem.addEventListener('click', function () {
        for (let item of icons1) {
            item.classList.remove('active1');
        }
        this.classList.add('active1');
        playerOne = this.id;
        checkIt(icons1, icons2);
    })
    
})
icons2.forEach( (elem) => {
    elem.addEventListener('click', function () {
        for (let item of icons2) {
            item.classList.remove('active2');
        }
        this.classList.add('active2');
        playerTwo = this.id;
        checkIt(icons1, icons2);
    })  
})
function mode () {
    let isMode = false;
    if (single.classList.contains('active_mode') || multi.classList.contains('active_mode')) {
        isMode = true;
    }
    return isMode;
}

btn.disabled = true;
function checkIt (one, two) {
    
    for (let item of one) {
        if (item.classList.contains('active1')) {
            check1 = true;
        }
    }
    for (let item of two) {
        if (item.classList.contains('active2')) {
            check2 = true;
        }
    }
    if (check1 == true && check2 == true) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
    btn.addEventListener('click', function() {
        overlay.classList.add('hide');
    })
}

let seeYou = document.createElement('div');

btnYes.addEventListener('click', function() {
    location.reload();
})

btnNo.addEventListener('click', function() {
    overall.forEach(elem => {
        elem.classList.add('hide');
    });
    seeYou.classList.add('see_you');
    resultModal.after(seeYou);
    seeYou.innerHTML = 'SEE<br>YOU';
   
    let start = Date.now();

    let timer = setInterval(function() {
      let timePassed = Date.now() - start;

      seeYou.style.lineHeight = timePassed / 5 + 'px';

      if (timePassed > 900) clearInterval(timer);

    }, 20);
    setTimeout( function() {
        location.reload();
    }, 2000);
});


//////////////////////// single player /////////////////////////////////

