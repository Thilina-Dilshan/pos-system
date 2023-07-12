import {REST_API_BASE_URL ,showProgress, showToast} from "./main.js";

const tbodyElm = $("#tbl-items tbody");
const modalElm = $("#new-item-modal");
const txtCode = $("#txt-code");
const txtDescription = $("#txt-description");
const txtQty = $("#txt-qty");
const txtPrice = $("#txt-unitPrice");
const btnSave = $("#btn-save");

tbodyElm.empty();
[txtDescription, txtQty, txtPrice].forEach(txtElm => $(txtElm).addClass('animate__animated'));

btnSave.on('click', () => {
    if (!validateData()) {
        return false;
    }

    const code = txtCode.val()?.trim();
    const description = txtDescription.val()?.trim();
    const qty = +(txtQty.val().trim());
    const unitPrice = +(txtPrice.val().trim());

    let item = {
        code, description, qty, unitPrice
    };

    /* 1. Create xhr object */
    const xhr = new XMLHttpRequest();

    /* 2. Set an event listener to listen readystatechange */
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
            [txtCode, txtDescription, txtQty, txtPrice, btnSave].forEach(elm => elm.removeAttr('disabled'));
            $("#loader").css('visibility', 'hidden');
            if (xhr.status === 201) {
                // item = JSON.parse(xhr.responseText);
                getItems();
                resetForm(true);
                txtCode.trigger('focus');
                showToast('success', 'Saved', 'Item has been saved successfully');

            }else if (xhr.status === 204) {
                getItems();
                resetForm(true);
                modalElm.modal("hide");
                showToast('success', 'Updated', 'Item has been updated successfully');
            } else {
                const errorObj = JSON.parse(xhr.responseText);
                showToast('error', 'Failed to save', errorObj.message);
            }
        }
    });

    if (btnSave.text()==="Save Item") {

        /* 3. Let's open the request */
        xhr.open('POST', `${REST_API_BASE_URL}/items`, true);
        console.log(`${REST_API_BASE_URL}/items`);

        /* 4. Let's set some request headers */
        xhr.setRequestHeader('Content-Type', 'application/json');

        showProgress(xhr);

        /* 5. Okay, time to send the request */
        xhr.send(JSON.stringify(item));

    }else if (btnSave.text()==="Update Item") {

        xhr.open('PATCH', `${REST_API_BASE_URL}/items/${txtCode.val()}`, true);
        console.log(`${REST_API_BASE_URL}/items/${txtCode.val()}`);

        /* 4. Let's set some request headers */
        xhr.setRequestHeader('Content-Type', 'application/json');

        showProgress(xhr);

        /* 5. Okay, time to send the request */
        xhr.send(JSON.stringify(item));

    }
    [txtDescription, txtPrice, txtQty, btnSave].forEach(elm => elm.attr('disabled', 'true'));
    $("#loader").css('visibility', 'visible');


});

function validateData() {
    const price = txtPrice.val().trim();
    const code = txtCode.val().trim();
    const qty = txtQty.val().trim();
    const description = txtDescription.val().trim();
    let valid = true;
    resetForm();

    if (!price || price<0) {
        valid = invalidate(txtPrice, "Price can't be empty");
    } else if (!/[1-9]+/.test(price)) {
        valid = invalidate(txtPrice, 'Invalid price');
    }

    if (!qty) {
        valid = invalidate(txtQty, "Quantity number can't be empty");
    } else if (!/^[0-9]+$/.test(qty)) {
        valid = invalidate(txtQty, 'Invalid Quantity number');
    }

    if (!description) {
        valid = invalidate(txtDescription, "Description can't be empty");
    } else if (!/^[A-Za-z0-9- ]+$/.test(description)) {
        valid = invalidate(txtDescription, "Invalid Description");
    }

    if (!code) {
        valid = invalidate(txtCode, "Code can't be empty");
    } else if (!/^[0-9]+$/.test(code)) {
        valid = invalidate(txtCode, "Invalid Description");
    }

    return valid;
}

function invalidate(txt, msg) {
    setTimeout(() => txt.addClass('is-invalid animate__shakeX'), 0);
    txt.trigger('select');
    txt.next().text(msg);
    return false;
}

function resetForm(clearData) {
    [txtCode, txtDescription, txtPrice, txtQty].forEach(txt => {
        txt.removeClass("is-invalid animate__shakeX");
        if (clearData) txt.val('');
    });
}

modalElm.on('show.bs.modal', () => {
    setTimeout(() => {
        if (btnSave.text() === "Save Item") {
            resetForm(true);
        }
    }, 0);
    // txtCode.parent().hide();
    setTimeout(() => txtCode.trigger('focus'), 500);
});

function getItems() {

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                tbodyElm.empty();
                const itemList = JSON.parse(xhr.responseText);
                itemList.forEach(item => {
                    tbodyElm.append(`
                    <tr>
                        <td class="text-center">${(item.code)}</td>
                        <td>${item.description}</td>
                        <td class="d-none d-xl-table-cell">${item.qty}</td>
                        <td class="contact text-center">${item.unitPrice}</td>
                        <td>
                            <div class="actions d-flex gap-3 justify-content-center">
                                <svg data-bs-toggle="tooltip" data-bs-title="Edit Customer" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    class="bi bi-pencil-square edit" viewBox="0 0 16 16">
                                    <path
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fill-rule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </svg>
                                <svg data-bs-toggle="tooltip" data-bs-title="Delete Customer" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    class="bi bi-trash delete" viewBox="0 0 16 16">
                                    <path
                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                    <path
                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                </svg>
                            </div>
                        </td>
                    </tr>
                `);
                });
                const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
                const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
                if (!itemList.length) {
                    $("#tbl-items tfoot").show();
                } else {
                    $("#tbl-items tfoot").hide();
                }

            } else {
                tbodyElm.empty();
                $("#tbl-items tfoot").show();
                showToast('error', 'Failed', 'Failed to fetch items');
                // console.log(JSON.parse(xhr.responseText));
            }
        }
    });

    const searchText = $("#txt-search").val()?.trim();
    const query = (searchText) ? `?q=${searchText}` : "";

    xhr.open('GET', `${REST_API_BASE_URL}/items` + query, true);

    const tfoot = $("#tbl-items tfoot tr td:first-child");
    xhr.addEventListener('loadstart', () => tfoot.text('Please wait!'));
    xhr.addEventListener('loadend', () => tfoot.text('No Items records are found!'));

    xhr.send();
}

getItems();
$("#txt-search").on('input', () => getItems());


tbodyElm.on('click', ".delete", (eventData) => {
    /* XHR -> jQuery AJAX */
    console.log($(eventData.target).parents("tr").children("td:first-child").text());
    const id = +$(eventData.target).parents("tr").children("td:first-child").text().replace('C', '');
    const xhr = new XMLHttpRequest();
    const jqxhr = $.ajax(`${REST_API_BASE_URL}/items/${id}`, {
        method: 'DELETE', xhr: () => xhr           // This is a hack to obtain the xhr that is used by jquery
    });
    showProgress(xhr);
    jqxhr.done(() => {
        showToast('success', 'Deleted', 'Items has been deleted successfully');
        $(eventData.target).tooltip('dispose');
        getItems();
    });
    jqxhr.fail(() => {
        showToast('error', 'Failed', "Failed to delete the item, try again!");
    });

    /*
    *   const jqxhr = $.ajax(url, {
    *               method: 'GET',
    *               contentType: 'application/json',
    *               data: 'Request Body'
    *           });
    *
    *   jqxhr.done((response, status)=> {});
    *   jqxhr.fail(()=> {});
    *   jqxhr.always(()=> {});
    *
    * */
});


tbodyElm.on('click', ".edit", (eventData) => {
    modalElm.modal("show");
    btnSave.text("Update Item");
    modalElm.find("h1").text("Update Item");

    let trElm = $(eventData.target).parents("tr");
    txtCode[0].disabled = true;
    console.log(txtCode.parent());
    txtDescription.val($(trElm).children("td:nth-child(2)").text());
    txtCode.val(+$(trElm).children("td:first-child").text());
    txtQty.val($(trElm).children("td:nth-child(3)").text());
    txtPrice.val($(trElm).children("td:nth-child(4)").text());
});


$("#btn-new-item").on('click', () => {
    txtCode[0].disabled = false;
    btnSave.text("Save Item");
    modalElm.find("h1").text("Add new Item");
});
