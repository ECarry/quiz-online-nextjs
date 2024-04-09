import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
  label: string;
  href: string;
}

const BackButton = ({
  label,
  href
}: BackButtonProps) => {
  return (
    <Button 
      variant='link'
      className="w-full"
      asChild
    >
      <Link href={href}>
        {label}
      </Link>
    </Button>
  )
}

export default BackButton
