
import { useDeck } from '../context/DeckContext';
import './Stepper.css';

const steps = [
  { id: 1, name: 'Project Inputs' },
  { id: 2, name: 'Timeline & HIO' },
  { id: 3, name: 'Resourcing' },
  { id: 4, name: 'Risk & Resilience' },
  { id: 5, name: 'Deck Preview' },
  { id: 6, name: 'Download' }
];

export const Stepper = () => {
  const { currentStep } = useDeck();

  return (
    <div className="stepper-container glass-panel">
      {steps.map((step, index) => (
        <div key={step.id} className="step-wrapper">
          <div className={`step ${currentStep >= step.id ? 'active' : ''} ${currentStep === step.id ? 'current' : ''}`}>
            <div className="step-number">{step.id}</div>
            <div className="step-name">{step.name}</div>
          </div>
          {index < steps.length - 1 && (
            <div className={`step-divider ${currentStep > step.id ? 'active' : ''}`} />
          )}
        </div>
      ))}
    </div>
  );
};
