import { ref } from 'vue';

export const useLoading = (triggerFn: () => Promise<any>) => {
  const isLoading = ref(false)
  const run = () => {
    isLoading.value = true;

    return triggerFn()
      .finally(() => isLoading.value = false);
  }

  return { isLoading, run };
}
