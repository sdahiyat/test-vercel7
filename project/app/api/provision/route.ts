import { NextRequest, NextResponse } from 'next/server';
import { encryptSecret, getRepositoryPublicKey, createOrUpdateSecret } from '@/lib/github';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { owner, repo, secrets, token } = body;
    
    if (!owner || !repo || !secrets || !token) {
      return NextResponse.json(
        { error: 'Missing required fields: owner, repo, secrets, token' },
        { status: 400 }
      );
    }
    
    // Get repository public key for encryption
    const { key: publicKey, key_id: keyId } = await getRepositoryPublicKey(owner, repo, token);
    
    const results = [];
    
    // Process each secret
    for (const secret of secrets) {
      try {
        // Encrypt the secret value
        const encryptedValue = await encryptSecret(secret.value, publicKey);
        
        // Create or update the secret
        await createOrUpdateSecret(owner, repo, secret.name, encryptedValue, keyId, token);
        
        results.push({
          name: secret.name,
          success: true
        });
      } catch (error) {
        results.push({
          name: secret.name,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
    
    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
