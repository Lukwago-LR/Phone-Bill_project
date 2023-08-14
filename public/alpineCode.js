
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
        selectedId: 0,

        allPricePlans() {
            this.open = true;
            axios
                .get('http://localhost:4011/api/price_plan')
                .then((result) => {
                    this.pricePlans = result.data.price_plans
                    console.log(result)
                })
        },

        addPricePlan() {
            axios
                .post('http://localhost:4011/api/price_plan/create', {
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
                .post('http://localhost:4011/api/price_plan/update', {
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
                .get(`http://localhost:4011/api/price_plan/delete?id=${this.selectedId}`)
                .then((result) => {
                    this.response = result.data;
                })
        }
    };
}

document.addEventListener('alpine:init', () => {
    Alpine.data('mainFunction', AlpineMainFunction)
})

