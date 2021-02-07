<script>
  import MdArrowBack from "svelte-icons/md/MdArrowBack.svelte";
  import Icon from "@/components/UI/Icon.svelte";
  import Link from "@/router/Link.svelte";
</script>

<Link path="/">
  <div class="p-1 bg-pink-600 rounded-full">
    <Icon icon="{MdArrowBack}" />
  </div>
</Link>
