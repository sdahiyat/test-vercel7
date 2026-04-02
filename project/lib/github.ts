import * as sodium from 'libsodium-wrappers';

export interface GitHubSecret {
  name: string;
  value: string;
}

export async function encryptSecret(secretValue: string, publicKey: string): Promise<string> {
  await sodium.ready;
  
  const key = sodium.from_base64(publicKey, sodium.base64_variants.ORIGINAL);
  const messageBytes = sodium.from_string(secretValue);
  
  const encryptedBytes = sodium.crypto_box_seal(messageBytes, key);
  return sodium.to_base64(encryptedBytes, sodium.base64_variants.ORIGINAL);
}

export async function getRepositoryPublicKey(owner: string, repo: string, token: string) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/secrets/public-key`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to get public key: ${response.statusText}`);
  }
  
  return response.json();
}

export async function createOrUpdateSecret(
  owner: string,
  repo: string,
  secretName: string,
  encryptedValue: string,
  keyId: string,
  token: string
) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/secrets/${secretName}`, {
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
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create/update secret: ${response.statusText}`);
  }
  
  return response.status === 204;
}
