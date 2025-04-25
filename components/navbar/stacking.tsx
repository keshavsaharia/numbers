"use client"

import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface NavbarItem {
    href: string
    label: string
}

export function StackingNavbar ({ items }: { items: NavbarItem[] }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            className="flex items-center gap-x-2"
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            {items.map((item, index) => (
            <StackingNavbarItem
                href={item.href}
                expanded={expanded}
                key={index}
                index={index}
            >
                {item.label}
            </StackingNavbarItem>
            ))}
        </div>
    );
};

const StackingNavbarItem = ({
    href,
    children,
    style,
    expanded,
    index,
}: {
    href: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
    expanded: boolean;
    index: number;
}) => {
    return (
        <motion.div
            initial={{ x: -80 * index, opacity: Math.max(0.3, 1 - index * 0.2) }}
            animate={{ x: expanded ? 0 : -80 * index, opacity: expanded ? 1 : Math.max(0.3, 1 - index * 0.2) }}
            transition={{
            duration: 0.6,
            ease: "circInOut",
            delay: 0.1 * index,
            type: "spring",
            }}
            style={{ zIndex: 100 - index }}
        >
            <Link
                className={clsx(
                    "flex items-center text-sm px-4 py-2 rounded-3xl font-mono",
                    [
                        "bg-zinc-100 dark:bg-zinc-700",
                        "bg-zinc-200 dark:bg-zinc-600",
                        "bg-zinc-300 dark:bg-zinc-500"
                    ][index] || "bg-zinc-400 dark:bg-zinc-500",
                    "hover:bg-black hover:text-white",
                    "text-black dark:text-zinc-100",
                    "no-underline backdrop-blur-lg",
                    "transition-colors duration-300 ease-in-out")}
                href={href}
                style={style}
            >
                {children}
            </Link>
        </motion.div>
    );
};
