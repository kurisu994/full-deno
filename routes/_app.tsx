import { type PageProps } from "$fresh/server.ts";
import dayjs from "dayjs";
import relativeTime from "dayjs/relativeTime";
import "dayjs/zhCN";

export default function App({ Component }: PageProps) {
  dayjs.locale("zh-cn");
  dayjs.extend(relativeTime);
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>未来道具研究所</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
