import React from 'react'
import PropTypes from 'prop-types'
import ChampionSelector from './ChampionSelector'
import ItemSetEditor from './ItemSetEditor'
import RuneEditor from './RuneEditor'

const BuildEditor = ({ data, subject }) => {
  return (
    <React.Fragment>
      <ChampionSelector champion_data={data.champions} subject={subject} />
      <hr/>
      <ItemSetEditor item_data={data.items} subject={subject} />
      <hr/>
      <RuneEditor rune_data={data.runes} subject={subject} />
    </React.Fragment>
  );
}

export default BuildEditor
