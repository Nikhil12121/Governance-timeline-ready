import { DeckProvider, useDeck } from './context/DeckContext';
import { Stepper } from './components/Stepper';
import Step1Inputs from './steps/Step1Inputs';
import Step2Timeline from './steps/Step2Timeline';
import Step3Resourcing from './steps/Step3Resourcing';
import Step4Risks from './steps/Step4Risks';
import Step5IES from './steps/Step5IES';
import Step6Preview from './steps/Step6Preview';
import Step7Download from './steps/Step7Download';

function AppContent() {
  const { currentStep, setCurrentStep, isLoading, error } = useDeck();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '1rem' }}>
        <div className="loading-indicator" style={{ width: '40px', height: '40px', borderTopColor: 'var(--accent-primary)' }}></div>
        <p style={{ color: 'var(--text-secondary)' }}>Connecting to Snowflake Backend...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Governance Deck Builder</h1>
        <p style={{ color: 'var(--text-muted)' }}>AI-Assisted Board Presentation Wizard</p>
      </header>

      {error && (
        <div style={{ background: '#FEF2F2', border: '1px solid #F87171', color: '#B91C1C', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
          ⚠️ {error}
        </div>
      )}

      <Stepper />

      <main className="wizard-body glass-panel" style={{ padding: '2rem', minHeight: '600px', position: 'relative', overflow: 'hidden' }}>
        <div key={currentStep} className="animate-fade-in" style={{ height: '100%' }}>
          {currentStep === 1 && <Step1Inputs />}
          {currentStep === 2 && <Step2Timeline />}
          {currentStep === 3 && <Step3Resourcing />}
          {currentStep === 4 && <Step4Risks />}
          {currentStep === 5 && <Step5IES />}
          {currentStep === 6 && <Step6Preview />}
          {currentStep === 7 && <Step7Download />}
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
          disabled={currentStep === 7}
          onClick={() => setCurrentStep(currentStep + 1)}
        >
          {currentStep === 6 ? 'Continue to Finalize' : 'Next Step'}
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
