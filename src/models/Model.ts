import crypto from "crypto";
import { createConnection } from "../database/config";

export default class Model
{
    protected table : string|null = null;
    protected attributes : Array<string> = [];

    data: Record<string,any> = {};

    private static generateId()
    {
        return crypto.randomUUID();
    }

    protected setData(data: Record<string, any>)
    {
        this.data.id = data.id;

        this.attributes.forEach(attribute => {
            this.data[attribute] = data[attribute];
        });
    }

    // TODO Todos os métodos devem acessar o banco e retornar dados ou uma informação de sucesso/falha

    public static async create(data: Record<string,any>)
    {
        var instance = new(this);
        let query = `INSERT INTO ${instance.table} (id, `;

        instance.attributes.forEach(attribute => {
            query += attribute + ", ";
        });
        query = query.slice(0,-2);
        query += ") ";

        let id = this.generateId()

        query += `VALUES (\'${id}\', `;

        instance.attributes.forEach(attribute => {
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

                    instance.setData(modelData);

                    resolve(instance);
                }
            });

        });
    }

    public static async getAll()
    {
        var instance = new(this);
        let query = `SELECT * FROM ${instance.table};`

        let con = createConnection();

        return new Promise((resolve: (value: Array<Record<string,any>>) => void, reject) => {
            con.query(query, function (err: any, result: any) {
                if (err)
                    reject(err);
                else {
                    let registers: Array<Model> = [];
                    let data: Record<string, any>;
                    result.forEach((register: any) => {
                        data = {};
                        data["id"] = register["id"]

                        instance.attributes.forEach(attribute => {
                            data[attribute] = register[attribute];
                        });

                        instance.setData(data);

                        registers.push(instance);
                    });

                    resolve(registers);
                }
            });

        });
    }

    public static find(id: string)
    {
        var instance = new(this);
        let query = `SELECT * FROM ${instance.table} WHERE id=\'${id}\';`;

        let con = createConnection();

        return new Promise((resolve, reject) => {
            con.query(query, function (err: any, result: any) {
                if (err)
                    reject(err);
                else {
                    let data = result[0]
                    let modelData: Record<string, any> = {};

                    modelData["id"] = data["id"]

                    instance.attributes.forEach(attribute => {
                        modelData[attribute] = data[attribute];
                    });

                    instance.setData(modelData);

                    resolve(instance);
                }
            });

        });
    }

    public async update(id: string, data: Record<string,any>)
    {
        let query = `UPDATE ${this.table} SET `;

        Object.keys(data).forEach(attribute => {
            if(this.attributes.includes(attribute))
            {
                query += attribute + " = ";

                if (typeof data[attribute] == "string")
                    query += "\'" + data[attribute] + "\'" + ", ";
                else
                    query += data[attribute] + ", ";
            }
        });

        query = query.slice(0,-2);

        query += ` WHERE id=\'${id}\'`;

        let con = createConnection();

        return new Promise((resolve: (value: boolean) => void, reject) => {
            con.query(query, function (err: any) {
                if (err)
                    reject(err);
                else {
                    resolve(true);
                }
            });

        });
    }

    public async delete(id: string)
    {
        let query = `DELETE FROM ${this.table} WHERE id = \'${id}\'`;

        let con = createConnection();

        return new Promise((resolve: (value: boolean) => void, reject) => {
            con.query(query, function (err: any) {
                if (err)
                    reject(err);
                else {
                    resolve(true);
                }
            });

        });
    }
}