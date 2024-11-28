import runQuery from "../db/dal";
import { UnauthorizedError } from "../models/exceptions";
import UserModel from "../models/userModel";
import { createToken } from "../utils/authHelpers";

export async function createUser(user: UserModel) {
    user.validate();

    let q = `INSERT INTO user (first_name, last_name, password, email, role)
        VALUES (?,?,?,?, 'user');`;

    let params = [user.first_name, user.last_name, user.password, user.email]
    await runQuery(q, params);

    q = `SELECT id FROM user WHERE email = ?;`;
    params = [user.email]
    const res = await runQuery(q, params);
    const id = res[0].id;
    
    user.id = id;
    user.token = createToken(user);
    
    q = `UPDATE user SET token = ? WHERE id = ?;`;
    params = [user.token, `${user.id}`]
    await runQuery(q, params);

    return user.token
}

export async function userLogIn(email: string, password: string) {
    let q = `SELECT * FROM user WHERE email = ? AND password = ?;`;
    let params = [email, password]
    const res = await runQuery(q, params);
    
    if (res.length !== 1) {
        throw new UnauthorizedError('worng credentials')
    }
    
    const user = new UserModel(res[0]);
    if (!user.token) {
        user.token = createToken(user);
        q = `UPDATE user SET token = ? WHERE id = ?;`;
        let params = [user.token, user.id]
        await runQuery(q, params);
    }

    return { token: user.token };
}