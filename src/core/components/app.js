import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components';
import { AddMovie, fetchAll, Movies } from '../../movies';
import Header from './header';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAll())
}, [dispatch])

  return (
    <Router>
      <Wrapper>
        <Header />
        <Switch>
          <Route path='/add'>
            <AddMovie />
          </Route>
          <Route path={['/:id', '/']}>
            <Movies />
          </Route>
        </Switch>
      </Wrapper>
    </Router>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export default App;
