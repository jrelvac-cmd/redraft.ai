export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      {children}
    </>
  );
}
