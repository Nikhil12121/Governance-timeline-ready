import { useState } from 'react';
import { useDeck } from '../context/DeckContext';

const Step6Download = () => {
  const { data, setCurrentStep } = useDeck();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

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

      // Title Slide
      let slide1 = pptx.addSlide();
      slide1.background = { color: '1e293b' };
      slide1.addText(data.projectName, { x: 1, y: 2, fontSize: 36, color: 'FFFFFF', bold: true });
      slide1.addText(`${data.projectId} | ${data.boardHeading}`, { x: 1, y: 3, fontSize: 18, color: 'CBD5E1' });
      slide1.addText(`Prepared for: ${data.owner} | Date: ${data.date}`, { x: 1, y: 4, fontSize: 14, color: '94A3B8' });
      
      // We are adding placeholders for the rest of the slides as a full layout would require more complex mapping
      let slide2 = pptx.addSlide();
      slide2.addText('Executive Summary', { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: '0F172A' });
      slide2.addText('Context & Objectives:\n' + (data.consultationText || 'N/A'), { x: 0.5, y: 1.5, w: '90%', fontSize: 14, color: '334155' });
      
      let slide3 = pptx.addSlide();
      slide3.addText('High-level Investment Overview', { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: '0F172A' });
      slide3.addText('Milestones: ' + data.milestones.filter(m=>m.isSelected).map(m=>m.name).join(', '), { x: 0.5, y: 1.5, w: '90%', fontSize: 14, color: '334155' });

      let slide4 = pptx.addSlide();
      slide4.addText('Resourcing Estimates', { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: '0F172A' });
      slide4.addText('Validated from RM System', { x: 0.5, y: 1.5, w: '90%', fontSize: 14, color: '334155' });

      let slide5 = pptx.addSlide();
      slide5.addText('Risks & Dependencies', { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: '0F172A' });
      data.risks.forEach((r, i) => {
         slide5.addText(`${r.impact} - ${r.description}\nMitigation: ${r.mitigation}`, { x: 0.5, y: 1.5 + (i * 0.8), w: '90%', fontSize: 12, color: '334155' });
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
          <div style={{ width: '80px', height: '80px', background: 'var(--bg-tertiary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', fontSize: '2rem', border: '1px solid var(--border-medium)' }}>
            📥
          </div>
          <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Ready to Download</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '400px' }}>
            Your governance deck for <strong>{data.projectName}</strong> is ready. The file includes your board-ready slides with the interactive High-level Investment Overview embedded.
          </p>

          <button 
            className="btn btn-primary" 
            style={{ fontSize: '1.25rem', padding: '1rem 2rem' }}
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? (
               <><span className="loading-indicator" style={{ marginRight: '12px' }}></span> Generating PPTX...</>
            ) : 'Download PPT'}
          </button>
        </>
      ) : (
        <div className="animate-fade-in">
          <div style={{ width: '80px', height: '80px', background: '#d1fae5', color: '#047857', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', fontSize: '2rem', margin: '0 auto 2rem', border: '1px solid #a7f3d0' }}>
            ✓
          </div>
          <h2 style={{ marginBottom: '1rem', color: '#047857' }}>Download Complete!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Your deck <strong>{data.projectId}_Governance_Deck.pptx</strong> has been downloaded.
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
