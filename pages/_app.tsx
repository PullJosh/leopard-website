import React from "react";
import App from "next/app";

import "../tailwind.css";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <style jsx global>
          {`
            * {
              box-sizing: border-box;
            }

            ::selection {
              background: hsl(243, 94%, 66%);
              color: #fff;
            }
          `}
        </style>
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
