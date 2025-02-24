import { cn } from "@/lib/utils";

export const ResourceCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl  h-full w-full p-4 overflow-hidden bg-muted border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 ",
        className,
      )}
    >
      <div className="">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const ResourceCardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-primary font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const ResourceCardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-4 text-secondary-foreground tracking-wide leading-relaxed text-sm",
        className,
      )}
    >
      {children}
    </p>
  );
};
