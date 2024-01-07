var satirSayisi = 4;
var sutunSayisi = 4;

var simdikiParca;
var digerParca;

let sesDogru = new Audio('/assets/audio/correct.wav');
let sesYanlis = new Audio('/assets/audio/wrong.wav');

let zamanSayaci = 0;

window.onload = function () {
	let parcaListesi = [];
	for (let i = 1; i <= satirSayisi * sutunSayisi; i++) {
		parcaListesi.push(i.toString());
	}
	parcaListesi.reverse();
	for (let i = 0; i < parcaListesi.length; i++) {
		let j = Math.floor(Math.random() * parcaListesi.length);

		let tmp = parcaListesi[i];
		parcaListesi[i] = parcaListesi[j];
		parcaListesi[j] = tmp;
	}

	const zamanlayici = setInterval(() => {
		zamanSayaci++;
	}, 1000);

	for (let r = 0; r < satirSayisi; r++) {
		for (let c = 0; c < sutunSayisi; c++) {
			let parca = document.createElement('img');

			parca.src = '/assets/images/6kolaytest3/' + parcaListesi.pop() + '.png';

			parca.addEventListener('click', function () {
				tiklamaKontrol(parca, zamanSayaci);
			});

			document.getElementById('tahta').append(parca);
		}
	}
};

function fetchAndAlert(sonuc, sure) {
	const veri = { sonuc, sure };

	fetch('/6kolaytest3', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(veri),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		})
		.catch((error) => {
			console.log('HATA', error);
		});
}

function tiklamaKontrol(parca, sure) {
	let dogruParca = '1.png';
	let simdikiTiklanan = parca.getAttribute('src').split('/').pop();
	let dogru = 'DOGRU';
	let yanlis = 'YANLIS';
	if (dogruParca === simdikiTiklanan) {
		sesDogru.play();
		fetchAndAlert(dogru, sure);
		alert('DOGRU');
	}

	if (dogruParca != simdikiTiklanan) {
		sesYanlis.play();
		fetchAndAlert(yanlis, sure);
		alert('YANLIŞ');
	}
}
