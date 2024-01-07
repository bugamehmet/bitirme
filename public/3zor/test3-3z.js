var ilkSecilen = null;
let zamanSayaci = 0;
let zamanlayici;

var gameObjects = [
	{ type: 'sari-fasulye', image: '/assets/images/3zortest3/sari-fasulye.png' },
	{ type: 'kirmizi-fasulye', image: '/assets/images/3zortest3/kirmizi-fasulye.png' },
	{ type: 'yesil-fasulye', image: '/assets/images/3zortest3/yesil-fasulye.png' },
];
var gameObjects2 = [
	{ type: 'yesil', image: '/assets/images/3zortest3/yesil.png' },
	{ type: 'sari', image: '/assets/images/3zortest3/sari.png' },
	{ type: 'kirmizi', image: '/assets/images/3zortest3/kirmizi.png' },
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
		(tip1 === 'sari-fasulye' && tip2 === 'sari') ||
		(tip1 === 'kirmizi-fasulye' && tip2 === 'kirmizi') ||
		(tip1 === 'yesil-fasulye' && tip2 === 'yesil') ||
		(tip2 === 'sari-fasulye' && tip1 === 'sari') ||
		(tip2 === 'kirmizi-fasulye' && tip1 === 'kirmizi') ||
		(tip2 === 'yesil-fasulye' && tip1 === 'yesil')
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

	for (let r = 0; r < 3; r++) {
		for (let c = 0; c < 1; c++) {
			let parca = document.createElement('img');
			parca.src = '';
			parca.dataset.index = r;
			document.getElementById('tahta').append(parca);
		}
	}

	for (let r = 0; r < 3; r++) {
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

	fetch('/3zortest3', {
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
