import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { HugeiconsIcon } from "@hugeicons/react"
import Loading03Icon from "@hugeicons/core-free-icons/Loading03Icon"

import { spinnerStyles as styles } from "@/components/ui/ui.stylex"
import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: Omit<React.ComponentProps<"svg">, "strokeWidth">) {
  const sxProps = stylex.props(styles.base)

  return (
    <HugeiconsIcon
      icon={Loading03Icon}
      role="status"
      aria-label="Loading"
      {...sxProps}
      className={cn(sxProps.className, className)}
      {...props}
    />
  )
}

export { Spinner }
