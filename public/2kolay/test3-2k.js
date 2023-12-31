const basla = document.getElementById('basla');
basla.addEventListener('click', baslatmaFonk);

const sesbutton = document.getElementById('ses-button');
sesbutton.addEventListener('click', tekrardinle);

let sesDogru = new Audio('/assets/audio/correct.wav');
let sesYanlis = new Audio('/assets/audio/wrong.wav');

const nesneler = [
	{
		isim: 'Kedi',
		resim: '/assets/images/2kolaytest3/kedi.png',
		xx: '1',
		audio: '/assets/audio/2kolaytest3/kedi.wav',
	},
	{
		isim: 'Köpek',
		resim: '/assets/images/2kolaytest3/kopek.png',
		xx: '2',
		audio: '/assets/audio/2kolaytest3/kopek.wav',
	},
	{
		isim: 'Kuş',
		resim: '/assets/images/2kolaytest3/kus.png',
		xx: '3',
		audio: '/assets/audio/2kolaytest3/kus.wav',
	},
];

let x;
let zamanSayaci = 0;

async function baslatmaFonk() {
	x = Math.floor(Math.random() * 3);
	const resimlerDisplay = document.querySelector('.resimler');
	resimlerDisplay.style.display = 'flex';
	basla.style.display = 'none';
	ilkses();
	setTimeout(() => {
		let sesx = new Audio(`${nesneler[x].audio}`);
		sesx.play();
	}, 2500);
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

	fetch('/2kolaytest3', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(veri),
	})
		.then((response) => response.json())
		.then(() => alert(sonuc))
		.catch((error) => console.log('HATA', error));
}

function ilkses() {
	let text = `Bu ses hangi hayvana aittir`;
	let utterance = new SpeechSynthesisUtterance();
	let dil = 'tr-TR';
	utterance.text = text;
	utterance.voice = window.speechSynthesis.getVoices()[dil];
	window.speechSynthesis.speak(utterance);
}

function tekrardinle() {
	let sesx = new Audio(`${nesneler[x].audio}`);
	sesx.play();
}
