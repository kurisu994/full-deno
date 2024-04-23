// deno-lint-ignore-file ban-ts-comment
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
// @ts-ignore
import QRCode from "@/utils/qrcode.js";

type Props = {
  url?: string;
};

const QrCodeGenerator = ({
  url = "https://www.feewee.cn/",
}: Props) => {
  const codeGenRef = useRef(null);
  const qrcodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (codeGenRef.current) {
      // @ts-ignore
      codeGenRef.current.clear();
      // @ts-ignore
      codeGenRef.current.makeCode(url);
    } else {
      // @ts-ignore
      codeGenRef.current = new QRCode(qrcodeRef.current, {
        text: url,
        // @ts-ignore
        correctLevel: QRCode.CorrectLevel.M,
      });
    }
  }, [url]);

  return (IS_BROWSER
    ? (
      <div
        class="w-52 flex "
        ref={qrcodeRef}
      />
    )
    : (
      <div>
        <img
          src="/images/qrcode/qr-code.svg"
          alt="QR Code place holder"
        />
      </div>
    ));
};

export default QrCodeGenerator;
