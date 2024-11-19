"use client";

const Home = () => {
  const sendMessage = async () => {
    try {
      await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: {
            chat: {
              id: process.env.NEXT_PUBLIC_CHAT_ID,
            },
            text: "阿是在點什麼拉",
          },
        }),
      });
    } catch (error) {
      console.log("Failed to send message", error);
    }
  };

  return (
    <div className="bg-[#323232] min-h-screen">
      <div className="py-10 px-10">
        <div className="bg-white p-5 rounded w-[200px] text-center">
          <div className="pb-4">telegram測試發訊息</div>
          <button
            className="py-1 px-3 border rounded bg-black text-white"
            onClick={sendMessage}
          >
            click
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
