import { useState } from 'react';
import { useDeck } from '../context/DeckContext';
import './Step2Timeline.css';

const Step2Timeline = () => {
  const { data, updateData } = useDeck();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMilestonesPanel, setShowMilestonesPanel] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleGenerateAI = (type: 'actuals' | 'budget' | 'both') => {
    setIsAnalyzing(true);
    
    // Scans financials to find variances
    const varianceRow = data.financials.find(f => f.label.includes('vs Act/Budget'));
    const overspends: string[] = [];
    const underspends: string[] = [];
    
    if (varianceRow) {
      Object.entries(varianceRow.data).forEach(([year, val]) => {
        if (val.includes('+')) overspends.push(`${year} (${val})`);
        else if (val.includes('-')) underspends.push(`${year} (${val})`);
      });
    }

    const baseAnalysisActuals = `Based on financial review, major drivers include overspends in ${overspends.length > 0 ? overspends.join(', ') : 'none'} offset by efficiencies in ${underspends.length > 0 ? underspends.join(', ') : 'none'}.`;
    const baseAnalysisBudget = `Project remains ${underspends.length > overspends.length ? 'under' : 'over'} budget overall, with key variances noted in ${[...overspends, ...underspends].join(', ')}.`;

    setTimeout(() => {
      let finalActuals = baseAnalysisActuals;
      let finalBudget = baseAnalysisBudget;

      // Paraphrase logic if text already exists
      if (type === 'actuals' || type === 'both') {
        if (data.hioCommentary.actuals.length > 10 && type !== 'both') {
          finalActuals = "Strategic investment in early-stage milestones led to marginal overspends in 2024, which have been effectively mitigated by operational cost-savings and resource optimization identified in subsequent quarters.";
        }
      }
      
      if (type === 'budget' || type === 'both') {
        if (data.hioCommentary.budget.length > 10 && type !== 'both') {
          finalBudget = "The current budget trajectory aligns with the revised board-approved forecast, with variances primarily driven by phasing shifts in clinical supply and external partner milestones.";
        }
      }
      
      const updates: any = {};
      if (type === 'actuals' || type === 'both') updates.actuals = finalActuals;
      if (type === 'budget' || type === 'both') updates.budget = finalBudget;

      updateData({ hioCommentary: { ...data.hioCommentary, ...updates } });
      setIsAnalyzing(false);
    }, 1200);
  };
  
  const years: number[] = [];
  for (let y = data.startYear; y <= data.endYear; y++) {
    years.push(y);
  }

  const [searchTerm, setSearchTerm] = useState('');

  const toggleMilestone = (id: string) => {
    updateData({
      milestones: data.milestones.map(m => 
        m.id === id ? { ...m, isSelected: !m.isSelected } : m
      )
    });
  };

  const toggleAllInSwimlane = (swimlane: string, action: 'select' | 'unselect') => {
    updateData({
      milestones: data.milestones.map(m => 
        m.swimlane === swimlane ? { ...m, isSelected: action === 'select' } : m
      )
    });
  };

  // Group milestones for the manager
  const groupedMilestones = data.swimlanes.map(lane => ({
    lane,
    milestones: data.milestones.filter(m => m.swimlane === lane && m.name.toLowerCase().includes(searchTerm.toLowerCase()))
  })).filter(g => g.milestones.length > 0);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ color: 'var(--accent-primary)' }}>High-level Investment Overview</h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Manage visible milestones or expand the chart for a better view.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
            <button className="btn btn-secondary" onClick={() => setShowMilestonesPanel(!showMilestonesPanel)}>
              ⚙ Manage Milestones
            </button>
            <button className="btn btn-secondary" onClick={() => setIsExpanded(true)}>
              ⤢ Expand Chart
            </button>
            
            {showMilestonesPanel && (
              <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.5)', zIndex: 2000,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <div style={{
                  background: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem',
                  width: '90%', maxWidth: '600px', maxHeight: '80vh', display: 'flex', flexDirection: 'column',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0 }}>Manage Milestones</h3>
                    <button onClick={() => setShowMilestonesPanel(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}>✕</button>
                  </div>
                  
                  <input 
                    type="text" 
                    placeholder="Search milestones..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: '1rem' }}
                  />

                  <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
                    {groupedMilestones.map(group => (
                      <div key={group.lane} style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                          <strong style={{ color: 'var(--accent-primary)' }}>{group.lane}</strong>
                          <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem' }}>
                            <button className="btn btn-secondary" style={{ padding: '2px 8px' }} onClick={() => toggleAllInSwimlane(group.lane, 'select')}>Show All</button>
                            <button className="btn btn-secondary" style={{ padding: '2px 8px' }} onClick={() => toggleAllInSwimlane(group.lane, 'unselect')}>Hide All</button>
                          </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                          {group.milestones.map(m => (
                            <label key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, fontWeight: 'normal', cursor: 'pointer' }}>
                              <input 
                                type="checkbox" 
                                checked={m.isSelected} 
                                onChange={() => toggleMilestone(m.id)} 
                                style={{ width: 'auto', margin: 0 }}
                              />
                              <span>{m.name} <span style={{ color: 'var(--text-muted)' }}>({m.year})</span></span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    {groupedMilestones.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No milestones found.</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={`hio-container ${isExpanded ? 'expanded' : ''}`}>
          {isExpanded && (
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
               <h2 style={{ color: 'var(--accent-primary)' }}>High-level Investment Overview</h2>
               <button className="btn btn-secondary" onClick={() => setIsExpanded(false)}>✕ Close Fullscreen</button>
             </div>
          )}

          {/* Main Grid: Label Col | Year Cols... | Summary Cols */}
          <div className="hio-grid" style={{ 
            gridTemplateColumns: `150px repeat(${years.length}, 1fr) 80px 80px 80px` 
          }}>
            
            {/* Header Row */}
            <div className="hio-cell hio-header-cell border-b border-r"></div>
            {years.map((year) => (
              <div key={year} className="hio-cell hio-header-cell border-b border-r" style={{ position: 'relative' }}>
                {year}
                {year === data.currentYear && (
                  <div className="today-marker">
                    <span className="today-label">Today</span>
                    <div className="today-line-segment" style={{ top: '24px' }}></div>
                  </div>
                )}
              </div>
            ))}
            <div className="hio-cell hio-header-cell border-b border-r">EPE</div>
            <div className="hio-cell hio-header-cell border-b border-r">IPE</div>
            <div className="hio-cell hio-header-cell border-b">Cum PTRS</div>

            {/* Timeline Swimlanes */}
            {data.swimlanes.map((lane, index) => {
              // Get milestones for this lane
              const laneMilestones = data.milestones.filter(m => m.swimlane === lane);
              const isEven = index % 2 === 0;

              return (
                <div key={lane} className="hio-row-contents" style={{ display: 'contents' }}>
                  <div className={`hio-cell border-r border-b fw-500 ${isEven ? 'bg-light' : ''}`}>{lane}</div>
                  
                  {/* Years cells for timeline */}
                  {years.map(year => {
                    const allYearMilestones = laneMilestones.filter(m => m.year === year);
                    const visibleYearMilestones = allYearMilestones.filter(m => m.isSelected);
                    return (
                      <div key={`${lane}-${year}`} className={`hio-cell border-r border-b hio-timeline-cell ${isEven ? 'bg-light' : ''}`}>
                        <div className="dotted-midline"></div>
                        
                        {/* Segmented Today Line (only in swimlanes) */}
                        {year === data.currentYear && (
                          <div className="today-line-segment"></div>
                        )}
                        
                        {/* Render Orange Bar if there are ANY milestones in this year (independent of selection) */}
                        {allYearMilestones.length > 0 && (
                          <div className="gantt-bar"></div>
                        )}

                        {visibleYearMilestones.map(m => (
                          <div 
                            key={m.id} 
                            className="milestone-marker selected"
                            style={{ left: `${m.position}%` }}
                            title={`${m.name}`}
                          >
                            ▲
                            <span className="milestone-label">{m.name}</span>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                  
                  {/* Summary trailing cells for swimlanes (usually empty or placeholder PTRS) */}
                  <div className={`hio-cell border-r border-b ${isEven ? 'bg-light' : ''}`}></div>
                  <div className={`hio-cell border-r border-b ${isEven ? 'bg-light' : ''}`}></div>
                  <div className={`hio-cell border-b ${isEven ? 'bg-light' : ''}`}>{index * 10 + 15}%</div>
                </div>
              );
            })}

            {/* Financial Rows (No today-line segment here, aligning headings right) */}
            {data.financials.map((fin) => (
              <div key={fin.label} className="hio-row-contents" style={{ display: 'contents' }}>
                <div className="hio-cell hio-fin-label border-r">{fin.label}</div>
                
                {years.map(year => {
                  const val = fin.data[year] || '';
                  const isPositive = val.includes('+');
                  const isNegative = val.includes('-');
                  const colorClass = isPositive ? 'text-green' : isNegative ? 'text-red' : '';
                  return (
                    <div key={`${fin.label}-${year}`} className={`hio-cell hio-fin-val border-r ${colorClass}`}>
                      {val}
                    </div>
                  );
                })}

                <div className="hio-cell hio-fin-val border-r fw-600">{fin.summaryEPE || ''}</div>
                <div className="hio-cell hio-fin-val border-r fw-600">{fin.summaryIPE || ''}</div>
                <div className="hio-cell hio-fin-val"></div>
              </div>
            ))}

          </div>
        </div>
      </section>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0, color: 'var(--accent-primary)' }}>Variance Commentary</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
             <button 
               className="btn btn-secondary btn-sm" 
               onClick={() => handleGenerateAI('both')}
               disabled={isAnalyzing}
               style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}
             >
               {isAnalyzing ? 'Analyzing...' : '🔍 Analyze Data'}
             </button>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <div style={{ background: 'var(--accent-primary)', color: 'white', padding: '0.5rem', textAlign: 'center', borderRadius: '4px 4px 0 0', position: 'relative' }}>
               Actuals
               <button 
                 onClick={() => handleGenerateAI('actuals')}
                 style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer' }}
               >✨ Paraphrase</button>
            </div>
            <textarea 
              rows={4} 
              placeholder="Describe main drivers for over-/under spend on past stage"
              value={data.hioCommentary.actuals}
              onChange={(e) => updateData({ hioCommentary: { ...data.hioCommentary, actuals: e.target.value } })}
              style={{ borderRadius: '0 0 4px 4px', borderTop: 'none', background: '#f8fafc', fontSize: '0.85rem' }}
            />
          </div>
          <div>
            <div style={{ background: '#fcece8', color: '#000', padding: '0.5rem', textAlign: 'center', borderRadius: '4px 4px 0 0', position: 'relative', border: '1px solid var(--border-medium)', borderBottom: 'none' }}>
               Budget
               <button 
                 onClick={() => handleGenerateAI('budget')}
                 style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.05)', border: 'none', color: '#000', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer' }}
               >✨ Paraphrase</button>
            </div>
            <textarea 
              rows={4} 
              placeholder="Describe variance vs budget"
              value={data.hioCommentary.budget}
              onChange={(e) => updateData({ hioCommentary: { ...data.hioCommentary, budget: e.target.value } })}
              style={{ borderRadius: '0 0 4px 4px', borderTop: 'none', background: '#f8fafc', fontSize: '0.85rem' }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Step2Timeline;
