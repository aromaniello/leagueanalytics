import React from "react"
import PropTypes from "prop-types"
import { useSelector, useDispatch } from 'react-redux'
import { setItem } from '../actions/items'
import _ from "lodash"

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  itemSelect: {
    margin: theme.spacing(1),
    minWidth: 140
  },
  formControl: {
    margin: theme.spacing(1),
    width: 160
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ItemsEditor = ({ subject }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const item_data = useSelector(state => state.data.items);

  const renderItemSelect = (index) => {
    return (
      <FormControl className={classes.formControl} key={`item-${index}-form-control`}>
        <InputLabel id={`item-${index}-select-label`}>{`Item #${index + 1}`}</InputLabel>
        <Select
          labelId={`item-${index}-select-label`}
          id={`item-${index}-select`}
          value={useSelector(state => state[subject].items[index]) || ''}
          onChange={e => dispatch(setItem(subject, index, e.target.value))}
        >
          <MenuItem value=""></MenuItem>
          {renderItemOptions(index)}
        </Select>
      </FormControl>
    );
  }

  const renderItemOptions = (index) => {
    return _.keys(item_data).sort().map((item) => {
      return <MenuItem value={item} key={`item-${index}-option-${item}`}>{item}</MenuItem>;
    })
  }

  const renderItems = () => {
    return _.range(0, 6).map((index) => {
      return (
        renderItemSelect(index)
      );
    });
  }

  return (
    <React.Fragment>
      <div className="row build-editor-subtitle">
        ITEMS
      </div>

      <div className="row">
        {renderItems()}
      </div>
    </React.Fragment>
  );
}

export default ItemsEditor;
