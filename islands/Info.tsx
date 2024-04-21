// deno-lint-ignore-file ban-ts-comment
import dayjs from "dayjs";
import { ApkInfoRow } from "@/utils/apkdao.ts";
import { Signal } from "@preact/signals";
import { useEffect, useRef, useState } from "preact/hooks";
import IconQrcode from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/qrcode.tsx";
import IconDownload from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/download.tsx";
import QrCodeGenerator from "@/islands/QrCodeGenerator.tsx";

interface InfoProps {
  datalist: Signal<ApkInfoRow[] | null>;
}

const Info = ({ datalist }: InfoProps) => {
  const dialogRef = useRef<HTMLDialogElement>();
  const [downloadUrl, setDownloadUrl] = useState<string>();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 元素出现在视口中
          console.log("元素出现在视口中，可以做后续逻辑");
          // 停止观察
          // observer.unobserve(entry.target);
        }
      });
    });
    // 选择需要观察的元素
    const element = document.querySelector("#my-element");
    if (element) {
      observer.observe(element);
    }
  }, []);

  function showDialog(url = "") {
    if (!url) {
      return;
    }
    setDownloadUrl(url);
    dialogRef?.current?.showModal?.();
  }

  return (
    <div class="relative overflow-y-auto scroll-smooth scrollbar-hide flex flex-col flex-1 items-center mt-5 mb-[70px] mx-auto w-4/5 sm:w-4/6 md:w-1/2">
      {datalist.value?.map?.((item) => (
        <div class="select-none mb-6 shadow-md bg-neutral-100/90 border rounded-md border-transparent w-full p-4 duration-300 hover:shadow-lg focus:shadow-lg focus:outline-none flex md:flex-row flex-col">
          <div class="w-full">
            <p class="font-bold text-lg">{item.appName}</p>
            <p class="text-base mt-2">大小：{item.appSize}</p>
            <p class="text-base mt-2">
              md5：<span class="font-mono select-text bg-blue-200 rounded py-px px-[5px] break-all">
                {item.md5}
              </span>
            </p>
            <p class="text-base mt-2">
              发布时间：{dayjs(item.uploadAt).format("YYYY-MM-DD HH:mm:ss")}
            </p>
          </div>
          <div class="flex items-center justify-end">
            <button
              onClick={() => showDialog?.(item.downUrl)}
            >
              <IconQrcode class="w-8 h-8 mx-2 md:w-10 md:h-10 md:mx-1" />
            </button>
            <a href={item.downUrl} target="_blank" rel="noreferrer">
              <IconDownload class="w-8 h-8 mx-2 md:w-10 md:h-10 md:mx-1" />
            </a>
          </div>
        </div>
      ))}
      <div
        id="my-element"
        class="w-full h-0 -mt-3 text-sm text-neutral-500 bg-slate-400 text-center"
      >
        已经到底了～
      </div>
      <dialog
        id="qr-code-dialog"
        // @ts-ignore
        ref={dialogRef}
        onClick={() => dialogRef?.current?.close?.()}
      >
        <div class="qr-code" onClick={(e) => e.stopPropagation()}>
          <QrCodeGenerator url={downloadUrl} />
        </div>
        <div
          class="flex text-center flex-col gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 class="text-lg font-bold">扫码下载</h2>
          <p class="text-[#666666] text-sm">
            扫描二维码下载下载安装包
          </p>
        </div>
      </dialog>
    </div>
  );
};

export default Info;
