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

export async function totalPhoneBill(plan_name, actions) {
    const sql = 'select sms_price, call_price from price_plan where plan_name = ?';
    const result = await db.all(sql, [plan_name]);
   

    let l = actions.split(",");
    var cost = 0;
    const callCost = result[0].call_price;
    const smsCost = result[0].sms_price;
    
    for (var name of l) {
      if (name.includes("call")) {
        cost += callCost;
      } else {
        cost += smsCost;
      }
    }

     return cost.toFixed(2);
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

export async function deletePricePlan(price_plan) {

    console.log(price_plan)
    try {
        const sql = 'delete from price_plan where plan_name = ?';
        await db.run(sql, [price_plan]);

    } catch (error) {
        console.log(error)
    }
}

export async function specificPricePlan(id) {
    const sql = 'select * from price_plan where id = ?';
    const result = await db.run(sql, [id]);
    return result;
}