<script lang="ts">
    import { post } from "$lib/http";

    import { onMount } from "svelte";

    let data;

    post("/api/package").then((resp) => {
        if (resp.status == 0) data = resp.data;
    });
</script>

{#if data != null}
    <table>
        <tr>
            <th>Parter TrxID</th>
            <th>Date</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Sender Name</th>
            <th>Sender Province</th>
            <th>Receiver Name</th>
            <th>Receiver Province</th>
            <th>Transporter</th>
        </tr>
        {#each data as item}
            <tr>
                <td>{item.partner_trx_id}</td>
                <td>{item.date}</td>
                <td>{item.product_name}</td>
                <td class="number">{item.product_price}</td>
                <td>{item.sender_name}</td>
                <td>{item.sender_province}</td>
                <td>{item.receiver_name}</td>
                <td>{item.sender_province}</td>
                <td class="center">{item.shipment_type}</td>
            </tr>
        {/each}
    </table>
{/if}

<style lang="scss">
    table {
        font-size: 0.8em;
        border-spacing: 0;

        & th {
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
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
