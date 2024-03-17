import { useSignal } from "@preact/signals";
import Counter from "@/islands/Counter.tsx";
import LemonDrop from "@/islands/LemonDrop.tsx";

export default function Home() {
  const count = useSignal(0);
  return (
    <div class="mx-auto  bg-green-300 h-svh">
      <div
        class="w-full flex justify-center items-center flex-col"
        aria-hidden="true"
      >
        <LemonDrop />
      </div>
      <div class="mt-16 max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/demo/index.tsx</code> file, and refresh.
        </p>
        <Counter count={count} />
      </div>
    </div>
  );
}
