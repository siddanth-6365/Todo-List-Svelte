<script>
  import { listStore, CurrentListStore } from "./stores/todo";

  let id;
  let selectedItem = null;

  // Subscribe to CurrentListStore and update id
  CurrentListStore.subscribe((value) => {
    id = value;
  });

  $: {
    id = $CurrentListStore;
    selectedItem = $listStore.find((item) => item.id === +id);
  }

  function handleTitleChange(event) {
    if (selectedItem) {
      selectedItem.title = event.target.value;
      listStore.update((arr) => [...arr]);
    }
  }

  function handleDescChange(event) {
    if (selectedItem) {
      selectedItem.desc = event.target.value;
      listStore.update((arr) => [...arr]);
    }
  }
</script>

<div class="w-full max-w-md mx-auto p-4">
  {#if selectedItem}
    <label class="block mb-2 font-semibold">Title:</label>
    <input
      type="text"
      class="w-full border p-2 rounded"
      bind:value={selectedItem.title}
      on:input={handleTitleChange}
    />

    <label class="block mt-4 mb-2 font-semibold">Description:</label>
    <textarea
      class="w-full border p-2 rounded"
      bind:value={selectedItem.desc}
      on:input={handleDescChange}
    />
  {:else}
    <p class="text-red-500">Item not found.</p>
  {/if}
</div>
