import _sodium from 'libsodium-wrappers'

export async function encryptSecret(publicKey: string, secretValue: string): Promise<string> {
  await _sodium.ready
  
  const key = Buffer.from(publicKey, 'base64')
  const messageBytes = Buffer.from(secretValue)
  
  const encryptedBytes = _sodium.crypto_box_seal(messageBytes, key)
  return Buffer.from(encryptedBytes).toString('base64')
}

export async function getRepositoryPublicKey(owner: string, repo: string, token: string) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/actions/secrets/public-key`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    }
  )
  
  if (!response.ok) {
    throw new Error(`Failed to get public key: ${response.statusText}`)
  }
  
  return response.json()
}

export async function createOrUpdateSecret(
  owner: string,
  repo: string,
  secretName: string,
  encryptedValue: string,
  keyId: string,
  token: string
) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/actions/secrets/${secretName}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        encrypted_value: encryptedValue,
        key_id: keyId,
      }),
    }
  )
  
  if (!response.ok) {
    throw new Error(`Failed to create/update secret: ${response.statusText}`)
  }
  
  return response.status === 204
}
