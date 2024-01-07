const basla = document.getElementById('basla');
basla.addEventListener('click', baslatmaFonk);

let sesDogru = new Audio('/assets/audio/correct.wav');
let sesYanlis = new Audio('/assets/audio/wrong.wav');

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
		isim: 'Kağıt Farklı',
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
let zamanSayaci = 0;
function baslatmaFonk() {
	ilkses();
	const resimlerDisplay = document.querySelector('.resimler');
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
	if (sira == nesneler[3].xx) {
		sesDogru.play();
		alert('DOGRU');
		fetchAndAlert('DOGRU', nesneler[3].isim, nesneler[sira - 1].isim, sure);
	} else {
		sesYanlis.play();
		alert('YANLIS');
		fetchAndAlert('YANLIS', nesneler[3].isim, nesneler[sira - 1].isim, sure);
	}
}

function fetchAndAlert(sonuc, sorulan, tiklanan, sure) {
	const veri = { sonuc, sorulan, tiklanan, sure };

	fetch('/5zortest2', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(veri),
	})
		.then((response) => response.json())
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
