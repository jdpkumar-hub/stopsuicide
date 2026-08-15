import { Logo } from "@/components/common/Logo";

export default function Loading() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center px-4 py-16"
      aria-live="polite"
      aria-busy="true"
    >
      <Logo variant="loading" linked={false} animate />
    </div>
  );
}
