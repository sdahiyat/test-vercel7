export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6">
            GitHub Secret Manager
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Securely manage GitHub repository secrets with encrypted API access. 
            Upload, update, and organize secrets across multiple repositories with confidence.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">🔒 Secure Encryption</h3>
            <p className="text-gray-400">
              All secrets are encrypted using GitHub's public key encryption before upload.
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">📦 Batch Operations</h3>
            <p className="text-gray-400">
              Upload multiple secrets to multiple repositories in one operation.
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">⚡ GitHub API</h3>
            <p className="text-gray-400">
              Direct integration with GitHub's REST API for seamless secret management.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-medium transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </main>
  )
}
