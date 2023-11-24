const basla = document.getElementById('basla');
basla.addEventListener('click', baslatmaFonk);

const sesbutton = document.getElementById('ses-button');
sesbutton.addEventListener('click', tekrardinle);

const resimler = document.querySelectorAll('.resimler button');
resimler.forEach((resim, index) => {
	resim.addEventListener('click', () => resimClick(index + 1));
});

let sesDogru = new Audio('/assets/audio/correct.wav')
let sesYanlis = new Audio('/assets/audio/yanlis.mp3')

const nesneler = [
	{
		isim: 'Kırmızı ve Turucu Tren',
		resim: '/assets/images/5kolaytest1/kirmizi-turuncu-tren.png',
		xx: '1',
	},
	{
		isim: 'Kırmızı ve Yeşil Kiraz',
		resim: '/assets/images/5kolaytest1/kirmizi-yesil-kiraz.png',
		xx: '2',
	},
	{
		isim: 'Mavi ve Kırmızı Bisiklet',
		resim: '/assets/images/5kolaytest1/mavi-kirmizi-bisiklet.png',
		xx: '3',
	},
	{
		isim: 'Mor ve Mavi Üzüm',
		resim: '/assets/images/5kolaytest1/mor-mavi-üzüm.png',
		xx: '4',
	},
	{
		isim: 'Pembe ve Turuncu Kabak',
		resim: '/assets/images/5kolaytest1/pembe-turuncu-kabak.png',
		xx: '5',
	},
];
let x;

function baslatmaFonk() {
	x = Math.floor(Math.random() * 5);
	const resimlerDisplay = document.querySelector('.resimler');
	ilkses(nesneler[x]);
	resimlerDisplay.style.display = 'flex';
	basla.style.display = 'none';
}

function resimClick(sira) {
	if (sira == nesneler[x].xx) {
		sesDogru.play()
		alert('DOGRU');
		fetchAndAlert('DOGRU', nesneler[x].isim, nesneler[sira - 1].isim);
	} else {
		sesYanlis.play()
		alert('YANLIS');
		fetchAndAlert('YANLIS', nesneler[x].isim, nesneler[sira - 1].isim);
	}
}

function fetchAndAlert(sonuc, sorulan, tiklanan) {
	const veri = { sonuc, sorulan, tiklanan };

	fetch('/5kolaytest1', {
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
