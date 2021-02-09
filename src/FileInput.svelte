<script lang="ts">
  import { sendFiles } from "./connectionService";

  function processFiles(event) {
    sendFiles(event.target.files);
  }
</script>

<input
  multiple
  type="file"
  class="container"
  on:input={(i) => processFiles(i)}
/>

<style>
  .container {
    display: inline-block;
    margin-top: 5rem;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 3rem;
    padding: 5rem;
    position: relative;
    z-index: 1;
    backdrop-filter: blur(10px);
    border: solid 2px transparent;
    background-clip: padding-box;
    box-shadow: 10px, 10px, 10px, rgba(46, 54, 68, 0.03);
  }
</style>
