import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

const reviews = [
    {
      name: "Alex",
      username: "@alex",
      body: "Hey Taylor, guess what? I just found this thing called Vibez!",
      img: "https://avatar.vercel.sh/alex",
    },
    {
      name: "Taylor",
      username: "@taylor",
      body: "Vibez? What’s it about?",
      img: "https://avatar.vercel.sh/taylor",
    },
    {
      name: "Alex",
      username: "@alex",
      body: "Well, first, you can have private conversations—just like this one!",
      img: "https://avatar.vercel.sh/alex",
    },
    {
      name: "Taylor",
      username: "@taylor",
      body: "That’s handy. Can you chat with groups too?",
      img: "https://avatar.vercel.sh/taylor",
    },
    {
      name: "Alex",
      username: "@alex",
      body: "Absolutely! You can bring everyone together in one place for group chats.",
      img: "https://avatar.vercel.sh/alex",
    },
    {
      name: "Taylor",
      username: "@taylor",
      body: "What if I want to connect with new people?",
      img: "https://avatar.vercel.sh/taylor",
    },
    {
      name: "Alex",
      username: "@alex",
      body: "That’s easy! You can add friends anytime and start chatting.",
      img: "https://avatar.vercel.sh/alex",
    },
    {
      name: "Taylor",
      username: "@taylor",
      body: "Sounds fun. Anything else?",
      img: "https://avatar.vercel.sh/taylor",
    },
    {
      name: "Alex",
      username: "@alex",
      body: "Oh, and there’s a marketplace! You can chat about deals, buy, sell, or trade directly.",
      img: "https://avatar.vercel.sh/alex",
    },
    {
      name: "Taylor",
      username: "@taylor",
      body: "Wow, Vibez has everything I need. Let’s get started!",
      img: "https://avatar.vercel.sh/taylor",
    },
  ];

const firstRow = reviews.slice(0, reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure style={{backgroundColor:'white'}}
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 ",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function LandingAnimation() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg ">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
