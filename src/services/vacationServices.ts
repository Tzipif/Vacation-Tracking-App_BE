import runQuery from "../db/dal";
import VacationModel from "../models/vacationModel";
import { saveImage } from "../utils/helpers";
import { Parser } from 'json2csv';

export async function countVacations(filters?: { userId?: number; active?: boolean; notStarted?: boolean; following?: boolean }): Promise<VacationModel[]> {
    let q = `SELECT COUNT(DISTINCT v.id) AS total,
    COUNT(f.user_id) AS followers_count
    FROM vocation v
    LEFT JOIN following f ON v.id = f.vocation_id`;

    const conditions: string[] = [];

    if (filters?.following && filters.userId) {
        conditions.push(`f.user_id = ${filters.userId}`);
    }

    if (filters?.notStarted) {
        conditions.push(`v.start_vocation > NOW()`);
    }

    if (filters?.active) {
        conditions.push(`v.end_vocation >= NOW() AND v.start_vocation <= NOW()`);
    }

    if (conditions.length > 0) {
        q += ' WHERE ' + conditions.join(' AND ');
    }

    const totalRes = await runQuery(q);
    const total = totalRes[0]?.total || 0;

    console.log(total);
    console.log('Executing query:', q);

    return total;
}

export async function getAllVacations(page: number, limit: number, filters?: { userId?: number; vacationId?: number; active?: boolean; notStarted?: boolean; following?: boolean }): Promise<VacationModel[]> {
    const offset = page * limit;

    let q = `SELECT v.*,
    COUNT(f.user_id) AS followers_count
    FROM vocation v
    LEFT JOIN following f ON v.id = f.vocation_id`;

    const conditions: string[] = [];

    if (filters?.vacationId) {
        conditions.push(`v.id = ${filters.vacationId}`);
    }

    if (filters?.following && filters.userId) {
        conditions.push(`f.user_id = ${filters.userId}`);
    }

    if (filters?.notStarted) {
        conditions.push(`v.start_vocation > NOW()`);
    }

    if (filters?.active) {
        conditions.push(`v.end_vocation >= NOW() AND v.start_vocation <= NOW()`);
    }

    if (conditions.length > 0) {
        q += ' WHERE ' + conditions.join(' AND ');
    }

    q += ` GROUP BY v.id
           ORDER BY v.start_vocation
           LIMIT ${limit} OFFSET ${offset};`;

    const res = await runQuery(q);

    console.log('Executing query:', q);

    return res.map(v => new VacationModel(v));
}

export async function deleteVacation(vocation_id: number) {
    let q = `DELETE FROM vocation WHERE id=?`;

    const params = [vocation_id]
    const res = await runQuery(q, params);
}

export async function createNewVacation(v: VacationModel) {
    v.validate()
    
    let q = `INSERT INTO vocation (destination, description, start_vocation, end_vocation, price, url_image) 
    VALUES (?,?,?,?,?,?)`;
    
    const params = [v.destination, v.description, v.start_vocation, v.end_vocation, v.price, v.url_image]
    const vacation = await runQuery(q, params);
    
    return vacation
}

export async function updateVacation(v: VacationModel, vid:number) {
    v.validate()
    
    let q = `UPDATE vocation
    SET
    destination = ?,
    description = ?,
    start_vocation = ?,
    end_vocation = ?,
    price = ?,
    url_image = ?
    WHERE id = ?`;
    
    const params = [v.destination, v.description, v.start_vocation, v.end_vocation, v.price, v.url_image, vid]
    const vacation = await runQuery(q, params);

    return vacation
}

export async function downloadReport() {

    let q = `SELECT v.destination, 
    COUNT(f.user_id) AS followers_count
    FROM vocation v
    LEFT JOIN following f ON v.id = f.vocation_id
    GROUP BY v.id, v.destination`

    const res = await runQuery(q);

    const csv = new Parser().parse(res);
    return csv
}