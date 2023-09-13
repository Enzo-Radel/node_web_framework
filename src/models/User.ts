import Model from "./Model";

export default class User extends Model
{
    protected static table : string|null = "users";
    protected static attributes : Array<string> = [
        "name",
        "email",
        "password",
    ];

    private setData(data: Record<string, any>)
    {
        this.data.id = data.id;

        User.attributes.forEach(attribute => {
            this.data[attribute] = data[attribute];
        });
    }

    static async createUser(data: Record<string, any>)
    {
        data = await User.insert(data);

        let user = new User;

        user.setData(data);

        return user;
    }

    static async findUser(id: string)
    {
        let user = new User;
        
        let data = await User.find(id);

        user.setData(data);

        return user;
    }
}
