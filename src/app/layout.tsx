import { AppProvider } from "./_context/AppContext";
import "./globals.css";

export const metadata = {
  title: "더 줄게",
  description: "파트타임 아르바이트 맞춤 매칭플랫폼 더 줄게에서 찾아보세요.",
  icons: {
    icon: "/image/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
