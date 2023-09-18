import Model from "./Model";

export default class User extends Model
{
    protected table : string|null = "users";
    protected attributes : Array<string> = [
        "name",
        "email",
        "password",
    ];
}
