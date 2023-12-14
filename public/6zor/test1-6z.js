const seciciler = {
    tahtaKapsayici: document.querySelector('.tahta-kapsayici'),
    tahta: document.querySelector('.tahta'),
    hareketler: document.querySelector('.hareketler'),
    zamanlayici: document.querySelector('.zamanlayici'),
    basla: document.querySelector('button'),
    kazandiniz: document.querySelector('.kazandiniz')
}

let sesDogru = new Audio('/assets/audio/correct.wav')
let sesYanlis = new Audio('/assets/audio/wrong.wav')

// sunucuya gönderilecek
const durum = {
    oyunBasladi: false,
    cevrilenKartlar: 0,
    toplamCevirmeler: 0,
    toplamZaman: 0,
    dongu: null
}

function fetchAndAlert(toplamCevirmeler, toplamZaman) {
	const veri = {toplamCevirmeler, toplamZaman};

	fetch('/6zortest1', {
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

const ilkses = () => {
    let text = 'Birbiriyle aynı olan meyveleri bulmaya çalışın.';
    let utterance = new SpeechSynthesisUtterance();
    let dil = 'tr-TR';
    utterance.text = text;
    utterance.voice = window.speechSynthesis.getVoices()[dil];
    window.speechSynthesis.speak(utterance);
}

const karistir = dizi => {
    const klonDizi = [...dizi]

    for (let indeks = klonDizi.length - 1; indeks > 0; indeks--) {
        const rastgeleIndeks = Math.floor(Math.random() * (indeks + 1))
        const orijinal = klonDizi[indeks]

        klonDizi[indeks] = klonDizi[rastgeleIndeks]
        klonDizi[rastgeleIndeks] = orijinal
    }

    return klonDizi
}

const rastgeleSec = (dizi, elemanSayisi) => {
    const klonDizi = [...dizi]
    const rastgeleSecimler = []

    for (let indeks = 0; indeks < elemanSayisi; indeks++) {
        const rastgeleIndeks = Math.floor(Math.random() * klonDizi.length)
        
        rastgeleSecimler.push(klonDizi[rastgeleIndeks])
        klonDizi.splice(rastgeleIndeks, 1)
    }

    return rastgeleSecimler
}

const oyunuOlustur = () => {
    const boyut = seciciler.tahta.getAttribute('boyut')

    if (boyut % 2 !== 0) {
        throw new Error("Tahta boyutu 2'nin katı olmalıdır.")
    }

    const emojiler = ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍','🍆', '🥦', '🍆', '🍅', '🍐', '🍑', '🍋', '🧄', '🧅']
    const secimler = rastgeleSec(emojiler, (boyut * boyut) / 2) 
    const elemanlar = karistir([...secimler, ...secimler])
    const kartlar = `
        <div class="tahta" style="grid-template-columns: repeat(${boyut}, auto)">
            ${elemanlar.map(eleman => `
                <div class="kart">
                    <div class="kart-on"></div>
                    <div class="kart-arka">${eleman}</div>
                </div>
            `).join('')}
       </div>
    `
    
    const analizci = new DOMParser().parseFromString(kartlar, 'text/html')

    seciciler.tahta.replaceWith(analizci.querySelector('.tahta'))
}

const oyunuBaslat = () => {
    //ilkses()
    durum.oyunBasladi = true
    seciciler.basla.classList.add('devre-disi')

    durum.dongu = setInterval(() => {
        durum.toplamZaman++

        seciciler.hareketler.innerText = `${durum.toplamCevirmeler} hareket`
        seciciler.zamanlayici.innerText = `zaman: ${durum.toplamZaman} saniye`
    }, 1000)
}

const kartlariGeriCevir = () => {
    document.querySelectorAll('.kart:not(.eslesmis)').forEach(kart => {
        kart.classList.remove('cevrilmis')
    })

    durum.cevrilenKartlar = 0
}

// OYUNU BİTİRME
const kartiCevir = kart => {
    durum.cevrilenKartlar++
    durum.toplamCevirmeler++

    if (!durum.oyunBasladi) {
        oyunuBaslat()
    }

    if (durum.cevrilenKartlar <= 2) {
        kart.classList.add('cevrilmis')
        
    }

    if (durum.cevrilenKartlar === 2) {
        const cevrilmisKartlar = document.querySelectorAll('.cevrilmis:not(.eslesmis)')
        if ( cevrilmisKartlar[0].innerText != cevrilmisKartlar[1].innerText){
            sesYanlis.play()
        }
        if (cevrilmisKartlar[0].innerText === cevrilmisKartlar[1].innerText) {
            sesDogru.play()
            cevrilmisKartlar[0].classList.add('eslesmis')
            cevrilmisKartlar[1].classList.add('eslesmis')
        }
        
        setTimeout(() => {
            kartlariGeriCevir()
        }, 1000)
    }

    if (!document.querySelectorAll('.kart:not(.cevrilmis)').length) {
        setTimeout(() => {
            seciciler.tahtaKapsayici.classList.add('cevrilmis')
            seciciler.kazandiniz.innerHTML = `
                <span class="kazandiniz-yazi">
                    Kazandınız!<br />
                     <span class="vurgula">${durum.toplamCevirmeler}</span> hareket<br />
                     <span class="vurgula">${durum.toplamZaman}</span> saniye
                </span>
            `
            clearInterval(durum.dongu)
        }, 1000)
        fetchAndAlert(durum.toplamCevirmeler, durum.toplamZaman)
    }
}

const olayDinleyicileriniEkle = () => {
    document.addEventListener('click', event => {
        const etkinlikHedefi = event.target
        const etkinlikUstEleman = etkinlikHedefi.parentElement

        if (etkinlikHedefi.className.includes('kart') && !etkinlikUstEleman.className.includes('cevrilmis')) {
            kartiCevir(etkinlikUstEleman)
        } else if (etkinlikHedefi.nodeName === 'BUTTON' && !etkinlikHedefi.className.includes('devre-disi')) {
            oyunuBaslat()
        }
    })
}

oyunuOlustur()
olayDinleyicileriniEkle()
