import runQuery from "../db/dal";

export async function addFollowing(user_id: number, vacation_id: number) {

    let q = `INSERT INTO following (user_id, vocation_id)
        VALUES (?,?);`;

    const params = [user_id, vacation_id];

    await runQuery(q, params);
}

export async function removeFollowing(user_id: number, vacation_id: number) {
    let q = `DELETE FROM following
             WHERE user_id = ? AND vocation_id = ?;`;

    const params = [user_id, vacation_id];
    
    await runQuery(q, params);
}

export async function isFollowingService(user_id: number, vacation_id: number) {
    let q = `SELECT * FROM following WHERE user_id = ? AND vocation_id = ?`;
    
    const params = [user_id, vacation_id];
    const res = await runQuery(q, params);
    return res.length > 0;
}