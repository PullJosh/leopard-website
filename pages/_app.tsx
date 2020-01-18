import React from "react";
import App from "next/app";

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

            body {
              font-size: 16px;
              font-family: -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu,
                Cantarell, Helvetica Neue;
              line-height: 1.6;
            }

            a {
              color: hsl(245, 79%, 52%);
              text-decoration: none;
            }

            a:hover,
            a:active {
              text-decoration: underline;
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
