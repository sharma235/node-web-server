const express = require('express');
const hbs = require('hbs');
var app = express();



const fs = require('fs');

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials'); 

app.use((req,res,next)=> {
	var now = new Date().toString();
	var log = (`${now}: ${req.method} ${req.url}`);

	console.log(log);
	fs.appendFile('server.log',log + '\n' , (err) =>{
		if(err) {
			consolo.log('unable to append');
		}
	});
	next();
});

// app.use((req, res, next) =>{
// 	res.render('maintainance.hbs');
// });

app.get('/',(req,res) =>{
	//res.send('<h1>helloexpress</h1>');
	res.send({
		name: 'sharma',
		likes: [
			'biking',
			'car'
		]
	});
});

app.get('/about', (req,res) =>{
	res.render('about.hbs',{
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear()
	});
});

app.listen(port, () =>{
	console.log(`server is up con port ${port} `);
});
