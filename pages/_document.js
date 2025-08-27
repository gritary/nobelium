import Document, { Html, Head, Main, NextScript } from 'next/document'
import cn from 'classnames'
import { config } from '@/lib/server/config'
import tailwind from '@/tailwind.config'
import CJK from '@/lib/cjk'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const initialColorScheme = {
      auto: 'color-scheme-unset',
      dark: 'dark'
    }[config.appearance]

    return (
      <Html lang={config.lang} className={cn(initialColorScheme)}>
        <Head>
          {/* 预加载自定义字体（ttf） */}
          <link
            rel="preload"
            href="/fonts/lxgwwenkai-regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/maplemono-regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />

          {/* 站点图标 */}
          <link rel="icon" href="/favicon.png" />
          <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="/feed" />

          {/* theme-color */}
          {config.appearance === 'auto' ? (
            <>
              <meta name="theme-color" content={config.lightBackground} media="(prefers-color-scheme: light)" />
              <meta name="theme-color" content={config.darkBackground} media="(prefers-color-scheme: dark)" />
            </>
          ) : (
            <meta name="theme-color" content={config.appearance === 'dark' ? config.darkBackground : config.lightBackground} />
          )}

          {/* 初始背景色兜底 */}
          <style>{`
            .color-scheme-unset,
            .color-scheme-unset body {
              background-color: ${tailwind.theme.extend.colors.day.DEFAULT} !important;
            }
            @media (prefers-color-scheme: dark) {
              .color-scheme-unset,
              .color-scheme-unset body {
                background-color: ${tailwind.theme.extend.colors.night.DEFAULT} !important;
              }
            }
          `}</style>
        </Head>
        <body className="bg-day dark:bg-night">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
