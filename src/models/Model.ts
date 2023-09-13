import crypto from "crypto";
import { createConnection } from "../database/config";

export default class Model
{
    protected static table : string|null = null;
    protected static attributes : Array<string> = [];

    data: Record<string,any> = {};

    static generateId()
    {
        return crypto.randomUUID();
    }

    // TODO Todos os métodos devem acessar o banco e retornar dados ou uma informação de sucesso/falha

    static async insert(data: Record<string,any>)
    {
        let query = `INSERT INTO ${this.table} (id, `;

        this.attributes.forEach(attribute => {
            query += attribute + ", ";
        });
        query = query.slice(0,-2);
        query += ") ";

        let id = this.generateId()

        query += `VALUES (\'${id}\', `;

        this.attributes.forEach(attribute => {
            if (typeof data[attribute] == "string")
                query += "\'" + data[attribute] + "\'" + ", ";
            else
                query += data[attribute] + ", ";
        });

        query = query.slice(0,-2);
        query += ");";

        let con = createConnection();

        let _this = this;

        return new Promise((resolve: (value: Record<string,any>) => void, reject) => {
            con.query(query, function (err: any) {
                if (err)
                    reject(err);
                else {
                    let modelData = _this.find(id);

                    resolve(modelData);
                }
            });

        });
    }

    static async getAll()
    {
        let query = `SELECT * FROM ${this.table};`

        let con = createConnection();

        let _this = this;

        return new Promise((resolve: (value: Array<Record<string,any>>) => void, reject) => {
            con.query(query, function (err: any, result: any) {
                if (err)
                    reject(err);
                else {
                    let registers: Array<Record<string, any>> = [];
                    let data: Record<string, any>;
                    result.forEach((register: any) => {
                        data = {};
                        data["id"] = register["id"]

                        _this.attributes.forEach(attribute => {
                            data[attribute] = register[attribute];
                        });

                        registers.push(data);
                    });

                    resolve(registers);
                }
            });

        });
    }

    static find(id: string)
    {
        let query = `SELECT * FROM ${this.table} WHERE id=\'${id}\';`;

        let con = createConnection();

        let _this = this;

        return new Promise((resolve: (value: Record<string,any>) => void, reject) => {
            con.query(query, function (err: any, result: any) {
                if (err)
                    reject(err);
                else {
                    let data = result[0]
                    let modelData: Record<string, any> = {};

                    modelData["id"] = data["id"]

                    _this.attributes.forEach(attribute => {
                        modelData[attribute] = data[attribute];
                    });

                    resolve(modelData);
                }
            });

        });
    }

    static update(data: Record<string,any>)
    {
        let query = `UPDATE ${this.table} SET `;

        this.attributes.forEach(attribute => {
            query += attribute + " = ";
            if (typeof data[attribute] == "string")
                query += "\'" + data[attribute] + "\'" + ", ";
            else
                query += data[attribute] + ", ";
        });

        query = query.slice(0,-2);

        query += ` WHERE id=${data.id}`;

        return query;
    }

    delete()
    {
        let query = `DELETE FROM ${Model.table} WHERE id=${this.data.id}`;

        return query;
    }
}