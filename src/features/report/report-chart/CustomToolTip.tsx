import Typography from '@material-ui/core/Typography';
import { TooltipProps } from 'recharts';

const CustomToolTip = ({ payload, active }: TooltipProps<string, number>) => {
  if (active && payload && payload.length > 0) {
    return (
      <div style={{ backgroundColor: '#fff', padding: 10, borderRadius: 6 }}>
        <Typography variant='h6'>P{payload[0].payload.amount}</Typography>
      </div>
    );
  }
  return null;
};

export default CustomToolTip;
