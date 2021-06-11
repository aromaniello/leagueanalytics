import React from 'react'
import PropTypes from 'prop-types'
import ChampionSelector from './ChampionSelector'
import ItemsEditor from './ItemsEditor'
import RuneEditor from './RuneEditor'

const BuildEditor = ({ subject }) => {
  return (
    <React.Fragment>
      <div style={{marginTop:'1rem'}}>
        <ChampionSelector subject={subject} />
      </div>
      <div style={{marginTop:'2rem'}}>
        <ItemsEditor subject={subject} />
      </div>
      <div style={{marginTop:'2rem'}}>
        <RuneEditor subject={subject} />
      </div>
    </React.Fragment>
  );
}

export default BuildEditor
