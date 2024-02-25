export const metadata = {
  title: "Authentication page",
  description:
    "This page is to authenticate some of the admin panel functionality",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
