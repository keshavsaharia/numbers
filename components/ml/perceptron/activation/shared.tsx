export function ActivationFunctionTitle({ name }: { name: string }) {
  return (
    <p className="text-xs text-center text-zinc-500 dark:text-zinc-400 py-1"><code className="font-mono dark:bg-zinc-700 bg-zinc-300 px-1 rounded-md">{name}</code> function</p>
  )
}