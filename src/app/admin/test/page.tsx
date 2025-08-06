export default function AdminTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Test Page</h1>
        <p className="text-gray-600">This page confirms that admin routing is working on Vercel.</p>
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">✅ Admin route is accessible!</p>
        </div>
      </div>
    </div>
  );
} 