import React from 'react';
import styles from 'styles';
import './style.css';

const {mui} = styles;

const style = {
  container: {
    position: 'relative',
    minHeight: '100%',
    margin: `${styles.decoVerticalPadding}px ${styles.decoHorizontalPadding}px`,
    padding: `${styles.decoVerticalPadding}px ${styles.decoHorizontalPadding}px`,
    fontFamily: '"Roboto", sans-serif',
    color: styles.color.textNormal,
  },
  decoBG: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: styles.decoVerticalPadding * 2,
    backgroundColor: styles.color.secondary,
    boxShadow: mui.shadow[1],
  },
  sideBG: {
    position: 'absolute',
    top: styles.decoVerticalPadding * 0.5,
    bottom: styles.decoVerticalPadding * 0.5,
    left: styles.decoVerticalPadding,
    width: styles.sidePanelSize,
    backgroundColor: styles.color.primary,
    boxShadow: mui.shadow[1],
  },
  content: {
    position: 'relative',
  },
};

const MyButton = ({children}) => (
  <div className="ContentLayout printBW" style={style.container}>
    <div className="noPrint" style={style.decoBG} />
    <div className="noPrint" style={style.sideBG} />
    <div style={style.content}>
      {children}
    </div>
  </div>
);

export default MyButton;
