<script lang="ts">
  import FileInput from './FileInput.svelte';
  import UserInfo from './UserInfo.svelte';
</script>

<style>
  #imageSource {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    color: white;
    font-size: .8rem;
  }

  .container {
    display: grid;
    place-items: center;
  }
</style>


<div class='container'>
  <UserInfo />
  <FileInput />
</div>

<a href='https://www.reddit.com/r/wallpaper/comments/czy4y7/digital_art_3840_x_2160/' id='imageSource'>
  https://www.reddit.com/r/wallpaper/comments/czy4y7/digital_art_3840_x_2160/
</a>
