"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

type FloatingProps = React.ComponentProps<typeof motion.div> & {
  intensity?: number
}

function Floating({ className, intensity = 6, ...props }: FloatingProps) {
  return (
    <motion.div
      className={cn(className)}
      animate={{ y: [0, -intensity, 0] }}
      transition={{
        duration: 7,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
      {...props}
    />
  )
}

export { Floating }
