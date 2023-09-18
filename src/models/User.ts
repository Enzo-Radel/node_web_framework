import Model from "./Model";

export default class User extends Model
{
    protected table : string|null = "users";
    protected attributes : Array<string> = [
        "name",
        "email",
        "password",
    ];

    // protected setData(data: Record<string, any>)
    // {
    //     this.data.id = data.id;

    //     User.attributes.forEach(attribute => {
    //         this.data[attribute] = data[attribute];
    //     });
    // }

    // static async createUser(data: Record<string, any>)
    // {
    //     data = await this.insert(data);

    //     let user = new User;

    //     user.setData(data);

    //     return user;
    // }

    // static async findUser(id: string)
    // {
    //     let user = new User;
        
    //     let data = await this.find(id);

    //     user.setData(data);

    //     return user;
    // }

    // static async getAllUsers()
    // {
    //     let registers = await this.getAll();

    //     let users: Array<User> = [];

    //     registers.forEach(register => {
    //         let user = new User;

    //         user.setData(register);

    //         users.push(user);
    //     });

    //     return users;
    // }

    // async updateUser(data: Record<string, any>)
    // {
    //     await this.update(this.data.id, data);
    // }

    // async deleteUser()
    // {
    //     await this.delete(this.data.id);
    // }
}
