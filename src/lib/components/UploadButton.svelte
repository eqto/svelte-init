<script lang="ts">
    import Dialog, { Content, Actions, Title } from "@smui/dialog";
    import FileDrop from "filedrop-svelte";
    import Button, { Label } from "@smui/button";

    let open: boolean = false;

    let file: File;
    let uploading = false;
    let percent = 0;

    function selectFile(ev) {
        const accepted = ev.detail.files.accepted;
        if (accepted.length > 0) {
            file = accepted[0];
            const xhr = new XMLHttpRequest();
            uploading = true;

            xhr.upload.onprogress = (e) => {
                percent = Math.ceil((100 * e.loaded) / e.total);
            };
            xhr.upload.onload = function (e) {
                uploading = false;
                file = null;
                percent = 0;
            };
            xhr.open("POST", "/api/upload", true);
            const fm = new FormData();
            fm.append("file", file.slice(0, file.size), file.name);
            xhr.send(fm);
        }
    }
</script>

<Button variant="unelevated" color="secondary" on:click={() => (open = true)}>
    <Label>Upload</Label>
</Button>

<Dialog bind:open scrimClickAction="" escapeKeyAction="">
    <Title>Upload</Title>

    <Content>
        {#if file != null}
            <div class="filename">
                <div class="name">{file.name}</div>
                <div class="progress" style="width:{percent}%" />
            </div>
        {:else}
            <FileDrop
                on:filedrop={selectFile}
                accept=".xls, .xlsx, csv"
                fileLimit={1}
                ><div class="drag-placeholder" class:uploading>
                    Drag file atau klik disini
                </div></FileDrop
            >
            <div class="footer">
                <Button on:click={() => (open = false)}>Tutup</Button>
            </div>
        {/if}
    </Content>
</Dialog>

<style lang="scss">
    @import "../../theme/color";
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
        display: flex;
        flex-direction: column;
        font-size: 0.9em;
        border-radius: 4px;
        border: 1px solid #ccc;
        margin: 4px;
        justify-content: center;
        & .progress {
            border-radius: 4px;
            margin-top: 8px;
            width: 50%;
            height: 4px;
            background-color: $secondary;
        }
    }
    .footer {
        display: flex;
        flex-direction: row;
        justify-content: end;
        margin-top: 8px;
    }
</style>
