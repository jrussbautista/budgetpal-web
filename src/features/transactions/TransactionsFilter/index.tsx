import { IconButton, Typography, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import debounce from 'lodash.debounce';
import React, { useState, useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import SelectDateRangeModal from 'components/SelectDateRangeModal';
import SelectAmountModal from 'features/transactions/SelectAmountModal';
import { setSelectedFilter, resetSelectedFilter } from 'features/transactions/transactionsSlice';
import { DateRange } from 'types';
import formatDate from 'utils/formatDate';

const useStyles = makeStyles({
  topContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterContainer: {
    margin: '10px 0 20px 0',
  },
  itemsContainer: {
    margin: '10px -5px  0 -5px',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  formControl: {
    width: '33.33%',
    padding: '0 5px',
    marginBottom: 10,
  },
  formStaticInput: {
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    padding: '15.5px  10px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  formInputText: {
    color: 'rgba(0, 0, 0, 0.54)',
    width: '90%',
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  iconButton: {
    padding: 6,
  },
  btnReset: {
    textTransform: 'none',
    marginRight: 10,
    fontWeight: 'normal',
  },
});

interface Props {
  onToggleFilter(): void;
}

const TransactionsFilter: React.FC<Props> = ({ onToggleFilter }) => {
  const classes = useStyles();

  const { selectedFilter } = useAppSelector((state) => state.transactions);
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);
  const [showAmountModal, setShowAmountModal] = useState(false);

  const [titleText, setTitleText] = useState(selectedFilter.title || '');

  const dispatch = useAppDispatch();

  const searchTitle = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(
          setSelectedFilter({
            title: value,
          })
        );
      }, 1000),
    [dispatch]
  );

  useEffect(() => {
    if (titleText) {
      searchTitle(titleText);
    }
  }, [titleText, searchTitle]);

  const handleReset = () => {
    dispatch(resetSelectedFilter());
    setTitleText('');
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>, filterName: string) => {
    const value = event.target.value as string;

    dispatch(
      setSelectedFilter({
        [filterName]: value,
      })
    );
  };

  const handleChangeTitle = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTitleText(event.target.value as string);
  };

  const showResetFilter = () => {
    return Object.keys(selectedFilter).some((filter) => selectedFilter[filter] !== '');
  };

  const handleSelectDateRange = (range: DateRange) => {
    const { start_date, end_date } = range;
    dispatch(setSelectedFilter({ start_date, end_date }));
    setShowDateRangeModal(false);
  };

  return (
    <div className={classes.filterContainer}>
      <Card>
        <CardContent>
          <div className={classes.topContainer}>
            <Typography variant="h6"> Filter </Typography>
            <div>
              {showResetFilter() && (
                <Button className={classes.btnReset} variant="text" onClick={handleReset}>
                  Reset
                </Button>
              )}

              <IconButton onClick={onToggleFilter} className={classes.iconButton}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>

          <div className={classes.itemsContainer}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                id="category"
                label="Category"
                onChange={(e) => handleChange(e, 'category_id')}
                value={selectedFilter.category_id}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value={1}>Non</MenuItem>
                <MenuItem value={2}>Ut</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="type">Type</InputLabel>
              <Select
                labelId="type"
                id="type"
                label="type"
                onChange={(e) => handleChange(e, 'type')}
                value={selectedFilter.type}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
                <MenuItem value="income">Income</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                onChange={handleChangeTitle}
                value={titleText}
              />
            </FormControl>
            <div className={classes.formControl}>
              <div
                role="button"
                className={classes.formStaticInput}
                onClick={() => setShowDateRangeModal(true)}
                onKeyDown={() => setShowDateRangeModal(true)}
                tabIndex={-1}
              >
                <Typography className={classes.formInputText}>
                  {selectedFilter.start_date && selectedFilter.end_date
                    ? `${formatDate(selectedFilter.start_date)} - ${formatDate(
                        selectedFilter.end_date
                      )}`
                    : 'Date'}
                </Typography>
                <ChevronRightIcon />
              </div>
            </div>
            <div className={classes.formControl}>
              <div
                role="button"
                className={classes.formStaticInput}
                onClick={() => setShowAmountModal(true)}
                onKeyDown={() => setShowDateRangeModal(true)}
                tabIndex={-1}
              >
                <Typography className={classes.formInputText}>
                  {selectedFilter.min_amount && selectedFilter.max_amount
                    ? `${selectedFilter.min_amount}  -  ${selectedFilter.max_amount}`
                    : 'Amount'}
                </Typography>
                <ChevronRightIcon />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <SelectDateRangeModal
        show={showDateRangeModal}
        onSelectDateRange={handleSelectDateRange}
        onClose={() => setShowDateRangeModal(false)}
      />
      <SelectAmountModal show={showAmountModal} onClose={() => setShowAmountModal(false)} />
    </div>
  );
};

export default TransactionsFilter;
