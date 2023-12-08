const basla = document.getElementById('basla');
basla.addEventListener('click', baslatmaFonk);

const sesbutton = document.getElementById('ses-button');
sesbutton.addEventListener('click', tekrardinle);

const resimler = document.querySelectorAll('.resimler button');
resimler.forEach((resim, index) => {
	resim.addEventListener('click', () => resimClick(index + 1));
});

let sesDogru = new Audio('/assets/audio/correct.wav')
let sesYanlis = new Audio('/assets/audio/wrong.wav')


const nesneler = [
	{
		isim: 'Horoz',
		resim: '/assets/images/3kolaytest3/horoz.png',
		xx: '1',
    audio : '/assets/audio/3kolaytest3/horoz.wav',
	},
	{
		isim: 'Kedi',
		resim: '/assets/images/3kolaytest3/kedi.png',
		xx: '2',
    audio:'/assets/audio/3kolaytest3/kedi.wav',
	},
	{
		isim: 'Köpek',
		resim: '/assets/images/3kolaytest3/kopek.png',
		xx: '3',
    audio:'/assets/audio/3kolaytest3/kopek.wav',
	},
  {
		isim: 'Kuş',
		resim: '/assets/images/3kolaytest3/kus.png',
		xx: '3',
    audio:'/assets/audio/3kolaytest3/kus.wav',
	},
];
let x;

async function baslatmaFonk() {
	x = Math.floor(Math.random() * 4);
	const resimlerDisplay = document.querySelector('.resimler');
	resimlerDisplay.style.display = 'flex';
	basla.style.display = 'none';
	ilkses();
	setTimeout(()=>{
		let sesx = new Audio(`${nesneler[x].audio}`);
		sesx.play();
	}, 2500)

}

function resimClick(sira) {
	if (sira == nesneler[x].xx) {
		sesDogru.play();
		alert('DOGRU')
		fetchAndAlert('DOGRU', nesneler[x].isim, nesneler[sira - 1].isim);
	} else {
		sesYanlis.play()
		alert('YANLIS')
		fetchAndAlert('YANLIS', nesneler[x].isim, nesneler[sira - 1].isim);
	}
}

function fetchAndAlert(sonuc, sorulan, tiklanan) {
	const veri = { sonuc, sorulan, tiklanan };

	fetch('/3kolaytest3', {
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
