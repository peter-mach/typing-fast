import Header from './components/Header'
import Footer from './components/Footer'
import TypingChallenge from './components/TypingChallenge'
import LeaderboardTable from './components/LeaderboardTable'

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <TypingChallenge />
        <LeaderboardTable />
      </main>
      <Footer />
    </div>
  )
}
