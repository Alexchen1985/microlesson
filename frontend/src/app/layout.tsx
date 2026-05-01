import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "微课工场 - 高校教师专业微课制作平台",
  description: "面向高校教师的专业微课视频制作平台，替代传统3000-4000元/门的微课制作服务",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}