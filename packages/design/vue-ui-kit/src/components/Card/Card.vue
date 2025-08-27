<template>
  <div :class="mergedClass" v-bind="$attrs"><slot></slot></div>
</template>

<script lang="ts" setup>
// import { cardComponentWrapperClasses } from '@kurocado-studio/ui-kit-domain';
import { get } from 'lodash-es';
import { twMerge } from 'tailwind-merge';
import { computed, useAttrs } from 'vue';

const cardPropsAttributes = useAttrs();

const mergedClass = computed(() => {
  return twMerge(
    get(cardPropsAttributes, ['class']) as string | undefined,
  );
});
</script>
