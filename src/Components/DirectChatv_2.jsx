import ReceiveMessage from "./ReceiveMessage";
import SendMessage from "./SendMessage";
import { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";

export default function DirectChat({ showFriendInfoMenu, darkMode }) {
  const chatRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [magicReplyButton, setMagicReplyButton] = useState(false);

  const chatWallpaper = darkMode
    ? "url(./src/assets/Wallpapers/dark.png)"
    : "url(./src/assets/Wallpapers/light.png)";

  const handleScroll = () => {
    const chatContainer = chatRef.current;
    if (chatContainer) {
      const isAtBottom =
        chatContainer.scrollHeight - chatContainer.scrollTop === chatContainer.clientHeight;
      setShowScrollButton(!isAtBottom);
    }
  };

  const toggleMagicReplyButton = (isVisible) => {
    setMagicReplyButton(isVisible);
  };

  const scrollToBottom = () => {
    const chatContainer = chatRef.current;
    if (chatContainer) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const chatContainer = chatRef.current;
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
      scrollToBottom();
    }
    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-[#262729]" : "bg-background"}`}>
      {/* Header */}
      <div
        onClick={showFriendInfoMenu}
        className={`flex items-center px-4 py-3 border-b ${darkMode ? "border-gray-600" : "border-border"}`}
        style={{ cursor: "pointer" }}
      >
        <div className="flex items-center">
          <img
            src="https://placehold.co/40x40"
            alt="User Avatar"
            className="rounded-full mr-2"
          />
          <div>
            <span
              className={`text-lg font-semibold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              TestUser
            </span>
            <p
              className={`${darkMode ? "text-gray-400" : "text-muted-foreground"} mt-0`}
              style={{ fontSize: "70%" }}
            >
              Click here for contact info
            </p>
          </div>
        </div>
      </div>

      {/* Chat Content */}
      <div
        ref={chatRef}
        className="p-4"
        style={{
          height: "78vh",
          overflowY: "auto",
          scrollbarWidth: "none",
          backgroundImage: chatWallpaper,
          backgroundSize: "cover",
        }}
      >
        {showScrollButton && (
          <i
            onClick={scrollToBottom}
            className={`absolute cursor-pointer bi bi-arrow-down-circle-fill text-4xl text-primary ${
              darkMode ? "bg-[#262729]" : "bg-white"
            }`}
            style={{ left: "67%" }}
          ></i>
        )}
        {/* Messages */}
        <ReceiveMessage time="00:26" message="Sample received message" />
        <SendMessage time="00:26" message="Sample sent message" />

        {/* Magic Reply Button */}
        {magicReplyButton && (
          <div
            className="absolute cursor-pointer bg-white rounded-full"
            style={{ left: "64%", bottom: "13%" }}
          >
            <AnimatedGradientText>
              <span
                className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                )}
              >
                Magic Reply
              </span>
              <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div
        className={`flex items-center px-4 py-3 border-t ${
          darkMode ? "border-gray-600 bg-[#262729]" : "border-border bg-card"
        }`}
        style={{ columnGap: "1rem" }}
      >
        <input
          type="text"
          placeholder="Type a message"
          className={`w-full p-2 rounded-lg focus:outline-none ${
            darkMode ? "text-white bg-transparent" : "text-black bg-input"
          }`}
        />
        <i
          style={{ cursor: "pointer" }}
          className="bi bi-send-fill text-2xl text-primary"
        ></i>
      </div>
    </div>
  );
}
