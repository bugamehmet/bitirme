const basla = document.getElementById('basla');
basla.addEventListener('click', baslatmaFonk);

const resimler = document.querySelectorAll('.resimler button');
resimler.forEach((resim, index) => {
    resim.addEventListener('click', () => resimClick(index + 1));
});

let sesDogru = new Audio('/assets/audio/correct.wav')
let sesYanlis = new Audio('/assets/audio/wrong.wav')

const nesneler = [
    {
        isim: 'Kağıt-Normal',
        xx: '1',
    },
    {
        isim: 'Kağıt Normal',
        xx: '2',
    },
    {
        isim: 'Kağıt Normal',
        xx: '3',
    },
    {
        isim: 'Kağıt Yanlış',
        xx: '4',
    },
    {
        isim: 'Kağıt Normal',
        xx: '5',
    },
    {
        isim: 'Kağıt Normal',
        xx: '6',
    },
];

function baslatmaFonk() {
    ilkses()
    const resimlerDisplay = document.querySelector('.resimler');
    resimlerDisplay.style.display = 'flex';
    basla.style.display = 'none';
}

function resimClick(sira) {
    if (sira == nesneler[3].xx) {
        sesDogru.play();
        alert('DOGRU');
        fetchAndAlert('DOGRU', nesneler[3].isim, nesneler[sira - 1].isim);
    } else {
        sesYanlis.play();
        alert('YANLIS');
        fetchAndAlert('YANLIS', nesneler[3].isim, nesneler[sira - 1].isim);
    }
}

function fetchAndAlert(sonuc, sorulan, tiklanan) {
    const veri = { sonuc, sorulan, tiklanan };

    fetch('/5zortest2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(veri),
    })
        .then((response) => response.json())
        .then(() => {
            alert(sonuc);
            console.log(sonuc);
        })
        .catch((error) => console.log('HATA', error));
}

function ilkses() {
	let text = 'Farklı Olan Nesneyi Bul Bakalım';
	let utterance = new SpeechSynthesisUtterance();
	let dil = 'tr-TR';
	utterance.text = text;
	utterance.voice = window.speechSynthesis.getVoices()[dil];
	window.speechSynthesis.speak(utterance);
}