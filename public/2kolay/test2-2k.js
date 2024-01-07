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


let sesDogru = new Audio('/assets/audio/correct.wav')
let sesYanlis = new Audio('/assets/audio/wrong.wav')

let zamanSayaci = 0;

function baslatmaFonk() {
	const renklerDisplay = document.querySelector('.renkler');
	hedefRenkSec();
	renklerDisplay.style.display = 'flex';
	basla.style.display = 'none';

	const zamanlayici = setInterval(()=>{
		zamanSayaci ++;
	}, 1000)

	renkler.forEach((renk, index) => {
		const renkDiv = document.createElement('div');
		renkDiv.classList.add('renk');
		renkDiv.style.backgroundColor = renk.renk;
		renkDiv.addEventListener('click', () => renkSecildi(renk, zamanSayaci));
		renklerDiv.appendChild(renkDiv);
	});
}

function hedefRenkSec() {
	const renkIndex = Math.floor(Math.random() * renkler.length);
	hedefRenk = renkler[renkIndex];
	ilkses(hedefRenk.isim);
}

function renkSecildi(renk, sure) {
	const tiklanan = renk.isim;

	if (renk.isim === hedefRenk.isim) {
    fetchAndAlert('DOGRU', tiklanan, hedefRenk.isim, sure);
		sesDogru.play();
		alert('Doğru renk seçildi!');
	} else {
		fetchAndAlert('YANLIS', tiklanan, hedefRenk.isim, sure);
		sesYanlis.play();
		alert('Yanlış renk seçildi. Tekrar deneyin.');
	}
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

function fetchAndAlert(sonuc, tiklanan, hedefRenk, sure) {
  const veri = { sonuc, tiklanan, hedefRenk, sure};

	fetch('/2kolaytest2', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(veri),
	})
		.then((response) => response.json())
		.catch((error) => console.log('Hata:', error));
}

