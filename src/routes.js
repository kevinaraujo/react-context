import Carrinho from 'pages/Carrinho';
import Feira from 'pages/Feira';
import Login from 'pages/Login';
import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Router = () => {
    const [name, setName] = useState('');
    const [saldo, setSaldo] = useState(0);

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <Login 
                    name={name} 
                    setName={setName} 
                    saldo={saldo}
                    setSaldo={setSaldo}
                    />
                </Route>
                <Route path='/feira'>
                    <Feira />
                </Route>
                <Route path='/carrinho'>
                    <Carrinho />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;