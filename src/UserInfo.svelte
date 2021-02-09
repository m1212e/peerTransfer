<script>
  import {
    connectedRemoteClientOutgoing,
    connectedToServer,
    endCurrentConnection,
    ownID,
    startConnectionWith,
  } from "./connectionService";

  let value = ''
</script>

<div class="container">
  <div class="userID"><p class="text">My UserID: {$ownID}</p></div>

  {#if $connectedToServer}
    <!-- Anmelden an Server erfolgreich abgeschlossen -->
    {#if $connectedRemoteClientOutgoing != undefined}
      <div class="connect">
        <span class="text">
          Connected with: {$connectedRemoteClientOutgoing?.peer}
        </span>
        <button on:click={() => endCurrentConnection()}>Disconnect</button>
      </div>
    {:else}
      <div class="connect">
        <span class="text">
          Connect with: <input bind:value type="text" />
        </span>
        <button on:click={() => startConnectionWith(value)}>Connect</button>
      </div>
    {/if}
  {/if}
</div>

<style>
  .userID {
    display: inline-block;
    margin: 1rem;
  }

  .connect {
    display: inline-block;
    margin-top: 3rem;
  }

  .text {
    margin-bottom: 0.5rem;
    color: white;
    font-size: 1.3rem;
  }
</style>
