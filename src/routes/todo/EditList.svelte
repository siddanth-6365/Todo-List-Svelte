<script lang="ts">
  import { listStore, CurrentListStore } from "./stores/todo";
  import { writable } from 'svelte/store';

  interface ListItem {
    id: number;
    title: string;
    desc: string;
  }

  let id: number;
  let selectedItem: ListItem | null = null;

  // Subscribe to CurrentListStore and update id
  CurrentListStore.subscribe((value) => {
    id = value;
  });

  const typedListStore = writable<ListItem[]>([]);
  listStore.subscribe((value) => {
    typedListStore.set(value);
  });

  $: {
    id = $CurrentListStore;
    selectedItem = $typedListStore.find((item) => item.id === +id) || null;
  }

  function handleTitleChange(event: Event) {
    if (selectedItem) {
      selectedItem.title = (event.target as HTMLInputElement).value;
      typedListStore.update((arr) => [...arr]);
    }
  }

  function handleDescChange(event: Event) {
    if (selectedItem) {
      selectedItem.desc = (event.target as HTMLTextAreaElement).value;
      typedListStore.update((arr) => [...arr]);
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

<style>
  /* Your styles here */
</style>
