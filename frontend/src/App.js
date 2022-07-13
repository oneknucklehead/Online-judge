import { Container } from 'react-bootstrap'
import Footer from './Components/Footer'
import Header from './Components/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import JudgeScreen from './Components/JudgeScreen'
import ProblemScreen from './Components/ProblemScreen'
import HomeScreen from './Components/HomeScreen'

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main>
          <Container>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/judge' component={JudgeScreen} />
            <Route path='/problem/:id' component={ProblemScreen} />
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  )
}

export default App
