import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateWorkout(params: {
  goal: string
  experience: string
  equipment: string[]
  daysPerWeek: number
}) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a fitness expert. Generate a structured workout plan based on the user's preferences."
      },
      {
        role: "user",
        content: `Create a ${params.daysPerWeek}-day workout plan for someone with ${params.experience} experience, focusing on ${params.goal}, using equipment: ${params.equipment.join(', ')}`
      }
    ],
    max_tokens: 1000,
  })

  return response.choices[0].message.content
}

export async function analyzeProgress(workoutData: any[]) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "Analyze workout progress and provide insights about strength trends, plateaus, and recommendations."
      },
      {
        role: "user",
        content: `Analyze this workout data and provide insights: ${JSON.stringify(workoutData)}`
      }
    ],
    max_tokens: 500,
  })

  return response.choices[0].message.content
}

export async function suggestImprovements(exercise: string, currentForm: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "Provide form tips and safety advice for specific exercises."
      },
      {
        role: "user",
        content: `Give form tips and safety advice for ${exercise}. Current form notes: ${currentForm}`
      }
    ],
    max_tokens: 300,
  })

  return response.choices[0].message.content
}
