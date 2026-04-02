import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FitForge - AI Workout Planning & Social Fitness',
  description: 'Create personalized workout plans, track progress, and get AI-powered coaching with FitForge. Join a community of fitness enthusiasts.',
  keywords: 'fitness, workout, AI coach, exercise, gym, strength training',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
