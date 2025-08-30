import {useState} from 'react';
import { Header } from './components/header/header';

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

  return (
    <>
    <div class="flex">
      <div class="w-screen">
        <Header />
      </div>
    </div>
    </>
  );
}