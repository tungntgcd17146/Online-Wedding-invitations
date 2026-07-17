import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://anhnguyet-thanhtung.vercel.app"),
  title: "Thư mời cưới Thanh Tùng ♥ Ánh Nguyệt",
  description: "Thiệp cưới online của Thanh Tùng & Ánh Nguyệt nơi gửi gắm lời mời trân trọng và câu chuyện tình yêu đong đầy ý nghĩa.",
  openGraph: {
    title: "Thư mời cưới Thanh Tùng ♥ Ánh Nguyệt",
    description: "Thiệp cưới online của Thanh Tùng & Ánh Nguyệt nơi gửi gắm lời mời trân trọng và câu chuyện tình yêu đong đầy ý nghĩa.",
    url: "https://anhnguyet-thanhtung.vercel.app",
    siteName: "Cocohappii Inspired Invitation",
    images: [
      {
        url: "/wedding_photos/BUM_8162.webp",
        width: 1200,
        height: 630,
        alt: "Thư mời cưới Thanh Tùng ♥ Ánh Nguyệt",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className="h-full" suppressHydrationWarning>
      <head>
        <meta name="referrer" content="no-referrer" />
      </head>
      <body className="min-h-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
