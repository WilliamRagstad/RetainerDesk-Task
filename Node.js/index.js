const fetch = require('node-fetch');

async function list_employees() {
	let request = await fetch('http://dummy.restapiexample.com/api/v1/employees');
	let json = await request.json();
	console.table(json.data);
}

list_employees();