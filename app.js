const express = require('express');
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

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/anasayfa.html');
});

app.post('/', (req, res) => {
	let yas = req.body.yas
	console.log(yas)
	if(yas>6){
		res.render(`6yas`)
	}
	res.render(`${yas}yas`)
});

app.get('/2yas', (req, res) => {
  res.sendFile(__dirname + '/views/anasayfa.html');
});

app.listen(process.env.PORT, (error) => {
	if (error) {
		console.log('server başlatılırken hata oluştu');
	} else {
		console.log(`server ${process.env.PORT} portunda başlatıldı`);
	}
});
