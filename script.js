
const pTimeElement = document.querySelector('.p__time');
const cardAreaElement = document.querySelector('.div__recadinhos-content')
const popUpElement = document.querySelector('.div__popup');
const divLoveYouElement = document.querySelector('.div__love-you-content');
const pLoveCountry = document.querySelector('.p__love-country');
const audioElement = document.querySelector('.audio__music');
const divMusicElement = document.querySelector('.div__music-content');

const letterTexts = [
    '<p><strong>Para o meu amor</strong><br /><br />Eu disse e não me arrependo de dizer novamente, você foi, é, e sempre será minha melhor escolha.</p>',
    '<p><strong>Para a pessoa mais linda deste mundo</strong><br /><br />Eu amava tanto o azul das águas, dos mares e do céu... mas eles perderam o encanto assim que conheci o castanho dos seus olhos.</p>',
    '<p><strong>Para o amor da minha vida</strong><br /><br />Eu sempre achei que amar era algo tão ruim. Mas quando te conheci, você me mostrou que amar é um dos sentimentos mais puros e lindos do mundo inteiro.</p>',
    '<p><strong>Para o meu motivo de viver</strong><br /><br />Às vezes eu exagero e eu sei disso, mas não me imagino tendo uma vida na qual você não participa, você sempre está presente nos meus sonhos e planos do futuro.</p>',
    '<p><strong>Para a pessoa mais importante para mim</strong><br /><br />Você me fez descobrir o meu melhor lado, despertou o melhor de mim e vai despertando cada vez mais com apenas um sorriso.</p>'
];

const musics = [
    { letter: 'Essa música vem na minha cabeça sempre que penso em ti.', src: './sounds/vem ser minha.mp3' }, 
    { letter: 'Essa música toca na minha cabeça sempre que te vejo. ', src: './sounds/lisboa.mp3' }, 
    { letter: 'Caso se sinta sozinha, lembre-se:', src: './sounds/photograph.mp3' }, 
    { letter: 'Essa música me lembra nosso segundo beijo, porque o primeiro vish...', src: './sounds/to com moral no ceu.mp3' },
    { letter: 'Se algum dia duvidar do meu amor por ti, escute isso:', src: './sounds/perfect.mp3' }, 
    { letter: 'Se algum dia duvidar de que a unica pessoa que eu quero é você, ouça:', src: './sounds/nothing on you.mp3' },  
    { letter: 'Se eu te acho linda?', src: './sounds/just the way.mp3' },  
    { letter: 'O que eu quero que você seja?', src: './sounds/nosso lugar.mp3' }, 
    { letter: 'Nossa musica.', src: './sounds/sagrado profano.mp3' },  
    { letter: 'O que eu vou fazer por você?', src: './sounds/a droga do amor.mp3' }, 
    { letter: 'Minhas intenções com você?', src: './sounds/i wanna be yours.mp3' },   
    { letter: 'Estar com você me faz sentir assim', src: './sounds/terça de tarde.mp3' },
];

/** Retorna quanto tempo passou */
function getConvertedTime() {
    // Buscando datas
    const knowDate = new Date(1716233520000); // 20/05/2024 às 16:32
    const nowDate = new Date();

    // Subtraindo
    let seconds_dif = nowDate.getSeconds() - knowDate.getSeconds();
    let minutes_dif = nowDate.getMinutes() - knowDate.getMinutes();
    let hours_dif = nowDate.getHours() - knowDate.getHours();
    let days_dif = nowDate.getDate() - knowDate.getDate();
    let months_dif = (nowDate.getMonth() + 1) - (knowDate.getMonth() + 1);
    let years_dif = nowDate.getFullYear() - knowDate.getFullYear();

    // Ajustando se for menor
    if (seconds_dif < 0) seconds_dif += 60;
    if (minutes_dif < 0) minutes_dif += 60;
    if (hours_dif < 0) hours_dif += 24;
    if (days_dif < 0) days_dif += 30;
    if (months_dif < 0) months_dif += 12;

    // Ajustando textos
    let finalText = [];
    if (years_dif)
        finalText.push(`${years_dif} ano${years_dif > 1 ? 's' : ''}`)
    if (months_dif)
        finalText.push(`${months_dif} mes${months_dif > 1 ? 'es' : ''}`)
    if (days_dif)
        finalText.push(`${days_dif} dia${days_dif > 1 ? 's' : ''}`)
    if (hours_dif)
        finalText.push(`${hours_dif} hora${hours_dif > 1 ? 's' : ''}`)
    if (minutes_dif)
        finalText.push(`${minutes_dif} minuto${minutes_dif > 1 ? 's' : ''}`)
    if (seconds_dif)
        finalText.push(`${seconds_dif} segundo${seconds_dif > 1 ? 's' : ''}`)

    const lastItem = finalText.pop();
    const text = `${finalText.join(', ')} e ${lastItem}`;
    return text;
}

setInterval(() => pTimeElement.innerHTML = `${getConvertedTime()}`, 1000);

const cardElements = [];
function createCards(count) {
    const cardHTML = '<div class="div__letter"><p>Querida Dorothy</p></div><div class="div__topo"></div>';

    // Criando cartinhas dinamicamente
    for (let countX = 0; countX < count; countX++) {
        const cardCreation = document.createElement('div');
        cardCreation.setAttribute('class', 'div__carta');
        cardCreation.innerHTML = cardHTML;
        cardAreaElement.appendChild(cardCreation);
        cardElements.push(cardCreation);
    }

    cardElements.forEach((card, index) => card.onclick = (button) => handleCard(button.target, index))
}

createCards(letterTexts.length);

let activedCard = {};
/** 
 * Ativar ou desativar cartas 
 * @param {Element} card
 * @param {number} index
*/
function handleCard(card, index) {
    const topo = cardElements[index].childNodes[1];
    const carta = cardElements[index].childNodes[0];
    const activated = topo.classList.contains('topo-ativado');
    activedCard = { carta, topo };

    if (!activated) {
        topo.classList.add('topo-ativado');
        carta.classList.add('letter-ativado');
    }
    else return;

    setTimeout(() => showPopUp(index), 1000);
}

function showPopUp(index) {
    popUpElement.innerHTML = letterTexts[index];
    document.body.style.overflowY = 'hidden';
    popUpElement.classList.add('show-popup');
}

function hidePopUp() {
    document.body.style.overflowY = 'auto';
    popUpElement.classList.remove('show-popup');
    activedCard.carta.classList.remove('letter-ativado');
    activedCard.topo.classList.remove('topo-ativado');
}

popUpElement.onclick = hidePopUp;

function loveYouText() {
    const texts = {
        Mandarim: 'Wo ai ni',
        Inglês: 'I love you',
        Espanhol: 'Te quiero',
        Francês: 'Je t\'aime',
        Alemão: 'Ich liebe dich',
        Italiano: 'Ti amo',
        Japonês: 'Aishiteru',
        Coreano: 'Saranghae',
        Russo: 'Ya tebya liubliu',
        Árabe: 'Ana behibak',
        Hebraico: 'Ani ohev otach',
        Português: 'Eu te amo',
        Turco: 'Seni seviyorum',
        Hindi: 'Main tumse pyar karta hoon',
        Bengali: 'Ami tomake bhalobashi',
        Grego: 'S\'agapo',
        Sueco: 'Jag älskar dig',
        Norueguês: 'Jeg elsker deg',
        Dinamarquês: 'Jeg elsker dig',
        Holandês: 'Ik hou van je',
        Polonês: 'Kocham cię',
        Tcheco: 'Miluji tě',
        Eslovaco: 'Milujem ťa',
        Húngaro: 'Szeretlek',
        Romeno: 'Te iubesc',
        Sérvio: 'Volim te',
        Croata: 'Volim te',
        Búlgaro: 'Obicham te',
        Esloveno: 'Ljubim te',
        Albanês: 'Te dua',
        Macedônio: 'Te sakam',
        Islandês: 'Ég elska þig',
        Finlandês: 'Rakastan sinua',
        Estoniano: 'Ma armastan sind',
        Lituano: 'Aš tave myliu',
        Letão: 'Es tevi mīlu',
        Vietnamita: 'Em yêu anh',
        Tailandês: 'Chan rak khun',
        Filipino: 'Mahal kita',
        Malaio: 'Saya cintakan awak',
        Indonésio: 'Saya cinta kamu',
        Swahili: 'Nakupenda',
        Zulu: 'Ngiyakuthanda',
        Xhosa: 'Ndiyakuthanda.',
        Sesotho: 'Ke a go rata',
        Tswana: 'Ke a go rata',
        Suaíli: 'Naku penda',
        Basco: 'Maite zaitut',
        Catalão: 'T\'estimo',
        Galês: 'Rwy\'n dy garu di',
        Irlandês: 'Tá grá agam ort',
        'Escocês-Gaélico': 'Tha gaol agam ort',
        Faroês: 'Eg elski teg',
        Gaélico: 'Is tu gràdh na h-alba',
        Bielorrusso: 'Ja ciabie kachaju',
        Maltês: 'Jien inħobbok',
        Esperanto: 'Mi amas vin',
        Kazakh: 'Men seni jaksy kuremіn',
        Quirguiz: 'Menin seni süyöm',
        Azerbaijano: 'Mən səni sevirəm',
        Georgiano: 'me shens miq\'varxar',
        Armênio: 'Es kez sirum em',
        Assamês: 'Mo̱i to̱mak bhal po̱ŋkho̱',
        Caxemira: 'Main tujhse pyar karta hoon',
        Nepalês: 'Ma tapailai maya garchhu',
        Oriá: 'Mu tumaku bhalapaee',
        Panjabi: 'Main tainu pyaar karda haan',
        Somali: 'Waan ku jeclahay',
        Tajique: 'Man toro dust medoram',
        Ucraniano: 'Ya tebe kokhaju',
        Urdu: 'Main tum se pyar karta hoon',
        Uzbeque: 'Men seni sevaman',
        Yoruba: 'Mo nifẹ rẹ',
        Zulu: 'Ngiyakuthanda'
    }

    const textsArray = Object.keys(texts);
    const randomArray = textsArray[Math.floor(Math.random() * textsArray.length)];
    return { country: randomArray, message: texts[randomArray] };
}

setInterval(() => {
    const [, next, , current, , last] = divLoveYouElement.childNodes;
    const randomText = loveYouText();
    next.innerText = `${randomText.message}`;
    pLoveCountry.innerText = randomText.country;

    // Default
    next.animate({ transform: "translate(50%, -50%)", opacity: 0 }, { duration: 0, fill: 'forwards' })
    last.animate({ transform: "translate(50%, 50%)", opacity: 1 }, { duration: 0, fill: 'forwards' })

    // Animating
    next.animate({ transform: "translate(50%, 50%)", opacity: 1 }, { duration: 400, fill: 'forwards' })
    last.animate({ transform: "translate(50%, 100%)", opacity: 0 }, { duration: 400, fill: 'forwards' })

    // Default
    setTimeout(() => {
        next.animate({ transform: "translate(50%, -50%)", opacity: 0 }, { duration: 0, fill: 'forwards' })
        last.animate({ transform: "translate(50%, 50%)", opacity: 1 }, { duration: 0, fill: 'forwards' })

        last.innerText = next.innerHTML;
    }, 1000);
}, 2000);

// configurando sons 
let divMusicsElements = [];
function setSoundElements(count) {
    const secureArray = [...musics];
    const biggestValue = secureArray.sort((a, b) => b.letter.length - a.letter.length)[0];
    const biggestIndex = musics.findIndex(f => f.src === biggestValue.src);

    for (let countX = 0; countX < count; countX++) {
        const divElement = document.createElement('div');
        const letterElement = document.createElement('p'); 
        const iconElement = document.createElement('p');

        if (countX === biggestIndex) {
            divElement.setAttribute('class', 'div__music-area div__music-area-base div__music-area-pre');
            letterElement.innerText = biggestValue.letter;
            letterElement.classList.add('p__music-letter-pre');
        }
        else 
            divElement.setAttribute('class', 'div__music-area');
        
        iconElement.innerText = '▶';
        letterElement.classList.add('p__music-letter');
        iconElement.classList.add('p__music-icon');

        divElement.appendChild(letterElement);
        divElement.appendChild(iconElement);
        divMusicElement.appendChild(divElement);
        divMusicsElements.push(divElement); 
        iconElement.onclick = () => showMusic(countX);
    }

}

setSoundElements(musics.length);

// Configurando altura padrão
function configureHeight() {
    const elementBase = document.querySelector('.div__music-area-base');
    console.log(elementBase.childNodes);
    let musicHeight = elementBase.clientHeight;
    divMusicsElements.forEach(e => e.style.height = `${musicHeight}px`);
    elementBase.classList.remove('div__music-area-pre');
    elementBase.childNodes[0].classList.remove('p__music-letter-pre');  
}

configureHeight();

// Configurando caixa de músicas
let lastSongElement = { letter: '', div: '' };
function showMusic(index) {
    const element = divMusicsElements[index];
    const text = element.childNodes[0];
    const icon = element.childNodes[1];

    // Abrir
    if (!text.classList.contains('p__music-letter-start')) {
        closeAll();

        text.classList.add('p__music-letter-start');
        element.classList.add('div__music-area-start');
        icon.classList.add('p__music-icon-start');

        icon.innerText = '❚❚';
        lastSongElement = { letter: text, div: element, icon };
        startSound(index, text); 
        fadeInSound();
    } 

    else {
        text.classList.remove('p__music-letter-start');
        element.classList.remove('div__music-area-start');
        icon.classList.remove('p__music-icon-start');
        
        audioElement.pause();
        audioElement.currentTime = 0; 
        icon.innerText = '▶';
    }

    async function closeAll() { 
        lastSongElement.letter.classList?.remove('p__music-letter-start');
        lastSongElement.div.classList?.remove('div__music-area-start');
        if (!lastSongElement.icon) return;
        lastSongElement.icon.innerText = '▶'; 
        lastSongElement.icon.classList.remove('p__music-icon-start');
    }

    function delay(ms) { return new Promise(res => setTimeout(res, ms))};

    async function fadeInSound() {
        audioElement.volume = 0;
        for (let countX = 0; countX < 1; countX += 0.1) {
            audioElement.volume = countX;
            await delay(100);
        }
    }
}

function startSound(index, text) {
    const music = musics[index];
    audioElement.setAttribute('src', music.src);
    text.innerText = music.letter;
    audioElement.play();
}