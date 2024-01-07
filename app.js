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

const router = require('./routers/routes');

app.use('/', router);


app.listen(process.env.PORT, (error) => {
	if (error) {
		console.log('server başlatılırken hata oluştu');
	} else {
		console.log(`server ${process.env.PORT} portunda başlatıldı`);
	}
});
