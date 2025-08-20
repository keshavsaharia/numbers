"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import clsx from "clsx" 
import { SectionGroup } from "../types"

interface NavBarProps {
  group: SectionGroup
  id: string
  className?: string
}

export function TopNavigation({ group, id, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(id)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={className}
    >
      <div className="flex items-center gap-3 bg-background/5 border border-zinc-100 dark:border-zinc-800 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {group.sections.map((section) => {
          const isActive = activeTab === section.id

          return (
            <Link
              key={section.id ?? section.title}
              href={group.base + '/' + section.path}
              onClick={() => setActiveTab(section.id)}
              className={clsx(
                "relative w-full cursor-pointer text-xs md:text-sm font-semibold px-4 py-2 rounded-full transition-colors",
                "text-center",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="inline">{section.title}</span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-black/5 dark:bg-white/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
