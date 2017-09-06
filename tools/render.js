var menu = require('../menu-pub.json');

var render = {
	prepare: function(req, res, next) {
		res.locals.currentPage = req.url.split('/')[1];
		res.locals.navList = [
			{
				"name": "Меню паба",
				"url": "menu-pub"
			},
			{
				"name": "Меню ресторана",
				"url": "menu-restaurant"
			},
			{
				"name": "Галерея",
				"url": "gallery"
			}
		];
		res.locals.menu = menu;
		next();
	},
	index: function(req, res) {
		res.render('index');
	},
	menuPub: function(req, res) {
		res.render('menu-pub');
	},
	getMenu: function(req, res) {
		res.send(res.locals.menu);
	},
	menuRestaurant: function(req, res) {
		res.render('menu-restaurant');
	},
	gallery: function(req, res) {
		res.render('gallery');
	}
}

module.exports = render;