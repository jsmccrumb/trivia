import React from 'react';

const WizardStep = ({name, onClick, active = false, disabled = true,}) => {
  return (
    <div>{name}</div>
  );
};

const WizardSteps = ({onClick, steps = [],}) => {
  return steps.map((s, i) => <WizardStep onClick={onClick} {...s} />);
};

export default WizardSteps;
