export default function Loading() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-4 bg-primary px-6 text-center text-white">
      <span className="inline-block size-10 animate-spin rounded-full border-4 border-solid border-white border-e-transparent" />
      <p className="text-sm text-white/80">Loading RentalVerse...</p>
    </div>
  );
}
