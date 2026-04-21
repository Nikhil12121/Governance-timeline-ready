import React, { useState } from 'react';
import { useDeck } from '../context/DeckContext';

const Step5Preview = () => {
  const { data, updateData } = useDeck();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAddingComment, setIsAddingComment] = useState(false);

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
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  width: 0, height: 0, 
                  borderTop: '8px solid transparent', 
                  borderBottom: '8px solid transparent', 
                  borderLeft: '12px solid #F04E23', 
                  marginRight: '12px' 
                }}></div>
                <h2 style={{ margin: 0, color: '#F04E23', fontSize: '1.8rem', fontWeight: 300, fontFamily: 'system-ui, sans-serif' }}>
                  Value Creation Evolution
                </h2>
              </div>
              <div style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <h3 style={{ margin: 0, color: '#111', fontSize: '1.4rem', fontWeight: 400 }}>Key changes vs last governance/forecast</h3>
              </div>
            </div>
            
            {/* Legend block */}
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.6rem', textAlign: 'center' }}>
              <div style={{ background: '#0284C7', color: 'white', padding: '0.2rem 0.5rem', fontStyle: 'italic', marginBottom: '2px' }}>
                Indicate directional impact in "current base case"
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', padding: '0.2rem 0', fontWeight: 'bold' }}>
                <div>Legend</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.55rem', fontWeight: 'normal' }}>
                  <span>n/a</span>
                  <span style={{ color: '#10B981', fontSize: '0.7rem' }}>⇑</span>
                  <span style={{ color: '#EF4444', fontSize: '0.7rem' }}>⇑</span>
                  <span style={{ fontSize: '0.7rem' }}>⇔</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontSize: '0.55rem', fontWeight: 'normal' }}>
                  <span>Unknown</span>
                  <span>Better</span>
                  <span>Worse</span>
                  <span>Similar</span>
                </div>
              </div>
              <div style={{ background: '#0284C7', color: 'white', padding: '0.4rem 0.5rem', marginTop: '2px', fontStyle: 'italic', textAlign: 'left' }}>
                Key contact: Decision Sciences / Finance Partner
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingLeft: '1.5rem', paddingRight: '1rem', paddingBottom: '1rem' }}>
            
            {/* Main Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', height: '100%', tableLayout: 'fixed' }}>
              <thead>
                <tr>
                  {/* Empty top left corner */}
                  <th style={{ width: '20%', border: 'none' }}></th>
                  <th style={{ width: '25%', background: '#F04E23', color: 'white', padding: '0.3rem', fontWeight: 500, fontSize: '0.85rem', border: '1px solid white' }}>Current Estimate</th>
                  <th style={{ width: '25%', background: '#555', color: 'white', padding: '0.3rem', fontWeight: 500, fontSize: '0.85rem', border: '1px solid white' }}>Last Governed</th>
                  <th style={{ width: '30%', background: '#555', color: 'white', padding: '0.3rem', fontWeight: 500, fontSize: '0.85rem', border: '1px solid white' }}>Comment</th>
                </tr>
              </thead>
              <tbody>
                {data.valueCreation.items.map((item) => (
                  <tr key={item.id}>
                    {/* Pink metric cell */}
                    <td style={{ background: '#FCE4D6', border: '1px solid #C55A11', padding: '0.15rem 0.5rem', textAlign: 'center', fontSize: '0.75rem', color: '#111' }}>
                      {item.metric}
                    </td>
                    {/* Current Estimate cell */}
                    <td style={{ border: '1px solid #7F7F7F', padding: '0.15rem 0.5rem', textAlign: 'center', background: 'white' }}>
                      {item.currentEstimate === 'green-up' ? <div style={{ color: '#10B981', fontSize: '1.1rem', fontWeight: 800, lineHeight: 1 }}>⇑</div> :
                       item.currentEstimate === 'red-up' ? <div style={{ color: '#EF4444', fontSize: '1.1rem', fontWeight: 800, lineHeight: 1 }}>⇑</div> :
                       item.currentEstimate === 'similar' ? <div style={{ color: '#111', fontSize: '1.1rem', fontWeight: 800, lineHeight: 1 }}>⇔</div> :
                       <div style={{ color: '#333', fontSize: '0.75rem' }}>{item.currentEstimate}</div>}
                    </td>
                    {/* Last Governed cell */}
                    <td style={{ border: '1px solid #7F7F7F', padding: '0.15rem 0.5rem', textAlign: 'center', background: 'white', fontSize: '0.75rem' }}>
                      {item.lastGoverned}
                    </td>
                    {/* Comment cell */}
                    <td style={{ border: '1px solid #7F7F7F', padding: '0.15rem 0.5rem', background: 'white', fontSize: '0.75rem', verticalAlign: 'top' }}>
                      {item.comment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

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
    // Slide 6: Key Valuation Inputs & Milestones
    (
      <div 
        style={{ ...slideStyle, cursor: isAddingComment ? 'crosshair' : 'default' }} 
        key="slide_valuation_inputs"
        onClick={(e) => {
          if (!isAddingComment) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          updateData({ 
            slideComments: [
              ...data.slideComments, 
              { id: `sc${Date.now()}`, text: 'New comment...', x, y }
            ] 
          });
          setIsAddingComment(false);
        }}
      >
        {/* Top left CSI */}
        <div style={{ position: 'absolute', top: '0.5rem', left: '1rem', fontSize: '0.65rem', color: '#666' }}>
          CSI External Use
        </div>

        {/* Container for main content */}
        <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
          
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ 
              width: 0, height: 0, 
              borderTop: '8px solid transparent', 
              borderBottom: '8px solid transparent', 
              borderLeft: '12px solid #F04E23', 
              marginRight: '12px' 
            }}></div>
            <h2 style={{ margin: 0, color: '#F04E23', fontSize: '1.8rem', fontWeight: 300, fontFamily: 'system-ui, sans-serif' }}>
              Key evaluation inputs - {data.projectName} / {data.projectId}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, paddingLeft: '1.5rem', paddingRight: '1rem' }}>
            
            {/* Top Grid: Indications and Valuation Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
              
              {/* Indications Table */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: '#F04E23', color: 'white', padding: '0.25rem 0.5rem', fontSize: '0.8rem', fontWeight: 600 }}>
                  Primary indications / Target markets
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', border: '1px solid #F04E23' }}>
                  <thead>
                    <tr style={{ background: '#f1f1f1' }}>
                      <th style={{ padding: '4px', border: '1px solid #F04E23', textAlign: 'left' }}>Indication</th>
                      <th style={{ padding: '4px', border: '1px solid #F04E23', textAlign: 'left' }}>LoT</th>
                      <th style={{ padding: '4px', border: '1px solid #F04E23', textAlign: 'left' }}>Target Patient Pop</th>
                      <th style={{ padding: '4px', border: '1px solid #F04E23', textAlign: 'left' }}>Peak Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.valuationInputs.indications.map(ind => (
                      <tr key={ind.id}>
                        <td style={{ padding: '4px', border: '1px solid #F04E23' }}>{ind.indication}</td>
                        <td style={{ padding: '4px', border: '1px solid #F04E23' }}>{ind.lineOfTherapy}</td>
                        <td style={{ padding: '4px', border: '1px solid #F04E23' }}>{ind.targetPopulation}</td>
                        <td style={{ padding: '4px', border: '1px solid #F04E23' }}>{ind.peakShare}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Valuation Summary Table */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: '#F04E23', color: 'white', padding: '0.25rem 0.5rem', fontSize: '0.8rem', fontWeight: 600 }}>
                  Valuation metrics
                </div>
                <div style={{ border: '1px solid #F04E23', borderTop: 'none', padding: '0.5rem', flex: 1, background: 'white' }}>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {Object.entries(data.valuationInputs.metrics).map(([key, val]) => (
                        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '2px' }}>
                           <span style={{ fontWeight: 600, color: '#333', fontSize: '0.75rem' }}>{key}:</span>
                           <span style={{ color: '#F04E23', fontWeight: 700, fontSize: '0.75rem' }}>{val}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

            </div>

            {/* Middle Section: Milestones Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '0.5rem' }}>
               <div style={{ background: '#555', color: 'white', padding: '0.25rem 0.5rem', fontSize: '0.8rem', fontWeight: 600 }}>
                  Key Project Milestones
               </div>
               <div style={{ border: '1px solid #555', borderTop: 'none', height: '120px', position: 'relative', background: '#f8fafc', padding: '1rem' }}>
                  {/* Years axis */}
                  <div style={{ position: 'absolute', bottom: '10px', left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '0 2rem' }}>
                     {[2023, 2024, 2025, 2026, 2027, 2028].map(y => (
                       <span key={y} style={{ fontSize: '0.65rem', color: '#999' }}>{y}</span>
                     ))}
                  </div>
                  <div style={{ position: 'absolute', bottom: '25px', left: '2rem', right: '2rem', height: '2px', background: '#ddd' }} />
                  
                  {/* Milestones */}
                  {data.milestones.slice(0, 10).map((m, i) => {
                    const leftPos = ((m.year - 2023) / 5) * 85 + 5; // simplified positioning logic
                    return (
                      <div key={m.id} style={{ position: 'absolute', left: `${leftPos}%`, top: i % 2 === 0 ? '20%' : '45%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                         <div style={{ background: '#F04E23', width: '10px', height: '10px', transform: 'rotate(45deg)', marginBottom: '4px' }} />
                         <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#333' }}>{m.name}</span>
                         <span style={{ fontSize: '0.6rem', color: '#666' }}>Q{Math.ceil(m.position / 25)} {m.year}</span>
                      </div>
                    );
                  })}
               </div>
            </div>

            {/* Interactive Comment Layer */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
               {data.slideComments.map(comment => (
                 <div 
                   key={comment.id}
                   onClick={(e) => e.stopPropagation()}
                   style={{ 
                     position: 'absolute', 
                     left: `${comment.x}%`, 
                     top: `${comment.y}%`, 
                     background: '#FEF08A', 
                     padding: '0.5rem', 
                     borderLeft: '4px solid #EAB308',
                     boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.2)',
                     pointerEvents: 'auto',
                     width: '180px',
                     fontSize: '0.75rem',
                     color: '#854d0e',
                     borderRadius: '0 4px 4px 0',
                     fontFamily: 'cursive'
                   }}
                 >
                   <textarea
                     value={comment.text}
                     onChange={(e) => {
                       const newComments = data.slideComments.map(c => c.id === comment.id ? { ...c, text: e.target.value } : c);
                       updateData({ slideComments: newComments });
                     }}
                     style={{ 
                       background: 'transparent', 
                       border: 'none', 
                       width: '100%', 
                       resize: 'none', 
                       outline: 'none',
                       color: 'inherit',
                       fontFamily: 'inherit',
                       fontSize: 'inherit'
                     }}
                     rows={3}
                   />
                   <button 
                     onClick={() => updateData({ slideComments: data.slideComments.filter(c => c.id !== comment.id) })}
                     style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '18px', height: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}
                   >✕</button>
                 </div>
               ))}
            </div>

          </div>
        </div>

        {/* Bottom Right Logo */}
        <div style={{ position: 'absolute', bottom: '1rem', right: '1.5rem', textAlign: 'right', pointerEvents: 'none' }}>
          <div style={{ color: '#F04E23', fontSize: '1.5rem', fontWeight: 800, fontFamily: 'system-ui', lineHeight: 1 }}>GSK</div>
          <div style={{ color: '#666', fontSize: '0.55rem', marginTop: '2px' }}>CSI External Use</div>
        </div>
        {/* Page Number */}
        <div style={{ position: 'absolute', bottom: '1rem', left: '1.5rem', fontSize: '0.65rem', color: '#666', pointerEvents: 'none' }}>
          6
        </div>
      </div>
    ),
    // Slide 7: High-level Investment Overview
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
        {/* Page Number */}
        <div style={{ position: 'absolute', bottom: '1rem', left: '1.5rem', fontSize: '0.65rem', color: '#666' }}>
          7
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
        {/* Page Number */}
        <div style={{ position: 'absolute', bottom: '1rem', left: '1.5rem', fontSize: '0.65rem', color: '#666' }}>
          8
        </div>
      </div>
    ),
    // Slide 9: Risks & Dependencies
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
        {/* Page Number */}
        <div style={{ position: 'absolute', bottom: '1rem', left: '1.5rem', fontSize: '0.65rem', color: '#666' }}>
          9
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

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}>
        <button 
          className="btn btn-secondary" 
          disabled={currentSlideIndex === 0} 
          onClick={() => setCurrentSlideIndex(c => c - 1)}
        >
          Previous Slide
        </button>

        {currentSlideIndex === 5 && (
          <button 
            className={`btn ${isAddingComment ? 'btn-danger' : 'btn-primary'}`}
            onClick={() => setIsAddingComment(!isAddingComment)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            {isAddingComment ? <span>✕ Cancel Placement</span> : <span>➕ Add Sticky Note</span>}
          </button>
        )}

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
