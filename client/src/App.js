import TextEditor from './TextEditor';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Login from './components/Login';
function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Redirect to={`/documents/${uuidv4()}}`}></Redirect>
                </Route>
                <Route path="/documents/:id">
                    <TextEditor />
                </Route>

                <Route path="/documents/" exact>
                    <Login />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
