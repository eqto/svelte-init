<script lang="ts">
    import Card, { Content } from "@smui/card";
    import Textfield from "@smui/textfield";
    import Button, { Label } from "@smui/button";
    import { post } from "$lib/http";
    import { md5 } from "$lib/md5";
    import Snackbar, { Actions, SnackbarComponentDev } from "@smui/snackbar";
    import IconButton from "@smui/icon-button";
    import { goto } from "$app/navigation";

    var username = "",
        password = "";

    var disabled = false;
    var snackbar: SnackbarComponentDev;
    var snackMessage = "";

    function submit() {
        if (username.trim() == "" || password.trim() == "") return;

        const time = Math.floor(new Date().getTime() / 1000);
        const sig = md5(md5(username + password) + time);

        disabled = true;
        post("/api/user/login", {
            username: username,
            sig: sig,
            time: time,
        })
            .then((resp) => {
                if (resp.status == 0) {
                    goto("/home");
                } else {
                    snackMessage = resp.message;
                    snackbar.open();
                }
            })
            .finally(() => (disabled = false));
    }
</script>

<div class="container">
    <Card variant="outlined" padded>
        <Content>
            <h1>Login</h1>
            <div class="form">
                <Textfield
                    type="text"
                    label="Username"
                    bind:value={username}
                    bind:disabled
                />
                <Textfield
                    type="password"
                    label="Password"
                    bind:value={password}
                    bind:disabled
                />
                <Button variant="raised" bind:disabled on:click={submit}
                    ><Label>Login</Label></Button
                >
            </div>
        </Content>
    </Card>
</div>

<Snackbar bind:this={snackbar}>
    <Label>{snackMessage}</Label>
    <Actions>
        <IconButton class="material-icons" title="Dismiss">close</IconButton>
    </Actions>
</Snackbar>

<style lang="scss">
    h1 {
        font-size: 1.3em;
        margin: 0;
        text-align: center;
    }
    .container {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        & .form {
            display: flex;
            flex-direction: column;

            & > :global(*) {
                margin: 8px 0;
            }
        }
    }
</style>
