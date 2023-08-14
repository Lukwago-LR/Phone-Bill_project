import express from 'express';
import cors from 'cors';

import { getAllPlans, addPricePlan, updatePricePlan, deletePricePlan } from './bootcamp/PhoneBillFunctions.js';

const app = express()

app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

//referencing cors
app.use(cors());

// route definitions below here
app.get("/api/price_plan", async function (req, res) {
    res.json(
        {
            price_plans: await getAllPlans()
        }
    );
});

app.post('/api/phonebill/', async function (req, res) {
    const pricePlanName = req.body.price_plan;
    const actionsString = req.body.actions;

    if (!pricePlanName && !actionsString) {
        res.json({
            error: "one of the parameters not found!"
        })
    }

    res.json(
        {
            total: await totalPhoneBill(pricePlanName, actionsString)
        }
    );

});

app.post('/api/price_plan/create', async function (req, res) {
    const pricePlanName = req.body.plan_name;
    const callCost = Number(req.body.call_price);
    const smsCost = Number(req.body.sms_price);

    if (!pricePlanName && !callCost && !smsCost) {
        res.json({
            error: "one of the parameters not found!"
        })
    }

    await addPricePlan(pricePlanName, callCost, smsCost)

    res.json(
        {
            success: "new price plan successfully added"
        }
    );

});

app.post('/api/price_plan/update', async function (req, res) {
    const pricePlanName = req.body.plan_name;
    const callCost = Number(req.body.call_price);
    const smsCost = Number(req.body.sms_price);

    if (!pricePlanName && !callCost && !smsCost) {
        res.json({
            error: "one of the parameters not found!"
        })
    }

    await updatePricePlan(pricePlanName, callCost, smsCost)

    res.json(
        {
            success: "price plan successfully updated"
        }
    );

});

app.get('/api/price_plan/delete', async function (req, res) {
    const pricePlan = req.query.plan_name;

    if (!pricePlan) {
        res.json({
            error: "price_plan name not found!"
        })
    }

    await deletePricePlan(pricePlan);

    res.json(
        {
            success: "price plan successfully deleted"
        }
    );

});

let PORT = process.env.PORT || 4011;

app.listen(PORT, function () {
    console.log('App starting on port', PORT)
})