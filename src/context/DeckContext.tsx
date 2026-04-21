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
    context: 'Recent Phase II readout demonstrated strong efficacy (p < 0.01) but highlighted a need for expanded safety monitoring. Initial engagements with regulatory bodies suggest supportive sentiment for protocol amendment, although this extends timelines by 6 months. Competitor X recently announced trial delays, giving us a brief window to capture market share.', 
    teamProposal: 'Execute the expanded Phase II protocol to capture a broader label indication. Accept the timeline shift to Q3 2027 to ensure higher peak year sales potential and robust safety profile.', 
    keyQuestions: '• Does the board endorse the trade-off of a 6-month delay for an expanded primary label?\n• Does the board approve the additional £1.2M resourcing required for safety monitoring in 2027?' 
  },
  reasonsToBelieve: {
    unmetNeed: '• High unmet need in 3rd line setting\n• Currently approved therapies show <30% ORR\n• Significant patient burden with existing SoC',
    moa: '• First-in-class dual-mechanism inhibitor\n• Highly selective for target receptor vs wild type\n• Prolonged half-life allows once-weekly dosing',
    preclinical: '• Robust tumor regression in 3 distinct xenograft models\n• Synergistic effect when combined with current SoC\n• No observed off-target toxicity in GLP tox studies',
    clinical: '• Proof of concept established in early Phase I/IIa\n• Early signals of durability of response (>6 months)\n• Favorable safety profile to date, no dose-limiting toxicities',
    reasonsNotToBelieve: '• Unknown long-term safety profile\n• Competitive landscape rapidly evolving with 2 other agents in Phase II\n• Formulation scale-up risks remain'
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
      { id: 'ind1', indication: 'NSCLC 1st Line', lineOfTherapy: '1L', targetPopulation: 'PD-L1 High', peakShare: '25%' },
      { id: 'ind2', indication: 'Head & Neck', lineOfTherapy: '2L', targetPopulation: 'All comers', peakShare: '15%' }
    ],
    metrics: {
      'PTRS': '30%',
      'eNPV': '£1.5B',
      'eROI': '2.4',
      'Peak Sales': '£1.8B'
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
  swimlanes: ['Preclinical', 'Phase 1', 'Phase 2', 'Phase 3', 'Reg/Submission', 'Launch'],
  milestones: [
    { id: 'm1', name: 'C2D', year: 2023, swimlane: 'Preclinical', position: 20, isSelected: true },
    { id: 'm2', name: 'C2C', year: 2024, swimlane: 'Preclinical', position: 50, isSelected: true },
    { id: 'm3', name: 'C2P1', year: 2025, swimlane: 'Preclinical', position: 10, isSelected: true },
    { id: 'm4', name: 'FTIH', year: 2024, swimlane: 'Phase 1', position: 80, isSelected: true },
    { id: 'm5', name: 'Readout', year: 2025, swimlane: 'Phase 1', position: 90, isSelected: true },
    { id: 'm6', name: 'C2P2', year: 2026, swimlane: 'Phase 1', position: 10, isSelected: true },
    { id: 'm7', name: 'IA', year: 2026, swimlane: 'Phase 2', position: 40, isSelected: true },
    { id: 'm8', name: 'Readout', year: 2027, swimlane: 'Phase 2', position: 20, isSelected: true },
    { id: 'm9', name: 'C2P3', year: 2027, swimlane: 'Phase 2', position: 80, isSelected: true },
  ],
  financials: [
    { label: 'EPE*', data: { 2023: '£5.6m', 2024: '£5.6m', 2025: '£5.6m', 2026: '£205.6m', 2027: '£5.6m', 2028: '£5.6m', 2029: '£205.6m', 2030: '£5.6m', 2031: '£5.6m', 2032: '£5.6m' }, summaryEPE: '£600m' },
    { label: 'IPE', data: { 2023: '£5.6m', 2024: '£5.6m', 2025: '£5.6m', 2026: '£5.6m', 2027: '£5.6m', 2028: '£5.6m', 2029: '£5.6m', 2030: '£5.6m', 2031: '£5.6m', 2032: '£5.6m' }, summaryIPE: '£200m' },
    { label: 'FTE', data: { 2023: '10', 2024: '10', 2025: '10', 2026: '10', 2027: '10', 2028: '10', 2029: '10', 2030: '10', 2031: '10', 2032: '10' } },
    { label: 'IPE+EPE vs Act/Budget', data: { 2023: '-£1.2m', 2024: '+£2m', 2025: '-£1.2m', 2026: '-£1.2m', 2027: '+£2m', 2028: '+£2m' } },
    { label: 'EPE vs Act/Budget', data: { 2023: '-£1.2m', 2024: '-£1.2m', 2025: '-£1.2m', 2026: '-£1.2m', 2027: '-£1.2m', 2028: '-£1.2m' } }
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
    actuals: 'Describe main drivers for over-/under spend on past stage',
    budget: 'Describe variance vs budget'
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
