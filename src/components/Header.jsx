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
import Local from '@mui/icons-material/LocalHospitalSharp';
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
    <AppBar position='static' sx={{
      backgroundColor: 'rgb(28, 37, 54)'
    }}>
      <Container maxWidth='xl' >
        <Toolbar disableGutters>
          <Local sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, }} />
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
              textDecoration: 'none', 
              marginRight: "auto"
            }}
          >
            Centro médico
          </Typography>

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              
                <MenuItem component='a' href='/big-calendar'>
                  <Typography textAlign='center'>Mantenimiento Centro médico</Typography>
                </MenuItem>
            </Menu>
          </Box> */}
          {/* <Typography
            variant='h5'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Centro médico
          </Typography> */}
          {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button component='a' href='/allergies-table/' sx={{ my: 2, color: 'white', display: 'block' }}>test</Button>
          </Box> */}
          {/* Menu Mantenimientos */}
          {
            userData && userData.rol == "Administrador" && <Box sx={{ flexGrow: 0 }}>
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
                  <MenuItem component='a' href='/big-calendar/'>
                    <Typography textAlign='center'>Mantenimiento Citas</Typography>
                  </MenuItem>
                  <MenuItem component='a' href='/diseases-table/'>
                    <Typography textAlign='center'>Mantenimiento Enfermedades</Typography>
                  </MenuItem>
                  <MenuItem component='a' href='/medication-table/'>
                    <Typography textAlign='center'>Mantenimiento Medicamentos</Typography>
                  </MenuItem>
                  <MenuItem component='a' href='/allergies-table/'>
                    <Typography textAlign='center'>Mantenimiento allergias</Typography>
                  </MenuItem>
                  <MenuItem component='a' href='/doctors-table/'>
                    <Typography textAlign='center'>Mantenimiento doctor</Typography>
                  </MenuItem>
                  <MenuItem component='a' href='/user-table/'>
                    <Typography textAlign='center'>Mantenimiento Usuario</Typography>
                  </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          }
          
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
                  {
                    userData?.email && <MenuItem>
                      <Typography variant='subtitle1' gutterBottom>
                        {userData?.email}
                      </Typography>
                    </MenuItem>
                  }
                  <MenuItem color='secondary' component='a' href='/user'>
                    <Typography textAlign='center'>Mi cuenta</Typography>
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
