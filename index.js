import { connection } from "./database.js";
import jsonfile from "jsonfile";
import { readFileSync } from "fs";
import pkg from "json-2-csv";

async function createJsonFile() {
	const repositories = await connection.query(
		'SELECT * FROM repositories WHERE "hasSponsorship"=TRUE ORDER BY stars DESC; '
	);
	const file = "sponsored-repos.json";
	const obj = repositories.rows;

	jsonfile.writeFile(file, obj, function (err) {
		if (err) console.error(err);
	});

	return;
}

async function createCSVFile() {
	const jsonData = JSON.parse(readFileSync("sponsored-repos.json"));
	const { parse } = pkg;

	try {
		const parser = new parse(jsonData);
		const csv = parse(myData);
		console.log(csv);
	} catch (err) {
		console.error(err);
	}

	return;
}

async function createJsonFileByLingue() {
	const repositories = await connection.query(
		"SELECT * FROM repositories WHERE tags = ANY ('react')"
	);
	//language='TypeScript' AND

	console.log(repositories.rows);
	// const file = "sponsored-repos.json";
	// const obj = repositories.rows;

	// jsonfile.writeFile(file, obj, function (err) {
	// 	if (err) console.error(err);
	// });

	return;
}

//createJsonFile();
//createCSVFile();
createJsonFileByLingue();
