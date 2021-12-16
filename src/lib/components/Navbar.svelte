<script lang="ts">
    import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
    import IconButton from "@smui/icon-button";
    import Dialog, { Content, Actions } from "@smui/dialog";
    import Button, { Label } from "@smui/button";

    function upload() {}

    let showUpload;
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
    <Title>
        <Row>
            <Section>Upload</Section>
            <Section align="end">
                <IconButton
                    class="material-icons"
                    on:click={() => (showUpload = false)}>cancel</IconButton
                >
            </Section>
        </Row>
    </Title>

    <Content>Disini Content baris dua</Content>
    <!-- <Actions>
        <Button on:click={() => (clicked = "No")}>
            <Label>No</Label>
        </Button>
        <Button on:click={() => (clicked = "Yes")}>
            <Label>Yes</Label>
        </Button>
    </Actions> -->
    <Actions />
</Dialog>

<style lang="scss">
    .container {
        background-color: var(--primary);
        min-height: 64px;
    }
</style>
