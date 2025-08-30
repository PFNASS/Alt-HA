import { render } from 'preact'
import './index.css'
import { App } from './app.jsx'

// const Routes = () => {
//     <Router>
//       <div class="flex">
//         <div class="w-screen">
//           <Header pages={pages} settings={settings}/>
//           <Home />
//           <Socket/>
//         </div>
//       </div>
//     </Router>
// };

render(

    <App />
    ,
    document.getElementById('app'))
