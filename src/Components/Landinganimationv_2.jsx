import React from "react";
import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Jenifer",
    username: "@jenifer",
    body: "Hey Taylor, guess what? I just found this thing called Vibez!",
    img: "https://www.pngitem.com/pimgs/m/130-1300380_female-user-image-icon-hd-png-download.png",
  },
  {
    name: "Taylor",
    username: "@taylor",
    body: "Vibez? What’s it about?",
    img: "https://www.pngitem.com/pimgs/m/130-1300253_female-user-icon-png-download-user-image-color.png",
  },
  {
    name: "Jenifer",
    username: "@jenifer",
    body: "Well, first, you can have private conversations—just like this one!",
    img: "https://www.pngitem.com/pimgs/m/130-1300380_female-user-image-icon-hd-png-download.png",
  },
  {
    name: "Taylor",
    username: "@taylor",
    body: "That’s handy. Can you chat with groups too?",
    img: "https://www.pngitem.com/pimgs/m/130-1300253_female-user-icon-png-download-user-image-color.png",
  },
  {
    name: "Jenifer",
    username: "@jenifer",
    body: "Absolutely! You can bring everyone together in one place for group chats.",
    img: "https://www.pngitem.com/pimgs/m/130-1300380_female-user-image-icon-hd-png-download.png",
  },
  {
    name: "Taylor",
    username: "@taylor",
    body: "What if I want to connect with new people?",
    img: "https://www.pngitem.com/pimgs/m/130-1300253_female-user-icon-png-download-user-image-color.png",
  },
  {
    name: "Jenifer",
    username: "@jenifer",
    body: "That’s easy! You can add friends anytime and start chatting.",
    img: "https://www.pngitem.com/pimgs/m/130-1300380_female-user-image-icon-hd-png-download.png",
  },
  {
    name: "Taylor",
    username: "@taylor",
    body: "Sounds fun. Anything else?",
    img: "https://www.pngitem.com/pimgs/m/130-1300253_female-user-icon-png-download-user-image-color.png",
  },
  {
    name: "Jenifer",
    username: "@jenifer",
    body: "Oh, and there’s a marketplace! You can chat about deals, buy, sell, or trade directly.",
    img: "https://www.pngitem.com/pimgs/m/130-1300380_female-user-image-icon-hd-png-download.png",
  },
  {
    name: "Taylor",
    username: "@taylor",
    body: "Wow, Vibez has everything I need. Let’s get started!",
    img: "https://www.pngitem.com/pimgs/m/130-1300253_female-user-icon-png-download-user-image-color.png",
  },
];

const ReviewCard = ({ img, name, username, body }) => (
  <figure
    className={cn(
      "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
      "border-gray-300 bg-white hover:bg-gray-100",
      "dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    )}
  >
    <div className="flex items-center gap-2">
      <img className="rounded-full" width="32" height="32" alt="" src={img} />
      <div>
        <figcaption className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {name}
        </figcaption>
        <p className="text-xs text-gray-500 dark:text-gray-400">{username}</p>
      </div>
    </div>
    <blockquote className="mt-2 text-sm text-gray-700 dark:text-gray-300">
      {body}
    </blockquote>
  </figure>
);

export default function LandingAnimation() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
      <Marquee pauseOnHover className="[--duration:50s]">
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-gray-900"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-gray-900"></div>
    </div>
  );
}
