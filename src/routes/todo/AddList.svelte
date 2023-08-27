<script>
  import { listStore } from "./stores/todo";

  let listArr = [];
  listStore.subscribe((value) => {
    listArr = value;
  });

  let titleInput = "";
  let descInput = "";

  function AddNewList() {
    if (titleInput && descInput) {
      const newNote = {
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
