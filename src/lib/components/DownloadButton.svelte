<script lang="ts">
    import IconButton from "@smui/icon-button";
    import Button, { Label } from "@smui/button";
    import Dialog, { Content, Actions, Title } from "@smui/dialog";
    import { onMount } from "svelte";
    import flatpickr from "flatpickr";
    import { get, post } from "$lib/http";
    import Tooltip, { Wrapper } from "@smui/tooltip";

    let open: boolean = false;

    let filters;
    let fromDate, untilDate;

    onMount(() => {
        flatpickr("#startDate", {});
        flatpickr("#endDate", {});

        post("/api/download/filter").then((resp) => {
            if (resp.status == 0) {
                filters = resp.data;
            }
        });
    });

    function download(filterID) {
        console.log(filterID);
        get(
            "/api/download/do?from=" +
                fromDate +
                "&until=" +
                untilDate +
                "&filter_id=" +
                filterID
        ).then((resp) => {
            window.open("downloads/" + resp.data, "_blank");
            // console.log(resp);
        });
    }
</script>

<Wrapper>
    <IconButton
        class="material-icons"
        aria-label="Download"
        on:click={() => (open = true)}>file_download</IconButton
    >

    <Tooltip xPos="start">Download</Tooltip>
</Wrapper>

<Dialog bind:open>
    <Title>Download</Title>
    <Content>
        <div class="page">
            Untuk mendownload silakan pilih tanggal terlebih dahulu.
            <div class="date">
                <div>Tanggal:</div>
                <div class="item">
                    <input id="startDate" bind:value={fromDate} /> s/d
                    <input id="endDate" bind:value={untilDate} />
                </div>
            </div>
            <div class="filter">
                {#if filters != null}
                    {#each filters as filter}
                        <div>
                            <Button
                                variant="raised"
                                on:click={() => download(filter.id)}
                                ><Label>{filter.name}</Label></Button
                            >
                        </div>
                    {/each}
                {/if}
            </div>
        </div>
    </Content>

    <Actions />
</Dialog>

<style lang="scss">
    #startDate,
    #endDate {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px;
        text-align: center;
        width: 128px;
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

    div.filter {
        display: flex;
        margin-top: 16px;
        flex-direction: row;
        justify-content: center;
        & > div {
            margin: 0 4px;
        }
    }
</style>
