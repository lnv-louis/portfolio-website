import * as React from "react"
import * as stylex from "@stylexjs/stylex"

import { inputStyles as styles } from "@/components/ui/ui.stylex"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const sxProps = stylex.props(styles.base)

  return (
    <input
      type={type}
      data-slot="input"
      {...sxProps}
      className={cn(sxProps.className, className)}
      {...props}
    />
  )
}

export { Input }
