var burger = $('.burger');
var menuParent = $('.header-content');
var bodyContent = $('.body');

function Get(url, callback) {
	fetch(url).then(function(res){
		return res.json();
	}).then(function(res){
		callback(res);
	});
}

burger.click(function(){
	burger.toggleClass('active');
	menuParent.toggleClass('active');
	bodyContent.toggleClass('active');
	
})

function menuItemTemplate(data) {
	var html = priceHtml = priceComplex = '';
	data.weight =  typeof data.weight === 'object' ? data.weight.join('/') : data.weight.toString().replace('.', ',');
	if (typeof data.price === 'object') {
		for (var i in data.price) {
			priceHtml += '<div class="price-name"><span>' + data.price[i].name + '</span><div class="price-value"><span>' + data.price[i].value + '</span></div></div>';
		}
		priceComplex = 'complex';
		data.price = priceHtml;
	} else {
		priceHtml = '<div class="item-name__price"><span>' + data.price + '</span></div></div>';
	}
	html += '<div class="menu-item ' + priceComplex + '">';
	html += '<div class="item-name"><span>' + data.name + '</span>';
	html += priceHtml;
	html += '<div class="menu-item__description"><p>' + (data.description || '') + '</p></div>';
	html += '<div class="menu-item__weight"><p>' + data.weight + ' ' + data.weightMeasure + '</p></div>';
	html += '</div>';
	return html;
}

function buildMenu(category) {
	$('.menu-content').html('');
	Get('/getMenu', function(res){
		if (typeof res.categories[category] === 'undefined') return;
		var menu = res.categories[category].items;
		for (var i in menu) {
			var item = menu[i];
			$('.menu-content').append('<div class="wrapper">' + menuItemTemplate(item) + '</div>');
		}
		$('.menu-content').append('<div>' + res.categories[category].description + '</div>')
	});
}

$('.menu-category').click(function(){
	if (!$(this).is('.selected')) buildMenu($(this).attr('product'));
	$('.menu-category').removeClass('selected');
	$(this).addClass('selected');
});

buildMenu('beer');