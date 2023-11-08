
const basla = document.getElementById("basla")
basla.addEventListener("click", myFunction);

const resim1 = document.getElementById("resim1")
resim1.addEventListener("click", myFunction1);

const resim2 = document.getElementById("resim2")
resim2.addEventListener("click", myFunction2);

const resim3 = document.getElementById("resim3")
resim3.addEventListener("click", myFunction3);

const nesneler = [
  {
    isim: "Araba",
    resim: "/assets/images/2kolaytest1/araba.jpg",
  },
  {
    isim: "Helikopter",
    resim: "/assets/images/2kolaytest1/helikopter.jpg",
  },
  {
    isim: "Ayakkabı",
    resim: "/assets/images/2kolaytest1/ayakkabı.jpg",
  },
];
const rastgeleSıralıNesneler = nesneler.sort(() => Math.random() - 0.5);

function myFunction() {
  const resimlerDisplay = document.querySelector(".resimler");
  const resim = document.getElementById("resim")
  const resimDisplay = document.querySelector(".resim")
  resim.src = rastgeleSıralıNesneler.shift().resim;
  resimDisplay.style.display = "flex"
  resimlerDisplay.style.display = "flex"
  basla.style.display = "none"

} 
function myFunction1() {
  alert("Tsa!");
} 
function myFunction2() {
  alert("iki!");
} 
function myFunction3() {
  alert("üç!");
} 