import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';


const db = await sqlite.open({
    filename: './data_plan.db',
    driver: sqlite3.Database
});

await db.migrate()

export async function getAllPlans() {
    const result = await db.all('select * from price_plan');
    return result;
}

export async function addPricePlan(pricePlanName, smsCost, callCost) {
    const sql = 'insert into price_plan (plan_name, sms_price, call_price) VALUES (?,?,?)'
    await db.run(sql, [pricePlanName, smsCost, callCost])
}

export async function updatePricePlan(pricePlanName, smsCost, callCost) {
    try {
        console.log({ pricePlanName, smsCost, callCost })
        const sql = 'update price_plan set call_price = ?, sms_price = ? where plan_name = ?';
        await db.run(sql, [callCost, smsCost, pricePlanName]);
    } catch (error) {
        console.log(error)
    }
}

export async function deletePricePlan(id) {

    console.log(id)
    try {
        const sql = 'delete from price_plan where id = ?';
        await db.run(sql, [id]);

    } catch (error) {
        console.log(error)
    }
}

export async function specificPricePlan(id) {
    const sql = 'select * from price_plan where id = ?';
    const result = await db.run(sql, [id]);
    return result;
}