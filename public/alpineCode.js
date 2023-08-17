
function AlpineMainFunction() {
    return {
        pricePlans: [],
        response: "",
        open: false,
        name: "",
        call_price: 0.0,
        sms_price: 0.0,
        nameUpdate: "",
        call_priceUpdate: 0.0,
        sms_priceUpdate: 0.0,
        selectedDb: "",
        total: 0,
        actions: "",
        selectedName: "",

        phoneBill() {
            axios
                .post('/api/price_plan/phonebill', {
                    plan_name: this.selectedName,
                    actions: this.actions
                })
                .then((result) => {
                    this.total = result.data.total;
                })
        },

        allPricePlans() {
            this.open = true;
            axios
                .get('/api/price_plan')
                .then((result) => {
                    this.pricePlans = result.data.price_plans
                })
        },

        addPricePlan() {
            axios
                .post('/api/price_plan/create', {
                    plan_name: this.name,
                    call_price: this.call_price,
                    sms_price: this.sms_price
                })
                .then((result) => {
                    this.response = result.data
                })
        },

        updatePricePlan() {
            axios
                .post('/api/price_plan/update', {
                    plan_name: this.nameUpdate,
                    call_price: this.call_priceUpdate,
                    sms_price: this.sms_priceUpdate
                })
                .then((result) => {
                    this.response = result.data
                })
        },

        deletePricePlan() {
            axios
                .get(`/api/price_plan/delete?plan_name=${this.selectedDb}`)
                .then((result) => {
                    this.response = result.data;
                })
        }
    };
}

document.addEventListener('alpine:init', () => {
    Alpine.data('mainFunction', AlpineMainFunction)
})

