const basla = document.getElementById('basla');
basla.addEventListener('click', baslatmaFonk);

const sesbutton = document.getElementById('ses-button');
sesbutton.addEventListener('click', tekrardinle);

let sesDogru = new Audio('/assets/audio/correct.wav');
let sesYanlis = new Audio('/assets/audio/wrong.wav');

const nesneler = [
	{
		isim: 'Ayakkabı',
		resim: '/assets/images/4kolaytest1/ayakkabı.jpg',
		xx: '1',
	},
	{
		isim: 'Basket Topu',
		resim: '/assets/images/4kolaytest1/basket.png',
		xx: '2',
	},
	{
		isim: 'Futbol Topu',
		resim: '/assets/images/4kolaytest1/futbol.png',
		xx: '3',
	},
	{
		isim: 'Kiraz',
		resim: '/assets/images/4kolaytest1/kiraz.png',
		xx: '4',
	},
	{
		isim: 'Portakal',
		resim: '/assets/images/4kolaytest1/portakal.png',
		xx: '5',
	},
	{
		isim: 'Üzüm',
		resim: '/assets/images/4kolaytest1/üzüm.png',
		xx: '6',
	},
];
let x;
let zamanSayaci = 0;

function baslatmaFonk() {
	x = Math.floor(Math.random() * 6);
	const resimlerDisplay = document.querySelector('.resimler');
	ilkses(nesneler[x]);
	resimlerDisplay.style.display = 'flex';
	basla.style.display = 'none';

	const zamanlayici = setInterval(() => {
		zamanSayaci++;
	}, 1000);

	const resimler = document.querySelectorAll('.resimler button');
	resimler.forEach((resim, index) => {
		resim.addEventListener('click', () => resimClick(index + 1, zamanSayaci));
	});
}

function resimClick(sira, sure) {
	if (sira == nesneler[x].xx) {
		sesDogru.play();
		alert('DOGRU');
		fetchAndAlert('DOGRU', nesneler[x].isim, nesneler[sira - 1].isim, sure);
	} else {
		sesYanlis.play();
		alert('YANLIS');
		fetchAndAlert('YANLIS', nesneler[x].isim, nesneler[sira - 1].isim, sure);
	}
}

function fetchAndAlert(sonuc, sorulan, tiklanan, sure) {
	const veri = { sonuc, sorulan, tiklanan, sure };

	fetch('/4kolaytest1', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(veri),
	})
		.then((response) => response.json())
		.then(() => alert(sonuc))
		.catch((error) => console.log('HATA', error));
}

function ilkses(nesne) {
	let text = `${nesne.isim} hangisidir`;
	let utterance = new SpeechSynthesisUtterance();
	let dil = 'tr-TR';
	utterance.text = text;
	utterance.voice = window.speechSynthesis.getVoices()[dil];
	window.speechSynthesis.speak(utterance);
}

function tekrardinle() {
	let text = `${nesneler[x].isim} hangisidir`;
	let utterance = new SpeechSynthesisUtterance();
	let dil = 'tr-TR';
	utterance.text = text;
	utterance.voice = window.speechSynthesis.getVoices()[dil];
	window.speechSynthesis.speak(utterance);
}
