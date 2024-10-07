import Head from "next/head";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <Head>
        <title>KPRverse Landing</title>
        <meta name="description" content="KPRverse-inspired landing page" />
      </Head>

      {/* Main container */}
      <div className="space-y-8 px-4 text-center">
        {/* Simulated Console Window */}
        <div className="w-full max-w-2xl rounded-lg border border-gray-700 bg-gray-800 p-8 shadow-lg">
          <p className="font-mono text-lg">Initializing... Loading files...</p>
          <div className="mt-4">
            <p className="font-mono text-sm text-gray-400">kai_53815.jpg</p>
            <p className="font-mono text-sm text-gray-400">
              audio_log_2018116.wav
            </p>
            <p className="font-mono text-sm text-gray-400">
              activate console for access...
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <button className="rounded-full bg-indigo-500 px-6 py-3 text-lg font-semibold transition hover:bg-indigo-700">
            Discover More
          </button>
        </div>
      </div>
    </div>
  );
}
