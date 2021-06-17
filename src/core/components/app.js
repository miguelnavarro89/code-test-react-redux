import { Container } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AddMovie, fetchAll, Movies } from '../../movies';
import Header from './header';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAll())
}, [dispatch])

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
