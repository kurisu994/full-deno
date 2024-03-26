import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function Error500Page({ error }: PageProps) {
  return (
    <>
      <Head>
        <title>504 - Internal error</title>
      </Head>
      <div class="px-4 py-8 mx-auto bg-[#86efac] h-svh">
        <div class="max-w-screen-md m-auto flex flex-col items-center justify-center">
          <img
            class="my-6"
            src="/logo.svg"
            width="128"
            height="128"
            alt="the Fresh logo: a sliced lemon dripping with juice"
          />
          <h1 class="text-4xl font-bold">500 - Internal error</h1>
          <p class="my-4">
            500 Internal error: {(error as Error).message}
          </p>
          <a href="/" class="underline">Go back home</a>
        </div>
      </div>
    </>
  );
}
