import React from "react"
import PropTypes from "prop-types"
import _ from "lodash"

const ItemSetEditor = (props) => {

  const renderItemSelect = (n) => {
    const name = `item-${n}-select`;

    return (
      <div>
        <select className="item-select" name={name} id={name} key={name}
                onChange={e => console.log(e.target.value)}>
          <option value=""></option>
        </select>
      </div>
    );
  }

  const renderItemSet = () => {
    return _.range(0, 6).map((n) => {
      return renderItemSelect(n);
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
