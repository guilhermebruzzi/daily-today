import React, { Fragment, useState, useCallback, useEffect } from 'react'
import Head from 'next/head'
import useSwr from 'swr'
import DarkModeToggle from 'react-dark-mode-toggle'
import * as ls from 'local-storage'

import styles from '../styles/Home.module.css'
import type { Answer } from '../utils/answer'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const darkModeKey = 'darkMode'

const useDarkModeState = (): [boolean | undefined, (v: boolean) => void] => {
  const [isDarkMode, setIsDarkModeState] = useState<boolean | undefined>(
    () => undefined
  )

  const setIsDarkMode = useCallback(
    (newDarkMode: boolean) => {
      setIsDarkModeState(newDarkMode)

      ls.set<boolean>(darkModeKey, newDarkMode)
    },
    [setIsDarkModeState]
  )

  useEffect(() => {
    setIsDarkModeState(ls.get<boolean>(darkModeKey) ?? true)
  }, [setIsDarkModeState])

  return [isDarkMode, setIsDarkMode]
}

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useDarkModeState()

  const { data, error } = useSwr<{ answer: Answer }>('/api/answer', fetcher)

  if (error) return <div>Failed to load, try to refresh</div>

  const answer: Answer = data?.answer ?? 'NOTHING'

  return (
    <Fragment>
      <Head>
        <title>We have daily today?</title>
        <meta name="description" content="For the Physical Stores Team" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div
        className={`${styles.container} ${
          isDarkMode ? styles.darkBackground : ''
        }`}
      >
        <div className={styles.darkToggle}>
          <DarkModeToggle
            onChange={setIsDarkMode}
            checked={isDarkMode}
            size={80}
          />
        </div>

        <main className={styles.main}>
          <h1
            className={`${styles.title} ${
              isDarkMode ? styles.colorInDark : ''
            }`}
          >
            We have daily today?
          </h1>

          {answer === 'NOTHING' ? null : (
            <h2
              className={`${styles.description} ${
                answer === 'NO' ? styles.descriptionNo : ''
              }`}
            >
              {answer}
            </h2>
          )}
        </main>
      </div>
    </Fragment>
  )
}
