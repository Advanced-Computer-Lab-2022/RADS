const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const curr = null;
const getRate = async () => {
    //base currency is USD
    var requestURL = `https://api.exchangerate.host/convert?from=USD&to=${curr}`;
    const response = await fetch(requestURL).then(res => res.json());
    console.log(response);
}
const getCurrencyFront = async (currency) => {
    curr = currency
}
module.exports = {
    getRate,
    getCurrencyFront
}