import {  } from 'react'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <TodoList />
      <Footer />
    </div>
  )
}

export default Home