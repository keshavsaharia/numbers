"use client"

import { Interactive } from "@/components/number/interactive"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import clsx from "clsx"
import { useState } from "react"

function initializeGrid(s1: string, s2: string) {
  const grid: (number | null)[][] = [];

  for (let i = 0 ; i <= s2.length ; i++) {
    const row: (number | null)[] = [];
    for (let j = 0 ; j <= s1.length ; j++) {
      row.push(null);
    }
    grid.push(row);
  }

  return grid;
}

export function LevenshteinDistance({ a = "kitten", b = "sitting" }: { a?: string, b?: string } = {}) {
  const [s1, setS1] = useState(a)
  const [s2, setS2] = useState(b)
  const [grid, setGrid] = useState(initializeGrid(s1, s2))
  const [currentI, setCurrentI] = useState(-1)
  const [currentJ, setCurrentJ] = useState(-1)
  const [minValue, setMinValue] = useState(-1)
  const [speed, setSpeed] = useState(100)

  function startComputing() {
    if (s1.length == 0 || s2.length == 0) return;
    setGrid(initializeGrid(s1, s2))
    setTimeout(() => runStep(0), 10)
  }

  function setString1(e: React.ChangeEvent<HTMLInputElement>) {
    setS1(e.target.value)
    setGrid(initializeGrid(e.target.value, s2))
  }

  function setString2(e: React.ChangeEvent<HTMLInputElement>) {
    setS2(e.target.value)
    setGrid(initializeGrid(s1, e.target.value))
  }

  function runStep(step: number) {
    const i = Math.floor(step / (s1.length + 1))
    const j = (step % (s1.length + 1))
    setCurrentI(i)
    setCurrentJ(j)

    if (j == 0) {
      grid[i][j] = i
    }
    else if (i == 0) {
      grid[i][j] = j
    }
    else {
      const left = grid[i][j - 1]! + 1
      const top = grid[i - 1][j]! + 1
      const diagonal = grid[i - 1][j - 1]! + (s1[j - 1] === s2[i - 1] ? 0 : 1)
      const minValue = Math.min(left, top, diagonal)
      grid[i][j] = minValue
      setMinValue(minValue)
    }
    setGrid([ ...grid ])
    if (step < (s1.length + 1) * (s2.length + 1) - 1) {
      setTimeout(() => runStep(step + 1), speed)
    }
    else {
      setCurrentI(-1)
      setCurrentJ(-1)
      setMinValue(-1)
    }
  }

  const widthPercent = (100 / (s2.length + 2)) + '%'

  return (
    <Interactive
      instructions="Change the value of the two strings to see how the Levenshtein distance is computed."
    >
      <div className="grid grid-cols-5 gap-4 mb-4">
        <div className="col-span-2">
          <Input
            className="text-center"
            placeholder="String 1"
            disabled={minValue >= 0}
            value={s1}
            onChange={setString1}
          />
        </div>  
        <div className="col-span-2">
          <Input
            className="text-center"
            placeholder="String 2"
            disabled={minValue >= 0}
            value={s2}
            onChange={setString2}
          />
        </div>
        <div className="col-span-1">
          <Button
            variant="outline"
            disabled={minValue >= 0}
            onClick={() => startComputing()}
          >
            Compute
          </Button>
        </div>
      </div>
      <div className="flex flex-row gap-0">
        <div key="blank1" style={{ width: widthPercent }}>&nbsp;</div>
        <div key="blank2" style={{ width: widthPercent }}>&nbsp;</div>
          { Array.from(s2).map((char, i) => (
            <div key={i} className="text-center text-zinc-200" style={{ width: widthPercent }}>
              {char}
            </div>
          ))}
      </div>
      <div className="flex flex-row gap-0">
        <div className="flex flex-col" style={{ width: widthPercent }}>
          <div key="blank">&nbsp;</div>
          { Array.from(s1).map((char, i) => (
            <div key={i} className="block text-right pr-4 w-full text-zinc-200">
              {char}
            </div>
          ))}
        </div>
        {grid.map((row, i) => (
          <div key={i} className={clsx(
            "flex flex-col gap-0 border-l border-zinc-700",
            i == grid.length - 1 && "border-r"
          )} style={{ width: widthPercent }}>
            {row.map((cell, j) => {
              const currentDiffI = currentI - i
              const currentDiffJ = currentJ - j
              const isCurrent = currentDiffI == 0 && currentDiffJ == 0
              const isMinCandidate = !isCurrent && currentDiffI >= 0 && currentDiffJ >= 0 && currentDiffI <= 1 && currentDiffJ <= 1
              const isMin = isMinCandidate && cell == minValue

              return (
                <div key={j} className={clsx(
                  "text-center border-t border-zinc-700",
                  isCurrent && "bg-green-900/50",
                  isMinCandidate && "bg-green-900/20",
                  isMin && "bg-green-900/50",
                  j == row.length - 1 && "border-b",
                  i == grid.length - 1 && j == row.length - 1 ? "text-green-500" : "text-zinc-500"
                )}>
                  {cell != null ? cell : <>&nbsp;</>}
                </div>
              ) 
            } )}
          </div>))}
      </div>
      <div className="pt-4 pb-2 pr-2 pl-8">
        <div className="text-sm text-zinc-500 mb-2">
          Delay between steps: <strong className="text-white">{speed} ms</strong>
        </div>
        <Slider
          min={10}
          max={1000}
          step={10}
          disabled={minValue != -1}
          value={[speed]}
          onValueChange={(value) => setSpeed(value[0])}
        />
      </div>
    </Interactive>
  )
}