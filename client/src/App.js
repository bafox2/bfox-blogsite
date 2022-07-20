import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Landing from './Components/Landing'
import Post from './Components/Post'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header />
        <Landing />
        <Footer />
      </div>
    </QueryClientProvider>
  )
}

export default App
