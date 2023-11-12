export const metadata = {
  title: "Viriyadhika Putra personal website",
  description:
    "Profile of Viriyadhika, Software engineer which specialize in frontend and backend development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
