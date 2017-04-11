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


module.exports = { getType }