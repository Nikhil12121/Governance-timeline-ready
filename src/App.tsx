import { DeckProvider, useDeck } from './context/DeckContext';
import { Stepper } from './components/Stepper';
import Step1Inputs from './steps/Step1Inputs';
import Step2Timeline from './steps/Step2Timeline';
import Step3Resourcing from './steps/Step3Resourcing';
import Step4Risks from './steps/Step4Risks';
import Step5Preview from './steps/Step5Preview';
import Step6Download from './steps/Step6Download';

function AppContent() {
  const { currentStep, setCurrentStep } = useDeck();

  return (
    <div className="container" style={{ padding: '2rem 0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Governance Deck Builder</h1>
        <p style={{ color: 'var(--text-muted)' }}>AI-Assisted Board Presentation Wizard</p>
      </header>

      <Stepper />

      <main className="wizard-body glass-panel" style={{ padding: '2rem', minHeight: '600px', position: 'relative', overflow: 'hidden' }}>
        <div key={currentStep} className="animate-fade-in" style={{ height: '100%' }}>
          {currentStep === 1 && <Step1Inputs />}
          {currentStep === 2 && <Step2Timeline />}
          {currentStep === 3 && <Step3Resourcing />}
          {currentStep === 4 && <Step4Risks />}
          {currentStep === 5 && <Step5Preview />}
          {currentStep === 6 && <Step6Download />}
        </div>
      </main>

      <footer style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
        <button 
          className="btn btn-secondary" 
          disabled={currentStep === 1}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Previous Step
        </button>
        <button 
          className="btn btn-primary" 
          disabled={currentStep === 6}
          onClick={() => setCurrentStep(currentStep + 1)}
        >
          {currentStep === 5 ? 'Continue to Finalize' : 'Next Step'}
        </button>
      </footer>
    </div>
  );
}

function App() {
  return (
    <DeckProvider>
      <AppContent />
    </DeckProvider>
  );
}

export default App;
