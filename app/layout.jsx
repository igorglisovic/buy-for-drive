'use client'

import Nav from './components/Nav'
import Provider from './components/Provider'
import './globals.css'
import { LoadingBarProvider } from './store/loading-bar'
import { PostCarContextProvider } from './store/post-car'
import { SearchContextProvider } from './store/search-car'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PostCarContextProvider>
          <LoadingBarProvider>
            <SearchContextProvider>
              <Provider>
                <Nav />
                <main className="pt-16">{children}</main>
              </Provider>
            </SearchContextProvider>
          </LoadingBarProvider>
        </PostCarContextProvider>
      </body>
    </html>
  )
}
