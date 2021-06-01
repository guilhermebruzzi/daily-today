import React, { useState } from 'react'
import Head from 'next/head'
import useSwr from 'swr'

import styles from '../styles/Home.module.css'
import type { Answer } from './utils/answer'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
  const { data, error } = useSwr<{ answer: Answer }>('/api/answer', fetcher)

  if (error) return <div>Failed to load, try to refresh</div>

  const answer: Answer = data?.answer ?? 'NOTHING'

  return (
    <div className={styles.container}>
      <Head>
        <title>We have daily today?</title>
        <meta name="description" content="For the Physical Stores Team" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>We have daily today?</h1>

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
  )
}
