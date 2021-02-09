<script lang="ts">
    import {
        connectedToServer,
        connectedRemoteClientIncoming,
        endCurrentConnection,
        ownID,
        startConnectionWith,
        loading,
    } from "./connectionService";

    let value = "";
</script>

{#if $loading}
   <h1> loading...</h1>
{/if}

<h1>{$connectedToServer}</h1>
<h1>{$ownID}</h1>
<h1>Connected Client: {$connectedRemoteClientIncoming?.peer}</h1>

<input type="text" bind:value />
<button
    on:click={() => {
        startConnectionWith(value);
        value = "";
    }}>Connect!</button
>
<button on:click={() => endCurrentConnection()}>Verbindung abbrechen</button>
