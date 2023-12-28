const basla = document.getElementById('basla');
basla.addEventListener('click', baslatmaFonk);

let sesDogru = new Audio('/assets/audio/correct.wav')
let sesYanlis = new Audio('/assets/audio/wrong.wav')


const resimler = [];
for (let i = 1; i<=4; i++){
	const resim = document.getElementById(`resim${i}`);
	resim.addEventListener('click', ()=> resimClick(i));
	resimler.push(resim);
}

const sesbutton = document.getElementById('ses-button');
sesbutton.addEventListener('click', tekrardinle);

const nesneler = [
	{
		isim: 'Tat almaya yarayan organ',
		xx: '1',
	},
	{
		isim: 'Koklamaya yarayan organ',
		xx: '2',
	},
	{
		isim: 'Görmeye yarayan organ',
		xx: '3',
	},
  {
		isim: 'Duymaya yarayan organ',
		xx: '4',
	}
];

let x;

function baslatmaFonk(){
	x = Math.floor(Math.random()*4);
	const resimlerDisplay = document.querySelector('.resimler');
	ilkses(nesneler[x]);
	resimlerDisplay.style.display = 'flex'
	basla.style.display = 'none'
}

function resimClick(sira){
	const dogruCevap = nesneler[x].xx;
	const tiklanan = nesneler[sira-1].isim;

	if(sira == dogruCevap){
		fetchAndAlert('DOGRU', tiklanan);
		sesDogru.play()
		alert('DOĞRU')
	} else {
		fetchAndAlert('YANLIS', tiklanan);
		sesYanlis.play()
		alert('YANLIŞ')
	}
}

function fetchAndAlert(sonuc, tiklanan){
	const veri = {sonuc, sorulan: nesneler[x].isim, tiklanan}

	fetch('/4zortest3', {
		method : 'POST',
		headers : {'Content-Type' : 'application/json'},
		body : JSON.stringify(veri),
	})
	.then((response) => response.json())
	.catch((error)=> console.log('Hata:', error))
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