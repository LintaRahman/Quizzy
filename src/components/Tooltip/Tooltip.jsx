import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function ToolTip({text}) {
  return (
    <Tooltip title={text} style={{fontSize: '1.5rem'}}>
        {/* <FontAwesomeIcon icon={faInfoCircle} style={{height: '1.5rem'}}/> */}
        <InfoOutlinedIcon />
    </Tooltip>
  );
}

