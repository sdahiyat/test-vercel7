import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FitForge - AI Workout Planning & Social Fitness',
  description: 'Create personalized workout plans, track your progress, and connect with a community of fitness enthusiasts. Get AI-powered coaching and reach your fitness goals.',
  keywords: 'fitness, workout, AI, training, exercise, social, community',
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
