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
  margin: 0,
  paddingTop: 3,
  paddingRight: 30,
  paddingLeft: 58,
};

const SkillContent = ({data: {description, descriptors = []}}) => (
  <ul style={recordStyle}>
    {descriptors.map((d, i) => <li key={i}>{d}</li>)}
  </ul>
);

const SkillTitle = () => <h2>Technical Skills</h2>;
const spacerStyle = {
  height: 30,
};
const SkillSpacer = () => <div className="SkillSpacer" style={spacerStyle} />;

const SkillSection = ({data: {skills}}) => (
  <div>
    {skills &&
      skills.map((d, i) => [
        (!i &&
          <div className="title" key={i}>
            <Section content={SkillTitle} />
            <Section
              sub={true}
              data={d}
              panel={SkillPanel}
              content={SkillContent}
            />
          </div>) ||
          null,
        (i &&
          <Section
            sub={true}
            data={d}
            panel={SkillPanel}
            content={SkillContent}
          />) ||
          null,

        (i !== skills.length - 1 && <SkillSpacer key={100 + i} />) || null,
      ])}
    <Section.Footer />
  </div>
);

export default SkillSection;
