import React from 'react';
import styles from 'styles';
import './style.css';

const sectionStyle = {
  display: 'flex',
  flexWrap: 'nowrap',
};

const sidePanelStyle = {
  position: 'relative',
  flexShrink: 0,
  marginLeft: styles.decoVerticalPadding,
  padding: '0 5px',
  width: styles.sidePanelSize,
};

const contentStyle = {
  flex: 1,
  flexShrink: 0,
  flexGrow: 1,
};

const Section = ({sub, data, panel: Panel, content: Content}) => (
  <div
    className={`section${(sub && ' SubSection') || ''}`}
    style={sectionStyle}
  >
    <div className="textOnDeco printBW" style={sidePanelStyle}>
      {Panel && <Panel data={data} />}
    </div>
    <div style={contentStyle}>
      {Content && <Content data={data} />}
    </div>
  </div>
);

const footerStyle = {
  padding: '0 10%',
};
const lineStyle = {
  border: 'none',
  borderBottom: `1px solid rgb(175, 180, 217)`,
};
const Footer = () => (
  <div style={footerStyle}>
    <hr style={lineStyle} />
  </div>
);
Section.Footer = () => <Section content={Footer} />;

export default Section;
