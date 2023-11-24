// TODO : TEKRAR OYNAMA FONKSİYONU EKLENECEK
const basla = document.getElementById('basla');
basla.addEventListener('click', baslatmaFonk);

let sesDogru = new Audio('/assets/audio/correct.wav')
let sesYanlis = new Audio('/assets/audio/yanlis.mp3')


const resimler = [];
for (let i = 1; i<=3; i++){
	const resim = document.getElementById(`resim${i}`);
	resim.addEventListener('click', ()=> resimClick(i));
	resimler.push(resim);
}

const sesbutton = document.getElementById('ses-button');
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

let x;

function baslatmaFonk(){
	x = Math.floor(Math.random()*3);
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

	fetch('/2kolaytest1', {
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