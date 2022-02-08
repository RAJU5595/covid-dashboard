import {Route, Switch} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import About from './components/About'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
  </Switch>
)

export default App
