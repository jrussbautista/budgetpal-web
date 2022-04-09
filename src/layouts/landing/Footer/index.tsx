import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      background: theme.palette.grey[200],
      padding: 30,
      textAlign: 'center',
    },
  })
);

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <strong>@2021 Budgetpal</strong>
    </footer>
  );
};

export default Footer;
