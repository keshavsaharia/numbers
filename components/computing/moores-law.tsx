import { Interactive } from "../number/interactive";

export function MooresLaw() {
  return (
    <Interactive instructions=''>
      <div className="flex flex-col gap-4">
        <div className="relative w-full h-60 bg-zinc-700 rounded-lg">
            chart
        </div>
        <div className="flex flex-col gap-2">
          Select dropdowns
        </div>
      </div>
    </Interactive>
  )
}