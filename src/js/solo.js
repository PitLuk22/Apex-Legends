let iconsSolo = document.querySelectorAll('.image-1');
let pleyerSolo;  // мой id
let btnSolo = document.querySelector('.btn2');
let checkSolo;
let playerSoloAtt;
let pcHero; // здесь атрибут от 0 до 7
let pcHeroId;
let elementPc; // здесь ячейка куда поставил комп свою картинку
let winnerSolo;



document.querySelector('.mode-s').addEventListener('click', () => {
    document.querySelector('.form-slider').style.marginLeft = '-1000px';
    // document.querySelector('.mode-s').classList.add('hide');
    // document.querySelector('.mode-m').classList.remove('hide');
    for (let item of allIcons) {
        item.classList.remove('active1', 'active2');
    }
    btn.disabled = true;
    check1 = false;
    check2 = false;

})
document.querySelector('.mode-m').addEventListener('click', function () {
    document.querySelector('.form-slider').style.marginLeft = '0';
    // document.querySelector('.mode-s').classList.remove('hide');
    // document.querySelector('.mode-m').classList.add('hide');
    for (let item of iconsSolo) {
        item.classList.remove('activeSolo');
    }
    btnSolo.disabled = true;
    checkSolo = false;
});

iconsSolo.forEach((elem) => {
    elem.addEventListener('click', function () {
        for (let item of iconsSolo) {
            item.classList.remove('activeSolo');
        }
        this.classList.add('activeSolo');
        playerSolo = this.id;
        playerSoloAtt = this.getAttribute('name');
        checkItSolo(iconsSolo);
        randomHero(0, 7);
    });
});

btnSolo.disabled = true;

function checkItSolo(one) {
    for (let item of one) {
        if (item.classList.contains('activeSolo')) {
            checkSolo = true;
        }
    }
    if (checkSolo == true) {
        btnSolo.disabled = false;
    } else {
        btnSolo.disabled = true;
    }
    btnSolo.addEventListener('click', function () {
        overlay.classList.add('hide');
        startSolo(cells);
        console.log(pcHeroId);
    });
}

let countSolo = 0;

function startSolo(mass) {
    mass.forEach(elem => {
        elem.addEventListener('click', function step() {
            elem.innerHTML = `<img src="src/img/${playerSolo}.png">`;
            elem.setAttribute('data', `${playerSolo}`);
            randomField();

            this.removeEventListener('click', step);
            if (isVictorySolo(cells)) {
                      
               // let winner = this.getAttribute('data');  // сюда нужно положить элемент (картинку) последнюю добавленную на поле
               setTimeout(()=> {
                resultOverlay.classList.remove('hide');
                resultChampion.classList.remove('hide');
                 
               }, 500);
               blockToWinner.innerHTML = winnerSolo; 
                                                     //  `<img src="src/img/${winner}.png">`;
            } else if (countSolo == 8) {
                setTimeout(()=> {
                    resultOverlay.classList.remove('hide');
                    resultDraw.classList.remove('hide');
                }, 500);
                
            }
            countSolo++;
            console.log('count:' + countSolo);
        });
    });
}

function isVictorySolo(cells) {
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
            winnerSolo = cells[comb[0]].innerHTML;
            return true;
        }
    }
    console.log('Победителя пока нет!');
    return false;
}


let obj = {
    0: 'pat',
    1: 'reyf',
    2: 'blood',
    3: 'banga',
    4: 'vats',
    5: 'gibi',
    6: 'loba',
    7: 'kaustic'
};
function randomHero(min, max) {
    pcHero = Math.floor(Math.random() * (max - min) + min); // число от 0 до 7
    if (pcHero == playerSoloAtt ) {
        pcHeroId = obj[pcHero + 1];
    } else if (pcHero == playerSoloAtt && pcHero == 7) {
        pcHeroId = obj[pcHero - 1];
    } else {
        pcHeroId = obj[pcHero];
    }
}

function randomField() {
    let newColl = [];
    for (let i = 0; i < cells.length; i++) {
        if (!cells[i].hasAttribute('data')) {
            newColl.push(cells[i]);  // все доступные поля массив
        }
    }
    console.log(newColl); // массив без моей нажатой ячейки
    if (newColl.length !== 0 && !isVictorySolo(cells)) {
        let rand = Math.floor(Math.random() * newColl.length); // индекс массива newColl
        elementPc = newColl[rand]; //выбираем из массива оставшихся ячеек случайную ячейку
        setTimeout(function() {
            document.getElementById(`${elementPc.id}`).innerHTML = `<img src="src/img/${pcHeroId}.png">`;
            document.getElementById(`${elementPc.id}`).setAttribute('data', `${pcHeroId}`);
        }, 500);
        countSolo++;

        document.getElementById(`${elementPc.id}`).onclick = null; // нужно заперить нажатие 
        console.log(rand);
    } else if (isVictorySolo(cells)){
        return false;
    }
}
