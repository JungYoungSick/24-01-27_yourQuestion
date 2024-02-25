import "./globals.css"; // 글로벌 CSS 파일
import "tailwindcss/tailwind.css"; // Tailwind CSS 파일
import React from "react";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
