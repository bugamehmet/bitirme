const basla = document.getElementById('basla');
basla.addEventListener('click', baslatmaFonk);

const resim1 = document.getElementById('resim1');
resim1.addEventListener('click', resim1fonk);

const resim2 = document.getElementById('resim2');
resim2.addEventListener('click', resim2fonk);

const resim3 = document.getElementById('resim3');
resim3.addEventListener('click', resim3fonk);

let sesbutton = document.getElementById('ses-button');
sesbutton.addEventListener('click', tekrardinle);

const nesneler = [
	{
		isim: 'Araba',
		resim: '/assets/images/2kolaytest1/araba.jpg',
		xx: '1',
	},
	{
		isim: 'Ayakkabı',
		resim: '/assets/images/2kolaytest1/ayakkabı.jpg',
		xx: '2',
	},
	{
		isim: 'Basket Topu',
		resim: '/assets/images/2kolaytest1/basket.png',
		xx: '3',
	},
];
// TODO : Daha fazla nesne eklenerek html daki img leri rastgele atıyarak yapılabilir.
const x = Math.floor(Math.random() * 3);

function baslatmaFonk() {
	const resimlerDisplay = document.querySelector('.resimler');
	ilkses(nesneler[x]);
	resimlerDisplay.style.display = 'flex';
	basla.style.display = 'none';
}
function resim1fonk() {
	if (resim1.value == nesneler[x].xx) {
		const veri = { sonuc: 'DOGRU', sorulan: nesneler[x].isim, tiklanan: nesneler[0].isim };

		fetch('/2kolaytest1oyun1', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(veri),
		})
			.then((response) => response.json())
			.catch((error) => {
				console.error('Hata:', error);
			});
		alert('doğru');
	} else {
		const veri = { sonuc: 'YANLIS', sorulan: nesneler[x].isim, tiklanan: nesneler[0].isim };

		fetch('/2kolaytest1oyun1', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(veri),
		})
			.then((response) => response.json())
			.catch((error) => {
				console.error('Hata:', error);
			});
		alert('yanlış');
	}
}
function resim2fonk() {
	if (resim2.value == nesneler[x].xx) {
		const veri = { sonuc: 'DOGRU', sorulan: nesneler[x].isim, tiklanan: nesneler[1].isim };
		fetch('/2kolaytest1oyun1', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(veri),
		})
			.then((response) => response.json())
			.catch((error) => {
				console.error('Hata', error);
			});
		alert('dogru');
	} else {
		const veri = { sonuc: 'YANLIS', sorulan: nesneler[x].isim, tiklanan: nesneler[1].isim };

		fetch('/2kolaytest1oyun1', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(veri),
		})
			.then((response) => response.json())
			.catch((error) => {
				console.error('Hata:', error);
			});
		alert('yanlış');
	}
}
function resim3fonk() {
	if (resim3.value == nesneler[x].xx) {
		const veri = { sonuc: 'DOGRU', sorulan: nesneler[x].isim, tiklanan: nesneler[2].isim };
		fetch('/2kolaytest1oyun1', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(veri),
		})
			.then((response) => response.json())
			.catch((error) => {
				console.error('Hata', error);
			});
		alert('dogru');
	} else {
		const veri = { sonuc: 'YANLIS', sorulan: nesneler[x].isim, tiklanan: nesneler[2].isim };

		fetch('/2kolaytest1oyun1', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(veri),
		})
			.then((response) => response.json())
			.catch((error) => {
				console.error('Hata:', error);
			});
		alert('yanlış');
	}
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
