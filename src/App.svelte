<script lang="ts">
  import { recievedFiles } from "./connectionService";

  import FileInput from "./FileInput.svelte";
  import { saveFile } from "./helpers";
  import UserInfo from "./UserInfo.svelte";
</script>

<div class="container">
  <UserInfo />
  <FileInput />
  {#each $recievedFiles as file}
    <button style="cursor: pointer;" on:click={() => saveFile(file)}>
      <h1>{file.name}</h1>
    </button>
  {/each}
</div>

<a
  href="https://www.reddit.com/r/wallpaper/comments/czy4y7/digital_art_3840_x_2160/"
  id="imageSource"
>
  https://www.reddit.com/r/wallpaper/comments/czy4y7/digital_art_3840_x_2160/
</a>

<style>
  #imageSource {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    color: white;
    font-size: 0.8rem;
  }

  .container {
    display: grid;
    place-items: center;
  }
</style>
