


export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    admin common layout <br />
      {children}
    </>
  );
}
