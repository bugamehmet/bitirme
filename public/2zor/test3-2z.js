// TODO : TEKRAR OYNAMA FONKSİYONU EKLENECEK
// responsive yapılacak
const basla = document.getElementById('basla');
basla.addEventListener('click', baslatmaFonk);

let sesDogru = new Audio('/assets/audio/correct.wav');
let sesYanlis = new Audio('/assets/audio/wrong.wav');

const sesbutton = document.getElementById('ses-button');
sesbutton.addEventListener('click', tekrardinle);

const nesneler = [
	{
		isim: 'Baklava Dilimi',
		resim: '/assets/images/2zortest3/baklava.png',
		xx: '1',
	},
	{
		isim: 'Daire',
		resim: '/assets/images/2zortest3/daire.png',
		xx: '2',
	},
	{
		isim: 'Kare',
		resim: '/assets/images/2zortest3/kare.png',
		xx: '3',
	},
	{
		isim: 'Üçgen',
		resim: '/assets/images/2zortest3/ucgen.png',
		xx: '4',
	},
	{
		isim: 'Yıldız',
		resim: '/assets/images/2zortest3/yildiz.png',
		xx: '5',
	},
];

let x;
let zamanSayaci = 0;
const resimler = [];

function baslatmaFonk() {
	x = Math.floor(Math.random() * 5);
	const resimlerDisplay = document.querySelector('.resimler');
	ilkses(nesneler[x]);
	resimlerDisplay.style.display = 'flex';
	basla.style.display = 'none';

	const zamanlayici = setInterval(() => {
		zamanSayaci++;
	}, 1000);

	for (let i = 1; i <= 5; i++) {
		const resim = document.getElementById(`resim${i}`);
		resim.addEventListener('click', () => resimClick(i, zamanSayaci));
		resimler.push(resim);
	}
}

function resimClick(sira, sure) {
	const dogruCevap = nesneler[x].xx;
	const tiklanan = nesneler[sira - 1].isim;

	if (sira == dogruCevap) {
		fetchAndAlert('DOGRU', tiklanan, sure);
		sesDogru.play();
		alert('DOĞRU');
	} else {
		fetchAndAlert('YANLIS', tiklanan, sure);
		sesYanlis.play();
		alert('YANLIŞ');
	}
}

function fetchAndAlert(sonuc, tiklanan, sure) {
	const veri = { sonuc, sorulan: nesneler[x].isim, tiklanan, sure };

	fetch('/2zortest3', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(veri),
	})
		.then((response) => response.json())
		.catch((error) => console.log('Hata:', error));
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
