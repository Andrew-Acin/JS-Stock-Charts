function getColor(stock) {
    switch (stock) {
        case "GME":
            return 'rgba(61, 161, 61, 0.7)';
        case "MSFT":
            return 'rgba(209, 4, 25, 0.7)';
        case "DIS":
            return 'rgba(18, 4, 209, 0.7)';
        case "BNTX":
            return 'rgba(166, 43, 158, 0.7)';
        default:
            return 'rgba(0, 0, 0, 0.7)'; 
    }
}


async function main() {
    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    const response = await fetch(`https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=b2b0e11651294ee9a789558a1625b754`);

    const result = await response.json();

    const { GME, MSFT, DIS, BNTX } = result;

    const stocks = [GME, MSFT, DIS, BNTX];

    stocks.forEach(stock => stock.values.reverse());

    // Time Chart
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: GME.values.map(value => value.datetime).reverse(),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });

    // Highest Stock Price
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
                borderColor: stocks.map(stock => getColor(stock.meta.symbol)),
                data: stocks.map(stock => Math.max(...stock.values.map(value => parseFloat(value.high))))
            }]
        },
    });
// I had to use CHATGPT to fix up the bar chart i just couldn't get it to work without the Math.max function it gave me.
    console.log(stocks[0].values);
}

main();





