import React from 'react';
import Section from 'component/Section';
import styles from 'styles';
import './style.css';

const {ga} = window;

const photoStyle = {
  width: '100%',
  filter: 'grayscale(100%)',
};

const photoContainerStyle = {
  position: 'relative',
  height: 0,
  width: '100%',
  padding: 5,
  overflow: 'visible',
};

const lineStyle = {
  margin: 0,
  border: `2px solid ${styles.color.secondary}`,
  boxShadow: styles.mui.shadow[1],
};

const jobStyle = {
  color: styles.color.textSubdued,
};

const contactStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: 10,
  fontSize: 12,
  boxShadow: styles.mui.shadow[1],
};
const additionalContactStyle = {
  ...contactStyle,
  marginTop: 5,
};

const Link = props => {
  const {href} = props;
  return (
    <a
      target="_blank"
      onClick={() => ga('send', 'event', 'External Link', 'open', href)}
      {...props}
    />
  );
};

const HeaderPanel = ({data: {name, photo}}) => (
  <div style={photoContainerStyle}>
    <img alt={`${name}`} src={photo} style={photoStyle} />
  </div>
);

const HeaderContent = (
  {
    data: {
      name = 'John Doe',
      jobTitle = 'Uniquely Ubiquitous Entity',
      location = 'Planetary Core, Mars',
      mobile = '+82-10-1234-1234',
      email = 'asdf@sadf.com',
      additionalContact = [],
    },
  },
) => (
  <div>
    <h1>{name}</h1>
    <hr style={lineStyle} />
    <h4 style={jobStyle}>{jobTitle}</h4>
    <div className="contacts textOnDeco printBW" style={contactStyle}>
      <div>{location}</div>
      <div>Mobile: {mobile}</div>
      <div>Email: <Link href={`mailto:${email}`}>{email}</Link></div>
    </div>
    <div className="contacts textOnDeco printBW" style={additionalContactStyle}>
      {additionalContact.map(({name, url}, i) => (
        <div key={i}>{name}: <Link target="_blank" href={url}>{url}</Link></div>
      ))}
    </div>
  </div>
);

const HeaderSection = ({data}) => (
  <Section data={data} panel={HeaderPanel} content={HeaderContent} />
);

export default HeaderSection;
