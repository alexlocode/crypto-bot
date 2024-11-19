import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_CHAT_ID: process.env.NEXT_PUBLIC_CHAT_ID,
  },
};

export default nextConfig;
