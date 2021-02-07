<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "@/components/UI/Icon.svelte";
  import MdKeyboardArrowUp from "svelte-icons/md/MdKeyboardArrowUp.svelte";
  import MdKeyboardArrowDown from "svelte-icons/md/MdKeyboardArrowDown.svelte";
  import MdKeyboardArrowLeft from "svelte-icons/md/MdKeyboardArrowLeft.svelte";
  import MdKeyboardArrowRight from "svelte-icons/md/MdKeyboardArrowRight.svelte";

  const inputs = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
    8: "up",
    2: "down",
    4: "left",
    6: "right",
  };

  const state = {
    up: false,
    down: false,
    left: false,
    right: false,
  };

  const dispatch = createEventDispatcher();

  document.addEventListener("keydown", (event) => {
    const action = inputs[event.key];
    if (action) {
      state[action] = true;
      dispatch("keydown", action);
    }
  });

  document.addEventListener("keyup", (event) => {
    const action = inputs[event.key];
    if (action) {
      state[action] = false;
      dispatch("keyup", action);
    }
  });

  function active(name, state) {
    return state[name] ? "text-pink-600" : "";
  }
</script>

<div class="w-20 grid grid-cols-3 gap-2">
  <div class="{active('up', state)} col-start-2 col-end-4">
    <Icon icon="{MdKeyboardArrowUp}" />
  </div>
  <div class="{active('left', state)}">
    <Icon icon="{MdKeyboardArrowLeft}" />
  </div>
  <div class="{active('right', state)} col-start-3">
    <Icon icon="{MdKeyboardArrowRight}" />
  </div>
  <div class="{active('down', state)} col-start-2 col-end-4">
    <Icon icon="{MdKeyboardArrowDown}" />
  </div>
</div>
