import "./globals.css";

export const metadata = {
  title: "Thư mời cưới Minh Phương ♥ Đức Trung",
  description: "Thiệp cưới online của Minh Phương & Đức Trung nơi gửi gắm lời mời trân trọng và câu chuyện tình yêu đong đầy ý nghĩa.",
  openGraph: {
    title: "Thư mời cưới Minh Phương ♥ Đức Trung",
    description: "Thiệp cưới online của Minh Phương & Đức Trung nơi gửi gắm lời mời trân trọng và câu chuyện tình yêu đong đầy ý nghĩa.",
    url: "https://minhphuong-ductrung.vercel.app",
    siteName: "Cocohappii Inspired Invitation",
    images: [
      {
        url: "https://media.cocohappii.com/covers/53d8f7a6-acc3-4f83-afe2-0aba355282c2.jpg",
        width: 1200,
        height: 630,
        alt: "Thư mời cưới Minh Phương ♥ Đức Trung",
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
