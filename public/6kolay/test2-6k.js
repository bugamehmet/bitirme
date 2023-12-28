const basla = document.getElementById('basla');
basla.addEventListener('click', baslatmaFonk);

const sesbutton = document.getElementById('ses-button');
sesbutton.addEventListener('click', tekrardinle);

const resimler = document.querySelectorAll('.resimler button');
resimler.forEach((resim, index) => {
	resim.addEventListener('click', () => resimClick(index + 1));
});

let sesDogru = new Audio('/assets/audio/correct.wav')
let sesYanlis = new Audio('/assets/audio/wrong.wav')


const nesneler = [
  {
		isim: 'Hangi kedi yeşil kutunun altındadır.',
		xx: '1',
	},
	{
		isim: 'Hangi kedi yeşil kutuların arasındadır.',
		xx: '2',
	},
  {
		isim: 'Hangi kedi yeşil kutunun arkasındadır.',
		xx: '3',
	},
	{
		isim: 'Hangi kedi yeşil kutunun önündedir.',
		xx: '4',
	},
	{
		isim: 'Hangi kedi yeşil kutunun sağındadır.',
		xx: '5',
	},
  {
		isim: 'Hangi kedi yeşil kutunun solundadır.',
		xx: '6',
	},
];
let x;

async function baslatmaFonk() {
	x = Math.floor(Math.random() * 6);
	const resimlerDisplay = document.querySelector('.resimler');
	resimlerDisplay.style.display = 'flex';
	basla.style.display = 'none';
	tekrardinle();
}

function resimClick(sira) {
	if (sira == nesneler[x].xx) {
		sesDogru.play();
		alert('DOGRU')
		fetchAndAlert('DOGRU', nesneler[x].isim, nesneler[sira - 1].isim);
	} else {
		sesYanlis.play()
		alert('YANLIS')
		fetchAndAlert('YANLIS', nesneler[x].isim, nesneler[sira - 1].isim);
	}
}

function fetchAndAlert(sonuc, sorulan, tiklanan) {
	const veri = { sonuc, sorulan, tiklanan };

	fetch('/6kolaytest2', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(veri),
	})
		.then((response) => response.json())
		.then(() => alert(sonuc))
		.catch((error) => console.log('HATA', error));
}

function tekrardinle() {
  let text = `${nesneler[x].isim}`;
  let utterance = new SpeechSynthesisUtterance();
  let dil = 'tr-TR';
  utterance.text = text;
  utterance.voice = window.speechSynthesis.getVoices()[dil];
  window.speechSynthesis.speak(utterance);
}
