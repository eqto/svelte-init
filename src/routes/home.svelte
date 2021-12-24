<script lang="ts">
    import DatePicker from "$lib/components/DatePicker.svelte";
    import DownloadMenu from "$lib/components/DownloadMenu.svelte";
    import UploadButton from "$lib/components/UploadButton.svelte";
    import { post } from "$lib/http";
    import Button, { Label } from "@smui/button";

    let items = [];
    let totalCount = 0;
    let totalPrice = 0,
        totalQuantity = 0;

    let page = 0,
        totalPages;
    let viewedPages = [];

    const date = new Date();
    let fromDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    let untilDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    function search(newPage) {
        post("/api/package", {
            from: fromDate,
            until: untilDate,
            page: newPage,
        }).then((resp) => {
            if (resp.status == 0 && resp.data != null) {
                const data = resp.data as any;
                items = [];

                data.items.forEach((el) => {
                    const item = el;
                    item["sender"] = JSON.parse(el["sender"]);
                    item["receiver"] = JSON.parse(el["receiver"]);
                    items = [...items, item];
                });
                totalCount = data.total_count;
                totalPrice = data.total_price;
                totalQuantity = data.total_quantity;
                newPage = data.page;
                totalPages = Math.ceil(totalCount / 100);
                viewedPages = [newPage];

                for (let i = newPage - 1; i > 0 && i > newPage - 5; i--) {
                    viewedPages.unshift(i);
                }
                if (newPage > 0) viewedPages.unshift(0);

                for (
                    let i = newPage + 1;
                    i < newPage + 5 && i < totalPages - 1;
                    i++
                ) {
                    viewedPages.push(i);
                }
                if (newPage < totalPages - 1) viewedPages.push(totalPages - 1);
            }
        });
    }

    function calcInsurance(price: number) {
        if (price >= 75000 && price < 5000000) return "Qoala";
        else if (price >= 500000) return "Paspol";
        return "";
    }
</script>

<div class="container">
    <div class="header">
        <div>
            <DatePicker bind:fromDate bind:untilDate />
        </div>
        <Button
            variant="unelevated"
            on:click={() => search(page)}
            color="secondary"><Label>Search</Label></Button
        >

        <UploadButton />
        <DownloadMenu bind:from={fromDate} bind:until={untilDate} />

        <div class="total">
            <div>Count: {totalCount}</div>
            <div>Quantity: {totalQuantity}</div>
            <div>Price: {totalPrice}</div>
        </div>
    </div>

    {#if items.length > 0}
        <div class="content">
            <table>
                <tr>
                    <th>Parter TrxID</th>
                    <th>Product Name</th>
                    <th>Product ID</th>
                    <th>Qty</th>
                    <th>Package Type</th>
                    <th>Price</th>
                    <th>Sender Name</th>
                    <th>Sender Phone</th>
                    <th>Sender Email</th>
                    <th>Origin Address</th>
                    <th>Origin District</th>
                    <th>Origin City</th>
                    <th>Origin Province</th>
                    <th>Origin Country</th>
                    <th>Origin Zipcode</th>
                    <th>Receiver Name</th>
                    <th>Receiver Phone</th>
                    <th>Receiver Email</th>
                    <th>Destination Address</th>
                    <th>Destination District</th>
                    <th>Destination City</th>
                    <th>Destination Province</th>
                    <th>Destination Country</th>
                    <th>Destination Zipcode</th>
                    <th>Shipment Date</th>
                    <th>Shipment Code</th>
                    <th>Shipment Cost</th>
                    <th>Transporter</th>
                    <th>Driver Name</th>
                    <th>Cargo Type</th>
                    <th>Asuransi</th>
                </tr>
                {#each items as item}
                    <tr>
                        <td>{item.partner_trx_id}</td>
                        <td>{item.product_name}</td>
                        <td>{item.product_id}</td>
                        <td class="number">{item.quantity}</td>
                        <td>{item.package_type}</td>
                        <td class="number">{item.product_price}</td>
                        <td>{item.sender.name}</td>
                        <td>{item.sender.phone}</td>
                        <td>{item.sender.email}</td>
                        <td>{item.sender.address}</td>
                        <td>{item.sender.district}</td>
                        <td>{item.sender.city}</td>
                        <td>{item.sender.province}</td>
                        <td>{item.sender.country}</td>
                        <td>{item.sender.postal_code}</td>
                        <td>{item.receiver.name}</td>
                        <td>{item.receiver.phone}</td>
                        <td>{item.receiver.email}</td>
                        <td>{item.receiver.address}</td>
                        <td>{item.receiver.district}</td>
                        <td>{item.receiver.city}</td>
                        <td>{item.receiver.province}</td>
                        <td>{item.receiver.country}</td>
                        <td>{item.receiver.postal_code}</td>
                        <td>{item.date}</td>
                        <td>{item.shipment_code}</td>
                        <td>{item.shipment_cost}</td>
                        <td class="center">{item.shipment_type}</td>
                        <td>{item.driver_name}</td>
                        <td>{item.cargo_type}</td>
                        <td>{calcInsurance(item.product_price)}</td>
                    </tr>
                {/each}
            </table>
        </div>
        <div class="footer">
            {#each viewedPages as page}
                <button on:click={() => search(page)}>{page + 1}</button>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    @import "../theme/color";

    div.container {
        display: flex;
        flex-direction: column;
        width: fit-content;
        min-width: 100%;
    }

    div.header {
        background-color: $primary;
        color: $primary-text;
        height: 48px;
        padding: 4px;
        position: fixed;
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        box-shadow: 0 0 5px #000;

        & .total {
            display: flex;
            flex-direction: row;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: 0 0 4px #ccc;
            padding: 8px;
            margin-left: 16px;
            color: $primary;
            background-color: $surface;
            & > div {
                margin: 5px;
            }
        }
        & > :global(*) {
            margin: 4px;
        }
    }

    div.content {
        margin-top: 54px;
        margin-bottom: 54px;
    }

    div.footer {
        position: fixed;
        bottom: 8px;
        right: 16px;
        max-width: 100%;
        display: flex;
        box-shadow: 0 0 4px #000;
        padding: 8px;
        height: 24px;
        border-radius: 8px;
        background-color: #eee;

        & button {
            cursor: pointer;
            border: 0;
            border-radius: 4px;
            font-size: 1em;

            &:hover {
                color: #fff;
                background-color: $secondary;
            }
        }
    }

    table {
        font-size: 0.8em;
        border-spacing: 0;

        & th {
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
        }

        & td {
            border-bottom: 1px solid #eee;
        }

        & tr:last-child td {
            border-bottom: 1px solid #ccc;
        }

        & td,
        th {
            border-left: 1px solid #ccc;
            padding: 4px;

            &:last-child {
                border-right: 1px solid #ccc;
            }
        }
        & td.number {
            text-align: right;
        }
        & td.center {
            text-align: center;
        }
    }
</style>
