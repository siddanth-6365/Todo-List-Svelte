<script>
  import AddList from "./AddList.svelte";
  import DislplayLists from "./DislplayLists.svelte";
  import EditList from "./EditList.svelte";
</script>

<div class="w-[100%] flex mt-4">
  <!--create new div-->
  <div class="w-[30%] p-6 font-mono ">
    <h2 class="text-2xl font-mono underline underline-offset-8 mb-4 ">Add new List :</h2>
    <AddList />
  </div>

  <!--Display -->
  <div class="font-mono mt-6 w-[40%]">
    <h2 class="text-2xl font-mono underline underline-offset-8 ">To Complete list :</h2>
    <DislplayLists />
  </div>

  <div class="font-mono mt-6  w-[30%]">
    <h2 class="text-2xl font-mono underline underline-offset-8 ">Edit list:</h2>
    <EditList />
  </div>


</div>
