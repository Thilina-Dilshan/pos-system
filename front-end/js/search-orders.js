import {REST_API_BASE_URL, showToast} from "./main.js";
import {formatCustomerId} from "./manage-customers.js";

const txtSearch = $("#txt-search");
const tbodyElm = $("#tbl-orders tbody");

function getOrders() {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                tbodyElm.empty();
                const orderList = JSON.parse(xhr.responseText);
                orderList.forEach(order => {
                    let name = (order.customerName === null) ? 'Walking-Customer' : order.customerName;
                    let customerId = (order.customerId === null) ? '--' : order.customerId;
                    tbodyElm.append(`
                    <tr>
                        <td>${order.orderDate}</td> 
                        <td class="d-none d-xl-table-cell">${name}</td>
                        <td class="contact text-center">${order.orderId}</td>
                        <td class="text-center">${customerId}</td>
                        <td>
                            <div class="actions d-flex gap-3 justify-content-center"></div>
                        </td>
                    </tr>
                `);
                });
                const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
                const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
                if (!orderList.length) {
                    $("#tbl-orders tfoot").show();
                } else {
                    $("#tbl-orders tfoot").hide();
                }
            } else {
                tbodyElm.empty();
                $("#tbl-orders tfoot").show();
                showToast('error', 'Failed', 'Failed to fetch order details');
                // console.log(JSON.parse(xhr.responseText));
            }
        }
    });

    const searchText = txtSearch.val().trim();
    const query = (searchText) ? `?q=${searchText}` : "";

    xhr.open('GET', `${REST_API_BASE_URL}/orders` + query, true);

    const tfoot = $("#tbl-orders tfoot tr td:first-child");
    xhr.addEventListener('loadstart', () => tfoot.text('Please wait!'));
    xhr.addEventListener('loadend', () => tfoot.text('No order records are found!'));

    xhr.send();
}

getOrders();
txtSearch.on('input', () => getOrders());