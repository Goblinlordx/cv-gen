import React from 'react';
import Section from 'component/Section';
import './style.css';

const rangeStyle = {
  textAlign: 'right',
};

const SkillPanel = ({data: {name}}) => (
  <h3 style={rangeStyle}>
    {name}
  </h3>
);

const recordStyle = {
  flex: 1,
  paddingTop: 3,
  paddingRight: 30,
  paddingLeft: 30,
};

const SkillContent = ({data: {description}}) => (
  <div style={recordStyle}>
    {description}
  </div>
);

const SkillTitle = () => <h2>Technical Skills</h2>;
const spacerStyle = {
  height: 30,
};
const SkillSpacer = () => <div className="SkillSpacer" style={spacerStyle} />;

const SkillSection = ({data: {skills}}) => (
  <div>
    <Section content={SkillTitle} />
    {skills &&
      skills.map((d, i) => [
        <Section
          key={i}
          sub={true}
          data={d}
          panel={SkillPanel}
          content={SkillContent}
        />,
        <SkillSpacer key={100 + i} />,
      ])}
    <Section.Footer />
  </div>
);

export default SkillSection;
