import { SiBrandfolder } from "react-icons/si";
import { RiLockPasswordLine } from "react-icons/ri";
import { ImQrcode } from "react-icons/im";
import { FcExpired } from "react-icons/fc";
import { IoMdAnalytics } from "react-icons/io";
import { BiCustomize } from "react-icons/bi";

import { IFeatures } from "./../types/index";

export const features: IFeatures[] = [
  {
    title: "Brand Recognition",
    description: `Brand Recognition Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.`,
    Icon: SiBrandfolder,
  },
  {
    title: "Password Protection",
    description: `Protect Your links with a password. No one without the password will be able to view your link. Password protected links help create security against prying eyes.`,
    Icon: RiLockPasswordLine,
  },
  {
    title: "QR Code",
    description: `Get A QR Code of your links. Share your links easily or get back with just a scan. QR Code enables easy sharing of your links without exposing the actual link itself.`,
    Icon: ImQrcode,
  },
  {
    title: "Set Expiration Time",
    description: `Set a time your link should expire. A link with an expiry time enables you to create, use and forget. Worry no more about people still visiting your links after expiration.`,
    Icon: FcExpired,
  },

  {
    title: "Fully Customizable",
    description:
      "Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.",
    Icon: BiCustomize,
  },
  {
    title: "Links Analytics",
    description:
      "Gain insight on your links. Become more aware of interactions using your links.",
    Icon: IoMdAnalytics,
  },
];
