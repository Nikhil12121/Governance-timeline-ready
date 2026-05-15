import { useDeck, type IESRow } from '../context/DeckContext';

const Step5IES = () => {
  const { data, updateData } = useDeck();
  const iesData = data.iesData;

  const handleUpdateField = (field: 'indication' | 'tppAlignment' | 'paltDate', value: string) => {
    updateData({ iesData: { ...iesData, [field]: value } });
  };

  const handleUpdateRow = (rowIndex: number, field: keyof IESRow, value: string) => {
    const newRows = [...iesData.rows];
    newRows[rowIndex] = { ...newRows[rowIndex], [field]: value };
    updateData({ iesData: { ...iesData, rows: newRows } });
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <section>
        <h2 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>IES Template - Executive Summary</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.875rem' }}>
          Key unmet needs & claims overview. Please review the pre-written content mapped for this asset. You can paraphrase, edit, or remove the content below.
        </p>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Indication</label>
            <input 
              type="text" 
              value={iesData.indication}
              onChange={(e) => handleUpdateField('indication', e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>TPP alignment</label>
            <input 
              type="text" 
              value={iesData.tppAlignment}
              onChange={(e) => handleUpdateField('tppAlignment', e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            />
          </div>
          <div style={{ width: '200px' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>PALT alignment date</label>
            <input 
              type="text" 
              value={iesData.paltDate}
              onChange={(e) => handleUpdateField('paltDate', e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#FEF08A' }}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto', background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: '#1D4ED8', color: 'white', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem', border: '1px solid #e2e8f0', width: '25%' }}>Strategic Pillars</th>
                <th style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>Which TPP (or SSOs) aspect will the evidence support</th>
                <th style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>Main stakeholder (who will use the evidence)</th>
                <th style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>Type of evidence (CT, Observational...)</th>
                <th style={{ padding: '0.5rem', border: '1px solid #e2e8f0', width: '80px' }}>Priority (H,M, L)</th>
                <th style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>Function generating the evidence</th>
                <th style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>When is it needed to be most effective</th>
              </tr>
            </thead>
            <tbody>
              {iesData.rows.map((row, i) => (
                <tr key={row.id}>
                  <td style={{ padding: '0', border: '1px solid #e2e8f0' }}>
                    <textarea 
                      value={row.pillar}
                      onChange={(e) => handleUpdateRow(i, 'pillar', e.target.value)}
                      style={{ width: '100%', height: '100%', minHeight: '60px', border: 'none', padding: '0.5rem', background: '#E2E8F0', resize: 'none' }}
                    />
                  </td>
                  <td style={{ padding: '0', border: '1px solid #e2e8f0' }}>
                    <textarea 
                      value={row.tppAspect}
                      onChange={(e) => handleUpdateRow(i, 'tppAspect', e.target.value)}
                      style={{ width: '100%', height: '100%', minHeight: '60px', border: 'none', padding: '0.5rem', background: '#E2E8F0', resize: 'none' }}
                    />
                  </td>
                  <td style={{ padding: '0', border: '1px solid #e2e8f0' }}>
                    <textarea 
                      value={row.stakeholder}
                      onChange={(e) => handleUpdateRow(i, 'stakeholder', e.target.value)}
                      style={{ width: '100%', height: '100%', minHeight: '60px', border: 'none', padding: '0.5rem', background: '#E2E8F0', resize: 'none' }}
                    />
                  </td>
                  <td style={{ padding: '0', border: '1px solid #e2e8f0' }}>
                    <textarea 
                      value={row.evidenceType}
                      onChange={(e) => handleUpdateRow(i, 'evidenceType', e.target.value)}
                      style={{ width: '100%', height: '100%', minHeight: '60px', border: 'none', padding: '0.5rem', background: '#E2E8F0', resize: 'none' }}
                    />
                  </td>
                  <td style={{ padding: '0', border: '1px solid #e2e8f0' }}>
                    <textarea 
                      value={row.priority}
                      onChange={(e) => handleUpdateRow(i, 'priority', e.target.value)}
                      style={{ width: '100%', height: '100%', minHeight: '60px', border: 'none', padding: '0.5rem', background: '#E2E8F0', resize: 'none', textAlign: 'center' }}
                    />
                  </td>
                  <td style={{ padding: '0', border: '1px solid #e2e8f0' }}>
                    <textarea 
                      value={row.functionGenerating}
                      onChange={(e) => handleUpdateRow(i, 'functionGenerating', e.target.value)}
                      style={{ width: '100%', height: '100%', minHeight: '60px', border: 'none', padding: '0.5rem', background: '#E2E8F0', resize: 'none' }}
                    />
                  </td>
                  <td style={{ padding: '0', border: '1px solid #e2e8f0' }}>
                    <textarea 
                      value={row.whenNeeded}
                      onChange={(e) => handleUpdateRow(i, 'whenNeeded', e.target.value)}
                      style={{ width: '100%', height: '100%', minHeight: '60px', border: 'none', padding: '0.5rem', background: '#E2E8F0', resize: 'none' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="glass-panel" style={{ padding: '1.5rem', background: 'var(--accent-light)' }}>
         <h3 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--accent-primary)' }}>💡 Board Guidance</h3>
         <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
           Ensure that all 3 strategic pillars map clearly to the Global Epi plan and Clinical Development plan.
         </p>
      </section>
    </div>
  );
};

export default Step5IES;
