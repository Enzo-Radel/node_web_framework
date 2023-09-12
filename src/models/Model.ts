export default class Model
{
    protected table : string|null = null;
    protected attributes : Array<string> = [];

    data: Record<string,any> = {};

    insert()
    {
        let query = `INSERT INTO ${this.table} (`;

        this.attributes.forEach(attribute => {
            query += attribute + ", ";
        });
        query = query.slice(0,-2);
        query += ") ";

        query += "VALUES (";

        this.attributes.forEach(attribute => {
            if (typeof this.data[attribute] == "string")
                query += "\"" + this.data[attribute] + "\"" + ", ";
            else
                query += this.data[attribute] + ",";
        });

        query = query.slice(0,-2);
        query += ");";

        return query;
    }
}