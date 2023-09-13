import Model from "./Model";

export default class User extends Model
{
    protected static table : string|null = "users";
    protected static attributes : Array<string> = [
        "name",
        "email",
        "password",
    ];
}
