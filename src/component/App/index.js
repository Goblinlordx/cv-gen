import React from 'react';
import ContentLayout from 'component/ContentLayout';
import HeaderSection from 'component/HeaderSection';
import CareerSection from 'component/CareerSection';
import TechSkillSection from 'component/TechSkillSection';
import CertSection from 'component/CertSection';

const spacerStyle = {
  height: 40,
};
const Spacer = () => <div style={spacerStyle} />;

const Sections = [HeaderSection, CareerSection, TechSkillSection, CertSection];

const App = (
  {
    init = false,
    authorized = false,
    invalidToken = false,
    data = {},
  },
) => {
  if (!init) return null;
  if (!authorized) {
    return (
      <div>
        <div>You are not authorized to view this content</div>
        {(invalidToken && <div>Invalid access token</div>) || null}
      </div>
    );
  }
  return (
    <ContentLayout>
      {Sections.map((Renderer, i) => (
        <div key={i}>
          {(i && <Spacer />) || null}
          <Renderer data={data} />
        </div>
      ))}
    </ContentLayout>
  );
};

export default App;
