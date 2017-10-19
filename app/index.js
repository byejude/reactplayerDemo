import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Root from './Root';
ReactDOM.render(
    <AppContainer>
        <Root/>
    </AppContainer>,
    document.getElementById('app')
);



// webpack热替换api 开启
if (module.hot) {
    module.hot.accept('./Root', () => {
        const NextApp = require('./Root').default;
        ReactDOM.render(
            <AppContainer>
                <NextApp/>
            </AppContainer>,
            document.getElementById('app')
        );
    });
}