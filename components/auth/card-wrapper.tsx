import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Header from "./header";
import Social from "./social";
import BackButton from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial
}: CardWrapperProps) => {
  return (
    <Card className="w-full md:w-[474px] border-0 shadow-none">
      <CardHeader className="mb-4">
        <Header 
          label={headerLabel}
        />
      </CardHeader>

      <CardContent>
        {showSocial && (
          <Social />
        )}

        {children}
      </CardContent>

      <CardFooter>
        <BackButton 
          href={backButtonHref}
          label={backButtonLabel}
        />
      </CardFooter>
    </Card>
  )
}

export default CardWrapper
