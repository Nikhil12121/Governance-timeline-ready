import { useState } from 'react';
import { useDeck, type CdpValuationMetric } from '../context/DeckContext';

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
              <label style={{ color: 'var(--info)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Unmet need - key disease(s)</label>
              <textarea 
                rows={3} 
                value={data.reasonsToBelieve.unmetNeed}
                onChange={e => updateData({ reasonsToBelieve: { ...data.reasonsToBelieve, unmetNeed: e.target.value } })}
              />
            </div>
            <div>
              <label style={{ color: 'var(--info)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>MoA and differentiation</label>
              <textarea 
                rows={3} 
                value={data.reasonsToBelieve.moa}
                onChange={e => updateData({ reasonsToBelieve: { ...data.reasonsToBelieve, moa: e.target.value } })}
              />
            </div>
            <div>
              <label style={{ color: 'var(--warning)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Reasons not to believe</label>
              <textarea 
                rows={3} 
                value={data.reasonsToBelieve.reasonsNotToBelieve}
                onChange={e => updateData({ reasonsToBelieve: { ...data.reasonsToBelieve, reasonsNotToBelieve: e.target.value } })}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ color: 'var(--info)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Key biological / preclinical data</label>
              <textarea 
                rows={4} 
                value={data.reasonsToBelieve.preclinical}
                onChange={e => updateData({ reasonsToBelieve: { ...data.reasonsToBelieve, preclinical: e.target.value } })}
              />
            </div>
            <div>
              <label style={{ color: 'var(--info)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Key clinical data</label>
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

      <div style={{ height: '1px', background: 'var(--border-light)', margin: '2rem 0' }} />

      <section>
        <h2 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>6. CDP Options & Valuation</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          Define the development options, timeline milestones, and valuation metrics for each candidate development path.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {data.cdpOptions.map((option, optIdx) => (
            <div key={option.id} style={{ 
              background: 'var(--bg-secondary)', 
              padding: '1.5rem', 
              borderRadius: 'var(--radius-md)', 
              border: option.isRecommended ? '2px solid var(--accent-primary)' : '1px solid var(--border-light)',
              transition: 'all 0.2s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ 
                    background: option.isRecommended ? 'var(--accent-primary)' : 'var(--border-medium)', 
                    color: 'white', 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '20px', 
                    fontSize: '0.75rem', 
                    fontWeight: 600 
                  }}>
                    {option.title}
                  </span>
                  <input 
                    type="text" 
                    value={option.subtitle} 
                    onChange={e => {
                      const newOptions = [...data.cdpOptions];
                      newOptions[optIdx].subtitle = e.target.value;
                      updateData({ cdpOptions: newOptions });
                    }}
                    style={{ fontWeight: 600, fontSize: '1rem', background: 'transparent', border: 'none', borderBottom: '1px dashed var(--border-medium)' }}
                  />
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={option.isRecommended} 
                    onChange={() => {
                      const newOptions = data.cdpOptions.map((opt, i) => ({ ...opt, isRecommended: i === optIdx }));
                      updateData({ cdpOptions: newOptions });
                    }}
                  />
                  Recommended
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
                {/* Left side: Timeline & Box Comment */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Timeline Overlay Comment (Box)</label>
                    <textarea 
                      rows={4} 
                      value={option.boxComment}
                      onChange={e => {
                        const newOptions = [...data.cdpOptions];
                        newOptions[optIdx].boxComment = e.target.value;
                        updateData({ cdpOptions: newOptions });
                      }}
                      placeholder="Enter the text that appears in the box above the timeline..."
                      style={{ fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Milestones (Quarters)</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                      {option.milestones.map((ms, msIdx) => (
                        <div key={`${option.id}-ms-${msIdx}`} style={{ 
                          padding: '0.5rem', 
                          background: 'white', 
                          border: '1px solid var(--border-light)', 
                          borderRadius: '4px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.25rem'
                        }}>
                          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>{ms.name}</div>
                          <div style={{ display: 'flex', gap: '0.25rem' }}>
                            <select 
                              value={ms.yearOffset} 
                              onChange={e => {
                                const newOptions = [...data.cdpOptions];
                                newOptions[optIdx].milestones[msIdx].yearOffset = parseInt(e.target.value);
                                updateData({ cdpOptions: newOptions });
                              }}
                              style={{ fontSize: '0.75rem', padding: '2px' }}
                            >
                              {[0,1,2,3,4,5].map(v => <option key={v} value={v}>Year{v > 0 ? `+${v}` : ''}</option>)}
                            </select>
                            <select 
                              value={ms.quarter} 
                              onChange={e => {
                                const newOptions = [...data.cdpOptions];
                                newOptions[optIdx].milestones[msIdx].quarter = parseInt(e.target.value) as 1|2|3|4;
                                updateData({ cdpOptions: newOptions });
                              }}
                              style={{ fontSize: '0.75rem', padding: '2px' }}
                            >
                              {[1,2,3,4].map(v => <option key={v} value={v}>Q{v}</option>)}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side: Valuation Table */}
                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Valuation Metrics & RAG</label>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-medium)' }}>
                        <th style={{ padding: '0.5rem', textAlign: 'left' }}>Metric</th>
                        <th style={{ padding: '0.5rem', textAlign: 'left' }}>Value</th>
                        <th style={{ padding: '0.5rem', textAlign: 'left' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(Object.entries(option.valuation) as [keyof typeof option.valuation, CdpValuationMetric][]).map(([key, metric]) => (
                        <tr key={key} style={{ borderBottom: '1px solid var(--border-light)' }}>
                          <td style={{ padding: '0.5rem', textTransform: 'capitalize' }}>
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </td>
                          <td style={{ padding: '0.25rem' }}>
                            <input 
                              type="text" 
                              value={metric.value} 
                              onChange={e => {
                                const newOptions = [...data.cdpOptions];
                                (newOptions[optIdx].valuation[key] as CdpValuationMetric).value = e.target.value;
                                updateData({ cdpOptions: newOptions });
                              }}
                              style={{ width: '100%', background: 'white' }}
                            />
                          </td>
                          <td style={{ padding: '0.25rem' }}>
                            <select 
                              value={metric.color} 
                              onChange={e => {
                                const newOptions = [...data.cdpOptions];
                                (newOptions[optIdx].valuation[key] as CdpValuationMetric).color = e.target.value as any;
                                updateData({ cdpOptions: newOptions });
                              }}
                              style={{ width: '100%', background: 'white' }}
                            >
                              <option value="none">None</option>
                              <option value="green">Green (Better)</option>
                              <option value="yellow">Yellow (Equal)</option>
                              <option value="red">Red (Worse)</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Step1Inputs;
