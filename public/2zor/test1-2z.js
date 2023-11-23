const basla = document.getElementById('basla');
basla.addEventListener('click', baslatmaFonk);

const sesbutton = document.getElementById('ses-button');
sesbutton.addEventListener('click', tekrardinle);

const resimler = document.querySelectorAll('.resimler button');
resimler.forEach((resim, index) => {
	resim.addEventListener('click', () => resimClick(index + 1));
});

const nesneler = [
	{
		isim: 'Basket Topu',
		resim: '/assets/images/2zortest1/basket.png',
		xx: '1',
	},
	{
		isim: 'Elma',
		resim: '/assets/images/2zortest1/elma.png',
		xx: '2',
	},
	{
		isim: 'Futbol Topu',
		resim: '/assets/images/2zortest1/futbol.png',
		xx: '3',
	},
	{
		isim: 'Kiraz',
		resim: '/assets/images/2zortest1/kiraz.png',
		xx: '4',
	},
	{
		isim: 'Portakal',
		resim: '/assets/images/2zortest1/portakal.png',
		xx: '5',
	},
	{
		isim: 'Üzüm',
		resim: '/assets/images/2zortest1/üzüm.png',
		xx: '6',
	},
];
let x;

function baslatmaFonk() {
	x = Math.floor(Math.random() * 6);
	const resimlerDisplay = document.querySelector('.resimler');
	ilkses(nesneler[x]);
	resimlerDisplay.style.display = 'flex';
	basla.style.display = 'none';
}

function resimClick(sira) {
	if (sira == nesneler[x].xx) {
		alert('DOGRU')
		fetchAndAlert('DOGRU', nesneler[x].isim, nesneler[sira - 1].isim);
	} else {
		alert('YANLIS')
		fetchAndAlert('YANLIS', nesneler[x].isim, nesneler[sira - 1].isim);
	}
}

function fetchAndAlert(sonuc, sorulan, tiklanan) {
	const veri = { sonuc, sorulan, tiklanan };

	fetch('/2zortest1', {
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
