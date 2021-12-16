<script>
    import { goto } from "$app/navigation";

    import Navbar from "$lib/components/Navbar.svelte";
    import { get } from "$lib/http";
    import { onMount } from "svelte";

    let hasLogin = false;

    onMount(() => {
        get("/api/user/profile").then((resp) => {
            switch (resp.status) {
                case 0:
                    hasLogin = true;
                    break;
                case 401:
                    goto("/user/login");
                default:
                //TODO error
            }
        });
    });
</script>

{#if hasLogin}
    <Navbar />
    <slot />
{/if}
