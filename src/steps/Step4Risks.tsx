import { useDeck, type RiskComparatorColumn } from '../context/DeckContext';

const Step4Risks = () => {
  const { data, updateData } = useDeck();

  const handleUpdateCol = (colIndex: number, field: keyof RiskComparatorColumn, value: string) => {
    const newComparators = [...data.riskComparators];
    newComparators[colIndex] = { ...newComparators[colIndex], [field]: value };
    updateData({ riskComparators: newComparators });
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <section>
        <h2 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>Important Risks and Mitigation Strategies</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.875rem' }}>
          Include up to 5 top risks, their impacts, and strategies to address each. Provide data across 5 assets/comparators.
        </p>

        <div style={{ overflowX: 'auto', background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px', fontSize: '0.875rem' }}>
            <thead>
              <tr>
                <th style={{ width: '150px', padding: '0.5rem', border: '1px solid #e2e8f0', background: '#f8fafc' }}></th>
                {data.riskComparators.map((col, i) => (
                  <th key={col.id} style={{ padding: '0.5rem', border: '1px solid #e2e8f0', background: '#C53030', color: 'white' }}>
                    <input 
                      type="text" 
                      value={col.assetName}
                      onChange={(e) => handleUpdateCol(i, 'assetName', e.target.value)}
                      style={{ width: '100%', background: 'transparent', color: 'white', border: 'none', textAlign: 'center', fontWeight: 'bold' }}
                      placeholder="(asset)"
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Rows */}
              {[
                { field: 'studyBrand', label: 'Study Brand' },
                { field: 'population', label: 'Population' },
                { field: 'enrolment', label: 'Enrolment' },
                { field: 'randomisation', label: 'Randomisation' },
                { field: 'treatmentDuration', label: 'Treatment duration' },
                { field: 'endpoint', label: 'Endpoint' },
                { field: 'otherComparators', label: '<<Other key comparators>>' }
              ].map((row) => (
                <tr key={row.field}>
                  <td style={{ padding: '0.5rem', border: '1px solid #e2e8f0', fontWeight: 'bold', background: '#f8fafc' }}>{row.label}</td>
                  {data.riskComparators.map((col, i) => (
                    <td key={col.id} style={{ padding: '0.5rem', border: '1px solid #e2e8f0' }}>
                      <input 
                        type="text"
                        value={col[row.field as keyof RiskComparatorColumn]}
                        onChange={(e) => handleUpdateCol(i, row.field as keyof RiskComparatorColumn, e.target.value)}
                        style={{ width: '100%', border: '1px solid #cbd5e1', padding: '0.25rem', borderRadius: '4px' }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="glass-panel" style={{ padding: '1.5rem', background: 'var(--accent-light)' }}>
         <h3 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--accent-primary)' }}>💡 Board Guidance</h3>
         <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
           Ensure comparisons directly pull from the Project Risk Tool.
         </p>
      </section>
    </div>
  );
};

export default Step4Risks;
