<script lang="ts">
    import Button, { Label } from "@smui/button";
    import Menu, { MenuComponentDev } from "@smui/menu";
    import List, { Item, Separator, Text } from "@smui/list";

    let menu: MenuComponentDev;

    export let from, until;

    function download(filterID) {
        window.open(
            "/api/download/do?from=" +
                from +
                "&until=" +
                until +
                "&filter_id=" +
                filterID
        );
    }
</script>

<div style="min-width: 100px;">
    <Button
        variant="unelevated"
        color="secondary"
        on:click={() => menu.setOpen(true)}
    >
        <Label>Download</Label>
    </Button>
    <Menu bind:this={menu}>
        <List>
            <Item on:SMUI:action={() => download(1)}>
                <Text>Paspol</Text>
            </Item>
            <Item on:SMUI:action={() => download(2)}>
                <Text>Qoala</Text>
            </Item>
            <Separator />
            <Item on:SMUI:action={() => download(3)}>
                <Text>Sicepat</Text>
            </Item>
        </List>
    </Menu>
</div>
