"use client";

export default function AuthVisual() {
  return (
    <div className="relative hidden md:flex w-[40%] min-h-screen overflow-hidden bg-[#BBA0CA] border-r-4 border-red-500">
      <div className="absolute inset-0 animate-lines opacity-80" />
      <div className="absolute inset-0 animate-lines-slow opacity-60" />

      <div className="absolute top-4 left-4 z-50 bg-black text-white px-3 py-1">
        ANIMATION HERE
      </div>
    </div>
  );
}
