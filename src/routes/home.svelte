<script lang="ts">
    import DatePicker from "$lib/components/DatePicker.svelte";
    import { post } from "$lib/http";
    import Button, { Label } from "@smui/button";
    import DownloadButton from "$lib/components/DownloadButton.svelte";

    let items = [];
    let totalCount = 0;
    let totalPrice = 0,
        totalQuantity = 0;

    const date = new Date();
    let fromDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    let untilDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    function search() {
        post("/api/package", { from: fromDate, until: untilDate }).then(
            (resp) => {
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
                }
            }
        );
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
        <Button variant="raised" on:click={search} color="secondary"
            ><Label>Search</Label></Button
        >

        <DownloadButton />
        <div class="total">
            <div>Count: {totalCount}</div>
            <div>Quantity: {totalQuantity}</div>
            <div>Price: {totalPrice}</div>
        </div>
    </div>

    {#if items.length > 0}
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
    {/if}
</div>

<style lang="scss">
    @import "../theme/color.scss";

    div.container {
        display: flex;
        flex-direction: column;
        width: fit-content;
        min-width: 100%;
    }

    div.header {
        background-color: $primary;
        color: $primary-text;
        padding: 4px;
        display: flex;
        flex-direction: row;
        align-items: center;

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
