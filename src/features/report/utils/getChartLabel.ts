const getChartLabel = (dateType: string, value: number) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  let label = value.toString();

  switch (dateType) {
    case 'withInMoreThanMonth':
    case 'withInYear':
      label = months[value - 1];
      break;
  }

  return label;
};

export default getChartLabel;
