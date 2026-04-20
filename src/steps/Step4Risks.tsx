import { useDeck, type Risk } from '../context/DeckContext';

const Step4Risks = () => {
  const { data, updateData } = useDeck();

  const handleUpdateRisk = (id: string, field: keyof Risk, value: string) => {
    const updatedRisks = data.risks.map(r => 
      r.id === id ? { ...r, [field]: value } : r
    );
    updateData({ risks: updatedRisks });
  };

  const addRisk = () => {
    const newRisk: Risk = {
      id: `r-${Date.now()}`,
      description: '',
      impact: 'Medium',
      mitigation: ''
    };
    updateData({ risks: [...data.risks, newRisk] });
  };

  const removeRisk = (id: string) => {
    updateData({ risks: data.risks.filter(r => r.id !== id) });
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <section>
        <h2 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>Risk & Resilience Management</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.875rem' }}>
          Identify key project risks, their potential impact, and the mitigation strategies currently in place for the board's awareness.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {data.risks.map((risk) => (
            <div key={risk.id} className="glass-panel" style={{ padding: '1.5rem', background: 'white', borderLeft: `6px solid ${risk.impact === 'High' ? '#ef4444' : risk.impact === 'Medium' ? '#f59e0b' : '#10b981'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ flex: 2, marginRight: '1rem' }}>
                  <label>Risk Description</label>
                  <input 
                    type="text" 
                    value={risk.description} 
                    onChange={(e) => handleUpdateRisk(risk.id, 'description', e.target.value)}
                    placeholder="e.g. Delay in patient recruitment..."
                  />
                </div>
                <div style={{ flex: 1, marginRight: '1rem' }}>
                  <label>Impact Level</label>
                  <select 
                    value={risk.impact} 
                    onChange={(e) => handleUpdateRisk(risk.id, 'impact', e.target.value as any)}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <button 
                  onClick={() => removeRisk(risk.id)}
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem', padding: '0.5rem' }}
                >
                  ✕
                </button>
              </div>
              <div>
                <label>Mitigation Strategy</label>
                <textarea 
                  rows={2}
                  value={risk.mitigation}
                  onChange={(e) => handleUpdateRisk(risk.id, 'mitigation', e.target.value)}
                  placeholder="Describe how the team is managing this risk..."
                />
              </div>
            </div>
          ))}

          <button 
            className="btn btn-secondary" 
            onClick={addRisk}
            style={{ alignSelf: 'flex-start', borderStyle: 'dashed', background: 'transparent' }}
          >
            + Add New Risk
          </button>
        </div>
      </section>

      <section className="glass-panel" style={{ padding: '1.5rem', background: 'var(--accent-light)' }}>
         <h3 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--accent-primary)' }}>💡 Board Guidance</h3>
         <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
           Effective board consults don't just list risks—they show the board that the team is in command. Ensure every "High" impact risk has a proactive, validated mitigation plan.
         </p>
      </section>
    </div>
  );
};

export default Step4Risks;
