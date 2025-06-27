import Spline from "@splinetool/react-spline";

export default function AboutBanner() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center bg-[#000002] py-12 md:py-24 lg:py-32 xl:py-48">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="animate-gradient-flow h-full w-full bg-gradient-to-tr from-[#1a0b1c] via-black to-[#A25390] transition-all duration-500"></div>
      </div>

      {/* Spline 3D Element */}
      <div className="absolute bottom-0 left-0 z-10 h-4/5 w-full md:w-3/5">
        <Spline scene="https://prod.spline.design/Q9VWVbolPMuiNqnB/scene.splinecode" />
      </div>

      {/* Content with Glassmorphism Effect */}
      <div className="relative z-20 space-y-4 rounded-xl bg-white/30 p-6 text-center text-white shadow-lg backdrop-blur-sm">
        <h1 className="text-4xl font-extrabold md:text-5xl lg:text-6xl">
          About Us
        </h1>
        <p className="max-w-2xl text-lg md:text-xl">
          Discover who we are and what drives our passion for innovation.
        </p>
      </div>
    </section>
  );
}
