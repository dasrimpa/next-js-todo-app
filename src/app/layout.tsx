import "./globals.css";

export const metadata = {
  title: "My Todo App",
  description: "A simple todo list using Next.js",
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
