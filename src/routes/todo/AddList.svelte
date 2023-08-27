<script lang="ts">
  import { listStore } from "./stores/todo";
  import { writable } from 'svelte/store';

  interface ListItem {
    id: number;
    title: string;
    desc: string;
  }

  const typedListStore = writable<ListItem[]>([]);
  listStore.subscribe((value) => {
    typedListStore.set(value);
  });

  let listArr: ListItem[] = [];
  typedListStore.subscribe((value) => {
    listArr = value;
  });

  let titleInput = "";
  let descInput = "";

  function AddNewList() {
    if (titleInput && descInput) {
      const newNote: ListItem = {
        id: Math.floor(Math.random() * 1000),
        title: titleInput,
        desc: descInput,
      };
      listStore.update((arr) => [...arr, newNote]);

      titleInput = "";
      descInput = "";
    }
  }
</script>

<form class="w-[60%]">
  Title:
  <input type="text" bind:value={titleInput} />
  Description:
  <textarea bind:value={descInput} />
  <button class="mt-4 p-3" on:click={AddNewList}>Add</button>
</form>


