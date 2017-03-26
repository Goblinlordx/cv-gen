import React from 'react';
import Section from 'component/Section';
import styles from 'styles';

const rangeStyle = {
  textAlign: 'right',
};

const CareerPanel = ({data: {start, end}}) => (
  <h3 style={rangeStyle}>
    {start} - {end}
  </h3>
);

const recordStyle = {
  paddingLeft: 40,
  paddingRight: 30,
};

const posStyle = {
  textAlign: 'left',
  color: styles.color.textSubdued,
};

const descStyle = {
  position: 'relative',
  left: '-1em',
  marginRight: '-1em',
};

const CareerContent = (
  {
    data: {
      company = 'Universal Cattery',
      position = 'Translator',
      descriptors,
    },
  },
) => (
  <div>
    <div style={recordStyle}>
      <h4 style={posStyle}>{company}</h4>
      {descriptors &&
        descriptors.map((desc, i) => (
          <li key={100 + i}><span style={descStyle}>{desc}</span></li>
        ))}
    </div>
  </div>
);

const rhStyle = {textAlign: 'left', marginBottom: 0, paddingLeft: 30};

const CareerTitle = () => <h2>Career Experience</h2>;
const RecordHeader = ({data: {position}}) => (
  <h3 style={rhStyle}>{position}</h3>
);
const spacerStyle = {
  height: 30,
};
const CareerSpacer = () => <div style={spacerStyle} />;

const CareerSection = ({data: {career}}) =>
  career.length > 0 &&
  <div>
    <Section content={CareerTitle} />
    {career &&
      career.map((d, i) => (
        <div className="SubSection" key={i}>
          <Section data={d} panel={CareerPanel} content={RecordHeader} />
          <Section data={d} content={CareerContent} />
          <CareerSpacer />
        </div>
      ))}
    <Section.Footer />
  </div>;

export default CareerSection;
