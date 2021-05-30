import React from "react"
import PropTypes from "prop-types"
import _ from "lodash"

const ItemSetEditor = ({ items, store }) => {

  const renderItemOptions = (selectName) => {
    return _.keys(items).map((item) => {
      return <option value={item} key={`${selectName}-${_.kebabCase(item)}`}>{item}</option>
    })
  }

  const renderItemSelect = (index) => {
    const id = `item-${index}-select`;

    return (
      <select className="item-select" name={id} id={id} key={id}
              onChange={e => store.dispatch({ type: 'SET_ITEM', index: index, item: e.target.value })}>
        <option value="" key={`item-${index}-empty`}></option>
        {renderItemOptions(`item-${index}`)}
      </select>
    );
  }

  const renderItemSet = () => {
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
          {renderItemSet()}
        </div>
      </div>
    </div>
  );
}

export default ItemSetEditor;
