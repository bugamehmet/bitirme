const express = require('express');
const app = express();
const session = require('express-session');
const connection = require('./db')
require('dotenv').config();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(express.static('views'));
app.use('/assets', express.static('assets'));
app.use(
	session({
		secret: 'GIZLI',
		resave: false,
		saveUninitialized: true,
	})
);

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

app.post('/2kolaytest1', (req, res) => {
	res.render('oyunlar/2kolaytest1');
});

app.listen(process.env.PORT, (error) => {
	if (error) {
		console.log('server başlatılırken hata oluştu');
	} else {
		console.log(`server ${process.env.PORT} portunda başlatıldı`);
	}
});
