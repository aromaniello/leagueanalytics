import React from "react"
import PropTypes from "prop-types"
import _ from "lodash"
import RuneEditor from './RuneEditor'
import ItemSetEditor from './ItemSetEditor'

class BuildEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      champion: {},
      runes: {},
      items: {}
    };
  }

  renderChampionOptions = () => {
    return _.keys(this.props.champions).map((champion) => {
      return <option value={champion} key={`champion-option-${_.kebabCase(champion)}`}>{champion}</option>;
    })
  }

  renderChampionSelect = () => {
    return (
      <select className="champion-select" name={'name'} id={'id'}
              onChange={e => console.log(e.target.value)}>
        <option value=""></option>
        {this.renderChampionOptions()}
      </select>
    )
  }

  renderLevelSelect = () => {
    return (
      <select className="level-select" name={'name'} id={'id'}
              onChange={e => console.log(e.target.value)}>
        {this.renderNumericOptions(1, 19)}
      </select>
    );
  }

  renderBasicAbilitySelect = () => {
    return (
      <select className="ability-select" name={'name'} id={'id'}
              onChange={e => console.log(e.target.value)}>
        {this.renderNumericOptions(0, 6)}
      </select>
    );
  }

  renderUltimateAbilitySelect = () => {
    return (
      <select className="ability-select" name={'name'} id={'id'}
              onChange={e => console.log(e.target.value)}>
        {this.renderNumericOptions(0, 4)}
      </select>
    );
  }

  renderNumericOptions = (from, to) => {
    return _.range(from, to).map((i) => {
      return <option value={i}>{i}</option>;
    });
  }

  render () {
    return (
      <div className="build-editor">
        <div className="row">
          <div className="col-3">
            <h2>Build 1</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-1">
            <label className="">Champion</label>
          </div>
          <div className="col-3">
            <div className="">
              {this.renderChampionSelect()}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-1">
            <label className="">Level</label>
          </div>
          <div className="col-3">
            <div className="">
              {this.renderLevelSelect()}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-1">
            <label className="">Abilities</label>
          </div>
          <div className="col-11">
            <label>Q:</label>
            <div style={{display:'inline-block'}} className="">
              {this.renderBasicAbilitySelect()}
            </div>

            <label>W:</label>
            <div style={{display:'inline-block'}} className="">
              {this.renderBasicAbilitySelect()}
            </div>

            <label>E:</label>
            <div style={{display:'inline-block'}} className="">
              {this.renderBasicAbilitySelect()}
            </div>

            <label>R:</label>
            <div style={{display:'inline-block'}} className="">
              {this.renderUltimateAbilitySelect()}
            </div>
          </div>
        </div>

        <hr/>

        <ItemSetEditor items={this.props.items} />

        <hr/>

        <RuneEditor rune_data={this.props.runes} />

        <hr/>

        <div className="row">
          <div className="col-1 offset-11">
            <button style={{width:"100%"}} className="btn btn-primary">Sim</button>
          </div>
        </div>

      </div>
    );
  }
}

export default BuildEditor
