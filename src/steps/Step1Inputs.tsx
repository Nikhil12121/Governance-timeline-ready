import { useState } from 'react';
import { useDeck } from '../context/DeckContext';

const Step1Inputs = () => {
  const { data, updateData } = useDeck();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isParaphrasingRTB, setIsParaphrasingRTB] = useState<string | null>(null);

  const handleParaphraseRTB = (field: string) => {
    setIsParaphrasingRTB(field);
    setTimeout(() => {
      // Simulation of professional paraphrase
      const currentText = (data.reasonsToBelieve as any)[field];
      let newText = currentText;
      
      if (field === 'unmetNeed') newText = "• Significant therapeutic gap in 3rd line oncology treatments.\n• Current standards of care deliver sub-optimal Objective Response Rates (<30%).\n• High morbidity associated with existing treatment regimens necessitates novel interventions.";
      if (field === 'moa') newText = "• Dual-action mechanism targets primary and secondary resistance pathways.\n• Superior selectivity minimizes systemic toxicity vs. competitor agents.\n• Optimized pharmacokinetic profile supports convenient weekly dosing schedules.";
      if (field === 'reasonsNotToBelieve') newText = "• Long-term safety and tolerability profile remains to be established in larger cohorts.\n• Competitive market entry anticipated from two major pharmaceutical rivals in Phase II.\n• Inherent technical risks associated with large-scale manufacturing and formulation.";
      if (field === 'preclinical') newText = "• Demonstrated consistent tumor regression across multiple orthotopic models.\n• Synergistic activity confirmed when paired with current frontline standards.\n• Safety margins established in non-human primate studies indicate low toxicity risk.";
      if (field === 'clinical') newText = "• Proof of Concept (PoC) achieved in initial cohort with significant response duration.\n• Early pharmacokinetic data confirms target engagement and metabolic stability.\n• No dose-limiting toxicities (DLTs) reported in the escalating dose segments.";

      updateData({ reasonsToBelieve: { ...data.reasonsToBelieve, [field]: newText } });
      setIsParaphrasingRTB(null);
    }, 1200);
  };

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
        executiveSummary: {
          context: 'Our Phase II study showed a statistically significant efficacy signal (p < 0.01). However, safety monitoring protocols require expansion. Preliminary discussions with regulators indicate support for an amended protocol, which will add 6 months to our timelines. Moreover, recent delays by Competitor X provide a strategic window to solidify our market position.',
          teamProposal: 'We recommend expanding the Phase II protocol to secure a broader label. While this shifts our timeline to Q3 2027, the resulting increase in potential peak sales and a strengthened safety profile justify the delay.',
          keyQuestions: '• Do you support the proposed 6-month delay in exchange for targeting a broader primary label?\n• Is the board aligned with the £1.2M budgetary increase needed for enhanced safety monitoring in 2027?'
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0, color: 'var(--accent-primary)' }}>3. Executive Summary (Pre-loaded from Snowflake)</h2>
          <button 
            className="btn btn-primary" 
            onClick={handleGenerateAI}
            disabled={isGenerating}
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            {isGenerating ? (
              <><span className="loading-indicator" style={{ marginRight: '8px', width: '14px', height: '14px', borderTopColor: 'white' }}></span> Processing...</>
            ) : '✨ Paraphrase with AI'}
          </button>
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          This data has been synced from the central project repository. You may edit it directly or use AI to rewrite the content for a corporate governance audience.
        </p>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--bg-secondary)', 
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label style={{ color: 'var(--info)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Context</label>
              <textarea 
                rows={4} 
                value={data.executiveSummary.context}
                onChange={e => updateData({ executiveSummary: { ...data.executiveSummary, context: e.target.value } })}
              />
            </div>
            <div>
              <label style={{ color: 'var(--info)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Team Proposal</label>
              <textarea 
                rows={3} 
                value={data.executiveSummary.teamProposal}
                onChange={e => updateData({ executiveSummary: { ...data.executiveSummary, teamProposal: e.target.value } })}
              />
            </div>
            <div>
              <label style={{ color: 'var(--info)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Key Questions</label>
              <textarea 
                rows={4} 
                value={data.executiveSummary.keyQuestions}
                onChange={e => updateData({ executiveSummary: { ...data.executiveSummary, keyQuestions: e.target.value } })}
              />
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: '1px', background: 'var(--border-light)' }} />

      <section>
        <h2 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>4. Reasons to Believe in the Asset's Potential</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          Review and update the reasons to believe and potential risks.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ color: 'var(--info)', fontWeight: 600, margin: 0 }}>Unmet need - key disease(s)</label>
                <button 
                  onClick={() => handleParaphraseRTB('unmetNeed')}
                  disabled={isParaphrasingRTB !== null}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontSize: '0.65rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  {isParaphrasingRTB === 'unmetNeed' ? '...' : '✨ Paraphrase'}
                </button>
              </div>
              <textarea 
                rows={3} 
                value={data.reasonsToBelieve.unmetNeed}
                onChange={e => updateData({ reasonsToBelieve: { ...data.reasonsToBelieve, unmetNeed: e.target.value } })}
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ color: 'var(--info)', fontWeight: 600, margin: 0 }}>MoA and differentiation</label>
                <button 
                  onClick={() => handleParaphraseRTB('moa')}
                  disabled={isParaphrasingRTB !== null}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontSize: '0.65rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  {isParaphrasingRTB === 'moa' ? '...' : '✨ Paraphrase'}
                </button>
              </div>
              <textarea 
                rows={3} 
                value={data.reasonsToBelieve.moa}
                onChange={e => updateData({ reasonsToBelieve: { ...data.reasonsToBelieve, moa: e.target.value } })}
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ color: 'var(--warning)', fontWeight: 600, margin: 0 }}>Reasons not to believe</label>
                <button 
                  onClick={() => handleParaphraseRTB('reasonsNotToBelieve')}
                  disabled={isParaphrasingRTB !== null}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontSize: '0.65rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  {isParaphrasingRTB === 'reasonsNotToBelieve' ? '...' : '✨ Paraphrase'}
                </button>
              </div>
              <textarea 
                rows={3} 
                value={data.reasonsToBelieve.reasonsNotToBelieve}
                onChange={e => updateData({ reasonsToBelieve: { ...data.reasonsToBelieve, reasonsNotToBelieve: e.target.value } })}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ color: 'var(--info)', fontWeight: 600, margin: 0 }}>Key biological / preclinical data</label>
                <button 
                  onClick={() => handleParaphraseRTB('preclinical')}
                  disabled={isParaphrasingRTB !== null}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontSize: '0.65rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  {isParaphrasingRTB === 'preclinical' ? '...' : '✨ Paraphrase'}
                </button>
              </div>
              <textarea 
                rows={4} 
                value={data.reasonsToBelieve.preclinical}
                onChange={e => updateData({ reasonsToBelieve: { ...data.reasonsToBelieve, preclinical: e.target.value } })}
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ color: 'var(--info)', fontWeight: 600, margin: 0 }}>Key clinical data</label>
                <button 
                  onClick={() => handleParaphraseRTB('clinical')}
                  disabled={isParaphrasingRTB !== null}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontSize: '0.65rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  {isParaphrasingRTB === 'clinical' ? '...' : '✨ Paraphrase'}
                </button>
              </div>
              <textarea 
                rows={4} 
                value={data.reasonsToBelieve.clinical}
                onChange={e => updateData({ reasonsToBelieve: { ...data.reasonsToBelieve, clinical: e.target.value } })}
              />
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: '1px', background: 'var(--border-light)' }} />

      <section>
        <h2 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>5. Value Creation Evolution</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          Compare the last governed metrics with the current proposal and provide final commentary.
        </p>

        <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-medium)' }}>
                <th style={{ padding: '0.5rem', fontWeight: 600, color: 'var(--text-primary)', width: '25%' }}>Metric</th>
                <th style={{ padding: '0.5rem', fontWeight: 600, color: 'var(--text-primary)', width: '20%' }}>Current Estimate</th>
                <th style={{ padding: '0.5rem', fontWeight: 600, color: 'var(--text-primary)', width: '20%' }}>Last Governed</th>
                <th style={{ padding: '0.5rem', fontWeight: 600, color: 'var(--text-primary)', width: '35%' }}>Comment</th>
              </tr>
            </thead>
            <tbody>
              {data.valueCreation.items.map((item, idx) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '0.5rem', fontWeight: 500, fontSize: '0.85rem' }}>
                    {item.metric}
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    <select 
                      value={item.currentEstimate} 
                      onChange={e => {
                        const newItems = [...data.valueCreation.items];
                        newItems[idx].currentEstimate = e.target.value;
                        updateData({ valueCreation: { ...data.valueCreation, items: newItems } });
                      }}
                      style={{ padding: '0.25rem', width: '100%', background: 'white' }}
                    >
                      <option value="n/a">n/a</option>
                      <option value="green-up">Better (Green Up)</option>
                      <option value="red-up">Worse (Red Up)</option>
                      <option value="similar">Similar (Arrows)</option>
                    </select>
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    <input 
                      type="text" 
                      value={item.lastGoverned} 
                      onChange={e => {
                        const newItems = [...data.valueCreation.items];
                        newItems[idx].lastGoverned = e.target.value;
                        updateData({ valueCreation: { ...data.valueCreation, items: newItems } });
                      }}
                      style={{ padding: '0.25rem', width: '100%', background: 'white' }}
                    />
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    <input 
                      type="text" 
                      value={item.comment} 
                      onChange={e => {
                        const newItems = [...data.valueCreation.items];
                        newItems[idx].comment = e.target.value;
                        updateData({ valueCreation: { ...data.valueCreation, items: newItems } });
                      }}
                      style={{ padding: '0.25rem', width: '100%', background: 'white' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div style={{ height: '1px', background: 'var(--border-light)' }} />

      <section>
        <h2 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>6. Key Valuation Inputs</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          Define target indications and key valuation metrics for the asset.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Indications Table */}
          <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Primary Indications / Target Markets</h3>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  const newInd = { id: `ind${Date.now()}`, indication: '', lineOfTherapy: '', targetPopulation: '', peakShare: '' };
                  updateData({ valuationInputs: { ...data.valuationInputs, indications: [...data.valuationInputs.indications, newInd] } });
                }}
              >
                + Add Indication
              </button>
            </div>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-medium)' }}>
                  <th style={{ padding: '0.5rem', fontSize: '0.85rem' }}>Indication</th>
                  <th style={{ padding: '0.5rem', fontSize: '0.85rem' }}>Line of Therapy</th>
                  <th style={{ padding: '0.5rem', fontSize: '0.85rem' }}>Target Population</th>
                  <th style={{ padding: '0.5rem', fontSize: '0.85rem' }}>Peak Share</th>
                  <th style={{ width: '50px' }}></th>
                </tr>
              </thead>
              <tbody>
                {data.valuationInputs.indications.map((ind, idx) => (
                  <tr key={ind.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.5rem' }}>
                      <input 
                        type="text" 
                        value={ind.indication} 
                        placeholder="e.g. Lung Cancer"
                        onChange={e => {
                          const newInds = [...data.valuationInputs.indications];
                          newInds[idx].indication = e.target.value;
                          updateData({ valuationInputs: { ...data.valuationInputs, indications: newInds } });
                        }}
                      />
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <input 
                        type="text" 
                        value={ind.lineOfTherapy} 
                        placeholder="e.g. 1L"
                        onChange={e => {
                          const newInds = [...data.valuationInputs.indications];
                          newInds[idx].lineOfTherapy = e.target.value;
                          updateData({ valuationInputs: { ...data.valuationInputs, indications: newInds } });
                        }}
                      />
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <input 
                        type="text" 
                        value={ind.targetPopulation} 
                        placeholder="e.g. EGFR+"
                        onChange={e => {
                          const newInds = [...data.valuationInputs.indications];
                          newInds[idx].targetPopulation = e.target.value;
                          updateData({ valuationInputs: { ...data.valuationInputs, indications: newInds } });
                        }}
                      />
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <input 
                        type="text" 
                        value={ind.peakShare} 
                        placeholder="e.g. 20%"
                        onChange={e => {
                          const newInds = [...data.valuationInputs.indications];
                          newInds[idx].peakShare = e.target.value;
                          updateData({ valuationInputs: { ...data.valuationInputs, indications: newInds } });
                        }}
                      />
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <button 
                        style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer' }}
                        onClick={() => {
                          const newInds = data.valuationInputs.indications.filter(i => i.id !== ind.id);
                          updateData({ valuationInputs: { ...data.valuationInputs, indications: newInds } });
                        }}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Valuation Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {Object.keys(data.valuationInputs.metrics).map(metric => (
              <div key={metric}>
                <label style={{ color: 'var(--text-primary)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>{metric}</label>
                <input 
                  type="text" 
                  value={data.valuationInputs.metrics[metric]} 
                  onChange={e => {
                    const newMetrics = { ...data.valuationInputs.metrics, [metric]: e.target.value };
                    updateData({ valuationInputs: { ...data.valuationInputs, metrics: newMetrics } });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Step1Inputs;
