import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
} from "react";
import cloneDeep from 'lodash/cloneDeep'

const HcyCascader = forwardRef((props, ref) => {
  const { level } = props;
  const clonedLevel = cloneDeep(level)

  return <div className='level'>{clonedLevel}</div>;
});

export default HcyCascader;
