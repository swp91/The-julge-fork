import { AppProvider } from './_context/AppContext';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
