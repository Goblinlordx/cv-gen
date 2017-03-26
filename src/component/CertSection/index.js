import React from 'react';
import Section from 'component/Section';
import styles from 'styles';

const yearStyle = {
  textAlign: 'right',
};

const CertPanel = ({data: {year}}) => (
  <h3 style={yearStyle}>
    {year}
  </h3>
);

const recordStyle = {
  paddingLeft: 40,
  paddingRight: 30,
};

const posStyle = {
  textAlign: 'left',
  marginBottom: 10,
  color: styles.color.textSubdued,
};
const rhStyle = {textAlign: 'left', marginBottom: 0, paddingLeft: 30};

const CertContent = (
  {
    data: {
      name = 'Translate Universal',
      company = 'Universal Translator',
    },
  },
) => (
  <div>
    <h3 style={rhStyle}>{name}</h3>
    <div style={recordStyle}>
      <h4 style={posStyle}>{company}</h4>
    </div>
  </div>
);

const CertTitle = () => <h2>Training and Certifications</h2>;
const spacerStyle = {
  height: 30,
};
const CertSpacer = () => <div style={spacerStyle} />;

const CertSection = ({data: {training}}) => (
  <div>
    <Section content={CertTitle} />
    {training &&
      training.map((d, i) => [
        <Section key={i} data={d} panel={CertPanel} content={CertContent} />,
        (i !== training.length - 1 && <CertSpacer />) || null,
      ])}
    <Section.Footer />
  </div>
);

export default CertSection;
