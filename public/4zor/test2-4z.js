var satirSayisi = 3;
var sutunSayisi = 3;

var simdikiParca;
var digerParca;

var hareketSayisi = 0;

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

	for (let r = 0; r < satirSayisi; r++) {
		for (let c = 0; c < sutunSayisi; c++) {
			let parca = document.createElement('img');
			parca.src = '/assets/images/4zortest2/' + parcaListesi.pop() + '.jpg';

			parca.addEventListener('dragstart', surukleBaslat);
			parca.addEventListener('dragover', surukleUzerinde);
			parca.addEventListener('dragenter', surukleGir);
			parca.addEventListener('dragleave', surukleCik);
			parca.addEventListener('drop', surukleBirak);
			parca.addEventListener('dragend', surukleBitir);

			document.getElementById('tahta').append(parca);
		}
	}
};

function fetchAndAlert(hareketler) {
	const veri = {hareketler};

	fetch('/6zortest2', {
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
    .then((sonuc) => {
        alert(sonuc);
    })
    .catch((error) => {
        console.log('HATA', error);
    });
}

function tamamlandiKontrol(hareket) {
	let tahta = document.getElementById('tahta');
	let puzzleParcalari = tahta.getElementsByTagName('img');

	let dogruParcaAdlari = [];
	for (let i = 1; i <= satirSayisi * sutunSayisi; i++) {
		dogruParcaAdlari.push(i.toString() + '.jpg');
	}

	//console.log(dogruParcaAdlari);

	let simdikiParcaAdlari = [];
	for (let parca of puzzleParcalari) {
		simdikiParcaAdlari.push(parca.getAttribute('src').split('/').pop());
	}
	//console.log(simdikiParcaAdlari);

	if (JSON.stringify(simdikiParcaAdlari) === JSON.stringify(dogruParcaAdlari)) {
    fetchAndAlert(hareket)
		alert('Puzzle tamamlandı! Oyun bitti.');
	}
}

function surukleBaslat() {
	simdikiParca = this;
}

function surukleUzerinde(e) {
	e.preventDefault();
}

function surukleGir(e) {
	e.preventDefault();
}

function surukleCik() {}

function surukleBirak() {
	digerParca = this;
}

function surukleBitir() {
	if (simdikiParca.src.includes('blank')) {
		return;
	}
	let simdikiResim = simdikiParca.src;
	let digerResim = digerParca.src;
	simdikiParca.src = digerResim;
	digerParca.src = simdikiResim;

	hareketSayisi += 1;
	document.getElementById('hareketler').innerText = hareketSayisi;

	tamamlandiKontrol(hareketSayisi);
}
