import { NextRequest, NextResponse } from 'next/server'
import { encryptSecret, getRepositoryPublicKey, createOrUpdateSecret } from '@/lib/github'

export async function POST(request: NextRequest) {
  try {
    const { owner, repo, secrets, token } = await request.json()
    
    if (!owner || !repo || !secrets || !token) {
      return NextResponse.json(
        { error: 'Missing required fields: owner, repo, secrets, token' },
        { status: 400 }
      )
    }
    
    // Get the repository's public key
    const { key: publicKey, key_id: keyId } = await getRepositoryPublicKey(owner, repo, token)
    
    const results = []
    
    // Process each secret
    for (const [secretName, secretValue] of Object.entries(secrets)) {
      try {
        const encryptedValue = await encryptSecret(publicKey, secretValue as string)
        
        await createOrUpdateSecret(
          owner,
          repo,
          secretName,
          encryptedValue,
          keyId,
          token
        )
        
        results.push({ name: secretName, status: 'success' })
      } catch (error) {
        results.push({ 
          name: secretName, 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Unknown error' 
        })
      }
    }
    
    return NextResponse.json({ results })
  } catch (error) {
    console.error('Provision error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
