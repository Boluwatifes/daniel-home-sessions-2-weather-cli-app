let inquirer = require('inquirer');
let chalk = require('chalk');
getType = function (){
	var questions = [
		{
			name: 'type',
			type: 'input',
			message: 'What parameter do you want to use to search? Enter one of `id`, `name`, `zip` or `lat`',
		},
		{
			name: 'city',
			type: 'input',
			message: 'Please enter one of `id (eg. 2172797)`, `name (eg. Lagos)`, `zip code (eg. 12345,ng)`, or `lat & lon (eg. lat=35&lon=139)` of the city',
			validate: function(value){
				if(value){
					return true;
				}else{
					return 'You must enter the `id`, `name` or `zip code` of the city';
				}
			}
		},

	];

	inquirer.prompt(questions).then(function(answers){
		getWeather(answers);
	});
}

getWeather = function (city){
	var http = require('http');
	switch(city.type){
		case 'id': {
			var url = `http://api.openweathermap.org/data/2.5/weather?id=${ city.city }&APPID=a09e3ea0eb98db7975f57b676bfa058b`;
			break;
		}
		case 'zip': {
			var url = `http://api.openweathermap.org/data/2.5/weather?zip=${ city.city }&APPID=a09e3ea0eb98db7975f57b676bfa058b`;
			break;
		}
		case 'name': {
			var url = `http://api.openweathermap.org/data/2.5/weather?q=${ city.city }&APPID=a09e3ea0eb98db7975f57b676bfa058b`;
			break;
		}
		case 'lat': {
			var url = `http://api.openweathermap.org/data/2.5/weather?${ city.city }&APPID=a09e3ea0eb98db7975f57b676bfa058b`;
			break;
		}
		default : {
			console.log('Invalid argument Supplied for the search parameter!');
			return;
		}
	}
	http.get(url, function(res){
		var body = '';

		res.on('data', function(chunk){
			body += chunk;
		});

		res.on('end', function(){
			var weather = JSON.parse(body);
			if(weather.cod === 200){
				console.log(
					chalk.blue(weather.name, ', ', weather.sys.country), chalk.black.bgWhite(' ', weather.weather[0].description)
				);
				console.log(
					chalk.green(' Temp: ', weather.main.temp)
				);
				console.log(
					chalk.green(' Humidity: ', weather.main.humidity)
				);
				console.log(
					chalk.green(' Wind: ', weather.wind.speed, 'm/s')
				);
				console.log(
					chalk.green(' Clouds: ', weather.clouds.all)
				);
			}else{
				console.log('City not found. Make sure you follow the hint and try another search!');
			}
		})

		res.on('error', function(e){
			console.log("Got error: " + e.message);
		})
	});
}

module.exports = { getType, getWeather }