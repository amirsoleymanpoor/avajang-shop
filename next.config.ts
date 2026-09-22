import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3", "@prisma/client"],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;