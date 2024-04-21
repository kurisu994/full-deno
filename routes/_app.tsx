import { type PageProps } from "$fresh/server.ts";
import dayjs from "dayjs";
import "dayjs/zhCN";
import ThemeProvider from "@/islands/ThemeProvider.tsx";

export default function App({ Component }: PageProps) {
  dayjs.locale("zh-cn");
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>未来道具研究所</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <ThemeProvider>
          <Component />
        </ThemeProvider>
      </body>
    </html>
  );
}
