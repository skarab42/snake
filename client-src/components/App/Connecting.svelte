<script>
  import Icon from "@/components/UI/Icon.svelte";
  import Overlay from "@/components/UI/Overlay.svelte";
  import FaSpinner from "svelte-icons/fa/FaSpinner.svelte";
</script>

<Overlay>
  <div class="m-auto">
    <div class="p-2 flex gap-2 bg-gray-700 rounded">
      <div class="animate-spin">
        <Icon icon="{FaSpinner}" />
      </div>
      <div>Connecting...</div>
    </div>
  </div>
</Overlay>
