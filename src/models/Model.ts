import crypto from "crypto";
import { createConnection } from "../database/config";
import RegisterNotFoundError from "../Errors/RegisterNotFound";

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

    public static async getAll()
    {
        let instance = new(this);
        let query = `SELECT * FROM ${instance.table};`

        let con = createConnection();

        return new Promise((resolve: (value: Array<Model>) => void, reject) => {
            con.query(query, (err: any, result: any) => {
                let registers: Array<Model> = [];
                if (err)
                    reject(registers);
                else {
                    let data: Record<string, any>;

                    result.forEach((register: any) => {
                        let model = new (this);
                        data = {};
                        data["id"] = register["id"]

                        instance.attributes.forEach(attribute => {
                            data[attribute] = register[attribute];
                        });

                        model.setData(data);

                        registers.push(model);
                    });

                    resolve(registers);
                }
            });

        });
    }

    public static async create(data: Record<string,any>)
    {
        let instance = new(this);
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

        return new Promise((resolve: (value: Model) => void, reject) => {
            con.query(query, async (err: any) => {
                let model = new (this);

                if (err)
                    reject(err);
                else {
                    model = await this.find(id);

                    resolve(model);
                }
            });

        });
    }

    public static find(id: string)
    {
        let instance = new(this);
        let query = `SELECT * FROM ${instance.table} WHERE id=\'${id}\';`;

        let con = createConnection();

        return new Promise((resolve: (value: Model) => void, reject: (value: Model) => void) => {
            con.query(query, (err: any, result: any) => {
                let model = new (this);

                if (err)
                    throw new RegisterNotFoundError("Registro não encontrado");
                else {
                    let data = result[0]
                    let modelData: Record<string, any> = {};

                    if (data == undefined) {
                        throw new RegisterNotFoundError("Registro não encontrado");
                    }

                    modelData["id"] = data["id"]

                    instance.attributes.forEach(attribute => {
                        modelData[attribute] = data[attribute];
                    });

                    model.setData(modelData);

                    resolve(model)
                    
                }
            });    
        });
    }

    public async update(data: Record<string,any>)
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
        })

        query = query.slice(0,-2);

        query += ` WHERE id=\'${this.data.id}\'`;

        let con = createConnection();

        return new Promise((resolve: (value: boolean) => void, reject) => {
            con.query(query, (err: any) => {
                if (err)
                    reject(false);
                else {
                    resolve(true);
                }
            });

        });
    }

    public async delete()
    {
        let query = `DELETE FROM ${this.table} WHERE id = \'${this.data.id}\'`;

        let con = createConnection();

        return new Promise((resolve: (value: boolean) => void, reject) => {
            con.query(query, (err: any) => {
                if (err)
                    reject(false);
                else {
                    resolve(true);
                }
            });

        });
    }
}