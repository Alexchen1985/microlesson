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
      <body className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">微课工场</h1>
            <div className="text-sm text-gray-500">高校教师专业微课制作平台</div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}