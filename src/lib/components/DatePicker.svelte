<script lang="ts">
    export let fromDate, untilDate;
    import flatpickr from "flatpickr";
    import { onMount } from "svelte";

    onMount(() => {
        flatpickr("#startDate", {});
        flatpickr("#endDate", {});
    });
</script>

<div class="date">
    <div>Tanggal:</div>
    <div class="item">
        <input id="startDate" bind:value={fromDate} /> s/d
        <input id="endDate" bind:value={untilDate} />
    </div>
</div>

<style lang="scss">
    #startDate,
    #endDate {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px;
        text-align: center;
        width: 128px;
        font-size: 1em;
    }
    div.date {
        margin: 4px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        & > div {
            margin: 0 4px;
        }
    }
</style>
