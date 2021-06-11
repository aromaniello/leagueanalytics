import React from 'react'
import PropTypes from 'prop-types'
import ChampionSelector from './ChampionSelector'
import ItemSetEditor from './ItemSetEditor'
import RuneEditor from './RuneEditor'

const BuildEditor = ({ subject }) => {
  return (
    <React.Fragment>
      <ChampionSelector subject={subject} />
      <hr/>
      <ItemSetEditor subject={subject} />
      <hr/>
      <RuneEditor subject={subject} />
    </React.Fragment>
  );
}

export default BuildEditor
