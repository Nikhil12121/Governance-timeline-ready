import { useState } from 'react';
import { useDeck } from '../context/DeckContext';

const Step1Inputs = () => {
  const { data, updateData } = useDeck();
  const [isGenerating, setIsGenerating] = useState(false);

  const projects = [
    { id: 'PRJ-101', name: 'Oncology Phase II' },
    { id: 'PRJ-102', name: 'Vaccine Development Alpha' },
    { id: 'PRJ-103', name: 'Respiratory Trial Beta' }
  ];

  const handleProjectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pId = e.target.value;
    const pName = projects.find(p => p.id === pId)?.name || '';
    updateData({ projectId: pId, projectName: pName });
  };

  const handleGenerateAI = () => {
    if (!data.consultationText) return;
    setIsGenerating(true);
    // Simulate AI delay
    setTimeout(() => {
      updateData({
        consultationPoints: {
          decision: ['Approve the revised budget for Phase II.', 'Go/No-Go on clinical trial expansion.'],
          input: ['Feedback on the proposed timeline shift.', 'Identify potential overlapping resources.'],
          awareness: []
        },
        executiveSummary: {
          context: 'Regulatory feedback prompted a milestone progression and shift in the value creation profile. This represents a 5% increase in PTRS although timeline shifts out by 6 months.',
          teamProposal: 'The team proposes to execute the expanded Phase II protocol to capture a broader label indication, accepting the timeline shift for higher peak year sales potential.',
          keyQuestions: '• Does the board agree with the trade-off of a 6-month delay for an expanded label?\n• Can the organization support the additional resourcing spike in 2027?'
        }
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <section>
        <h2 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>1. Select Asset</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label>Project / Asset</label>
            <select value={data.projectId} onChange={handleProjectSelect}>
              <option value="" disabled>Select a project...</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.id} - {p.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <div style={{ height: '1px', background: 'var(--border-light)' }} />

      <section>
        <h2 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>2. Cover Slide Details</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label>Board Heading</label>
            <select value={data.boardHeading} onChange={e => updateData({ boardHeading: e.target.value })}>
              <option>VIDRU Board Review</option>
              <option>DRB Consultation</option>
              <option>PIB Update</option>
            </select>
          </div>
          <div>
            <label>Consultation Type</label>
            <select value={data.consultationType} onChange={e => updateData({ consultationType: e.target.value })}>
              <option>Decision</option>
              <option>Input</option>
              <option>Awareness</option>
            </select>
          </div>
          <div>
            <label>Asset Line</label>
            <input type="text" value={data.assetLine} onChange={e => updateData({ assetLine: e.target.value })} />
          </div>
          <div>
            <label>Owner</label>
            <input type="text" value={data.owner} onChange={e => updateData({ owner: e.target.value })} />
          </div>
          <div>
            <label>Date</label>
            <input type="date" value={data.date} onChange={e => updateData({ date: e.target.value })} />
          </div>
        </div>
      </section>

      <div style={{ height: '1px', background: 'var(--border-light)' }} />

      <section>
        <h2 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>3. Executive Summary (AI Draft)</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.875rem' }}>
          Paste your rough notes about why you're consulting the board. Our AI will draft the contextual slides, team proposal, and key questions.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <textarea 
            rows={4} 
            placeholder="E.g., We need the board to approve the 100k overspend for the new trial, and we also need them to be aware that competitor X just launched a similar trial..."
            value={data.consultationText}
            onChange={e => updateData({ consultationText: e.target.value })}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              className="btn btn-primary" 
              onClick={handleGenerateAI}
              disabled={isGenerating || !data.consultationText}
            >
              {isGenerating ? (
                <><span className="loading-indicator" style={{ marginRight: '8px', width: '14px', height: '14px', borderTopColor: 'white' }}></span> Processing...</>
              ) : '✨ Generate with AI'}
            </button>
          </div>
        </div>

        {/* AI Results block */}
        {(data.executiveSummary.teamProposal || isGenerating) && (
          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1.5rem', 
            background: 'var(--bg-secondary)', 
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)'
          }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Generated Executive Summary Sections (Editable)</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label style={{ color: 'var(--info)' }}>Context</label>
                <textarea 
                  rows={3} 
                  value={data.executiveSummary.context}
                  onChange={e => updateData({ executiveSummary: { ...data.executiveSummary, context: e.target.value } })}
                />
              </div>
              <div>
                <label style={{ color: 'var(--info)' }}>Team Proposal</label>
                <textarea 
                  rows={2} 
                  value={data.executiveSummary.teamProposal}
                  onChange={e => updateData({ executiveSummary: { ...data.executiveSummary, teamProposal: e.target.value } })}
                />
              </div>
              <div>
                <label style={{ color: 'var(--info)' }}>Key Questions</label>
                <textarea 
                  rows={3} 
                  value={data.executiveSummary.keyQuestions}
                  onChange={e => updateData({ executiveSummary: { ...data.executiveSummary, keyQuestions: e.target.value } })}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Step1Inputs;
