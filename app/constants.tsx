import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'

export const THEMES = [
    {
      label: 'Light',
      id: 'light',
      icon: <SunIcon className="h-4 w-4" />,
    },
    {
      label: 'Dark',
      id: 'dark',
      icon: <MoonIcon className="h-4 w-4" />,
    },
    {
      label: 'System',
      id: 'system',
      icon: <MonitorIcon className="h-4 w-4" />,
    },
]