import { cn } from "@/lib/utils";

interface TerminalProps {
  className?: string;
  children: React.ReactNode;
}

interface TerminalHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

interface AnimatedSpanProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const Terminal = ({ className, children }: TerminalProps) => {
  return (
    <div
      className={cn(
        "z-0 h-full max-h-[400px] w-full max-w-lg rounded-xl border border-border bg-background font-mono text-sm shadow-xl",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const TerminalHeader = ({ className, children }: TerminalHeaderProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2",
        className,
      )}
    >
        <div className="flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
      {children && <div>{children}</div>}
    </div>
  );
};

export const AnimatedSpan = ({
  children,
  delay = 0,
  className,
}: AnimatedSpanProps) => {
  return (
    <span
      style={{
        animationDelay: `${delay}ms`,
      }}
      className={cn(
        "block animate-typing overflow-hidden whitespace-nowrap border-r-2 border-r-transparent pr-1 opacity-0",
        "text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
};

export const TypingAnimation = ({
  children,
  className,
  duration = 60,
  delay = 0,
  as: Component = "div",
  ...props
}: any) => {
  if (typeof children !== "string") {
    throw new Error("TypingAnimation: children must be a string. Received:");
  }

  return (
    <Component
      style={{
        "--duration": `${duration}ms`,
        "--delay": `${delay}ms`,
      }}
      className={cn(
        "font-mono text-sm tracking-tight",
        className,
      )}
      {...props}
    >
      {children.split("").map((char: string, i: number) => (
        <span
          key={i}
          style={{
            animationDelay: `${i * duration + delay}ms`,
          }}
          className="animate-typing opacity-0"
        >
          {char}
        </span>
      ))}
    </Component>
  );
};

