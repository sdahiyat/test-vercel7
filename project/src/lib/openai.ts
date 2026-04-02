import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateWorkout(options: {
  goal: string
  experience: string
  equipment: string[]
  daysPerWeek: number
}) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a professional fitness trainer. Generate a structured workout plan based on the user's requirements."
      },
      {
        role: "user",
        content: `Create a ${options.daysPerWeek}-day workout plan for someone with ${options.experience} experience, goal of ${options.goal}, using equipment: ${options.equipment.join(', ')}.`
      }
    ],
    max_tokens: 1500,
  })

  return completion.choices[0]?.message?.content || ''
}

export async function analyzeProgress(workoutHistory: any[]) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a fitness coach analyzing workout progress. Provide insights on trends, plateaus, and recommendations."
      },
      {
        role: "user",
        content: `Analyze this workout history and provide insights: ${JSON.stringify(workoutHistory.slice(-10))}`
      }
    ],
    max_tokens: 800,
  })

  return completion.choices[0]?.message?.content || ''
}

export async function suggestImprovements(exercise: string, currentForm: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a form coach providing specific technique tips for exercises. Keep responses concise and actionable."
      },
      {
        role: "user",
        content: `Provide form tips for ${exercise}. Current approach: ${currentForm}`
      }
    ],
    max_tokens: 400,
  })

  return completion.choices[0]?.message?.content || ''
}
