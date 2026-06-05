import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Next dev server to accept requests from the local LAN
  // (e.g. testing on your phone over the same Wi-Fi).
  allowedDevOrigins: ["192.168.0.206"],
  output: "standalone",
};

export default nextConfig;
