import { createContext, useContext, useState, type ReactNode } from 'react';

export type Milestone = {
  id: string;
  name: string;
  year: number;
  swimlane: string;
  position: number; 
  isSelected: boolean;
};

export type FinancialRow = {
  label: string;
  data: Record<number, string>;
  summaryEPE?: string;
  summaryIPE?: string;
};

export type ResourcingRow = {
  id: string;
  name: string;
  isCategory?: boolean;
  cyFTE?: string[]; // array of 4 strings for Q1, Q2, Q3, Q4
  cyIPE?: string;
  y1FTE?: string; y1IPE?: string; // 2027
  y2FTE?: string; y2IPE?: string; // 2028
  y3FTE?: string; y3IPE?: string; // 2029
  projAlgoFTE?: string; projFnHeadFTE?: string; projIPE?: string;
  priorFTE?: string; priorIPE?: string;
  signOff?: string;
  children?: ResourcingRow[];
};

export type Risk = {
  id: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  mitigation: string;
};

export type ValueCreationItem = {
  id: string;
  metric: string;
  currentEstimate: string;
  lastGoverned: string;
  comment: string;
};

export type PrimaryIndication = {
  id: string;
  indication: string;
  lineOfTherapy: string;
  targetPopulation: string;
  peakShare: string;
};

export type SlideComment = {
  id: string;
  text: string;
  x: number; // percentage width
  y: number; // percentage height
  width: number; // percentage width
  height: number; // percentage height
  linkedMilestoneId?: string;
};

export type GovernanceData = {
  projectId: string;
  projectName: string;
  boardHeading: string;
  consultationType: string;
  assetLine: string;
  owner: string;
  date: string;
  consultationText: string;
  consultationPoints: {
    decision: string[];
    input: string[];
    awareness: string[];
  };
  executiveSummary: {
    context: string;
    teamProposal: string;
    keyQuestions: string;
  };
  reasonsToBelieve: {
    unmetNeed: string;
    moa: string;
    preclinical: string;
    clinical: string;
    reasonsNotToBelieve: string;
  };
  valueCreation: {
    items: ValueCreationItem[];
    comments: string;
  };
  valuationInputs: {
    indications: PrimaryIndication[];
    metrics: Record<string, string>; // e.g. { "PTRS": "30%", "eNPV": "£1.2B" }
  };
  slideComments: SlideComment[];
  summaryType: string;
  summaryInstruction: string;
  generatedSummary: string[];
  
  startYear: number;
  endYear: number;
  currentYear: number; 
  swimlanes: string[];
  milestones: Milestone[];
  financials: FinancialRow[];
  resourcingData: ResourcingRow[];
  risks: Risk[];
  hioCommentary: {
    actuals: string;
    budget: string;
  };
};

const initialData: GovernanceData = {
  projectId: 'GSK4425689',
  projectName: 'Oncology Phase II',
  boardHeading: 'VIDRU Board Review',
  consultationType: 'Decision',
  assetLine: 'Oncology',
  owner: 'Jane Doe',
  date: new Date().toISOString().split('T')[0],
  consultationText: '',
  consultationPoints: { decision: [], input: [], awareness: [] },
  executiveSummary: { 
    context: 'The Asset has demonstrated a best-in-class selectivity profile in the T790M resistant population. Recent data highlights a potential for significant label expansion into 1L patients with CNS involvement, representing a £420M incremental opportunity. The competitive landscape remains fluid, but our current First-in-Human (FIH) to Launch trajectory is 12% faster than industry standard.', 
    teamProposal: 'Authorize full funding for the "EXCELSIOR" Phase III program. Pivot the manufacturing scale-up to high-throughput sites in Singapore to mitigate EU supply chain risks identified in Q3.', 
    keyQuestions: '• Does the board approve the strategic pivot to Singapore for CMC primary supply?\n• Is the board comfortable with the 3% PTRS reduction following adjusted hazard ratio projections?' 
  },
  reasonsToBelieve: {
    unmetNeed: '• Significant therapeutic gap in 3rd line oncology treatments where current ORR remains <15%.\n• High CNS relapse rates in standard-of-care patient cohorts.\n• Patient burden with IV regimens necessitates the once-daily oral profile of our asset.',
    moa: '• First-in-class dual-mechanism inhibitor targeting both DNA repair and apoptotic pathways.\n• Superior selectivity minimizes systemic toxicity vs. competitor agents (3x wider therapeutic window).\n• Optimized pharmacokinetic profile supports 24hr target suppression at therapeutic doses.',
    preclinical: '• Demonstrated 100% tumor stagnation in PDX models representing primary resistance markers.\n• Synergistic activity confirmed when paired with current frontline immuno-oncology standards.\n• Safety margins established in non-human primate studies indicate low neurotoxicity risk.',
    clinical: '• Phase II cohort (n=85) showed 42% confirmed ORR in Heavily Pre-treated patients.\n• Duration of response (DoR) exceeded 14 months, significantly outperforming benchmark SoC (8mo).\n• Manageable safety profile with Grade 3/4 AEs below 10% occurrence rate.',
    reasonsNotToBelieve: '• Unknown long-term cardiac safety profile which requires extended Phase III monitoring.\n• Emerging competitor agent in early Phase I showing high potency in similar markers.\n• Complex formulation/encapsulation process may delay launch quantities if site validation fails.'
  },
  valueCreation: {
    items: [
      { id: 'vc1', metric: "(e)NPV (£'M)", currentEstimate: 'n/a', lastGoverned: '£1.4B', comment: 'Driven by improved commercial outlook in European markets.' },
      { id: 'vc2', metric: "(e)ROI", currentEstimate: 'n/a', lastGoverned: '2.2', comment: 'Slight decline due to extended Phase III timelines.' },
      { id: 'vc3', metric: "PTRS (%)", currentEstimate: 'green-up', lastGoverned: '25%', comment: 'Upgraded following robust Phase II safety profile results.' },
      { id: 'vc4', metric: "Total Dev Cost (£'M)", currentEstimate: 'red-up', lastGoverned: '£1.1B', comment: 'Increased clinical supply chain costs in North America.' },
      { id: 'vc5', metric: "Launch Year", currentEstimate: 'similar', lastGoverned: '2027', comment: 'On track for Q4 launch pending regulatory submission.' },
      { id: 'vc6', metric: "2031 Sales (£'M)", currentEstimate: 'n/a', lastGoverned: '£1.6B', comment: 'Reflects higher anticipated peak penetration in oncology.' },
      { id: 'vc7', metric: "PYS (£'M)", currentEstimate: 'n/a', lastGoverned: '£1.8B', comment: 'Projected peak sales adjusted for secondary indications.' },
      { id: 'vc8', metric: "Year of Peak Sales", currentEstimate: 'n/a', lastGoverned: '2033', comment: 'Standard 6-year trajectory from launch year.' },
      { id: 'vc9', metric: "Payback Period", currentEstimate: 'n/a', lastGoverned: '8 yrs', comment: 'Aligns with typical portfolio recovery standards.' }
    ],
    comments: ""
  },
  valuationInputs: {
    indications: [
      { id: 'ind1', indication: 'NSCLC 1st Line', lineOfTherapy: '1L', targetPopulation: '55k (Metastatic)', peakShare: '35%' },
      { id: 'ind2', indication: 'HNSCC (r/m)', lineOfTherapy: '2L', targetPopulation: '22k (PD-L1+)', peakShare: '25%' },
      { id: 'ind3', indication: 'Adjuvant NSCLC', lineOfTherapy: 'Adj', targetPopulation: '15k (Stage III)', peakShare: '15%' }
    ],
    metrics: {
      'PTRS': '28%',
      'eNPV': '£1,420M',
      'eROI': '2.5',
      'Peak Sales': '£1,850M'
    }
  },
  slideComments: [
    { id: 'sc1', text: 'Team to refresh PTRS post-readout', x: 65, y: 70, width: 20, height: 15 }
  ],
  summaryType: 'Executive',
  summaryInstruction: '',
  generatedSummary: [],
  
  startYear: 2023,
  endYear: 2034,
  currentYear: 2026,
  swimlanes: ['Clinical Development', 'Regulatory Affairs', 'CMC & Supply', 'Commercial Strategy'],
  milestones: [
    { id: 'm1', name: 'Phase II Start', year: 2023, isSelected: true, swimlane: 'Clinical Development', position: 20 },
    { id: 'm2', name: 'Phase III Start', year: 2024, isSelected: true, swimlane: 'Clinical Development', position: 60 },
    { id: 'm3', name: 'US Filing (NDA)', year: 2026, isSelected: true, swimlane: 'Regulatory Affairs', position: 30 },
    { id: 'm4', name: 'EU Filing (MAA)', year: 2026, isSelected: true, swimlane: 'Regulatory Affairs', position: 80 },
    { id: 'm5', name: 'Global Launch', year: 2027, isSelected: true, swimlane: 'Commercial Strategy', position: 40 },
    { id: 'm6', name: 'Site Validation', year: 2023, isSelected: true, swimlane: 'CMC & Supply', position: 75 }
  ],
  financials: [
    { label: 'EPE* (£M)', data: { 2023: '£55.0m', 2024: '£85.0m', 2025: '£120.0m', 2026: '£95.0m', 2027: '£45.0m', 2028: '£35.0m', 2029: '£25.0m', 2030: '£20.0m', 2031: '£15.0m', 2032: '£10.0m' }, summaryEPE: '£600M' },
    { label: 'IPE (£M)', data: { 2023: '£25.0m', 2024: '£35.0m', 2025: '£45.0m', 2026: '£30.0m', 2027: '£20.0m', 2028: '£15.0m', 2029: '£12.0m', 2030: '£10.0m', 2031: '£8.0m', 2032: '£5.0m' }, summaryIPE: '£250M' },
    { label: 'FTE (FTEs)', data: { 2023: '45', 2024: '65', 2025: '85', 2026: '75', 2027: '40', 2028: '30', 2029: '20', 2030: '15', 2031: '12', 2032: '10' } },
    { label: 'IPE+EPE vs Act/Budget (£M)', data: { 2023: '-£5.2m', 2024: '+£8.5m', 2025: '-£2.1m', 2026: '-£1.4m', 2027: '+£0.5m', 2028: '+£1.2m' } },
    { label: 'EPE vs Act/Budget (£M)', data: { 2023: '-£3.1m', 2024: '+£6.2m', 2025: '-£1.5m', 2026: '-£0.8m', 2027: '+£0.2m', 2028: '+£0.8m' } }
  ],
  resourcingData: [
    {
      id: 'cmo', name: 'Chief Medical Office', isCategory: true,
      children: [
        { id: 'sf', name: 'Safety', cyFTE: ['','','',''], cyIPE: '', y1FTE: '', y1IPE: '', y2FTE: '', y2IPE: '', y3FTE: '', y3IPE: '', projAlgoFTE: '', projFnHeadFTE: 'n/a', projIPE: '', priorFTE: '', priorIPE: '', signOff: 'n/a' },
        { id: 'rg', name: 'Regulatory', cyFTE: ['','','',''], cyIPE: '', y1FTE: '', y1IPE: '', y2FTE: '', y2IPE: '', y3FTE: '', y3IPE: '', projAlgoFTE: '', projFnHeadFTE: 'n/a', projIPE: '', priorFTE: '', priorIPE: '', signOff: 'n/a' }
      ]
    },
    {
      id: 'do', name: 'Development Operations', cyFTE: ['','','',''], cyIPE: '', y1FTE: '', y1IPE: '', y2FTE: '', y2IPE: '', y3FTE: '', y3IPE: '', projAlgoFTE: '', projFnHeadFTE: 'n/a', projIPE: '', priorFTE: '', priorIPE: '', signOff: 'n/a'
    },
    {
      id: 'tds', name: 'Transformational & Development Services', isCategory: true,
      children: [
        { id: 'ad', name: 'Asia Development', cyFTE: ['','','',''], cyIPE: '', y1FTE: '', y1IPE: '', y2FTE: '', y2IPE: '', y3FTE: '', y3IPE: '', projAlgoFTE: '', projFnHeadFTE: 'n/a', projIPE: '', priorFTE: '', priorIPE: '', signOff: 'n/a' },
        { id: 'ep1', name: 'Epidemiology', cyFTE: ['','','',''], cyIPE: '', y1FTE: '', y1IPE: '', y2FTE: '', y2IPE: '', y3FTE: '', y3IPE: '', projAlgoFTE: '', projFnHeadFTE: 'n/a', projIPE: '', priorFTE: '', priorIPE: '', signOff: 'n/a' },
        { id: 'ep2', name: 'Epidemiology', cyFTE: ['','','',''], cyIPE: '', y1FTE: '', y1IPE: '', y2FTE: '', y2IPE: '', y3FTE: '', y3IPE: '', projAlgoFTE: '', projFnHeadFTE: 'n/a', projIPE: '', priorFTE: '', priorIPE: '', signOff: 'n/a' }
      ]
    },
    {
      id: 'dds', name: 'Drug Development and Supply', isCategory: true,
      children: [
        { id: 'ds', name: 'Drug Substance', cyFTE: ['','','',''], cyIPE: '', y1FTE: '', y1IPE: '', y2FTE: '', y2IPE: '', y3FTE: '', y3IPE: '', projAlgoFTE: '', projFnHeadFTE: 'n/a', projIPE: '', priorFTE: '', priorIPE: '', signOff: 'n/a' },
        { id: 'dp', name: 'Drug Product', cyFTE: ['','','',''], cyIPE: '', y1FTE: '', y1IPE: '', y2FTE: '', y2IPE: '', y3FTE: '', y3IPE: '', projAlgoFTE: '', projFnHeadFTE: 'n/a', projIPE: '', priorFTE: '', priorIPE: '', signOff: 'n/a' },
        { id: 'cs', name: 'Clinical Supply', cyFTE: ['','','',''], cyIPE: '', y1FTE: '', y1IPE: '', y2FTE: '', y2IPE: '', y3FTE: '', y3IPE: '', projAlgoFTE: '', projFnHeadFTE: 'n/a', projIPE: '', priorFTE: '', priorIPE: '', signOff: 'n/a' }
      ]
    },
    {
      id: 'ta', name: 'Therapy Area', isCategory: true,
      children: [
        { id: 'bs', name: 'Biostatistics', cyFTE: ['','','',''], cyIPE: '', y1FTE: '', y1IPE: '', y2FTE: '', y2IPE: '', y3FTE: '', y3IPE: '', projAlgoFTE: '', projFnHeadFTE: 'n/a', projIPE: '', priorFTE: '', priorIPE: '', signOff: 'n/a' },
        { id: 'csc', name: 'Clinical Science', cyFTE: ['','','',''], cyIPE: '', y1FTE: '', y1IPE: '', y2FTE: '', y2IPE: '', y3FTE: '', y3IPE: '', projAlgoFTE: '', projFnHeadFTE: 'n/a', projIPE: '', priorFTE: '', priorIPE: '', signOff: 'n/a' },
        { id: 'ppm', name: 'Pipeline Project Management', cyFTE: ['','','',''], cyIPE: '', y1FTE: '', y1IPE: '', y2FTE: '', y2IPE: '', y3FTE: '', y3IPE: '', projAlgoFTE: '', projFnHeadFTE: 'n/a', projIPE: '', priorFTE: '', priorIPE: '', signOff: 'n/a' },
        { id: 'rs', name: 'Research', cyFTE: ['','','',''], cyIPE: '', y1FTE: '', y1IPE: '', y2FTE: '', y2IPE: '', y3FTE: '', y3IPE: '', projAlgoFTE: '', projFnHeadFTE: 'n/a', projIPE: '', priorFTE: '', priorIPE: '', signOff: 'n/a' },
        { id: 'xdl', name: 'xDL', cyFTE: ['','','',''], cyIPE: '', y1FTE: '', y1IPE: '', y2FTE: '', y2IPE: '', y3FTE: '', y3IPE: '', projAlgoFTE: '', projFnHeadFTE: 'n/a', projIPE: '', priorFTE: '', priorIPE: '', signOff: 'n/a' },
      ]
    }
  ],
  risks: [
    { id: 'r1', description: 'Supply chain delay for API', impact: 'High', mitigation: 'Second source vendor onboarded' },
    { id: 'r2', description: 'Regulatory submission timeline shift', impact: 'Medium', mitigation: 'Early engagement with FDA planned' }
  ],
  hioCommentary: {
    actuals: 'Strategic investment in early-stage clinical milestones led to marginal overspends in 2024, which have been effectively mitigated by operational cost-savings identified in the North American supply chain.',
    budget: 'The current budget trajectory aligns with the board-approved forecast, with variances primarily driven by phasing shifts in clinical supply and external partner milestones.'
  }
};

type DeckContextType = {
  data: GovernanceData;
  updateData: (updates: Partial<GovernanceData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

const DeckContext = createContext<DeckContextType | undefined>(undefined);

export const DeckProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<GovernanceData>(initialData);
  const [currentStep, setCurrentStep] = useState(1);

  const updateData = (updates: Partial<GovernanceData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <DeckContext.Provider value={{ data, updateData, currentStep, setCurrentStep }}>
      {children}
    </DeckContext.Provider>
  );
};

export const useDeck = () => {
  const context = useContext(DeckContext);
  if (context === undefined) {
    throw new Error('useDeck must be used within a DeckProvider');
  }
  return context;
};
