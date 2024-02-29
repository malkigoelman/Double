const icons_data = [
    {
        img: '3.webp',
        taken: false
    },
    {
        img: '4.webp',
        taken: false
    }, {
        img: '5.webp',
        taken: false
    }, {
        img: '6.webp',
        taken: false
    }, {
        img: '7.webp',
        taken: false
    }, {
        img: '8.webp',
        taken: false
    }, {
        img: '9.webp',
        taken: false
    }, {
        img: '10.webp',
        taken: false
    }, {
        img: '11.webp',
        taken: false
    }, {
        img: '12.webp',
        taken: false
    }, {
        img: '13.webp',
        taken: false
    }, {
        img: '14.webp',
        taken: false
    }, {
        img: '15.webp',
        taken: false
    }, {
        img: '16.webp',
        taken: false
    }, {
        img: '17.webp',
        taken: false
    }, {
        img: '18.webp',
        taken: false
    }, {
        img: '19.webp',
        taken: false
    }, {
        img: '21.webp',
        taken: false
    }, {
        img: '22.webp',
        taken: false
    }, {
        img: '23.webp',
        taken: false
    }, {
        img: '24.webp',
        taken: false
    }, {
        img: '25.webp',
        taken: false
    }, {
        img: '26.webp',
        taken: false
    }, {
        img: '27.webp',
        taken: false
    }, {
        img: '28.webp',
        taken: false
    }, {
        img: '29.webp',
        taken: false
    }, {
        img: '30.webp',
        taken: false
    }, {
        img: '31.webp',
        taken: false
    }, {
        img: '32.webp',
        taken: false
    }
];
const first = document.querySelector('.first.circle');
const second = document.querySelector('.second.circle');
let user_name;
let user_best;
let players;
let add_to_score = 5;
let sub_from_score = -2;
let timer_length = 15;
let timer;
let index_pair1;
let index_pair2;
let error = 0;
let winner = 50;

main();

function main() {
    let input = document.getElementById('input_name');
    input.addEventListener('focus', (e) => e.currentTarget.style.scale = '110%');
    input.addEventListener('blur', (e) => e.currentTarget.style.scale = '100%');
    document.querySelector('.container.user .sign_in').addEventListener('click', (e) => {
        e.preventDefault();
        let input = document.getElementById('input_name');
        user_name = input.value;
        players = JSON.parse(localStorage.getItem('players'));
        if (validate_form(input)) {
            if (players) {
                if (!players.find(p => p.name == user_name))
                    players.push({ name: user_name, best: 0 });
            }
            else {
                players = [{ name: user_name, best: 0 }];
            }
            user_best = players.find(p => p.name == user_name).best;
            localStorage.setItem("players", JSON.stringify(players));
            document.querySelector('.container.user').classList.add('hidden');
            document.querySelector('.container.play').classList.remove('hidden');
            document.querySelector('#score .user_name').innerHTML = user_name;
            init_cards();
        }
    });
}

function validate_form(input) {
    let is_valid = true;
    let msg_coteiner = document.getElementById('msg_container');
    if (input.value == '') {
        msg_coteiner.innerHTML = 'זהו שדה חובה';
        is_valid = false;
    }
    else {
        let pattern = input.dataset.pattern;
        if (!new RegExp("^" + pattern + "$").test(input.value)) {
            msg_coteiner.innerHTML = input.dataset.error_msg;
            is_valid = false;
        }
    }
    return is_valid;
}

function init_cards() {//אתחול כרטיסים
    first.innerHTML = '<img src="../img/cover_card.svg" class="cover">';
    second.innerHTML = '<img src="../img/cover_card.svg" class="cover">';
    icons_data.forEach(item => item.taken = false);
    const num_elements_in_card = 9;
    index_pair1 = Math.floor(Math.random() * 1000000) % num_elements_in_card;
    let value_pair;
    //first
    for (let i = 0; i < num_elements_in_card; i++) {
        let index;
        do {
            index = Math.floor(Math.random() * 1000000) % icons_data.length;
        } while (icons_data[index].taken);
        icons_data[index].taken = true;
        first.innerHTML += insert_icon(1, i, icons_data[index].img);;
        if (i == index_pair1) value_pair = icons_data[index].img;
    }
    //second
    index_pair2 = Math.floor(Math.random() * 1000000) % (num_elements_in_card);
    for (let i = 0; i < num_elements_in_card; i++) {
        if (i == index_pair2) {
            second.innerHTML += insert_icon(2, i, value_pair);
        }
        else {
            let index;
            do {
                index = Math.floor(Math.random() * 1000000) % icons_data.length;
            } while (icons_data[index].taken);
            icons_data[index].taken = true;
            second.innerHTML += insert_icon(2, i, icons_data[index].img);
        }
    }
    const icons = document.querySelectorAll('.circle .img');
    for (let icon of icons) {
        icon.addEventListener('click', e => {
            document.getElementById("press").play();
            check_if_pairs(e);
        });
    }
    setTimeout(
        () => document.querySelectorAll('.cover').forEach(c => c.classList.add('hidden'))
        , 1000);
    document.querySelector('#score .best label').innerHTML = user_best;
    init_timer();
}
function insert_icon(card, i, value) {
    return `<img class="img" data-card="${card}" data-index="${i}" data-value="${value}" src="../img/${value}" alt="תמונה">`;
}
function check_if_pairs(e) {
    if ((e.currentTarget.dataset.card == 1 && e.currentTarget.dataset.index == index_pair1) ||
        (e.currentTarget.dataset.card == 2 && e.currentTarget.dataset.index == index_pair2)) {
        document.getElementById("corect_card").play();
        update_score(true);
        init_cards();
        init_timer();
    }
    else {
        update_score(false);
    }

}
function update_score(isWin) {
    const score = document.querySelector('#score .score label');
    const best = document.querySelector('#score .best label');
    let source = parseInt(score.innerHTML);
    if (isWin) {
        score.innerHTML = source + add_to_score;
        if (user_best < score.innerHTML)
            user_best = parseInt(score.innerHTML);
        if (score.innerHTML > winner) {
            fwinner();
        }
    }
    else if (source + sub_from_score < 0) {
        score.innerHTML = 0;

    }
    else {
        score.innerHTML = source + sub_from_score;
        if (score.innerHTML < winner - 50)
            winner -= 50;
    }
    best.innerHTML = user_best;
    update_localStorage();

}

function update_localStorage() {
    players.find(p => p.name == user_name).best = user_best;
    localStorage.setItem("players", JSON.stringify(players));
}

function init_timer() {
    clearInterval(timer);
    let index = document.getElementById('timer');
    index.classList.remove('blink');
    let counter = timer_length;
    timer = setInterval(function () {
        index.innerHTML = counter--;
        if (counter == 5) {
            index.classList.add('blink');
        }
        if (counter == -1) {
            clearInterval(timer);
            first.innerHTML = '<img src="../img/cover_card.svg" class="cover">';
            second.innerHTML = '<img src="../img/cover_card.svg" class="cover">';
            index.innerHTML = '0';
            game_over();
        }
    }, 1000);

}

function setting() {
    /********************************* */
}

function fwinner() {
    //כאן יקפוץ הגביע
    document.querySelector('.winner').classList.remove('hidden');
    document.querySelector('.winner').style.width = '160px';
    document.querySelector('.winner img').style.width = '160px';
    document.querySelector('.winner img').style.left = '0';
    setTimeout(() => {
        document.querySelector('.winner img').style.width = '0';
        document.querySelector('.winner img').style.left = '300%';
    }, 2000);
    winner += 50;
}
function game_over() {
    document.getElementById("game_over").play();
    error++;
    let live = document.querySelector('#score .live label');
    live.innerHTML = parseInt(live.innerHTML) - 1;

    if (error == 5) {
        document.querySelector('.container.game_over').classList.remove('hidden');
        let opacity_in_game_over = document.getElementById('opacity_in_game_over');
        opacity_in_game_over.style.opacity = '0.5';
        opacity_in_game_over.style.position = 'absolute';
        live.innerHTML = 0;
        clearInterval(timer);
        error = 0;
    }
    else init_cards();
}
