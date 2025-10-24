import { titleFont } from "@/config/fonts";
import { cn } from "@/lib/utils";

interface PageTitleProps {
  title: string;
  subTitle?: string;
  className?: string;
}

export const PageTitle = ({ title, subTitle, className }: PageTitleProps) => {
  return (
    <div className={cn("mt-3", className)}>
      <h1 className={cn(titleFont.className, "text-4xl font-semibold my-10")}>
        {title}
      </h1>
      {subTitle && <h3 className="text-xl mb-10">{subTitle}</h3>}
    </div>
  );
};
