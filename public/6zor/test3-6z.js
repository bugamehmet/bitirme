var ilkSecilen = null;
let zamanSayaci = 0;
let zamanlayici;

var gameObjects = [
	{ type: 'kare', image: '/assets/images/6zortest3/kare.png' },
	{ type: 'daire', image: '/assets/images/6zortest3/daire.png' },
	{ type: 'dikdortgen', image: '/assets/images/6zortest3/dikdortgen.png' },
	{ type: 'ucgen', image: '/assets/images/6zortest3/ucgen.png' },
];
var gameObjects2 = [
	{ type: 'cetvel', image: '/assets/images/6zortest3/cetvel.png' },
	{ type: 'yastik', image: '/assets/images/6zortest3/yastik.png' },
	{ type: 'top', image: '/assets/images/6zortest3/top.png' },
	{ type: 'monitor', image: '/assets/images/6zortest3/monitor.png' },
];

let sesDogru = new Audio('/assets/audio/correct.wav');
let sesYanlis = new Audio('/assets/audio/wrong.wav');

function tiklamaKontrol(parca, sure) {
	if (ilkSecilen === null) {
		ilkSecilen = parca;
		ilkSecilen.style.opacity = 0.5;
	} else {
		let ikinciSecilen = parca;
		ikinciSecilen.style.opacity = 0.5;

		let eslesme = eslesmeKontrol(ilkSecilen, ikinciSecilen);
		if (eslesme) {
			sesDogru.play();
			ilkSecilen.style.display = 'none';
			ikinciSecilen.style.display = 'none';

			if (tumObjelerEslesti()) {
				oyunBitti(sure);
			}
		} else {
			sesYanlis.play();
			ilkSecilen.style.opacity = 1;
			ikinciSecilen.style.opacity = 1;
		}

		ilkSecilen = null;
	}
}

function eslesmeKontrol(parca1, parca2) {
	let tip1 =
		parca1.parentElement.id === 'tahta'
			? gameObjects[parca1.dataset.index].type
			: gameObjects2[parca1.dataset.index].type;
	let tip2 =
		parca2.parentElement.id === 'tahta'
			? gameObjects[parca2.dataset.index].type
			: gameObjects2[parca2.dataset.index].type;

	return (
		(tip1 === 'kare' && tip2 === 'yastik') ||
		(tip1 === 'daire' && tip2 === 'top') ||
		(tip1 === 'dikdortgen' && tip2 === 'monitor') ||
		(tip1 === 'ucgen' && tip2 === 'cetvel') ||
		(tip2 === 'kare' && tip1 === 'yastik') ||
		(tip2 === 'daire' && tip1 === 'top') ||
		(tip2 === 'dikdortgen' && tip1 === 'monitor') ||
		(tip2 === 'ucgen' && tip1 === 'cetvel')
	);
}

function tumObjelerEslesti() {
	for (let i = 0; i < gameObjects.length; i++) {
		if (document.getElementById('tahta').children[i].style.display !== 'none') {
			return false;
		}
	}
	for (let i = 0; i < gameObjects2.length; i++) {
		if (document.getElementById('tahta2').children[i].style.display !== 'none') {
			return false;
		}
	}
	return true;
}

function oyunBitti(sure) {
	let kazandinizMesaji = document.getElementById('kazandiniz-mesaji');
	kazandinizMesaji.style.display = 'block';

	let tahta = document.getElementById('tahta');
	tahta.style.display = 'none';

	let tahta2 = document.getElementById('tahta2');
	tahta2.style.display = 'none';

	fetchAndAlert('Bitti', sure);
}

window.onload = function () {
	const zamanlayici = setInterval(() => {
		zamanSayaci++;
	}, 1000);

	for (let r = 0; r < 4; r++) {
		for (let c = 0; c < 1; c++) {
			let parca = document.createElement('img');
			parca.src = '';
			parca.dataset.index = r;
			document.getElementById('tahta').append(parca);
		}
	}

	for (let r = 0; r < 4; r++) {
		for (let c = 0; c < 1; c++) {
			let parca2 = document.createElement('img');
			parca2.src = '';
			parca2.dataset.index = r;
			document.getElementById('tahta2').append(parca2);
		}
	}

	for (let i = 0; i < gameObjects.length; i++) {
		let parca = document.getElementById('tahta').children[i];
		parca.src = gameObjects[i].image;

		parca.addEventListener('click', function () {
			tiklamaKontrol(parca, zamanSayaci);
		});
	}

	for (let i = 0; i < gameObjects2.length; i++) {
		let parca = document.getElementById('tahta2').children[i];
		parca.src = gameObjects2[i].image;

		parca.addEventListener('click', function () {
			tiklamaKontrol(parca, zamanSayaci);
		});
	}
};

function fetchAndAlert(sonuc, sure) {
	const veri = { sonuc, sure };

	fetch('/6zortest3', {
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
