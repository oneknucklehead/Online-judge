import { Container } from 'react-bootstrap'
import Footer from './Components/Footer'
import Header from './Components/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Homescreen from './Components/Homescreen'
import ProblemScreen from './Components/ProblemScreen'

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main>
          <Container>
            <Route path='/' component={Homescreen} exact />
            <Route path='/problem/:id' component={ProblemScreen} />
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  )
}

export default App
