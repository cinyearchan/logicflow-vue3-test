import { ref } from "vue";

export function useState(initialState?: any) {
  const state = ref(initialState || undefined);
  const setState = (newState?: any) => {
    state.value = newState || undefined;
  };

  return [state, setState];
}
