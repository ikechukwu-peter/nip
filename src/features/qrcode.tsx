import React from "react";
import { Button } from "../components";

export const QrCode = ({ qr }: { qr: string }) => {
  const downloadQR = (qrCodeUrl: string) => {
    // Create a temporary link element
    const downloadLink = document.createElement("a");
    downloadLink.href = qrCodeUrl;
    downloadLink.download = "shortqr.png";

    // Trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="flex flex-col justify-start  items-center gap-4 w-full">
      <img src={qr} alt="Qr Code" />
      <Button
        onClick={() => downloadQR(qr)}
        title="Download QR"
        className="w-full md:w-auto inline-block rounded bg-200 border-none p-3 px-6 text-xs font-medium uppercase leading-normal text-100 transition duration-150 ease-in-out hover:bg-800 hover:text-500"
      />
    </div>
  );
};
