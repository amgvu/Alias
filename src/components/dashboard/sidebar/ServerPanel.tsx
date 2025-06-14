import { DSMenu } from "@/components";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Users } from "lucide-react";

interface ServerPanelProps {
  servers: { id: string; name: string; iconURL: string }[];
  selectedServerName: string;
  handleServerSelection: (serverName: string) => void;
}

export function ServerPanel({
  servers,

  handleServerSelection,
}: ServerPanelProps) {
  return (
    <AccordionItem value="servers">
      <AccordionTrigger className="text-lg text-zinc-400 font-medium hover:text-zinc-100 hover:no-underline">
        <div className="flex items-center gap-4">
          <Users className="w-4.5 h-4.5" />
          <span>Servers</span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="pb-4">
        <div className="rounded-md">
          <DSMenu items={servers} setSelectedItem={handleServerSelection} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
