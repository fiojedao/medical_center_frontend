import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import MovieIcon from '@mui/icons-material/LocalMovies'
import PersonIcon from '@mui/icons-material/Person'
import TableViewIcon from '@mui/icons-material/TableView'
import { React, useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'

export function Header () {
  const {user, decodeToken, autorize } =useContext(UserContext)
  const [userData, setUserData]=useState(decodeToken())
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [anchorElMant, setAnchorElMant] = useState(null)
  useEffect(()=>{
    setUserData(decodeToken())
  },[user])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleOpenMantMenu = (event) => {
    setAnchorElMant(event.currentTarget)
  }
  const handleCloseMantMenu = () => {
    setAnchorElMant(null)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <MovieIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Peliculas
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              
                <MenuItem component='a' href='/movie-table/'>
                  <Typography textAlign='center'>Mantenimiento Peliculas</Typography>
                </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Peliculas
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button component='a' href='/movie/' sx={{ my: 2, color: 'white', display: 'block' }}>Lista Peliculas</Button>
          </Box>
          {/* Menu Mantenimientos */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Mantenimiento'>
              <IconButton onClick={handleOpenMantMenu} sx={{ p: 1 }}>
                <TableViewIcon style={{ fill: 'white' }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-mant'
              anchorEl={anchorElMant}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElMant)}
              onClose={handleCloseMantMenu}
            >
              <MenuList>
                {user && autorize({ allowedRoles: ['Administrador']}) && 
                  <MenuItem component='a' href='/movie-table/'>
                    <Typography textAlign='center'>Mantenimiento Peliculas</Typography>
                  </MenuItem>}

              </MenuList>
            </Menu>
          </Box>
          {/* Menu Mantenimientos */}
          {/* Menu Usuario */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Usuario'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!userData && ( 
                <MenuList>
                  <MenuItem component='a' href='/user/login'>
                    <Typography textAlign='center'>Login</Typography>
                  </MenuItem>
                  <MenuItem component='a' href='/user/create'>
                    <Typography textAlign='center'>Registrarse</Typography>
                  </MenuItem>
                </MenuList>
              )}
              {userData && ( 
                <MenuList>
                  <MenuItem>
                    <Typography variant='subtitle1' gutterBottom>
                      {userData?.email}
                      {/* var? resultado: resultado3 */}
                    </Typography>
                  </MenuItem>
                  <MenuItem color='secondary' component='a' href='/user/logout'>
                    <Typography textAlign='center'>Logout</Typography>
                  </MenuItem>
                </MenuList>
              )}
            </Menu>
          </Box>
          {/* Menu Usuario */}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
