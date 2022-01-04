<script lang="ts">
    import { goto } from "$app/navigation";

    import { get } from "$lib/http";

    import { onMount } from "svelte";

    onMount(() => {
        get("/api/user/logout").then((resp) => {
            if (resp.status == 0) goto("/user/login");
        });
    });
</script>

Logout
