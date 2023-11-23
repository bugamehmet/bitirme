const express = require('express');
const app = express();
const session = require('express-session');
const connection = require('./db');
require('dotenv').config();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('views'));
app.use('/assets', express.static('assets'));
app.use(
	session({
		secret: 'GIZLI',
		resave: false,
		saveUninitialized: true,
	})
);
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/anasayfa.html');
});
app.post('/', (req, res) => {
	let yas = req.body.yas;
	req.session.yas = yas;
	console.log(yas);
	if (yas > 6) {
		res.redirect('/6yas');
	} else {
		res.redirect(`/${yas}yas`);
	}
	res.end();
});
app.get(`/:yas`, (req, res) => {
	let yas = req.session.yas;
	res.sendFile(__dirname + `/views/${yas}yas.html`);
});
app.get('/6yas', (req, res) => {
	res.sendFile(__dirname + '/views/6yas.html');
});
app.post('/kolay', (req, res) => {
	let yas = req.session.yas;
	res.render(`testler/${yas}yaskolay`);
});
app.post('/zor', (req, res) => {
	let yas = req.session.yas;
	res.render(`testler/${yas}yaszor`);
});

app.post('/kolaytest/:id', (req, res) => {
	let yas = req.session.yas;
	let sayi = req.params.id;
	res.render(`oyunlar/${yas}kolaytest${sayi}`);
});
app.post('/zortest/:id', (req, res) => {
	let yas = req.session.yas;
	let sayi = req.params.id;
	res.render(`oyunlar/${yas}zortest${sayi}`);
});

// TODO : RENK ESLEME(2Z-3KZ-4KZ) VERİ TABANI İŞLEMLERİ

// -------- 2 YAS TESTLERİ
app.post('/2kolaytest1', (req, res) => {
	const veri = req.body;
	//console.log('YAS:', req.session.yas);
	//console.log('Alınan veri:', veri.sorulan);
	//console.log('Alınan veri:', veri.tiklanan);
	//console.log('Alınan veri:', veri.sonuc);
	let sorgu = 'INSERT INTO test1 (yas, asilnesne, tiknesne, sonuc) VALUES (?, ?, ?, ?)';
	let parametreler = [req.session.yas, veri.sorulan, veri.tiklanan, veri.sonuc];
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
app.post('/2kolaytest2', (req, res) => {
	const veri = req.body;
	console.log(veri);
	res.render('oyunlar/2kolaytest2');
});
app.post('/2zortest1', (req, res) => {
	const veri = req.body;
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
app.post('/2yaszortest2', (req, res) => {
	const veri = req.body;
	console.log(veri);
	res.render('oyunlar/2kolaytest2');
});
// ------ 2 YAS TESTLERİ SON

// ------- 3 YAS TESTLERİ BASLANGIC
app.post('/3kolaytest1', (req, res) => {
	const veri = req.body;
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
// ------- 3 YAS TESTLERİ SON

// -------- 4 YAS TESTLER BASLANGIC
app.post('/kolaytest1', (req, res) => {
	const veri = req.body;
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
// ---------- 4 YAS TESTLER SON

app.listen(process.env.PORT, (error) => {
	if (error) {
		console.log('server başlatılırken hata oluştu');
	} else {
		console.log(`server ${process.env.PORT} portunda başlatıldı`);
	}
});
