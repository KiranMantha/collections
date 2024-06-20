export default function CommonLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex-grow container mx-auto px-4">{children}</main>;
}
