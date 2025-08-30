import {useState} from 'react';
import { Header } from './components/header/header';
// import { Socket } from './socket/socket';
import Home from './pages/Home';
import Socket from './pages/Socket';

export function App() {
  // const [anchorElNav, setAnchorElNav] = useState(false);
  // const [anchorElUser, setAnchorElUser] = useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };
  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };
  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };
  const pages = ['Products', 'Pricing', 'Blog'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  return (
    <>
      <div class="flex">
        <div class="w-screen">
          <Header pages={pages} settings={settings}/>
          <Home />
          <Socket />
        </div>
      </div>
    </>
  );
}