import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './header';

const Home = () => '[home...]'
const AddMovie = () => '[add movie...]'

function App() {
  return (
    <Router>
      <Container>
        <Header />
        <Switch>
          <Route path='/add'>
            <AddMovie />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
