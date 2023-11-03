const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('anasayfa');
});

router.post('/', (req, res) => {
	let x = req.body.gelir
	console.log(x)
	res.render('yaslar');
});

module.exports = router;
