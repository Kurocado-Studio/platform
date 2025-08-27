<script setup lang="ts">
import {
  type ThemeProviderProps,
  ThemeProviderSymbol,
  composeThemeProvider,
} from '@kurocado-studio/ui-kit-domain';
import { set } from 'lodash-es';
import { onBeforeUnmount, onMounted, provide, ref, toRef, watch, type Ref } from 'vue';

const props = defineProps<{
  cssVariables?: Record<string, unknown>;
}>();

// Narrow to a single ref for the prop
const cssVariables = toRef(props, 'cssVariables');

const themeProvider = composeThemeProvider();
const styleElRef = ref<HTMLStyleElement | null>(null);

// Always a concrete object; start with {} or the provided value
const cssVariablesMap: Ref<Record<string, unknown>> = ref(cssVariables.value ?? {});

// Keep cssVariablesMap in sync if the prop changes
watch(
    cssVariables,
    (next) => {
      cssVariablesMap.value = next ?? {};
      handleVariablesMap(cssVariablesMap.value);
    },
    { immediate: true, deep: true }
);

function handleVariablesMap(theme: Record<string, unknown>): void {
  styleElRef.value = themeProvider.handleVariablesMap(styleElRef.value, theme);
}

function toggleLightDarkTheme(): void {
  themeProvider.handleToggleLightDarkTheme();
}

function setThemeVariable(variableName: string, variableValue: string): void {
  const payload = themeProvider.handleSetThemeVariable({ variableName, variableValue });
  if (payload) {
    set(cssVariablesMap.value, [payload.variableName], payload.variableValue);
    handleVariablesMap(cssVariablesMap.value);
  }
}

const providerValue: ThemeProviderProps = {
  setTheme: handleVariablesMap,
  setThemeVariable,
  toggleLightDarkTheme,
};

provide(ThemeProviderSymbol, providerValue);

onMounted(() => {
  handleVariablesMap(cssVariablesMap.value);
});

onBeforeUnmount(() => {
  styleElRef.value?.remove();
  styleElRef.value = null;
});
</script>
