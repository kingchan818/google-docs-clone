import TextEditor from './TextEditor';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Login from './pages/Login';
import Register from './pages/Register';
function App() {
    const user = localStorage.getItem('user');

    return (
        <Router>
            <Switch>
                <Route path="/doc" exact>
                    {user ? <Redirect to={`/documents/${uuidv4()}}`}></Redirect> : <Redirect to="/" />}
                </Route>
                <Route path="/documents/:id">{user ? <TextEditor /> : <Redirect to="/" />}</Route>
                <Route path="/" exact>
                    {user ? <Redirect to="/doc" /> : <Login />}
                </Route>
                <Route path="/register" exact>
                    {user ? <Redirect to="/doc" /> : <Register />}
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
