import UserModel from "../Models/user.model";

export default class UserRepository {
    private static instance: UserRepository;

    private constructor() { }

    public static getInstance(): UserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }

        return UserRepository.instance;
    }

    private users: UserModel[] = [];

    public GetAll(): UserModel[] {
        return this.users;
    }

    public GetActive(): UserModel[] {
        return this.users.filter(user => user.GetState());
    }

    public Get(uid: String): UserModel {
        return this.users.find(user => user.uid == uid);
    }

    public Add(user: UserModel) {
        if (this.Get(user.uid) != null)
            throw new Error("duplicate user");

        this.users.push(user);
    }
}