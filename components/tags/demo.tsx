"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useTags } from "./use-tags";
import { Button } from "./button";
import { Input } from "./input";
import clsx from "clsx";

const DEMO_SUGGESTIONS = [
  { id: "next", label: "Next.js" },
  { id: "react", label: "React" },
  { id: "tailwind", label: "Tailwind" },
  { id: "typescript", label: "TypeScript" },
  { id: "ui", label: "UI" },
];

export function TagsDemo() {
  const [inputValue, setInputValue] = useState("");
  const { tags, addTag, removeTag, removeLastTag, hasReachedMax } = useTags({
    maxTags: 5,
    onChange: (tags) => console.log("Tags updated:", tags),
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !inputValue) {
      e.preventDefault();
      removeLastTag();
    }
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      addTag({ id: inputValue.toLowerCase(), label: inputValue });
      setInputValue("");
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Tags</label>
        <div className="rounded-lg border border-input bg-background p-1">
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className={clsx(
                  "inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm",
                  tag.color || "bg-primary/10 text-primary"
                )}
              >
                {tag.label}
                <button
                  onClick={() => removeTag(tag.id)}
                  className="rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/20"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={hasReachedMax ? "Max tags reached" : "Add tag..."}
              disabled={hasReachedMax}
              className="flex-1 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Suggestions</label>
        <div className="flex flex-wrap gap-2">
          {DEMO_SUGGESTIONS.map((suggestion) => (
            <Button
              key={suggestion.id}
              variant="outline"
              size="sm"
              onClick={() => {
                if (!tags.find(t => t.id === suggestion.id)) {
                  addTag(suggestion);
                }
              }}
              disabled={hasReachedMax || tags.find(t => t.id === suggestion.id) != null}
            >
              {suggestion.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}