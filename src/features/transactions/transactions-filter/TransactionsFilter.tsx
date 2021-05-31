import React, { useCallback, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { IconButton, Typography, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  setSelectedFilter,
  resetSelectedFilter,
  setSelectedModal,
} from '../transactions-slice';
import debounce from 'lodash.debounce';
import SelectDateModal from '../select-date-modal';
import SelectAmountModal from '../select-amount-modal';

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
    margin: '10px -5px',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  formControl: {
    flexBasis: '20%',
    padding: '0 5px',
  },
  formStaticInput: {
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    padding: '15.5px  10px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  formInputText: {
    color: 'rgba(0, 0, 0, 0.54)',
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

  const [titleText, setTitleText] = useState('');

  const dispatch = useAppDispatch();

  const searchTitle = useCallback(
    debounce((value: string) => {
      dispatch(
        setSelectedFilter({
          title: value,
        })
      );
    }, 1000),
    []
  );

  useEffect(() => {
    return () => {
      dispatch(resetSelectedFilter());
    };
  }, [dispatch]);

  useEffect(() => {
    if (titleText) {
      searchTitle(titleText);
    }
  }, [titleText, searchTitle]);

  const handleReset = () => {
    dispatch(resetSelectedFilter());
    setTitleText('');
  };

  const handleChange = (
    event: React.ChangeEvent<{ value: unknown }>,
    filterName: string
  ) => {
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
    return Object.keys(selectedFilter).some(
      (filter) => selectedFilter[filter] !== ''
    );
  };

  return (
    <div className={classes.filterContainer}>
      <Card>
        <CardContent>
          <div className={classes.topContainer}>
            <Typography variant='h6'> Filter </Typography>
            <div>
              {showResetFilter() && (
                <Button
                  className={classes.btnReset}
                  variant='text'
                  onClick={handleReset}
                >
                  Reset
                </Button>
              )}

              <IconButton
                onClick={onToggleFilter}
                className={classes.iconButton}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>

          <div className={classes.itemsContainer}>
            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel id='category'>Category</InputLabel>
              <Select
                labelId='category'
                id='category'
                label='Category'
                onChange={(e) => handleChange(e, 'category_id')}
                value={selectedFilter.category_id}
              >
                <MenuItem value=''>None</MenuItem>
                <MenuItem value={1}>Non</MenuItem>
                <MenuItem value={2}>Ut</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel id='type'>Type</InputLabel>
              <Select
                labelId='type'
                id='type'
                label='type'
                onChange={(e) => handleChange(e, 'type')}
                value={selectedFilter.type}
              >
                <MenuItem value=''>None</MenuItem>
                <MenuItem value='expense'>Expense</MenuItem>
                <MenuItem value='income'>Income</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id='title'
                label='Title'
                variant='outlined'
                onChange={handleChangeTitle}
                value={titleText}
              />
            </FormControl>
            <div className={classes.formControl}>
              <div
                className={classes.formStaticInput}
                onClick={() => dispatch(setSelectedModal('selectDateModal'))}
              >
                <Typography className={classes.formInputText}>Date</Typography>
                <ChevronRightIcon />
              </div>
            </div>
            <div className={classes.formControl}>
              <div
                className={classes.formStaticInput}
                onClick={() => dispatch(setSelectedModal('selectAmountModal'))}
              >
                <Typography className={classes.formInputText}>
                  Amount
                </Typography>
                <ChevronRightIcon />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <SelectDateModal />
      <SelectAmountModal />
    </div>
  );
};

export default TransactionsFilter;
