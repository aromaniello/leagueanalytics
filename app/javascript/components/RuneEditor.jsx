import React from "react"
import PropTypes from "prop-types"
import _ from "lodash"

const RuneEditor = ({ rune_data }) => {

  const renderPathOptions = (selectName) => {
    return rune_data['Paths'].map((path) => {
      return <option value={path} key={`${selectName}-option-${_.kebabCase(path)}`}>{path}</option>;
    })
  }

  const renderStatOptions = (row, selectName) => {
    return rune_data['Stats'][row].map((stat) => {
      return <option value={stat} key={`${selectName}-option-${_.kebabCase(stat)}`}>{stat}</option>;
    })
  }

  return (
    <div>
      <div className="row">
        <div className="col-3">
          <h3>Runes</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          <select className="rune-select" name={name} id={name}
                  onChange={e => console.log(e.target.value)}>
            <option value="">Primary Path</option>
            {renderPathOptions('primary-path')}
          </select>
        </div>
        <div className="col-2">
          <select className="rune-select" name={name} id={name}
                  onChange={e => console.log(e.target.value)}>
            <option value="">Secondary Path</option>
            {renderPathOptions('secondary-path')}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          <select className="rune-select" name={name} id={name}
                  onChange={e => console.log(e.target.value)}>
            <option value="">Rune #1</option>
          </select>
        </div>
        <div className="col-2">
          <select className="rune-select" name={name} id={name}
                  onChange={e => console.log(e.target.value)}>
            <option value="">Rune #5</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          <select className="rune-select" name={name} id={name}
                  onChange={e => console.log(e.target.value)}>
            <option value="">Rune #2</option>
          </select>
        </div>
        <div className="col-2">
          <select className="rune-select" name={name} id={name}
                  onChange={e => console.log(e.target.value)}>
            <option value="">Rune #6</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          <select className="rune-select" name={name} id={name}
                  onChange={e => console.log(e.target.value)}>
            <option value="">Rune #3</option>
          </select>
        </div>
        <div className="col-2">
          <select className="rune-select" name={name} id={name}
                  onChange={e => console.log(e.target.value)}>
            <option value="">Stat #1</option>
            {renderStatOptions('first_row', 'stat-1')}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          <select className="rune-select" name={name} id={name}
                  onChange={e => console.log(e.target.value)}>
            <option value="">Rune #4</option>
          </select>
        </div>
        <div className="col-2">
          <select className="rune-select" name={name} id={name}
                  onChange={e => console.log(e.target.value)}>
            <option value="">Stat #2</option>
            {renderStatOptions('second_row', 'stat-2')}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-2 offset-2">
          <select className="rune-select" name={name} id={name}
                  onChange={e => console.log(e.target.value)}>
            <option value="">Stat #3</option>
            {renderStatOptions('third_row', 'stat-3')}
          </select>
        </div>
      </div>
    </div>
  );
}

export default RuneEditor;
