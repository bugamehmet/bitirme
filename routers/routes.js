const express = require('express');
const connection = require('../db');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname , '../views/anasayfa.html'));
});

router.post('/', (req, res) => {
	let yas = req.body.yas;
	let memleket = req.body.memleket;
	let gelir = req.body.gelir;
	let var_yok = req.body.var_yok;

	if (yas > 6) {
		req.session.yas = 6;
		req.session.memleket = memleket;
		req.session.gelir = gelir;
		req.session.var_yok = var_yok;
	} else {
		req.session.yas = yas;
		req.session.memleket = memleket;
		req.session.gelir = gelir;
		req.session.var_yok = var_yok;
	}
	console.log(yas);
	console.log(memleket);
	console.log(gelir);
	console.log(var_yok);
	res.redirect(`/${yas}yas`);
	res.end();
});

router.get(`/:yas`, (req, res) => {
	let yas = req.session.yas;
	res.sendFile(path.join(__dirname , `../views/${yas}yas.html`));
});
router.post(`/testler`, (req, res) => {
	let yas = req.session.yas;
	res.sendFile(path.join(__dirname , `../views/${yas}yas.html`));
});
router.post('/kolay', (req, res) => {
	let yas = req.session.yas;
	res.render(`testler/${yas}yaskolay`);
});
router.post('/zor', (req, res) => {
	let yas = req.session.yas;
	res.render(`testler/${yas}yaszor`);
});
router.post('/kolaytest/:id', (req, res) => {
	let yas = req.session.yas;
	let sayi = req.params.id;
	res.render(`oyunlar/${yas}kolaytest${sayi}`);
});
router.post('/zortest/:id', (req, res) => {
	let yas = req.session.yas;
	let sayi = req.params.id;
	res.render(`oyunlar/${yas}zortest${sayi}`);
});

// -------- 2 YAS TESTLERİ
router.post('/2kolaytest1', (req, res) => {
	const veri = req.body;
	console.log(req.body);
	//console.log('YAS:', req.session.yas);
	//console.log('Alınan veri:', veri.sorulan);
	//console.log('Alınan veri:', veri.tiklanan);
	//console.log('Alınan veri:', veri.sonuc);
	let sorgu =
		'INSERT INTO test1 (yas, memleket, gelir, zih_rah, asilnesne, tiknesne, sonuc) VALUES (?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/2kolaytest1');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/2kolaytest1');
		}
	});
});
router.post('/2kolaytest2', (req, res) => {
	const veri = req.body;
	console.log(veri);
	res.render('oyunlar/2kolaytest2');
});
router.post('/2kolaytest3', (req, res) => {
	const veri = req.body;
	console.log(veri);
	res.render('oyunlar/2kolaytest3');
});
router.post('/2kolaytest4', (req, res) => {
	let veri = req.body;
	console.log(veri);
	res.render('oyunlar/2kolaytest4');
});
router.post('/2zortest1', (req, res) => {
	const veri = req.body;
	console.log(veri);
	//console.log('YAS:', req.session.yas);
	//console.log('Alınan veri:', veri.sorulan);
	//console.log('Alınan veri:', veri.tiklanan);
	//console.log('Alınan veri:', veri.sonuc);
	let sorgu = 'INSERT INTO test1 (yas, asilnesne, tiknesne, sonuc) VALUES (?, ?, ?, ?)';
	let parametreler = [req.session.yas, veri.sorulan, veri.tiklanan, veri.sonuc];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/2zortest1');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/2zortest1');
		}
	});
});
router.post('/2zortest2', (req, res) => {
	const veri = req.body;
	console.log(veri);
	res.render('oyunlar/2kolaytest2');
});
router.post('/2zortest3', (req, res) => {
	let veri = req.body;
	console.log(veri);
	res.render('oyunlar/2zortest3');
});
// ------ 2 YAS TESTLERİ SON

// ------- 3 YAS TESTLERİ BASLANGIC
router.post('/3kolaytest1', (req, res) => {
	const veri = req.body;
	console.log(veri);
	//console.log('YAS:', req.session.yas);
	//console.log('Alınan veri:', veri.sorulan);
	//console.log('Alınan veri:', veri.tiklanan);
	//console.log('Alınan veri:', veri.sonuc);
	let sorgu = 'INSERT INTO test1 (yas, asilnesne, tiknesne, sonuc) VALUES (?, ?, ?, ?)';
	let parametreler = [req.session.yas, veri.sorulan, veri.tiklanan, veri.sonuc];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/3kolaytest1');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/3kolaytest1');
		}
	});
});
router.post('/3kolaytest2', (req, res) => {
	let veri = req.body;
	console.log(veri);
	res.render('oyunlar/3kolaytest2');
});
router.post('/3kolaytest3', (req, res) => {
	let veri = req.body;
	console.log(veri);
	res.render('oyunlar/3kolaytest3');
});
router.post('/3kolaytest4', (req, res) => {
	let veri = req.body;
	console.log(veri);
	res.render('oyunlar/3kolaytest4');
});
router.post('/3zortest1', (req, res) => {
	let veri = req.body;
	console.log(veri);
	res.render('oyunlar/3zortest1');
});
router.post('/3zortest2', (req, res) => {
	let veri = req.body;
	console.log(veri);
	res.render('oyunlar/3zortest2');
});
router.post('/3zortest3', (req, res) => {
	let veri = req.body;
	console.log(veri);
	res.render('oyunlar/3zortest3');
});
// ------- 3 YAS TESTLERİ SON

// -------- 4 YAS TESTLER BASLANGIC
router.post('/4kolaytest1', (req, res) => {
	const veri = req.body;
	console.log(veri);
	//console.log('YAS:', req.session.yas);
	//console.log('Alınan veri:', veri.sorulan);
	//console.log('Alınan veri:', veri.tiklanan);
	//console.log('Alınan veri:', veri.sonuc);
	let sorgu = 'INSERT INTO test1 (yas, asilnesne, tiknesne, sonuc) VALUES (?, ?, ?, ?)';
	let parametreler = [req.session.yas, veri.sorulan, veri.tiklanan, veri.sonuc];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/3kolaytest1');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/3kolaytest1');
		}
	});
});
router.post('/4kolaytest2', (req, res) => {
	let veri = req.body;
	console.log(veri);
	res.render('oyunlar/4kolaytest2');
});
router.post('/4kolaytest3', (req, res) => {
	let veri = req.body;
	console.log(veri);
	res.render('oyunlar/4kolaytest3');
});
router.post('/4kolaytest4', (req, res) => {
	let veri = req.body;
	console.log(veri);
	res.render('oyunlar/4kolaytest4');
});
router.post('/4zortest1', (req, res) => {
	let veri = req.body;
	console.log(veri);
	res.render('oyunlar/4zortest1');
});
router.post('/4zortest2', (req, res) => {
	veri = req.body;
	console.log(veri);
	res.render('oyunlar/4zortest2');
});
router.post('/4zortest3', (req, res) => {
	veri = req.body;
	console.log(veri);
	res.render('oyunlar/4zortest3');
});
// ---------- 4 YAS TESTLER SON

// ---------- 5 YAS TESTLER BASLANGIC
router.post('/5kolaytest1', (req, res) => {
	let veri = req.body;
	console.log(veri);
	res.render('oyunlar/5kolaytest1');
});
router.post('/5kolaytest2', (req, res) => {
	veri = req.body;
	console.log(veri);
	res.render('oyunlar/5kolaytest2');
});
router.post('/5kolaytest3', (req, res) => {
	veri = req.body;
	console.log(veri);
	res.render('oyunlar/5kolaytest2');
});
router.post('/5zortest1', (req, res) => {
	veri = req.body;
	console.log(veri);
	res.render('oyunlar/5zortest1');
});
router.post('/5zortest2', (req, res) => {
	veri = req.body;
	console.log(veri);
	res.render('oyunlar/5zortest2');
});
router.post('/5zortest3', (req, res) => {
	veri = req.body;
	console.log(veri);
	res.render('oyunlar/5zortest3');
});
// ---------- 5 YAS TESTLER SON

// ---------- 6 YAS TESTLER BASLANGIC
router.post('/6kolaytest1', (req, res) => {
	veri = req.body;
	console.log(veri);
	res.render('oyunlar/6kolaytest1');
});
router.post('/6kolaytest2', (req, res) => {
	veri = req.body;
	console.log(veri);
	res.render('oyunlar/6kolaytest2');
});
router.post('/6kolaytest3', (req, res) => {
	veri = req.body;
	console.log(veri);
	res.render('oyunlar/6kolaytest3');
});
router.post('/6zortest1', (req, res) => {
	veri = req.body;
	console.log(veri);
	res.render('oyunlar/6zortest1');
});
router.post('/6zortest2', (req, res) => {
	veri = req.body;
	console.log(veri);
	res.render('oyunlar/6zortest2');
});
router.post('/6zortest3', (req, res) => {
	veri = req.body;
	console.log(veri);
	res.render('oyunlar/6zortest3');
});
// ---------- 6		  YAS TESTLER SON

module.exports = router;
