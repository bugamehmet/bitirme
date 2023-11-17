const renkler = [
	{ isim: 'Kırmızı', renk: 'red' },
	{ isim: 'Mavi', renk: 'blue' },
	{ isim: 'Yeşil', renk: 'green' },
	{ isim: 'Sarı', renk: 'yellow' },
	{ isim: 'Mor', renk: 'purple' },
	{ isim: 'Turuncu', renk: 'orange' },
];

let hedefRenk;

const basla = document.getElementById('basla');
basla.addEventListener('click', baslatmaFonk);
const sesbutton = document.getElementById('ses-button');
sesbutton.addEventListener('click', tekrardinle);

const renklerDiv = document.getElementById('renkler');
const tekrarOynaButton = document.getElementById('tekrarOyna');

function baslatmaFonk() {
	const renklerDisplay = document.querySelector('.renkler');
	hedefRenkSec();
	renklerDisplay.style.display = 'flex';
	basla.style.display = 'none';
}

function hedefRenkSec() {
	const renkIndex = Math.floor(Math.random() * renkler.length);
	hedefRenk = renkler[renkIndex];
	ilkses(hedefRenk.isim);
}

renkler.forEach((renk, index) => {
	const renkDiv = document.createElement('div');
	renkDiv.classList.add('renk');
	renkDiv.style.backgroundColor = renk.renk;
	renkDiv.addEventListener('click', () => renkSecildi(renk));
	renklerDiv.appendChild(renkDiv);
});

function renkSecildi(renk) {
	const tiklanan = renk.isim;

	if (renk.isim === hedefRenk.isim) {
    fetchAndAlert('DOGRU', tiklanan, hedefRenk.isim);
		alert('Doğru renk seçildi!');
	} else {
		alert('Yanlış renk seçildi. Tekrar deneyin.');
	}

	tekrarOynaButton.style.display = 'flex';
}

tekrarOynaButton.addEventListener('click', tekrarOyna);

function tekrarOyna() {
	tekrarOynaButton.style.display = 'none';
	hedefRenkSec();
}

function ilkses(hedefRenk) {
	let text = `${hedefRenk} hangisidir`;
	let utterance = new SpeechSynthesisUtterance();
	let dil = 'tr-TR';
	utterance.text = text;
	utterance.voice = window.speechSynthesis.getVoices()[dil];
	window.speechSynthesis.speak(utterance);
}

function tekrardinle() {
	let text = `${hedefRenk.isim} hangisidir`;
	let utterance = new SpeechSynthesisUtterance();
	let dil = 'tr-TR';
	utterance.text = text;
	utterance.voice = window.speechSynthesis.getVoices()[dil];
	window.speechSynthesis.speak(utterance);
}

function fetchAndAlert(sonuc, tiklanan, hedefRenk) {
  const veri = { sonuc, tiklanan, hedefRenk };

	fetch('/2kolaytest2oyun1', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(veri),
	})
		.then((response) => response.json())
		.catch((error) => console.log('Hata:', error));
}

