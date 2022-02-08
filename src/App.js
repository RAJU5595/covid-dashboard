import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import StateWiseCasesDetails from './components/StateWiseCasesDetails'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/state/:stateCode" component={StateWiseCasesDetails} />
    <Route exact path="/bad-path" component={NotFound} />
    <Redirect to="bad-path" />
  </Switch>
)

export default App
