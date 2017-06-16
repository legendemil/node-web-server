const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view-engine', 'hbs');

app.use((req, res, next) => {
	const now = new Date().toString();
	const log = `${now}: ${req.method} ${req.url}`;
	
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

// app.use((req, res) => {
// 	res.render('maintenance.hbs', {
// 		pageTitle: 'Uuups',
// 	});
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase(0);
});

app.get('/', (req, res) => {
	// res.send('<h1>Hello Express</h1>');
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMsg: 'Welcome to my site'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Cannot to handle request'
	});
});

app.listen(port, () => {
	console.log('Server is up on port ${port}');
});