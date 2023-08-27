<script lang="ts">
  import { listStore, CurrentListStore } from "./stores/todo";
  import { readable, writable } from 'svelte/store';

  interface ListItem {
    id: number;
    title: string;
    desc: string;
  }

  let listArr: ListItem[] = [];
  listStore.subscribe((value) => {
    listArr = value;
  });

  const typedListStore = readable<ListItem[]>([], (set) => {
    listStore.subscribe((value) => {
      set(value);
    });
  });

  let id: number = 0;

  $: {
    id = $CurrentListStore;
  }

  const DeleteList = (itemIdToDelete: number) => {
    listStore.update((arr) => {
      return arr.filter((existingItem) => existingItem.id !== itemIdToDelete);
    });
    const idd: number = 1;
    CurrentListStore.update(() => idd);
  };

  const SetCurrentList = (itemId: number) => {
    CurrentListStore.update(() => itemId);
  };
</script>

<div class="flex flex-col mt-4">
  {#each listArr as item (item.id)}
    <div class="flex mb-2">
      <div
        class="flex w-96 flex-col border border-white rounded p-2 hover:bg-gray-800 cursor-pointer"
        on:click={() => {
          SetCurrentList(item.id);
        }}
        class:bg-gray-800={item.id === $CurrentListStore}
      >
        <span class="text-2xl capitalize font-semibold">{item.title}</span>
        <p class="text-sm text-gray-400">
          {#if item.desc.length < 10}
            {item.desc}
          {:else}
            {item.desc.slice(0, 10) + "..."}
          {/if}
        </p>
      </div>
      <div class="mt-4 ml-2 cursor-pointer" on:click={() => DeleteList(item.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"
          />
        </svg>
      </div>
    </div>
  {/each}
</div>

