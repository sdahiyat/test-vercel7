export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            GitHub Secret Manager
          </h1>
          <p className="text-xl text-gray-600">
            Securely manage GitHub repository secrets with proper encryption
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Getting Started
          </h2>
          <p className="text-gray-600 mb-4">
            This application helps you manage GitHub repository secrets using libsodium encryption.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <p className="text-blue-800">
              Configure your GitHub token and repository settings to begin managing secrets securely.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
