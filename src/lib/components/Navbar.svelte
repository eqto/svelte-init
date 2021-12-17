<script lang="ts">
    import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
    import IconButton from "@smui/icon-button";
    import Dialog, { Content, Actions } from "@smui/dialog";
    import FileDrop from "filedrop-svelte";
    // import type { Files } from "filedrop-svelte";
    // import Button, { Label } from "@smui/button";

    let files: File[] = [];
    let showUpload: boolean = false;

    function receiveFile(ev) {
        const accepted = ev.detail.files.accepted;
        if (accepted.length > 0) {
            files = [...files, accepted[0]];
            const f: File = accepted[0];
            const xhr = new XMLHttpRequest();

            xhr.upload.onprogress = (e) => {
                console.log(e.loaded, e.total);
            };
            xhr.upload.onload = function (e) {
                console.log("file upload");
            };
            xhr.open("POST", "/api/upload", true);
            const fm = new FormData();
            fm.append("file", f.slice(0, f.size), f.name);
            xhr.send(fm);
        }
        console.log(files);
    }
</script>

<TopAppBar variant="static" color="primary">
    <Row>
        <Section>
            <Title>Sicepat Asuransi</Title>
        </Section>
        <Section toolbar>
            <IconButton class="material-icons" aria-label="Download"
                >file_download</IconButton
            >
            <IconButton
                class="material-icons"
                aria-label="Upload"
                on:click={() => (showUpload = true)}>file_upload</IconButton
            >
        </Section>
    </Row>
</TopAppBar>

<Dialog bind:open={showUpload} scrimClickAction="" escapeKeyAction="">
    <Title>Upload</Title>

    <Content>
        {#each files as file}
            <div class="filename">{file.name}</div>
        {/each}
        <FileDrop
            on:filedrop={receiveFile}
            accept=".xls, .xlsx, csv"
            fileLimit={1}
            ><div class="drag-placeholder">
                Drag file atau klik disini
            </div></FileDrop
        >
    </Content>
    <Actions />
</Dialog>

<style lang="scss">
    .drag-placeholder {
        border: 1px solid #ccc;
        padding: 16px;
        border-radius: 8px;
    }

    .filename {
        font-size: 0.9em;
        border-radius: 4px;
        padding: 4px;
        border: 1px solid #ccc;
        margin: 4px;
    }

    .title {
        background-color: #ccc;
    }
</style>
