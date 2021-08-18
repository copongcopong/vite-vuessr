import { useContext } from 'vite-ssr'
import { useRoute } from 'vue-router'
import { inject, ref } from 'vue'

export { usePageState }

async function usePageState (load) {
  if (import.meta.env.VITE_STACK_MODE === 'spa') {
    console.warn('usePageState is for SSR state hydration only. will still work in spa.')
    const pagestate = ref();
    pagestate.value = await load();
    return pagestate;
  }

  const { initialState } = useContext()
  const { name } = useRoute() // this is just a unique key
  const state = ref(initialState[name] || null)

  if (!state.value) {
    state.value = await load()

    if (import.meta.env.SSR) {
      initialState[name] = state.value
    }
  }

  return state
}