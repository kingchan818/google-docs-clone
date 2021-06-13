import TextEditor from './TextEditor';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Login from './pages/Login';
import Register from './pages/Register';
function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Login />
                </Route>
                <Route path="/register" exact>
                    <Register />
                </Route>
                <Route path="/doc" exact>
                    <Redirect to={`/documents/${uuidv4()}}`}></Redirect>
                </Route>
                <Route path="/documents/:id">
                    <TextEditor />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
