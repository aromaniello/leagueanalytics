import React from "react"
import PropTypes from "prop-types"
import _ from "lodash"

const RuneEditor = (props) => {

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
            <option value="Precision">Precision</option>
            <option value="Domination">Domination</option>
            <option value="Sorcery">Sorcery</option>
            <option value="Resolve">Resolve</option>
            <option value="Inspiration">Inspiration</option>
          </select>
        </div>
        <div className="col-2">
          <select className="rune-select" name={name} id={name}
                  onChange={e => console.log(e.target.value)}>
            <option value="">Secondary Path</option>
            <option value="Precision">Precision</option>
            <option value="Domination">Domination</option>
            <option value="Sorcery">Sorcery</option>
            <option value="Resolve">Resolve</option>
            <option value="Inspiration">Inspiration</option>
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
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-2 offset-2">
          <select className="rune-select" name={name} id={name}
                  onChange={e => console.log(e.target.value)}>
            <option value="">Stat #3</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default RuneEditor;
