'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

interface ScheduleItem {
  time: string
  type: string
  details: string
  startMinutes: number
  endMinutes: number
}

const schedule: ScheduleItem[] = [
  { time: '7:00 AM', type: 'ঘুম থেকে ওঠা', details: 'পানি পান, ফ্রেশ হওয়া', startMinutes: 7 * 60, endMinutes: 7 * 60 + 20 },
  { time: '7:20–8:00 AM', type: 'সকাল রুটিন', details: 'সকালের নাস্তা + হেয়ার কেয়ার', startMinutes: 7 * 60 + 20, endMinutes: 8 * 60 },
  { time: '8:00–10:00 AM', type: 'শেখা', details: 'SEO, Storytelling, Social Media Management ইত্যাদি', startMinutes: 8 * 60, endMinutes: 10 * 60 },
  { time: '10:00–10:30 AM', type: 'বিরতি', details: 'বিশ্রাম, চা বা পানি পান', startMinutes: 10 * 60, endMinutes: 10 * 60 + 30 },
  { time: '10:30 AM–12:30 PM', type: 'কনটেন্ট কাজ', details: 'রিসার্চ, স্ক্রিপ্ট রাইটিং', startMinutes: 10 * 60 + 30, endMinutes: 12 * 60 + 30 },
  { time: '12:30–1:30 PM', type: 'লাঞ্চ ও বিশ্রাম', details: '৩০ মিনিট দুপুরের ঘুমসহ', startMinutes: 12 * 60 + 30, endMinutes: 13 * 60 + 30 },
  { time: '1:30–2:30 PM', type: 'ব্যায়াম', details: 'কার্ডিও, স্ট্রেচিং, ওয়ার্কআউট', startMinutes: 13 * 60 + 30, endMinutes: 14 * 60 + 30 },
  { time: '2:30–6:30 PM', type: 'কনটেন্ট ক্রিয়েশন', details: 'ভিডিও এডিটিং, থাম্বনেইল, আপলোড প্রস্তুতি', startMinutes: 14 * 60 + 30, endMinutes: 18 * 60 + 30 },
  { time: '6:30–7:00 PM', type: 'প্রস্তুতি', details: 'হালকা খাবার, লাইভ সেটআপ রেডি', startMinutes: 18 * 60 + 30, endMinutes: 19 * 60 },
  { time: '7:00–10:00 PM', type: 'লাইভ স্ট্রিম', details: 'YouTube বা Rooter.io তে স্ট্রিম', startMinutes: 19 * 60, endMinutes: 22 * 60 },
  { time: '10:00–10:30 PM', type: 'পোস্ট-স্ট্রিম কাজ', details: 'ফিডব্যাক দেখা, মন্তব্যের উত্তর', startMinutes: 22 * 60, endMinutes: 22 * 60 + 30 },
  { time: '10:30–11:30 PM', type: 'রিল্যাক্স টাইম', details: 'মুভি, মিউজিক, নিজস্ব সময়', startMinutes: 22 * 60 + 30, endMinutes: 23 * 60 + 30 },
  { time: '11:30 PM', type: 'ঘুম', details: 'পরের দিনের প্রস্তুতি', startMinutes: 23 * 60 + 30, endMinutes: 24 * 60 },
]

export default function Home() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [currentActivity, setCurrentActivity] = useState<number>(-1)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const now = new Date()
    const currentMinutes = now.getHours() * 60 + now.getMinutes()

    const activeIndex = schedule.findIndex(
      item => currentMinutes >= item.startMinutes && currentMinutes < item.endMinutes
    )

    setCurrentActivity(activeIndex)
  }, [currentTime])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('bn-BD', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  const getProgress = (item: ScheduleItem) => {
    const now = new Date()
    const currentMinutes = now.getHours() * 60 + now.getMinutes()

    if (currentMinutes < item.startMinutes) return 0
    if (currentMinutes >= item.endMinutes) return 100

    const duration = item.endMinutes - item.startMinutes
    const elapsed = currentMinutes - item.startMinutes
    return (elapsed / duration) * 100
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>দৈনিক রুটিন</h1>
          <div className={styles.clock}>
            <div className={styles.currentTime}>{formatTime(currentTime)}</div>
            <div className={styles.date}>
              {currentTime.toLocaleDateString('bn-BD', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>

        <div className={styles.scheduleGrid}>
          {schedule.map((item, index) => {
            const isActive = index === currentActivity
            const progress = isActive ? getProgress(item) : 0

            return (
              <div
                key={index}
                className={`${styles.scheduleCard} ${isActive ? styles.active : ''}`}
              >
                {isActive && (
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
                <div className={styles.cardContent}>
                  <div className={styles.timeLabel}>
                    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                      <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    {item.time}
                  </div>
                  <h3 className={styles.taskType}>{item.type}</h3>
                  <p className={styles.taskDetails}>{item.details}</p>
                  {isActive && (
                    <div className={styles.activeBadge}>
                      <span className={styles.pulse}></span>
                      চলমান
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <footer className={styles.footer}>
          <p>কনটেন্ট ক্রিয়েটর দৈনিক সময়সূচী</p>
        </footer>
      </div>
    </main>
  )
}
