const express = require('express');
const connection = require('../db');
const path = require('path');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const {
	yas2kararagaci,
	yas3kararagaci,
	yas4kararagaci,
	yas5kararagaci,
} = require('../utils/kararAgaci');

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../views/anasayfa.html'));
});

router.post('/', (req, res) => {
	let yas = req.body.yas;
	let memleket = req.body.memleket;
	let gelir = req.body.gelir;
	let var_yok = req.body.var_yok;
	const kullaniciId = uuidv4(); // id oluşturna

	if (yas > 6) {
		req.session.uuid = kullaniciId;
		req.session.yas = 6;
		req.session.memleket = memleket;
		req.session.gelir = gelir;
		req.session.var_yok = var_yok;
		(req.session.test1_6k = false),
			(req.session.test2_6k = false),
			(req.session.test3_6k = false),
			(req.session.test1_6z = false),
			(req.session.test2_6z = false),
			(req.session.test3_6z = false);
	} else {
		req.session.uuid = kullaniciId;
		req.session.yas = yas;
		req.session.memleket = memleket;
		req.session.gelir = gelir;
		req.session.var_yok = var_yok;
		if (yas == 2) {
			(req.session.test1_2k = false),
				(req.session.test2_2k = false),
				(req.session.test3_2k = false),
				(req.session.test4_2k = false),
				(req.session.test1_2z = false),
				(req.session.test2_2z = false),
				(req.session.test3_2z = false);
		} else if (yas == 3) {
			(req.session.test1_3k = false),
				(req.session.test2_3k = false),
				(req.session.test3_3k = false),
				(req.session.test4_3k = false),
				(req.session.test1_3z = false),
				(req.session.test2_3z = false),
				(req.session.test3_3z = false);
		} else if (yas == 4) {
			(req.session.test1_4k = false),
				(req.session.test2_4k = false),
				(req.session.test3_4k = false),
				(req.session.test4_4k = false),
				(req.session.test1_4z = false),
				(req.session.test2_4z = false),
				(req.session.test3_4z = false);
		} else if (yas == 5) {
			(req.session.test1_5k = false),
				(req.session.test2_5k = false),
				(req.session.test3_5k = false),
				(req.session.test1_5z = false),
				(req.session.test2_5z = false),
				(req.session.test3_5z = false);
		} else if (yas == 6) {
			(req.session.test1_6k = false),
				(req.session.test2_6k = false),
				(req.session.test3_6k = false),
				(req.session.test1_6z = false),
				(req.session.test2_6z = false),
				(req.session.test3_6z = false);
		}
	}
	res.redirect(`/${yas}yas`);
	res.end();
});

router.get(`/:yas`, (req, res) => {
	let yas = req.session.yas;
	res.sendFile(path.join(__dirname, `../views/${yas}yas.html`));
});
router.post(`/testler`, (req, res) => {
	let yas = req.session.yas;
	res.sendFile(path.join(__dirname, `../views/${yas}yas.html`));
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

router.post('/hesapla2yas', (req, res) => {
	let yas = req.session.yas;
	let t1 = req.session.test1_2k;
	let t2 = req.session.test2_2k;
	let t3 = req.session.test3_2k;
	let t4 = req.session.test4_2k;
	let t5 = req.session.test1_2z;
	let t6 = req.session.test2_2z;
	let t7 = req.session.test3_2z;
	let result = yas2kararagaci(t1, t2, t3, t4, t5, t6, t7);
	console.log(result);
	let sorgu = 'INSERT INTO 2yaspuan (uuid, puan) VALUES (?, ?)';
	let parametreler = [req.session.uuid, result];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('HESAPLANAN PUAN VERİLERİ YÜKLENİRKEN HATA OLUŞTU', err);
			res.sendFile(path.join(__dirname, `../views/${yas}yas.html`));
		} else {
			console.log('PUANLAR KAYDEDİLDİ');
			res.sendFile(path.join(__dirname, `../views/${yas}yas.html`));
		}
	});
	req.session.test1_2k = false;
	req.session.test2_2k = false;
	req.session.test3_2k = false;
	req.session.test4_2k = false;
	req.session.test1_2z = false;
	req.session.test2_2z = false;
	req.session.test3_2z = false;
});

router.post('/hesapla3yas', (req, res) => {
	let yas = req.session.yas;
	let t1 = req.session.test1_3k;
	let t2 = req.session.test2_3k;
	let t3 = req.session.test3_3k;
	let t4 = req.session.test4_3k;
	let t5 = req.session.test1_3z;
	let t6 = req.session.test2_3z;
	let t7 = req.session.test3_3z;
	let result = yas3kararagaci(t1, t2, t3, t4, t5, t6, t7);
	console.log(result);
	let sorgu = 'INSERT INTO 3yaspuan (uuid, puan) VALUES (?, ?)';
	let parametreler = [req.session.uuid, result];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('HESAPLANAN PUAN VERİLERİ YÜKLENİRKEN HATA OLUŞTU', err);
			res.sendFile(path.join(__dirname, `../views/${yas}yas.html`));
		} else {
			console.log('PUANLAR KAYDEDİLDİ');
			res.sendFile(path.join(__dirname, `../views/${yas}yas.html`));
		}
	});
	req.session.test1_3k = false;
	req.session.test2_3k = false;
	req.session.test3_3k = false;
	req.session.test4_3k = false;
	req.session.test1_3z = false;
	req.session.test2_3z = false;
	req.session.test3_3z = false;
});

router.post('/hesapla4yas', (req, res) => {
	let yas = req.session.yas;
	let t1 = req.session.test1_4k;
	let t2 = req.session.test2_4k;
	let t3 = req.session.test3_4k;
	let t4 = req.session.test4_4k;
	let t5 = req.session.test1_4z;
	let t6 = req.session.test2_4z;
	let t7 = req.session.test3_4z;
	let result = yas4kararagaci(t1, t2, t3, t4, t5, t6, t7);
	console.log(result);
	let sorgu = 'INSERT INTO 4yaspuan (uuid, puan) VALUES (?, ?)';
	let parametreler = [req.session.uuid, result];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('HESAPLANAN PUAN VERİLERİ YÜKLENİRKEN HATA OLUŞTU', err);
			res.sendFile(path.join(__dirname, `../views/${yas}yas.html`));
		} else {
			console.log('PUANLAR KAYDEDİLDİ');
			res.sendFile(path.join(__dirname, `../views/${yas}yas.html`));
		}
	});
	req.session.test1_4k = false;
	req.session.test2_4k = false;
	req.session.test3_4k = false;
	req.session.test4_4k = false;
	req.session.test1_4z = false;
	req.session.test2_4z = false;
	req.session.test3_4z = false;
});

router.post('/hesapla5yas', (req, res) => {
	let yas = req.session.yas;
	let t1 = req.session.test1_5k;
	let t2 = req.session.test2_5k;
	let t3 = req.session.test3_5k;
	let t4 = req.session.test1_5z;
	let t5 = req.session.test2_5z;
	let t6 = req.session.test3_5z;
	let result = yas5kararagaci(t1, t2, t3, t4, t5, t6);
	console.log(result);
	let sorgu = 'INSERT INTO 5yaspuan (uuid, puan) VALUES (?, ?)';
	let parametreler = [req.session.uuid, result];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('HESAPLANAN PUAN VERİLERİ YÜKLENİRKEN HATA OLUŞTU', err);
			res.sendFile(path.join(__dirname, `../views/${yas}yas.html`));
		} else {
			console.log('PUANLAR KAYDEDİLDİ');
			res.sendFile(path.join(__dirname, `../views/${yas}yas.html`));
		}
	});
	req.session.test1_5k = false;
	req.session.test2_5k = false;
	req.session.test3_5k = false;
	req.session.test1_5z = false;
	req.session.test2_5z = false;
	req.session.test3_5z = false;
});

// -------- 2 YAS TESTLERİ
router.post('/2kolaytest1', (req, res) => {
	const veri = req.body;
	console.log(req.body);
	if (veri.sonuc == 'DOGRU') {
		req.session.test1_2k = true;
	} else {
		req.session.test1_2k = false;
	}
	console.log(req.session.test1_2k);
	let sorgu =
		'INSERT INTO 2yaskolaytest1 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
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
	if (veri.sonuc == 'DOGRU') {
		req.session.test2_2k = true;
	} else {
		req.session.test2_2k = false;
	}
	let sorgu =
		'INSERT INTO 2yaskolaytest2 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.hedefRenk,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/2kolaytest2');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/2kolaytest2');
		}
	});
});
router.post('/2kolaytest3', (req, res) => {
	const veri = req.body;
	console.log(veri);
	if (veri.sonuc == 'DOGRU') {
		req.session.test3_2k = true;
	} else {
		req.session.test3_2k = false;
	}
	let sorgu =
		'INSERT INTO 2yaskolaytest3 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/2kolaytest3');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/2kolaytest3');
		}
	});
});
router.post('/2kolaytest4', (req, res) => {
	let veri = req.body;
	console.log(veri);
	if (veri.sonuc == 'DOGRU') {
		req.session.test4_2k = true;
	} else {
		req.session.test4_2k = false;
	}
	let sorgu =
		'INSERT INTO 2yaskolaytest4 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/2kolaytest4');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/2kolaytest4');
		}
	});
});
router.post('/2zortest1', (req, res) => {
	const veri = req.body;
	console.log(veri);
	if (veri.sonuc == 'DOGRU') {
		req.session.test1_2z = true;
	} else {
		req.session.test1_2z = false;
	}
	let sorgu =
		'INSERT INTO 2yaszortest1 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
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
	if (veri.sonuc == 'DOGRU') {
		req.session.test2_2z = true;
	} else {
		req.session.test2_2z = false;
	}

	let sorgu =
		'INSERT INTO 2yaszortest2 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/2zortest2');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/2zortest2');
		}
	});
});
router.post('/2zortest3', (req, res) => {
	let veri = req.body;
	console.log(veri);
	if (veri.sonuc == 'DOGRU') {
		req.session.test3_2z = true;
	} else {
		req.session.test3_2z = false;
	}

	let sorgu =
		'INSERT INTO 2yaszortest3 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/2zortest3');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/2zortest3');
		}
	});
});
// ------ 2 YAS TESTLERİ SON

// ------- 3 YAS TESTLERİ BASLANGIC
router.post('/3kolaytest1', (req, res) => {
	const veri = req.body;
	console.log(veri);
	if (veri.sonuc == 'DOGRU') {
		req.session.test1_3k = true;
	} else {
		req.session.test1_3k = false;
	}
	console.log(req.session.test1_3k);
	let sorgu =
		'INSERT INTO 3yaskolaytest1 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
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
	if (veri.sonuc == 'DOGRU') {
		req.session.test2_3k = true;
	} else {
		req.session.test2_3k = false;
	}
	console.log(req.session.test2_3k);
	let sorgu =
		'INSERT INTO 3yaskolaytest2 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/3kolaytest2');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/3kolaytest2');
		}
	});
});
router.post('/3kolaytest3', (req, res) => {
	let veri = req.body;
	console.log(veri);
	if (veri.sonuc == 'DOGRU') {
		req.session.test3_3k = true;
	} else {
		req.session.test3_3k = false;
	}
	console.log(req.session.test3_3k);
	let sorgu =
		'INSERT INTO 3yaskolaytest3 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/3kolaytest3');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/3kolaytest3');
		}
	});
});
router.post('/3kolaytest4', (req, res) => {
	let veri = req.body;
	console.log(veri);
	if (veri.sonuc == 'DOGRU') {
		req.session.test4_3k = true;
	} else {
		req.session.test4_3k = false;
	}
	console.log(req.session.test4_3k);
	let sorgu =
		'INSERT INTO 3yaskolaytest4 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/3kolaytest4');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/3kolaytest4');
		}
	});
});
router.post('/3zortest1', (req, res) => {
	let veri = req.body;
	console.log(veri);
	if (veri.sonuc == 'DOGRU') {
		req.session.test1_3z = true;
	} else {
		req.session.test1_3z = false;
	}
	console.log(req.session.test1_3z);
	let sorgu =
		'INSERT INTO 3yaszortest1 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/3zortest1');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/3zortest1');
		}
	});
});
router.post('/3zortest2', (req, res) => {
	let veri = req.body;
	console.log(veri);
	if (veri.sonuc == 'DOGRU') {
		req.session.test2_3z = true;
	} else {
		req.session.test2_3z = false;
	}
	console.log(req.session.test2_3z);
	let sorgu =
		'INSERT INTO 3yaszortest2 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/3zortest2');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/3zortest2');
		}
	});
});
router.post('/3zortest3', (req, res) => {
	let veri = req.body;
	console.log(veri);
	if (veri.sonuc == 'DOGRU') {
		req.session.test3_3z = true;
	} else {
		req.session.test3_3z = false;
	}
	console.log(req.session.test3_3z);
	let sorgu =
		'INSERT INTO 3yaszortest3 (uuid, yas, memleket, gelir, zih_rah, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/3zortest3');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/3zortest3');
		}
	});
});
// ------- 3 YAS TESTLERİ SON

// -------- 4 YAS TESTLER BASLANGIC
router.post('/4kolaytest1', (req, res) => {
	const veri = req.body;
	console.log(veri);
	if (veri.sonuc == 'DOGRU') {
		req.session.test1_4k = true;
	} else {
		req.session.test1_4k = false;
	}
	console.log(req.session.test1_4k);
	let sorgu =
		'INSERT INTO 4yaskolaytest1 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/4kolaytest1');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/4kolaytest1');
		}
	});
});
router.post('/4kolaytest2', (req, res) => {
	let veri = req.body;
	console.log(veri);
	if (veri.sonuc == 'DOGRU') {
		req.session.test2_4k = true;
	} else {
		req.session.test2_4k = false;
	}
	console.log(req.session.test2_4k);
	let sorgu =
		'INSERT INTO 4yaskolaytest2 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/4kolaytest2');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/4kolaytest2');
		}
	});
});
router.post('/4kolaytest3', (req, res) => {
	let veri = req.body;
	console.log(veri);
	if (veri.sonuc == 'DOGRU') {
		req.session.test3_4k = true;
	} else {
		req.session.test3_4k = false;
	}
	console.log(req.session.test3_4k);
	let sorgu =
		'INSERT INTO 4yaskolaytest3 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/4kolaytest3');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/4kolaytest3');
		}
	});
});
router.post('/4kolaytest4', (req, res) => {
	let veri = req.body;
	console.log(veri);
	if (veri.sonuc == 'DOGRU') {
		req.session.test4_4k = true;
	} else {
		req.session.test4_4k = false;
	}
	console.log(req.session.test4_4k);
	let sorgu =
		'INSERT INTO 4yaskolaytest4 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/4kolaytest4');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/4kolaytest4');
		}
	});
});
router.post('/4zortest1', (req, res) => {
	let veri = req.body;
	console.log(veri);
	if (veri.sonuc == 'DOGRU') {
		req.session.test1_4z = true;
	} else {
		req.session.test1_4z = false;
	}
	console.log(req.session.test1_4z);
	let sorgu =
		'INSERT INTO 4yaszortest1 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/4zortest1');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/4zortest1');
		}
	});
});
router.post('/4zortest2', (req, res) => {
	// TODO: true-false ayarlama mantığı geliştirilmeli
	veri = req.body;
	console.log(veri);
	req.session.test2_4z = true;

	console.log(req.session.test2_4z);
	let sorgu =
		'INSERT INTO 4yaszortest2 (uuid, yas, memleket, gelir, zih_rah, hareketler, sure) VALUES (?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.hareketler,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/4zortest2');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/4zortest2');
		}
	});
});
router.post('/4zortest3', (req, res) => {
	veri = req.body;
	console.log(veri);
	if (veri.sonuc == 'DOGRU') {
		req.session.test3_4z = true;
	} else {
		req.session.test3_4z = false;
	}
	console.log(req.session.test3_4z);
	let sorgu =
		'INSERT INTO 4yaszortest3 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/4zortest3');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/4zortest3');
		}
	});
});
// ---------- 4 YAS TESTLER SON

// ---------- 5 YAS TESTLER BASLANGIC
router.post('/5kolaytest1', (req, res) => {
	let veri = req.body;
	console.log(veri);
	if (veri.sonuc == 'DOGRU') {
		req.session.test1_5k = true;
	} else {
		req.session.test1_5k = false;
	}
	console.log(req.session.test1_5k);
	let sorgu =
		'INSERT INTO 5yaskolaytest1 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/5kolaytest1');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/5kolaytest1');
		}
	});
});
router.post('/5kolaytest2', (req, res) => {
	veri = req.body;
	console.log(veri);

	req.session.test2_5k = true;

	console.log(req.session.test2_5k);
	let sorgu =
		'INSERT INTO 5yaskolaytest2 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/5kolaytest2');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/5kolaytest2');
		}
	});
});
router.post('/5kolaytest3', (req, res) => {
	veri = req.body;
	console.log(veri);
	if (veri.sonuc == 'DOGRU') {
		req.session.test3_5k = true;
	} else {
		req.session.test3_5k = false;
	}
	console.log(req.session.test3_5k);
	let sorgu =
		'INSERT INTO 5yaskolaytest3 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/5kolaytest3');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/5kolaytest3');
		}
	});
});
router.post('/5zortest1', (req, res) => {
	veri = req.body;
	console.log(veri);
	if (veri.sonuc == 'DOGRU') {
		req.session.test1_5z = true;
	} else {
		req.session.test1_5z = false;
	}
	console.log(req.session.test1_5z);
	let sorgu =
		'INSERT INTO 5yaszortest1 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/5zortest1');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/5zortest1');
		}
	});
});
router.post('/5zortest2', (req, res) => {
	veri = req.body;
	console.log(veri);
	if (veri.sonuc == 'DOGRU') {
		req.session.test2_5z = true;
	} else {
		req.session.test2_5z = false;
	}
	console.log(req.session.test2_5z);
	let sorgu =
		'INSERT INTO 5yaszortest2 (uuid, yas, memleket, gelir, zih_rah, hedef, secilen, sonuc, sure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.sorulan,
		veri.tiklanan,
		veri.sonuc,
		veri.sure,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/5zortest2');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/5zortest2');
		}
	});
});
router.post('/5zortest3', (req, res) => {
	veri = req.body;
	console.log(veri);
	req.session.test3_5z = true;
	console.log(req.session.test3_5z);
	let sorgu =
		'INSERT INTO 5yaszortest3 (uuid, yas, memleket, gelir, zih_rah, cevirme, sure) VALUES (?, ?, ?, ?, ?, ?, ?)';
	let parametreler = [
		req.session.uuid,
		req.session.yas,
		req.session.memleket,
		req.session.gelir,
		req.session.var_yok,
		veri.toplamCevirmeler,
		veri.toplamZaman,
	];
	connection.query(sorgu, parametreler, (err, results) => {
		if (err) {
			console.log('veriler yüklenirken hata oluştur', err);
			res.render('oyunlar/5zortest3');
		} else {
			console.log('veriler kaydedildi.');
			res.render('oyunlar/5zortest3');
		}
	});
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
