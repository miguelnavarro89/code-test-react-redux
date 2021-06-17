import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Movies } from '../../movies';
import Header from './header';

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
          <Route path={['/:id', '/']}>
            <Movies />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
