type Listener<T> = (newValue: T | null) => void

export function createLocalStorageObserver<T>(key: string) {
  let listeners: Listener<T>[] = []

  function get(): T | null {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) as T : null
  }

  function set(value: T) {
    localStorage.setItem(key, JSON.stringify(value))
    notify()
    window.dispatchEvent(new CustomEvent(`localstorage-${key}`, { detail: value }))
  }

  function remove() {
    localStorage.removeItem(key)
    notify()
    window.dispatchEvent(new CustomEvent(`localstorage-${key}`, { detail: null }))
  }

  function subscribe(listener: Listener<T>) {
    listeners.push(listener)
    listener(get())

    window.addEventListener(`localstorage-${key}`, (e: Event) => {
      const customEvent = e as CustomEvent
      listener(customEvent.detail ?? null)
    })

    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  function notify() {
    const value = get()
    listeners.forEach(l => l(value))
  }

  window.addEventListener("storage", (e) => {
    if (e.key === key) {
      notify()
    }
  })

  return { get, set, remove, subscribe }
}
