import React, { useState } from 'react';
import { useDeck } from '../context/DeckContext';

const Step5Preview = () => {
  const { data } = useDeck();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slideStyle: React.CSSProperties = {
    aspectRatio: '16 / 9',
    background: 'white',
    color: '#0F172A',
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    border: '1px solid var(--border-medium)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle: React.CSSProperties = {
    color: 'var(--text-primary)',
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--border-light)'
  };

  const contentStyle: React.CSSProperties = {
    padding: '2rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  };

  const slides = [
    // Slide 1: Cover
    (
      <div style={{ ...slideStyle, border: '2px solid #222' }} key="slide1">
        {/* Top White Section */}
        <div style={{ height: '36%', background: 'white', position: 'relative', display: 'flex', justifyContent: 'space-between', padding: '2rem 3rem' }}>
          <div style={{ color: '#F04E23', fontSize: '1rem', fontWeight: 500, fontFamily: 'system-ui, sans-serif' }}>
            {new Date(data.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
          {/* Mock GSK Logo top right */}
          <div style={{ 
            width: '100px', height: '100px', 
            background: 'linear-gradient(135deg, #FF7B00 0%, #E63800 100%)', 
            borderRadius: '24px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 800, fontSize: '2.2rem', letterSpacing: '1px',
            fontFamily: 'system-ui, sans-serif',
            marginTop: '-0.5rem',
            marginRight: '-0.5rem'
          }}>
            GSK
          </div>
        </div>
        
        {/* The Curvy V Shape overlapping top and bottom */}
        <div style={{ position: 'absolute', top: '36%', left: '50%', transform: 'translate(-50%, -1px)', width: '220px', height: '80px', zIndex: 10 }}>
          <svg viewBox="0 0 220 80" style={{ width: '100%', height: '100%', display: 'block' }}>
            <path d="M 0 0 C 80 0, 105 80, 110 80 C 115 80, 140 0, 220 0 Z" fill="white" />
          </svg>
        </div>

        {/* Bottom Orange Gradient Section */}
        <div style={{ height: '64%', background: 'linear-gradient(150deg, #FFA500 0%, #FF5500 50%, #B32400 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <h1 style={{ 
            color: 'white', fontSize: '3rem', fontWeight: 300, 
            letterSpacing: '0.5px', marginTop: '-1rem',
            fontFamily: 'system-ui, sans-serif'
          }}>
            {data.boardHeading}
          </h1>
          
          <div style={{ position: 'absolute', bottom: '2rem', right: '3rem', color: 'white', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'system-ui, sans-serif', fontWeight: 500 }}>
            <span style={{ display: 'flex', width: '18px', height: '18px', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🌐</span>
            gsk.com
          </div>
        </div>
      </div>
    ),
    // Slide 2: DRB Governance Material Structure
    (
      <div style={slideStyle} key="slide_structure">
        {/* Header */}
        <div style={{ ...headerStyle, borderBottom: 'none', padding: '0.75rem 2rem 0.5rem' }}>
          <h2 style={{ margin: 0, color: '#F04E23', fontSize: '1.4rem', fontWeight: 300, display: 'flex', alignItems: 'center' }}>
            <span style={{ 
              display: 'inline-block', width: '16px', height: '16px', 
              background: '#F04E23', borderRadius: '50% 0 50% 50%', marginRight: '10px' 
            }}></span>
            DRB Governance Material Structure
          </h2>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>CSI External Use</span>
        </div>

        <div style={{ padding: '0 2rem 0.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.65rem', color: '#333', lineHeight: '1.3' }}>
            <thead>
              <tr style={{ background: '#F04E23', color: 'white' }}>
                <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: '500', width: '8%' }}>Slides</th>
                <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: '500', width: '22%' }}>Section</th>
                <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: '500', width: '40%' }}>Core slides</th>
                <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: '500', width: '30%' }}>Related Appendices</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr style={{ borderBottom: '1px solid #F04E23' }}>
                <td style={{ padding: '6px 8px', verticalAlign: 'top' }}>3</td>
                <td style={{ padding: '6px 8px', verticalAlign: 'top', fontWeight: '600' }}>1. Introduction</td>
                <td style={{ padding: '6px 8px', verticalAlign: 'top' }}>
                  <ul style={{ margin: 0, paddingLeft: '12px' }}><li>Executive Summary</li></ul>
                </td>
                <td style={{ padding: '6px 8px', verticalAlign: 'top' }}>
                  <ul style={{ margin: 0, paddingLeft: '12px' }}><li>Summary of prior board discussions & External feedback (inc Reg if available)</li></ul>
                </td>
              </tr>
              {/* Row 2 */}
              <tr style={{ borderBottom: '1px solid #F04E23' }}>
                <td style={{ padding: '6px 8px', verticalAlign: 'top' }}>4-5</td>
                <td style={{ padding: '6px 8px', verticalAlign: 'top', fontWeight: '600' }}>2. Asset Potential</td>
                <td style={{ padding: '6px 8px', verticalAlign: 'top' }}>
                  <ul style={{ margin: 0, paddingLeft: '12px' }}>
                    <li>"Reasons to Believe" in the Asset's Potential</li>
                    <li>Project Interdependencies</li>
                  </ul>
                </td>
                <td style={{ padding: '6px 8px', verticalAlign: 'top' }}></td>
              </tr>
              {/* Row 3 */}
              <tr style={{ borderBottom: '1px solid #F04E23' }}>
                <td style={{ padding: '6px 8px', verticalAlign: 'top' }}>6-9</td>
                <td style={{ padding: '6px 8px', verticalAlign: 'top', fontWeight: '600' }}>3. Project Potential</td>
                <td style={{ padding: '6px 8px', verticalAlign: 'top' }}>
                  <ul style={{ margin: 0, paddingLeft: '12px' }}>
                    <li style={{ marginBottom: '2px' }}>Value Creation Evolution: Key Changes vs Last Governance</li>
                    <li style={{ marginBottom: '2px' }}>CDP Options and Recommendation</li>
                    <li style={{ marginBottom: '2px' }}>Competitive Landscape and Advantage</li>
                    <li>List of Sensitivities</li>
                  </ul>
                </td>
                <td style={{ padding: '6px 8px', verticalAlign: 'top' }}></td>
              </tr>
              {/* Row 4 */}
              <tr style={{ borderBottom: '1px solid #F04E23' }}>
                <td style={{ padding: '6px 8px', verticalAlign: 'top' }}>10-18</td>
                <td style={{ padding: '6px 8px', verticalAlign: 'top', fontWeight: '600' }}>4. CDP to Deliver the Label and Evidence</td>
                <td style={{ padding: '6px 8px', verticalAlign: 'top' }}>
                  <ul style={{ margin: 0, paddingLeft: '12px' }}>
                    <li style={{ marginBottom: '2px' }}>TPP / TPL / Reimbursement (US, EU, JP, CN)</li>
                    <li style={{ marginBottom: '2px' }}>Integrated Evidence Summary to deliver the TPL</li>
                    <li style={{ marginBottom: '2px' }}>CDP timelines, study design & comparison to competitors</li>
                    <li style={{ marginBottom: '2px' }}>PTRS</li>
                    <li>Risks & Mitigations</li>
                  </ul>
                </td>
                <td style={{ padding: '6px 8px', verticalAlign: 'top' }}>
                  <ul style={{ margin: 0, paddingLeft: '12px' }}>
                    <li style={{ marginBottom: '2px' }}>Governance Checklist</li>
                    <li style={{ marginBottom: '2px' }}>Key project assumptions</li>
                    <li>Quantitative Medicine / Vaccine Plan</li>
                  </ul>
                </td>
              </tr>
              {/* Row 5 */}
              <tr style={{ borderBottom: '2px solid #333' }}>
                <td style={{ padding: '6px 8px', verticalAlign: 'top' }}>19-20</td>
                <td style={{ padding: '6px 8px', verticalAlign: 'top', fontWeight: '600' }}>5. Investment Plan to Deliver the Label and Evidence</td>
                <td style={{ padding: '6px 8px', verticalAlign: 'top' }}>
                  <ul style={{ margin: 0, paddingLeft: '12px' }}>
                    <li style={{ marginBottom: '2px' }}>High-level Investment Overview</li>
                    <li>Resourcing (FTEs) estimates shared with functional leads</li>
                  </ul>
                </td>
                <td style={{ padding: '6px 8px', verticalAlign: 'top' }}></td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: 'auto', textAlign: 'center', fontSize: '0.65rem', fontStyle: 'italic', color: '#666' }}>
            <p style={{ margin: '0 0 2px 0' }}>PTRS and cost estimates should be available for DRB</p>
            <p style={{ margin: 0 }}>Commercial forecasts and valuations should use last governed numbers (if quantitative), plus a qualitative assessment</p>
          </div>
          
          <div style={{ position: 'absolute', bottom: '0.75rem', right: '2rem', textAlign: 'right' }}>
            <div style={{ color: '#F04E23', fontSize: '1rem', fontWeight: 800, fontFamily: 'system-ui' }}>GSK</div>
            <div style={{ color: '#666', fontSize: '0.55rem' }}>CSI External Use</div>
          </div>
        </div>
      </div>
    ),
    // Slide 3: Executive Summary (Context, Proposal, Questions)
    (
      <div style={slideStyle} key="slide_executive_summary">
        {/* Top left CSI */}
        <div style={{ position: 'absolute', top: '0.5rem', left: '1rem', fontSize: '0.65rem', color: '#666' }}>
          CSI External Use
        </div>

        {/* Container for main content */}
        <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', marginTop: '0.5rem' }}>
            <div style={{ 
              width: 0, height: 0, 
              borderTop: '8px solid transparent', 
              borderBottom: '8px solid transparent', 
              borderLeft: '12px solid #F04E23', 
              marginRight: '12px' 
            }}></div>
            <h2 style={{ margin: 0, color: '#F04E23', fontSize: '1.8rem', fontWeight: 300, fontFamily: 'system-ui, sans-serif' }}>
              Executive Summary: {data.projectName} {data.boardHeading} {new Date(data.date).toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }).replace(' ', '-')}
            </h2>
          </div>

          {/* Request to Governance section */}
          <div style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
            <h3 style={{ margin: '0 0 0.25rem 0', color: '#F04E23', fontSize: '1.1rem', fontWeight: 400 }}>Request to Governance</h3>
            <div style={{ fontSize: '0.75rem', color: '#333', lineHeight: '1.4' }}>
              <div><strong>For DECISION:</strong> {data.consultationPoints.decision.length > 0 ? data.consultationPoints.decision.join(' / ') : 'Does DRB endorse the development plan design (options, PTRS and costs)?'}</div>
              <div><strong>For INPUT:</strong> {data.consultationPoints.input.length > 0 ? data.consultationPoints.input.join(' / ') : 'The team seeks Board input on... / The Board seeks team input on...'}</div>
            </div>
          </div>

          {/* Three Bands */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, paddingLeft: '1.5rem', paddingRight: '1rem' }}>
            
            {/* CONTEXT */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ background: '#F04E23', color: 'white', padding: '0.25rem 0.5rem', fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase' }}>
                Context
              </div>
              <div style={{ border: '2px solid #F04E23', borderTop: 'none', padding: '0.5rem', fontSize: '0.75rem', color: '#333', flex: 1 }}>
                {data.executiveSummary.context.split('\n').map((p, i) => <p key={i} style={{ margin: '0 0 4px 0' }}>{p}</p>)}
              </div>
            </div>

            {/* TEAM PROPOSAL */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ background: '#F04E23', color: 'white', padding: '0.25rem 0.5rem', fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase' }}>
                Team Proposal
              </div>
              <div style={{ border: '2px solid #F04E23', borderTop: 'none', padding: '0.5rem', fontSize: '0.75rem', color: '#333', flex: 1 }}>
                {data.executiveSummary.teamProposal.split('\n').map((p, i) => <p key={i} style={{ margin: '0 0 4px 0' }}>{p}</p>)}
              </div>
            </div>

            {/* KEY QUESTIONS */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ background: '#F04E23', color: 'white', padding: '0.25rem 0.5rem', fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase' }}>
                Key Questions to be discussed
              </div>
              <div style={{ border: '2px solid #F04E23', borderTop: 'none', padding: '0.5rem', fontSize: '0.75rem', color: '#333', flex: 1 }}>
                <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                  {data.executiveSummary.keyQuestions.split('\n').map((q, i) => {
                    const cleanQ = q.replace(/^•\s*/, '');
                    return cleanQ ? <li key={i} style={{ marginBottom: '4px', color: '#F04E23' }}><span style={{ color: '#333' }}>{cleanQ}</span></li> : null;
                  })}
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Right Logo */}
        <div style={{ position: 'absolute', bottom: '1rem', right: '1.5rem', textAlign: 'right' }}>
          <div style={{ color: '#F04E23', fontSize: '1.5rem', fontWeight: 800, fontFamily: 'system-ui', lineHeight: 1 }}>GSK</div>
          <div style={{ color: '#666', fontSize: '0.55rem', marginTop: '2px' }}>CSI External Use</div>
        </div>
        {/* Page Number */}
        <div style={{ position: 'absolute', bottom: '1rem', left: '1.5rem', fontSize: '0.65rem', color: '#666' }}>
          3
        </div>
      </div>
    ),
    // Slide 4: Reasons to Believe
    (
      <div style={slideStyle} key="slide_reasons_to_believe">
        {/* Top left CSI */}
        <div style={{ position: 'absolute', top: '0.5rem', left: '1rem', fontSize: '0.65rem', color: '#666' }}>
          CSI External Use
        </div>

        {/* Container for main content */}
        <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
            <div style={{ 
              width: 0, height: 0, 
              borderTop: '8px solid transparent', 
              borderBottom: '8px solid transparent', 
              borderLeft: '12px solid #F04E23', 
              marginRight: '12px' 
            }}></div>
            <h2 style={{ margin: 0, color: '#F04E23', fontSize: '1.8rem', fontWeight: 300, fontFamily: 'system-ui, sans-serif' }}>
              Reasons to Believe in the Asset's Potential
            </h2>
          </div>

          <div style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <h3 style={{ margin: '0.2rem 0 0 0', color: '#333', fontSize: '1.4rem', fontWeight: 400 }}>{data.projectName} / {data.projectId}</h3>
          </div>

          {/* Grid Content */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', flex: 1, paddingLeft: '1.5rem', paddingRight: '1rem' }}>
            
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#111', marginBottom: '0.25rem' }}>Unmet need – key disease(s)</div>
                <div style={{ background: '#F1F1F1', padding: '0.75rem', flex: 1, fontSize: '0.75rem', color: '#333' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                    {data.reasonsToBelieve.unmetNeed.split('\n').map((q, i) => {
                      const cleanQ = q.replace(/^•\s*/, '');
                      return cleanQ ? <li key={i} style={{ marginBottom: '2px' }}>{cleanQ}</li> : null;
                    })}
                  </ul>
                </div>
              </div>

              <div style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#111', marginBottom: '0.25rem' }}>MoA and differentiation</div>
                <div style={{ background: '#F1F1F1', padding: '0.75rem', flex: 1, fontSize: '0.75rem', color: '#333' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                    {data.reasonsToBelieve.moa.split('\n').map((q, i) => {
                      const cleanQ = q.replace(/^•\s*/, '');
                      return cleanQ ? <li key={i} style={{ marginBottom: '2px' }}>{cleanQ}</li> : null;
                    })}
                  </ul>
                </div>
              </div>

              <div style={{ flex: '0.9 1 0', display: 'flex', flexDirection: 'column', paddingBottom: '2.5rem' }}>
                <fieldset style={{ border: '2px solid #F04E23', padding: '0.2rem 1rem', margin: 0, height: '100%', boxSizing: 'border-box' }}>
                  <legend style={{ color: '#111', fontWeight: 700, fontSize: '0.85rem', margin: '0 auto', padding: '0 1rem' }}>Reasons not to believe</legend>
                  <div style={{ fontSize: '0.75rem', color: '#333', marginTop: '0.25rem' }}>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                      {data.reasonsToBelieve.reasonsNotToBelieve.split('\n').map((q, i) => {
                        const cleanQ = q.replace(/^•\s*/, '');
                        return cleanQ ? <li key={i} style={{ marginBottom: '2px', color: '#F04E23' }}><span style={{ color: '#333' }}>{cleanQ}</span></li> : null;
                      })}
                    </ul>
                  </div>
                </fieldset>
              </div>

            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '2.5rem' }}>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#111', marginBottom: '0.25rem' }}>Key biological / preclinical data supporting step change in SoC</div>
                <div style={{ background: '#F1F1F1', padding: '0.75rem', flex: 1, fontSize: '0.75rem', color: '#333' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                    {data.reasonsToBelieve.preclinical.split('\n').map((q, i) => {
                      const cleanQ = q.replace(/^•\s*/, '');
                      return cleanQ ? <li key={i} style={{ marginBottom: '2px' }}>{cleanQ}</li> : null;
                    })}
                  </ul>
                </div>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#111', marginBottom: '0.25rem' }}>Key clinical data supporting step change in SoC</div>
                <div style={{ background: '#F1F1F1', padding: '0.75rem', flex: 1, fontSize: '0.75rem', color: '#333' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                    {data.reasonsToBelieve.clinical.split('\n').map((q, i) => {
                      const cleanQ = q.replace(/^•\s*/, '');
                      return cleanQ ? <li key={i} style={{ marginBottom: '2px' }}>{cleanQ}</li> : null;
                    })}
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Right Logo */}
        <div style={{ position: 'absolute', bottom: '1rem', right: '1.5rem', textAlign: 'right' }}>
          <div style={{ color: '#F04E23', fontSize: '1.5rem', fontWeight: 800, fontFamily: 'system-ui', lineHeight: 1 }}>GSK</div>
          <div style={{ color: '#666', fontSize: '0.55rem', marginTop: '2px' }}>CSI External Use</div>
        </div>
        {/* Page Number */}
        <div style={{ position: 'absolute', bottom: '1rem', left: '1.5rem', fontSize: '0.65rem', color: '#666' }}>
          4
        </div>
      </div>
    ),
    // Slide 5: Value Creation Evolution
    (
      <div style={slideStyle} key="slide_value_creation">
        {/* Top left CSI */}
        <div style={{ position: 'absolute', top: '0.5rem', left: '1rem', fontSize: '0.65rem', color: '#666' }}>
          CSI External Use
        </div>

        {/* Container for main content */}
        <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            <div style={{ 
              width: 0, height: 0, 
              borderTop: '8px solid transparent', 
              borderBottom: '8px solid transparent', 
              borderLeft: '12px solid #F04E23', 
              marginRight: '12px' 
            }}></div>
            <h2 style={{ margin: 0, color: '#F04E23', fontSize: '1.8rem', fontWeight: 300, fontFamily: 'system-ui, sans-serif' }}>
              Value Creation Evolution: Key Changes vs Last Governance
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, paddingLeft: '1.5rem', paddingRight: '1rem' }}>
            
            {/* Table wrapper */}
            <div style={{ border: '2px solid #F04E23', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ background: '#F04E23', color: 'white', padding: '0.5rem 1rem', fontSize: '0.95rem', fontWeight: 600, textTransform: 'uppercase' }}>
                Metrics Comparison
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', color: '#333' }}>
                <thead>
                  <tr style={{ background: '#F1F1F1' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #ddd' }}>Metric</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #ddd' }}>Last Governed</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #ddd' }}>Current Recommendation</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #ddd' }}>Change / Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {data.valueCreation.items.map((item, idx) => (
                    <tr key={item.id} style={{ borderBottom: idx === data.valueCreation.items.length - 1 ? 'none' : '1px solid #eee' }}>
                      <td style={{ padding: '0.75rem', fontWeight: '600', color: '#111' }}>{item.metric}</td>
                      <td style={{ padding: '0.75rem', color: '#555' }}>{item.lastGoverned}</td>
                      <td style={{ padding: '0.75rem', color: '#111', fontWeight: '500' }}>{item.current}</td>
                      <td style={{ padding: '0.75rem', color: item.change.includes('+') && !item.metric.includes('Cost') && !item.metric.includes('Timeline') ? '#10B981' : item.change.includes('-') && (item.metric.includes('Cost') || item.metric.includes('Timeline')) ? '#10B981' : '#F04E23', fontWeight: '600' }}>
                        {item.change}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Narrative / Context */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingBottom: '2.5rem' }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#111', marginBottom: '0.25rem' }}>Team Commentary</div>
              <div style={{ background: '#F1F1F1', padding: '1rem', flex: 1, fontSize: '0.85rem', color: '#333', borderLeft: '4px solid #F04E23' }}>
                <p style={{ margin: 0, lineHeight: '1.6' }}>{data.valueCreation.comments}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Right Logo */}
        <div style={{ position: 'absolute', bottom: '1rem', right: '1.5rem', textAlign: 'right' }}>
          <div style={{ color: '#F04E23', fontSize: '1.5rem', fontWeight: 800, fontFamily: 'system-ui', lineHeight: 1 }}>GSK</div>
          <div style={{ color: '#666', fontSize: '0.55rem', marginTop: '2px' }}>CSI External Use</div>
        </div>
        {/* Page Number */}
        <div style={{ position: 'absolute', bottom: '1rem', left: '1.5rem', fontSize: '0.65rem', color: '#666' }}>
          5
        </div>
      </div>
    ),
    // Slide 6: High-level Investment Overview
    (
      <div style={slideStyle} key="slide3">
        {/* Professional PPT Header */}
        <div style={{ ...headerStyle, borderBottom: 'none', padding: '1.5rem 2rem 0.5rem' }}>
          <h2 style={{ margin: 0, color: '#0F172A', fontSize: '1.8rem', fontWeight: 600 }}>
            High-level Investment Overview
          </h2>
          <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 500 }}>Key contact: {data.owner}</span>
        </div>
        
        {/* GSK Accent Line */}
        <div style={{ height: '4px', width: '60px', background: '#F04E23', margin: '0 2rem 1.5rem' }}></div>

        <div style={{ ...contentStyle, padding: '0 2rem 2rem' }}>
          <div style={{ flex: 1, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', position: 'relative', overflow: 'hidden', padding: '1rem' }}>
             {/* Mini Gantt Grid */}
             <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', height: '100%', gap: '1px', background: '#e2e8f0' }}>
                <div style={{ background: '#f1f5f9', padding: '0.5rem', fontWeight: 600, fontSize: '0.75rem' }}>SWIMLANE</div>
                <div style={{ background: '#f1f5f9', display: 'flex', justifyContent: 'space-around', padding: '0.5rem', fontWeight: 600, fontSize: '0.75rem' }}>
                   {Array.from({ length: 10 }, (_, i) => 2023 + i).map(y => <span key={y}>{y}</span>)}
                </div>
                {data.swimlanes.slice(0, 4).map(lane => (
                   <React.Fragment key={lane}>
                      <div style={{ background: 'white', padding: '0.5rem', fontSize: '0.7rem', fontWeight: 500 }}>{lane}</div>
                      <div style={{ background: 'white', position: 'relative' }}>
                         <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '4px', background: '#f1f5f9', transform: 'translateY(-50%)' }} />
                         {data.milestones.filter(m => m.swimlane === lane && m.isSelected).map(m => (
                            <div key={m.id} style={{ 
                               position: 'absolute', 
                               left: `${((m.year - 2023) * 10) + (m.position / 10)}%`, 
                               top: '50%', 
                               transform: 'translate(-50%, -50%)',
                               display: 'flex', flexDirection: 'column', alignItems: 'center'
                            }}>
                               <span style={{ color: '#F04E23', fontSize: '10px' }}>▲</span>
                               <span style={{ fontSize: '8px', whiteSpace: 'nowrap', fontWeight: 700 }}>{m.name}</span>
                            </div>
                         ))}
                      </div>
                   </React.Fragment>
                ))}
             </div>
          </div>
        </div>
      </div>
    ),
    // Slide 4: Resourcing Estimates
    (
      <div style={slideStyle} key="slide4">
        {/* Professional PPT Header */}
        <div style={{ ...headerStyle, borderBottom: 'none', padding: '1.5rem 2rem 0.5rem' }}>
          <h2 style={{ margin: 0, color: '#0F172A', fontSize: '1.8rem', fontWeight: 600 }}>
            {data.projectId}: Resourcing estimates shared with Functional Leads
          </h2>
          <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 500 }}>Validated from RM System</span>
        </div>
        
        {/* GSK Accent Line */}
        <div style={{ height: '4px', width: '60px', background: '#F04E23', margin: '0 2rem 1.5rem' }}></div>

        <div style={{ ...contentStyle, padding: '0 2rem 2rem' }}>
          <div style={{ flex: 1, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
             
             <div style={{ height: '40px', background: '#F04E23', width: '100%', display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
                <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 700 }}>FUNCTIONAL RESOURCE ESTIMATES (FTE)</span>
             </div>
             
             <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
                <thead style={{ background: '#f1f5f9' }}>
                   <tr>
                      <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #e2e8f0' }}>FUNCTION</th>
                      <th style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>2026</th>
                      <th style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>2027</th>
                      <th style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>2028</th>
                      <th style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>SIGN-OFF</th>
                   </tr>
                </thead>
                <tbody>
                   {data.resourcingData.flatMap(cat => [
                      <tr key={cat.id} style={{ background: '#f8fafc' }}>
                         <td style={{ padding: '6px 8px', fontWeight: 700, color: '#F04E23' }}>{cat.name}</td>
                         <td colSpan={4}></td>
                      </tr>,
                      ...(cat.children || []).map(child => (
                         <tr key={child.id}>
                            <td style={{ padding: '4px 20px', color: '#475569' }}>{child.name}</td>
                            <td style={{ textAlign: 'center' }}>0.4</td>
                            <td style={{ textAlign: 'center' }}>0.8</td>
                            <td style={{ textAlign: 'center' }}>1.2</td>
                            <td style={{ textAlign: 'center', color: '#10b981', fontWeight: 600 }}>Validated</td>
                         </tr>
                      ))
                   ])}
                </tbody>
             </table>
             
             <div style={{ marginTop: 'auto', padding: '1rem', background: '#f1f5f9', fontSize: '9px', color: '#64748b', borderTop: '1px solid #e2e8f0' }}>
                * FTE estimates are subject to functional lead approval during the Q3 planning cycle.
             </div>
          </div>
        </div>
      </div>
    ),
    // Slide 7: Risks & Dependencies
    (
      <div style={slideStyle} key="slide6">
        {/* Professional PPT Header */}
        <div style={{ ...headerStyle, borderBottom: 'none', padding: '1.5rem 2rem 0.5rem' }}>
          <h2 style={{ margin: 0, color: '#000', fontSize: '1.8rem', fontWeight: 600 }}>
            Risks & Dependencies
          </h2>
          <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 500 }}>Critical Board Awareness</span>
        </div>
        
        {/* GSK Accent Line */}
        <div style={{ height: '4px', width: '60px', background: '#F04E23', margin: '0 2rem 1.5rem' }}></div>

        <div style={{ ...contentStyle, padding: '0 2rem 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
            {data.risks.slice(0, 4).map(risk => (
              <div key={risk.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: risk.impact === 'High' ? '#fee2e2' : risk.impact === 'Medium' ? '#fef3c7' : '#dcfce7', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>{risk.description || "Project Risk"}</span>
                  <span style={{ 
                    fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '12px',
                    background: risk.impact === 'High' ? '#ef4444' : risk.impact === 'Medium' ? '#f59e0b' : '#10b981',
                    color: 'white'
                  }}>{risk.impact}</span>
                </div>
                <div style={{ padding: '1rem', flex: 1 }}>
                  <p style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>Mitigation Plan</p>
                  <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: '1.4' }}>{risk.mitigation || "Ongoing monitoring and assessment..."}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem' }}>
             <h4 style={{ fontSize: '0.8rem', color: '#0F172A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <span>⛓</span> Key Dependencies
             </h4>
             <p style={{ fontSize: '0.8rem', color: '#475569' }}>
               Dependency on shared resource pool in Asia (Clinical Ops) and regulatory approval of the Phase II protocol amendment.
             </p>
          </div>
        </div>
      </div>
    )
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ 
        background: '#1e293b', 
        padding: '3rem', 
        borderRadius: 'var(--radius-lg)', 
        border: '1px solid #334155',
        boxShadow: 'var(--shadow-lg), inset 0 2px 10px rgba(0,0,0,0.5)',
        position: 'relative'
      }}>
        {/* Subtle Projector Glow */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))' }}>
          {slides[currentSlideIndex]}
        </div>

        {/* Presenter Footer Simulation */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', color: '#94a3b8', fontSize: '0.75rem', gap: '2rem' }}>
          <span>⌨ Use Arrows to Navigate</span>
          <span>Project: {data.projectId}</span>
          <span>{currentSlideIndex + 1} / {slides.length}</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button 
          className="btn btn-secondary" 
          disabled={currentSlideIndex === 0} 
          onClick={() => setCurrentSlideIndex(c => c - 1)}
        >
          Previous Slide
        </button>
        <button 
          className="btn btn-secondary" 
          disabled={currentSlideIndex === slides.length - 1} 
          onClick={() => setCurrentSlideIndex(c => c + 1)}
        >
          Next Slide
        </button>
      </div>
    </div>
  );
};

export default Step5Preview;
