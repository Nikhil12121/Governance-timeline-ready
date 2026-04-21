import { useState } from 'react';
import { useDeck } from '../context/DeckContext';

const Step6Download = () => {
  const { data, setCurrentStep } = useDeck();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  // Helper for Slide Headers (mirrors the Triangle + Orange Text style)
  const addSlideHeader = (slide: any, title: string, subtitle?: string) => {
    // Triangle
    slide.addShape('triangle', {
      x: 0.5, y: 0.5, w: 0.15, h: 0.2,
      fill: { color: 'F04E23' },
      rotate: 90
    });
    // Title
    slide.addText(title, {
      x: 0.7, y: 0.45, w: 8, h: 0.4,
      fontSize: 22,
      color: 'F04E23',
      bold: true,
      fontFace: 'Arial'
    });
    if (subtitle) {
      slide.addText(subtitle, {
        x: 0.7, y: 0.85, w: 9, h: 0.3,
        fontSize: 14,
        color: '64748B'
      });
    }
    // Logo footer
    slide.addText('GSK', {
      x: 8.8, y: 5.1, w: 1, h: 0.4,
      fontSize: 24,
      bold: true,
      color: 'F04E23',
      align: 'right'
    });
    slide.addText('CSI External Use', {
      x: 8.8, y: 5.4, w: 1, h: 0.2,
      fontSize: 8,
      color: '64748B',
      align: 'right'
    });
  };

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      // @ts-ignore
      if (typeof window.PptxGenJS === 'undefined') {
        throw new Error('PptxGenJS library not loaded from CDN');
      }
      
      // @ts-ignore
      let pptx = new window.PptxGenJS();
      pptx.layout = 'LAYOUT_16x9';

      // ==========================================
      // SLIDE 1: COVER
      // ==========================================
      let slide1 = pptx.addSlide();
      // Orange gradient background (simulation with color)
      slide1.background = { color: 'F04E23' };
      slide1.addText(data.boardHeading, { 
        x: 0.5, y: 2.2, w: 9, h: 1,
        fontSize: 44, color: 'FFFFFF', bold: true, align: 'center' 
      });
      slide1.addText(data.projectName, { 
        x: 0.5, y: 3.2, w: 9, h: 0.5,
        fontSize: 22, color: 'FFFFFF', align: 'center' 
      });
      slide1.addText(`Prepared for: ${data.owner} | ${new Date(data.date).toLocaleDateString()}`, { 
        x: 0.5, y: 5, w: 9, h: 0.4,
        fontSize: 14, color: 'FFFFFF', opacity: 0.8, align: 'center' 
      });
      // GSK Logo in top right
      slide1.addShape('rect', { x: 8.5, y: 0.2, w: 1, h: 0.6, fill: { color: 'FFFFFF' } });
      slide1.addText('GSK', { x: 8.5, y: 0.2, w: 1, h: 0.6, fontSize: 24, bold: true, color: 'F04E23', align: 'center' });

      // ==========================================
      // SLIDE 2: STRUCTURE (Governance Material)
      // ==========================================
      let slide2 = pptx.addSlide();
      addSlideHeader(slide2, 'DRB Governance Material Structure');
      const structureRows = [
        [{ text: 'Slides', options: { fill: 'F04E23', color: 'FFFFFF', bold: true } }, { text: 'Section', options: { fill: 'F04E23', color: 'FFFFFF', bold: true } }, { text: 'Core Slides', options: { fill: 'F04E23', color: 'FFFFFF', bold: true } }],
        ['3', '1. Introduction', 'Executive Summary'],
        ['4-5', '2. Asset Potential', 'Reasons to Believe / Interdependencies'],
        ['6-9', '3. Project Potential', 'Value Creation / CDP Options / Sensitivities'],
        ['10-18', '4. Delivering Label', 'TPP / Integrated Evidence / Risks'],
        ['19-20', '5. Investment Plan', 'Investment Overview (HIO) / Resourcing']
      ];
      slide2.addTable(structureRows, { x: 0.5, y: 1.2, w: 9, rowH: 0.5, fontSize: 11, border: { pt: 1, color: 'F04E23' } });

      // ==========================================
      // SLIDE 3: EXECUTIVE SUMMARY
      // ==========================================
      let slide3 = pptx.addSlide();
      addSlideHeader(slide3, `Executive Summary: ${data.projectId}`);
      // Context Section
      slide3.addText('CONTEXT', { x: 0.5, y: 1.2, w: 9, h: 0.3, fill: 'F04E23', color: 'FFFFFF', bold: true, fontSize: 12 });
      slide3.addText(data.executiveSummary.context, { x: 0.5, y: 1.5, w: 9, h: 1, fontSize: 10, color: '333333', border: { pt: 1, color: 'F04E23' }, align: 'left', valign: 'top' });
      // Proposal Section
      slide3.addText('TEAM PROPOSAL', { x: 0.5, y: 2.7, w: 9, h: 0.3, fill: 'F04E23', color: 'FFFFFF', bold: true, fontSize: 12 });
      slide3.addText(data.executiveSummary.teamProposal, { x: 0.5, y: 3.0, w: 9, h: 1, fontSize: 10, color: '333333', border: { pt: 1, color: 'F04E23' }, align: 'left', valign: 'top' });
      // Questions Section
      slide3.addText('KEY QUESTIONS', { x: 0.5, y: 4.2, w: 9, h: 0.3, fill: 'F04E23', color: 'FFFFFF', bold: true, fontSize: 12 });
      slide3.addText(data.executiveSummary.keyQuestions, { x: 0.5, y: 4.5, w: 9, h: 0.7, fontSize: 10, color: '333333', border: { pt: 1, color: 'F04E23' }, align: 'left', valign: 'top' });

      // ==========================================
      // SLIDE 4: REASONS TO BELIEVE
      // ==========================================
      let slide4 = pptx.addSlide();
      addSlideHeader(slide4, "REASONS TO BELIEVE IN THE ASSET'S POTENTIAL");
      
      const rtbSections = [
        { title: 'UNMET NEED', text: data.reasonsToBelieve.unmetNeed, x: 0.5, y: 1.2 },
        { title: 'MOA AND DIFFERENTIATION', text: data.reasonsToBelieve.moa, x: 0.5, y: 2.5 },
        { title: 'BIOLOGICAL / PRECLINICAL DATA', text: data.reasonsToBelieve.preclinical, x: 5.1, y: 1.2 },
        { title: 'KEY CLINICAL DATA', text: data.reasonsToBelieve.clinical, x: 5.1, y: 3.5 }
      ];

      rtbSections.forEach(sec => {
        slide4.addText(sec.title, { x: sec.x, y: sec.y, w: 4.4, h: 0.25, fontSize: 10, bold: true, color: '111111' });
        slide4.addText(sec.text, { x: sec.x, y: sec.y + 0.3, w: 4.4, h: 1, fontSize: 9, color: '333333', fill: 'F1F1F1' });
      });

      // Reasons not to believe (RED BOX)
      slide4.addText('REASONS NOT TO BELIEVE', { x: 0.5, y: 4.2, w: 4.4, h: 1, fontSize: 9, color: '333333', border: { pt: 2, color: 'F04E23' }, align: 'left', valign: 'top' });
      slide4.addText(data.reasonsToBelieve.reasonsNotToBelieve, { x: 0.6, y: 4.5, w: 4.2, h: 0.6, fontSize: 8, color: '555555' });

      // ==========================================
      // SLIDE 5: VALUE CREATION
      // ==========================================
      let slide5 = pptx.addSlide();
      addSlideHeader(slide5, 'Value Creation Evolution');
      
      const valHeader = [
        { text: 'Metric', options: { fill: 'FCE4D6', color: '111111', bold: true } },
        { text: 'Current Estimate', options: { fill: 'F04E23', color: 'FFFFFF', bold: true } },
        { text: 'Last Governed', options: { fill: '555555', color: 'FFFFFF', bold: true } },
        { text: 'Comment', options: { fill: '555555', color: 'FFFFFF', bold: true } }
      ];

      const valRows = data.valueCreation.items.map(item => [
        { text: item.metric, options: { fill: 'FCE4D6' } },
        { text: item.currentEstimate, options: { align: 'center' } },
        { text: item.lastGoverned, options: { align: 'center' } },
        { text: item.comment, options: { fontSize: 8 } }
      ]);

      slide5.addTable([valHeader, ...valRows], { x: 0.5, y: 1.5, w: 9, rowH: 0.3, fontSize: 10, border: { pt: 0.5, color: '999999' } });

      // ==========================================
      // SLIDE 7: HIO (High-level Investment Overview)
      // ==========================================
      let slide7 = pptx.addSlide();
      addSlideHeader(slide7, 'High-level Investment Overview', 'Key contact: Project manager / Finance');

      // Drawing the Gantt and Financials as a complex table
      const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032];
      const hioHeader = ['SWIMLANE', ...years.map(y => y.toString()), 'EPE', 'IPE', 'PTRS'];
      
      const swimlaneRows = data.swimlanes.map((lane, idx) => [
        lane, ...years.map(_ => ''), `£${idx*2+1}m`, `£${idx}m`, `${15 + idx*15}%`
      ]);

      const finRows = data.financials.map(fin => [
        fin.label, ...years.map(y => fin.data[y] || ''), fin.summaryEPE, fin.summaryIPE, ''
      ]);

      const fullHioTable = [hioHeader, ...swimlaneRows, ...finRows];
      
      slide7.addTable(fullHioTable, { 
        x: 0.5, y: 1.3, w: 9, 
        fontSize: 7, 
        rowH: 0.25,
        border: { pt: 0.5, color: '999999' },
        fill: 'FFFFFF',
        align: 'center'
      });

      // Special handling for the "Today" marker line across the table
      // Calculated position approx: years start at index 1 of the header
      // 2026 is index 4.
      const colWidth = 9 / 14; 
      const lineX = 0.5 + (colWidth * 4.5); 
      slide7.addShape('line', { x: lineX, y: 1.1, w: 0, h: 2.5, line: { color: '333333', width: 2 } });
      slide7.addText('Today', { x: lineX - 0.2, y: 0.9, w: 0.4, h: 0.2, fontSize: 8, color: '333333', align: 'center', bold: true });

      // Commentary at bottom
      slide7.addText('ACTUALS', { x: 0.5, y: 4.2, w: 4.4, h: 0.2, fill: 'F04E23', color: 'FFFFFF', bold: true, fontSize: 9 });
      slide7.addText(data.hioCommentary.actuals, { x: 0.5, y: 4.4, w: 4.4, h: 0.6, fontSize: 8, color: '333333', border: { pt: 1, color: '999999' } });
      slide7.addText('BUDGET', { x: 5.1, y: 4.2, w: 4.4, h: 0.2, fill: 'BBBBBB', color: '000000', bold: true, fontSize: 9 });
      slide7.addText(data.hioCommentary.budget, { x: 5.1, y: 4.4, w: 4.4, h: 0.6, fontSize: 8, color: '333333', border: { pt: 1, color: '999999' } });

      // ==========================================
      // SLIDE 8: RESOURCING
      // ==========================================
      let slide8 = pptx.addSlide();
      addSlideHeader(slide8, 'Resourcing estimates shared with Functional Leads', 'Validated from RM System');
      
      const resHeader1 = [
        { text: 'R&D FUNCTION', options: { fill: 'F04E23', color: 'FFFFFF', bold: true } },
        { text: 'CY FTE', options: { fill: 'F04E23', color: 'FFFFFF', bold: true, colSpan: 4, align: 'center' } },
        { text: 'CY IPE', options: { fill: 'F04E23', color: 'FFFFFF', bold: true, align: 'center' } },
        { text: '2027', options: { fill: 'F04E23', color: 'FFFFFF', bold: true, colSpan: 2, align: 'center' } },
        { text: '2028', options: { fill: 'F04E23', color: 'FFFFFF', bold: true, colSpan: 2, align: 'center' } },
        { text: '2029', options: { fill: 'F04E23', color: 'FFFFFF', bold: true, colSpan: 2, align: 'center' } },
        { text: 'PROJECT TOTAL', options: { fill: 'F04E23', color: 'FFFFFF', bold: true, colSpan: 3, align: 'center' } }
      ];
      
      const resRows: any[] = [];
      data.resourcingData.forEach(cat => {
        // Category Header Row
        resRows.push([
          { text: cat.name, options: { fill: 'F1F5F9', color: 'F04E23', bold: true } },
          ...Array(13).fill('')
        ]);
        // Child Rows
        cat.children?.forEach(child => {
          resRows.push([
            '  ' + child.name,
            child.cyFTE?.[0] || '', child.cyFTE?.[1] || '', child.cyFTE?.[2] || '', child.cyFTE?.[3] || '',
            child.cyIPE || '',
            child.y1FTE || '', child.y1IPE || '',
            child.y2FTE || '', child.y2IPE || '',
            child.y3FTE || '', child.y3IPE || '',
            child.projAlgoFTE || '', child.projFnHeadFTE || '', child.projIPE || ''
          ]);
        });
      });

      slide8.addTable([resHeader1, ...resRows], { 
        x: 0.25, y: 1.3, w: 9.5, 
        fontSize: 6, 
        rowH: 0.15,
        border: { pt: 0.5, color: 'E2E8F0' } 
      });

      // ==========================================
      // SLIDE 9: RISKS
      // ==========================================
      let slide9 = pptx.addSlide();
      addSlideHeader(slide9, 'Risks & Dependencies', 'Critical Board Awareness');
      
      data.risks.forEach((risk, i) => {
        const xPos = i % 2 === 0 ? 0.5 : 5.1;
        const yPos = 1.3 + (Math.floor(i / 2) * 1.5);
        if (i < 4) {
          slide9.addText(risk.description, { x: xPos, y: yPos, w: 4.4, h: 0.3, fill: risk.impact === 'High' ? 'FEE2E2' : 'FEF3C7', fontSize: 10, bold: true });
          slide9.addText(`Impact: ${risk.impact}\nMitigation: ${risk.mitigation}`, { x: xPos, y: yPos + 0.35, w: 4.4, h: 0.8, fontSize: 9, color: '334155', border: { pt: 0.5, color: 'E2E8F0' } });
        }
      });

      await pptx.writeFile({ fileName: `${data.projectId}_Governance_Deck.pptx` });

      setDownloadComplete(true);
    } catch (error) {
      console.error('Error generating PPT:', error);
      alert('Failed to generate PowerPoint. Please ensure you are connected to the internet to load the PPT engine.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleStartNew = () => {
    setCurrentStep(1);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      
      {!downloadComplete ? (
        <>
          <div style={{ 
            width: '80px', height: '80px', 
            background: 'linear-gradient(135deg, #FF7B00 0%, #E63800 100%)', 
            borderRadius: '24px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            marginBottom: '2rem', fontSize: '2rem', color: 'white',
            boxShadow: '0 10px 20px rgba(240, 78, 35, 0.3)'
          }}>
            📥
          </div>
          <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '2rem', fontWeight: 300 }}>Ready to Download</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '450px', lineHeight: 1.6 }}>
            Your governance deck for <strong>{data.projectName}</strong> is ready. The exported PowerPoint mirrors the high-fidelity visuals from your preview.
          </p>

          <button 
            className="btn btn-primary" 
            style={{ 
              fontSize: '1.25rem', padding: '1rem 3rem', 
              background: 'linear-gradient(90deg, #F04E23 0%, #EA580C 100%)',
              border: 'none', borderRadius: '50px', fontWeight: 600
            }}
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? (
               <><span className="loading-indicator" style={{ marginRight: '12px' }}></span> Finalizing Slides...</>
            ) : 'Generate Board Presentation'}
          </button>
        </>
      ) : (
        <div className="animate-fade-in">
          <div style={{ width: '80px', height: '80px', background: '#d1fae5', color: '#047857', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', fontSize: '2rem', margin: '0 auto 2rem', border: '1px solid #a7f3d0' }}>
            ✓
          </div>
          <h2 style={{ marginBottom: '1rem', color: '#047857' }}>Success!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            <strong>{data.projectId}_Governance_Deck.pptx</strong> has been generated and saved.
          </p>
          
          <button className="btn btn-secondary" onClick={handleStartNew}>
            Start New Deck
          </button>
        </div>
      )}

    </div>
  );
};

export default Step6Download;
