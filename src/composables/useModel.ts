import { ref } from 'vue';
import { useLoading } from '~/composables/useLoading';

export const useModel = <T>(query: () => Promise<T>) => {
  const model = ref<T | undefined>();
  const { isLoading, run } = useLoading(query);

  return {
    model,
    isLoading,
    run() {
      return run().then((data) => model.value = data);
    },
  }
};
