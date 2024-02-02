import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'

const Home = () => {
  return (
    <>
    <Navbar />
    <Header page="home"/>
    <section className="pageContainer">
    <h1>About Quizzy</h1>
    <p>Quizzy is an AI powered chatbot that utlises the OpenAI APIs to simulate an interview situation.</p>
    </section>
    </>
  )
}

export default Home