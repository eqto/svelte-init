<script lang="ts">
    import Dialog, { Content, Actions, Title } from "@smui/dialog";
    import FileDrop from "filedrop-svelte";
    import Button, { Label } from "@smui/button";

    let open: boolean = false;

    let files: File[] = [];
    let uploading = false;

    function selectFile(ev) {
        const accepted = ev.detail.files.accepted;
        if (accepted.length > 0) {
            files = [...files, accepted[0]];
            const f: File = accepted[0];
            const xhr = new XMLHttpRequest();
            uploading = true;

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
    }
</script>

<Button variant="unelevated" color="secondary" on:click={() => (open = true)}>
    <Label>Upload</Label>
</Button>

<Dialog bind:open>
    <Title>Upload</Title>

    <Content>
        {#each files as file}
            <div class="filename">{file.name}</div>
        {/each}
        <FileDrop
            on:filedrop={selectFile}
            accept=".xls, .xlsx, csv"
            fileLimit={1}
            ><div class="drag-placeholder" class:uploading>
                Drag file atau klik disini
            </div></FileDrop
        >
    </Content>
</Dialog>

<style lang="scss">
    .drag-placeholder {
        margin-top: 16px;
        border: 1px solid #ccc;
        padding: 16px;
        border-radius: 8px;

        &.uploading {
            visibility: hidden;
        }
    }

    .filename {
        font-size: 0.9em;
        border-radius: 4px;
        padding: 4px;
        border: 1px solid #ccc;
        margin: 4px;
    }
</style>
