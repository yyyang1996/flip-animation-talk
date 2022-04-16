let tasks: Array<() => void> = []
let rid: number | null = null

export function pushTask(task: () => void) {
  tasks.push(task)
}

export function flushTasks() {
  if (rid !== null) {
    return
  }
  rid = requestAnimationFrame(() => {
    tasks.forEach(task => task())
    tasks = []
    rid = null
  })
}
