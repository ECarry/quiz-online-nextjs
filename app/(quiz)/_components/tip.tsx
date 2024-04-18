import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface TipProps {
  content: string;
}

const Tip = ({ content }: TipProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <span className="text-3xl">💡</span>
      </HoverCardTrigger>
      <HoverCardContent>{content}</HoverCardContent>
    </HoverCard>
  );
};

export default Tip;
