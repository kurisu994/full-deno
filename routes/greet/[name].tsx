import { PageProps } from "$fresh/server.ts";

export default function Greet(props: PageProps) {
  return (
    <>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>greet</title>
      </head>
      <div>Hello {props.params.name}</div>
    </>
  );
}
