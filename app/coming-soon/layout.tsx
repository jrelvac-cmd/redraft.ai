export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', minHeight: '100dvh' }}>
      <meta name="theme-color" content="#1a1a1a" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="mobile-web-app-capable" content="yes" />
      {children}
    </div>
  );
}
