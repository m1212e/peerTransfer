<script>
  var isConnected = false;
  var oponentID = '888-888-888';
</script>

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
    margin-bottom: .5rem;
    color: white;
    font-size: 1.3rem;
  }
</style>

<div class='container'>
  <div class='userID'><p class='text'>My UserID: 999-999-999</p></div>

  {#if isConnected}
    <div class='connect'>
      <span class='text'>Connected with: {oponentID}</span>
      <button on:click={() => isConnected = !isConnected} id='disconnectButton'>Disconnect</button>
    </div>
  {:else}
    <div class='connect'>
      <span class='text'>Connect with: <input type='text' /></span>
      <button on:click={() => isConnected = !isConnected} id='connectButton'>Connect</button>
    </div>
  {/if}

</div>