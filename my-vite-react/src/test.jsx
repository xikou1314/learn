import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
} from "react";
import cloneDeep from 'lodash/cloneDeep'
import styles from './test.module.less'

const HcyCascader = forwardRef((props, ref) => {
  const { level } = props;
  const clonedLevel = cloneDeep(level)
  return <div className={styles.level}>{clonedLevel}</div>;
});

export default HcyCascader;
