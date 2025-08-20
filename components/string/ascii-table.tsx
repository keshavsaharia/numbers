// import { Interactive } from "../interactive";

import clsx from "clsx";
import { Interactive } from "../number/interactive";

// Special ASCII names
const specialName = [
  'null',
  'start of heading',
  'start of text',
  'end of text',
  'end of transmission',
  'enquiry',
  'acknowledge',
  'bell', 
  'backspace',
  'horizontal tab',
  'line feed',
  'vertical tab',
  'form feed',
  'carriage return',  
  'shift out',
  'shift in',
  'data link escape',
  'device control 1',
  'device control 2',
  'device control 3', 
  'device control 4',
  'negative ack.',
  'synchronous idle',
  'end of trans. block',
  'cancel', 
  'end of medium',
  'substitute',
  'escape',
  'file separator',
  'group separator',
  'record separator',
  'unit separator',
  'space'
] as const;

interface ASCIITableContentProps {
  characters: string[];
  cols: number;
}

export function ASCIITable() {
  const characters: string[] = Array.from({ length: 128 }, (_, i) => String.fromCharCode(i));

  return (
    <Interactive padding={'px-0 py-2'}>
      <div className="hidden xs:hidden sm:hidden md:block lg:block xl:block">
        <ASCIITableContent characters={characters} cols={8} />
      </div>

      <div className="hidden xs:hidden sm:block md:hidden lg:hidden xl:hidden">
        <ASCIITableContent characters={characters} cols={6} />
      </div>

      <div className="block sm:hidden md:hidden lg:hidden xl:hidden">
        <ASCIITableContent characters={characters} cols={4} />
      </div>
    </Interactive>
  )
}

const ASCIITableContent: React.FC<ASCIITableContentProps> = ({ characters, cols }) => {
  const rows = Math.ceil(characters.length / cols);

  return (
    <div className="flex gap-1 divide-x divide-gray-700 w-full px-1">
      { Array.from({ length: cols }, (_, col) => (
        <div key={col}
          className={clsx("flex flex-col gap-2", (col <= 1) ? "flex-1" : "")}>
          {characters
            .slice(col * rows, (col + 1) * rows)
            .map((character, row) => {
              const index = col * rows + row;
              return (
                <div key={row} className="flex px-1 gap-2">
                  <span className="text-sm bg-zinc-800 px-1 py-0.5 rounded-md">{index}</span>
                  {specialName[index] ? 
                    <span className="text-sm leading-6 whitespace-nowrap">{specialName[index]}</span>
                    :
                    <span className="font-mono px-1">{character}</span>
                  }
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};