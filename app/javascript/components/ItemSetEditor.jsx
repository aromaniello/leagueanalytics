import React from "react"
import PropTypes from "prop-types"
import { useSelector, useDispatch } from 'react-redux'
import { setItem } from '../actions/items'
import _ from "lodash"

const ItemSetEditor = ({ subject }) => {
  const dispatch = useDispatch();
  const item_data = useSelector(state => state.data.items);

  const renderItemOptions = (selectName) => {
    return _.keys(item_data).map((item) => {
      return <option value={item} key={`${selectName}-${_.kebabCase(item)}`}>{item}</option>
    })
  }

  const renderItemSelect = (index) => {
    const id = `item-${index}-select`;
    return (
      <select className="build-select item-select" name={id} id={id} key={id}
              value={useSelector(state => state[subject].items[index]) || ''}
              onChange={e => dispatch(setItem(subject, index, e.target.value))}>
        <option value="" key={`item-${index}-empty`}></option>
        {renderItemOptions(`item-${index}`)}
      </select>
    );
  }

  const renderItems = () => {
    return _.range(0, 6).map((index) => {
      return renderItemSelect(index);
    });
  }

  return (
    <div>
      <div className="row">
        <div className="col-3">
          <h3>Items</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          {renderItems()}
        </div>
      </div>
    </div>
  );
}

export default ItemSetEditor;
