import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
} from "react";
import cloneDeep from 'lodash/cloneDeep'
import styles from './test.module.less'
import mainStyles from './index.less'

const Level = forwardRef((props, ref) => {
  const { level } = props;
  const clonedLevel = cloneDeep(level)
  console.log('lessModule',styles)
  console.log('lessModule-level', styles.level)
  console.log('less-global',mainStyles)
  return <div className={styles.level}>{clonedLevel}</div>;
});

export default Level;
