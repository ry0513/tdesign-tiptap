<template>
  <component :is="icon" class="t-icon" />
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent } from "vue";
const props = defineProps<{
  name: string;
}>();

const icon = computed(() => {
  return defineAsyncComponent(() => import(`../../icons/${props.name}.svg`));
});
</script>
