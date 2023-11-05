const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('anasayfa');
});

router.post('/', (req, res) => {
	let x = req.body.gelir
	let yas = req.body.yas
	console.log(yas)
	res.render(`${yas}yas`)
});

module.exports = router;
