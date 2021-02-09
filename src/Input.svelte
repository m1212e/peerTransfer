<script lang="ts">
    let value: string = "";
    $: console.log(value);
</script>

<input type="text" bind:value>