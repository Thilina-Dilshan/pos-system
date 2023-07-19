import {Big} from '../node_modules/big.js/big.mjs';
import {REST_API_BASE_URL} from "./main.js";

const modelLowStock = $("#low-stock-modal");

modelLowStock.on('shown.bs.modal', () => {

});

const btn1 = $("#btn-1");
const btn2 = $("#btn-2");
const btn3 = $("#btn-3");
const btn4 = $("#btn-4");


function getItems() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
        let itemCount = 0;
        let outOfStockItemCodes = [];
        let outOfStockItemCount = 0;
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const itemList = JSON.parse(xhr.responseText);
                itemList.forEach(item => {
                    itemCount += item.qty;
                    if (item.qty < 5) {
                        ++outOfStockItemCount;
                        outOfStockItemCodes.push([item.code, item.qty]);
                    }
                });

                $("#items").text(itemCount);

                const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
                const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
                if (!itemList.length) {
                    // console.log("No items= ",itemList)
                } else {
                    // console.log(itemCount);
                }
            } else {
                // console.log("Error fetching items");
            }
        }
    });

    const query = "";

    xhr.open('GET', `${REST_API_BASE_URL}/items` + query, true);

    xhr.send();
}

getItems();


function getCustomers() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
        let customerCount = 0;

        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const customerList = JSON.parse(xhr.responseText);
                customerList.forEach(customer => {
                    customerCount++;
                });

                $("#customers").text(customerCount);

                if (!customerList.length) {
                    // console.log("No customer")
                } else {
                    // console.log("Customers found", customerCount);
                }
            } else {
                console.log(JSON.parse(xhr.responseText));
            }
        }
    });

    const query = "";

    xhr.open('GET', `${REST_API_BASE_URL}/customers` + query, true);
    xhr.send();
}

getCustomers();


/* Get order */
function getOrders() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
        let dailyOrderCount = 0;
        let monthlyOrders = 0;
        let monthlyIncome = new Big("0");
        let dailyIncome = new Big("0");
        let income = [];
        let incomeTitle = [];
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const orderList = JSON.parse(xhr.responseText);
                orderList.forEach(order => {
                    const date = new Date(order.orderDate);
                    const today = new Date();
                    if (date.getDay() === today.getDay()) {
                        dailyIncome = dailyIncome.plus(Big(order.orderTotal));
                        dailyOrderCount++;
                    }

                    if (date.getMonth() === today.getMonth()) {
                        monthlyIncome = monthlyIncome.plus(Big(order.orderTotal));
                        monthlyOrders++
                    }
                });

                let formattedDailyIncome;
                if (dailyOrderCount) {
                    formattedDailyIncome = new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "LKR"
                    }).format(+dailyIncome.valueOf());

                }else{
                    formattedDailyIncome = new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "LKR"
                    }).format(0);
                }
                income.push(formattedDailyIncome);
                incomeTitle.push("Daily Income");
                $("#orders").text(dailyOrderCount);
                $("#order-title").text("Daily Orders");
                $("#profit").text(formattedDailyIncome);
                $("#profit-title").text("Daily Income");

                let formattedMonthlyIncome;
                if (monthlyOrders) {
                    formattedMonthlyIncome = new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "LKR"
                    }).format(+monthlyIncome.valueOf());

                }else{
                    formattedMonthlyIncome = new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "LKR"
                    }).format(0);
                }
                income.push(formattedMonthlyIncome);
                incomeTitle.push("Monthly Income");
                $("#orders").text(monthlyOrders);
                $("#order-title").text("Monthly Orders");
                $("#profit").text(formattedMonthlyIncome);
                $("#profit-title").text("Monthly Income");


                console.log(dailyOrderCount);
                console.log(monthlyOrders);

                let i = 0;
                let k = 0;
                let m = 0;
                let erase1 = false;

                setInterval(() => {
                    let text = income[k];
                    i++;
                    if (i % 2 === 0 && !erase1) {
                        m++;
                        $("#profit").text(text?.substring(0, m));
                        if (m >= (text?.length + 10)) erase1 = true;
                    } else if (erase1) {
                        m--;
                        $("#profit").text(text?.substring(0, m));

                        if (m <= 0) {
                            erase1 = false;
                            k++;
                            if (k === income?.length) k = 0;
                        }
                    }
                }, 70);


                let w = 0;
                let x = 0;
                let y = 0;
                let erase2 = false;

                setInterval(() => {
                    if (k===0) {
                        $("#profit-title").text(incomeTitle[0]);
                    } else if (k===1) {
                        $("#profit-title").text(incomeTitle[1]);
                    }
                }, 70);

                console.log(dailyIncome);

            } else {
                console.log(JSON.parse(xhr.responseText));
            }
        }
    });

    const query = "";
    xhr.open('GET', `${REST_API_BASE_URL}/orders` + query, true);
    xhr.send();
}

getOrders();




