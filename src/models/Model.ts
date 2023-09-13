import crypto from "crypto";

export default class Model
{
    protected static table : string|null = null;
    protected static attributes : Array<string> = [];

    data: Record<string,any> = {};

    static generateId()
    {
        return crypto.randomUUID();
    }

    // TODO Todos os métodos devem acessar o banco e retornar dados um uma informação de sucesso/falha

    static insert(data: Record<string,any>)
    {
        let query = `INSERT INTO ${this.table} (id, `;

        this.attributes.forEach(attribute => {
            query += attribute + ", ";
        });
        query = query.slice(0,-2);
        query += ") ";

        query += `VALUES (\'${this.generateId()}\', `;

        this.attributes.forEach(attribute => {
            if (typeof data[attribute] == "string")
                query += "\'" + data[attribute] + "\'" + ", ";
            else
                query += data[attribute] + ", ";
        });

        query = query.slice(0,-2);
        query += ");";

        return query;
    }

    static getAll()
    {
        let query = `SELECT * FROM ${this.table};`

        return query;
    }

    static find(id: number)
    {
        let query = `SELECT * FROM ${this.table} WHERE id=${id}`;

        return query;
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