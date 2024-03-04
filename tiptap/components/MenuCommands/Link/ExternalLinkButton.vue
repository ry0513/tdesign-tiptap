<template>
  <CommandButton
    :command="openLink"
    tooltip="查看链接"
    icon="external-link"
    :isActive="false"
  />
</template>
<script lang="ts" setup>
import CommandButton from "../CommandButton.vue";

const props = defineProps<{
  url?: string;
}>();

const openLink = () => {
  if (props.url) {
    const newTab = window.open();
    if (newTab) {
      newTab.opener = null;
      newTab.location.href = props.url;
    }
  }
};
</script>
