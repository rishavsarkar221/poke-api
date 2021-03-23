const express = require("express");
const app = express();
const https = require("https");

app.use(express.urlencoded());

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/index.html`);
});

app.post("/", (req, res) => {
	pokemonName = req.body.pokemonName;
	url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

	const request = https.request(url, (response) => {
	
		let data = '';

		response.on('data', (chunk) => {
			data += chunk.toString();
			console.log(chunk);
		})
	
		response.on('end', () => {
			const pokeData = JSON.parse(data); 

			res.write(`<p><img src="${pokeData.sprites.other['official-artwork'].front_default}" width="300"></p>`);
			res.write(`<h1 style="font-family: Arial;"><span style="color: red;">Name:</span> ${pokeData.forms[0].name}</h1>`);
			res.write(`<h1 style="font-family: Arial;"><span style="color: red;">Type:</span> ${pokeData.types[0].type.name}</h1>`);
			res.write(`<h1 style="font-family: Arial;"><span style="color: red;">Weight:</span> ${pokeData.weight}`);
			
			res.write(`
			<br><br>
			<table border="3" cellspacing="0" width="200">
				<tr align="center">
					<th>${pokeData.stats[0].stat.name}</th>
					<td id="s0">${pokeData.stats[0].base_stat}</td>
				</tr>
				<tr align="center">
					<th>${pokeData.stats[1].stat.name}</th>
					<td id="s1">${pokeData.stats[1].base_stat}</td>
				</tr>
				<tr align="center">
					<th>${pokeData.stats[2].stat.name}</th>
					<td id="s2">${pokeData.stats[2].base_stat}</td>
				</tr>
				<tr align="center">
					<th>${pokeData.stats[3].stat.name}</th>
					<td id="s3">${pokeData.stats[3].base_stat}</td>
				</tr>
				<tr align="center">
					<th>${pokeData.stats[4].stat.name}</th>
					<td id="s4">${pokeData.stats[4].base_stat}</td>
				</tr>
				<tr align="center">
					<th>${pokeData.stats[5].stat.name}</th>
					<td id="s5">${pokeData.stats[5].base_stat}</td>
				</tr>
				<tr>
					<td colspan="2" id="bStat">Base Stat: </td>
				</tr>
			</table>
					`)
			res.write(`
				<script>
					const s1 = Number(document.querySelector('#s0').innerHTML);
					const s2 = Number(document.querySelector('#s1').innerHTML);
					const s3 = Number(document.querySelector('#s2').innerHTML);
					const s4 = Number(document.querySelector('#s3').innerHTML);
					const s5 = Number(document.querySelector('#s4').innerHTML);
					const s6 = Number(document.querySelector('#s5').innerHTML);

					document.querySelector("#bStat").innerHTML = "Base Stat: " + (s1 + s2 + s3 + s4 + s5 + s6);
				</script>
			`)

			res.send();
		})
	})
	
	request.on('error', (err) => {
		console.log('An error', err);
	})
	
	request.end();
});

app.listen(80, () => {
	console.log('Server started');
});