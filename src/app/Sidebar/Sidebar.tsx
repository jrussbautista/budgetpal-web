import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import SidebarList from './SidebarList';

import logo from '@/assets/images/logo-white.svg';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.primary.main,
  },
  toolbar: theme.mixins.toolbar,
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'center',
    color: '#fff',
  },
  icon: {
    color: '#fff',
  },
  logo: {
    width: 30,
    marginRight: 10,
  },
}));

interface Props {
  window?: () => Window;
  isMobileSidebarOpen: boolean;
  toggleMobileSidebar(): void;
}

const Sidebar: React.FC<Props> = ({ isMobileSidebarOpen, toggleMobileSidebar, window }) => {
  const classes = useStyles();
  const theme = useTheme();

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="menu">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={isMobileSidebarOpen}
          onClose={toggleMobileSidebar}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div className={classes.drawerHeader}>
            <img src={logo} alt="Budgetpal logo" className={classes.logo} />
            <Typography variant="h6" color="inherit">
              Budgetpal
            </Typography>
          </div>
          <SidebarList />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <div className={classes.drawerHeader}>
            <img src={logo} alt="Budgetpal logo" className={classes.logo} />
            <Typography variant="h6" color="inherit">
              Budgetpal
            </Typography>
          </div>
          <Divider />
          <SidebarList />
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default Sidebar;
