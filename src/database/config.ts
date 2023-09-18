import mysql from "mysql";
import dotenv from 'dotenv';

dotenv.config();

export function createConnection(): mysql.Connection
{
	let con = mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
	});

	return con;
}