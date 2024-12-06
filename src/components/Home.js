import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'

export default function Home() {
  return (
    <main className="flex flex-col h-screen flex-grow items-stretch">
    <p> Hello World</p>
      <Link to="/session/123">Session 123</Link>
    </main>
  )
}
