import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useFx } from '../../hooks/useFx'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

/** Fades its content up once when it scrolls into view. Off at FX OFF. */
export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { level } = useFx()

  if (level === 'off') return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}