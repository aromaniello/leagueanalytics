import React from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from 'react-redux'
import { setConfig } from '../actions/configs'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const ConfigEditor = () => {
  const dispatch = useDispatch();
  const configs = useSelector(state => state.configs);

  const renderConfigs = () => {
    return configs.map((config) => {
      if (config.type === 'condition') {
        return renderConditionConfig(config);
      }
      else if (config.type === 'stacks') {
        return renderStacksConfig(config);
      }
    });
  }

  const renderConditionConfig = (config) => {
    return (
      <div className="row config-row" key={`${config.valueId}-config`}>
        <FormControlLabel control={
            <Checkbox checked={config.value}
                      onChange={e => dispatch(setConfig(config.valueId, e.target.checked))}
                      name={`checkbox-${config.valueId}`}
                      color="primary"
            />
          } label={config.question}
        />
      </div>
    );
  }

  const renderStacksConfig = (config) => {
    return (
      <div className="row config-row" key={`${config.valueId}-config`}>
        <div className="col-1">
          <select className="" style={{width:'4rem'}}
                  value={config.value}
                  onChange={e => dispatch(setConfig(config.valueId, parseInt(e.target.value)))}>
            {renderNumericOptions(config.name, config.min, config.max)}
          </select>
        </div>
        <div className="col-11">
          <label>{config.question}</label>
        </div>
      </div>
    );
  }

  const renderNumericOptions = (selectName, from, to) => {
    return _.range(from, to + 1).map((i) => {
      return <option value={i} key={`${selectName}-option-${i}`}>{i}</option>;
    });
  }

  return (
    <React.Fragment>
      {renderConfigs()}
    </React.Fragment>
  );
}

export default ConfigEditor;
