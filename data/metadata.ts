import { SectionGroup } from "@/components/types"

export function getMetadata(group: SectionGroup, id: string) {
  const section = group.sections.find((s) => s.path == id)
  return {
    title: section?.title,
    description: section?.description,
    path: section?.path
  }
}