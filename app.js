const express = require('express');
const router = require('./routers/routes');
const app = express();
require('dotenv').config();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(express.static('views'), (error) => {
	if (error) {
		throw error && console.log('views klasöründe hata');
	}
});
app.use('/assets', express.static('assets'), (error) => {
	if (error) throw error && console.log('assets klasöründe hata');
});

app.use('/', router);

app.listen(process.env.PORT, (error) => {
	if (error) {
		console.log('server başlatılırken hata oluştu');
	} else {
		console.log(`server ${process.env.PORT} portunda başlatıldı`);
	}
});
