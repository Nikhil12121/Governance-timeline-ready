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

export type CdpMilestone = {
  name: string;
  yearOffset: number; // 0 = Year, 1 = Year+1, ..., 5 = Year+5
  quarter: 1 | 2 | 3 | 4;
};

export type CdpValuationMetric = {
  value: string;
  color: 'green' | 'yellow' | 'red' | 'none';
};

export type CdpOption = {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  isRecommended: boolean;
  boxComment: string;
  milestones: CdpMilestone[];
  valuation: {
    ptrs: CdpValuationMetric;
    lopCosts: CdpValuationMetric;
    launchDate: CdpValuationMetric;
    peakSales: CdpValuationMetric;
    eroi: CdpValuationMetric;
  };
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
  cdpOptions: CdpOption[];
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
      { id: 'vc1', metric: "(e)NPV (£'M)", currentEstimate: 'n/a', lastGoverned: '', comment: '' },
      { id: 'vc2', metric: "(e)ROI", currentEstimate: 'n/a', lastGoverned: '', comment: '' },
      { id: 'vc3', metric: "PTRS (%)", currentEstimate: 'green-up', lastGoverned: '', comment: '' },
      { id: 'vc4', metric: "Total Dev Cost (£'M)", currentEstimate: 'red-up', lastGoverned: '', comment: '' },
      { id: 'vc5', metric: "Launch Year", currentEstimate: 'similar', lastGoverned: '', comment: '' },
      { id: 'vc6', metric: "2031 Sales (£'M)", currentEstimate: 'n/a', lastGoverned: '', comment: '' },
      { id: 'vc7', metric: "PYS (£'M)", currentEstimate: 'n/a', lastGoverned: '', comment: '' },
      { id: 'vc8', metric: "Year of Peak Sales", currentEstimate: 'n/a', lastGoverned: '', comment: '' },
      { id: 'vc9', metric: "Payback Period", currentEstimate: 'n/a', lastGoverned: '', comment: '' }
    ],
    comments: ""
  },
  cdpOptions: [
    {
      id: 'opt1',
      title: 'Option 1',
      subtitle: '(Time-Sensitive)',
      tagline: "Team's recommended",
      isRecommended: true,
      boxComment: '1:2 Randomization without control arm\nborrowing\nn= 270 patients;\nWithout enrollment hold',
      milestones: [
        { name: 'FSFV', yearOffset: 1, quarter: 1 },
        { name: 'LSFV', yearOffset: 2, quarter: 2 },
        { name: 'IA', yearOffset: 2, quarter: 4 },
        { name: 'Read-out', yearOffset: 3, quarter: 3 },
        { name: 'Filing', yearOffset: 3, quarter: 4 },
      ],
      valuation: {
        ptrs: { value: '50%', color: 'green' },
        lopCosts: { value: '£175M', color: 'yellow' },
        launchDate: { value: 'Jun 2027', color: 'green' },
        peakSales: { value: '', color: 'green' },
        eroi: { value: '', color: 'none' }
      }
    },
    {
      id: 'opt2',
      title: 'Option 2',
      subtitle: '(Stage-Gated)',
      tagline: '',
      isRecommended: false,
      boxComment: '1:2 Randomization without control arm borrowing\nn= 270 patients;\nWith enrollment hold for 6 months after 120 pts enrolled',
      milestones: [
        { name: 'FSFV', yearOffset: 1, quarter: 1 },
        { name: 'IA1', yearOffset: 1, quarter: 4 },
        { name: 'LSFV', yearOffset: 2, quarter: 3 },
        { name: 'IA2', yearOffset: 3, quarter: 1 },
        { name: 'Read-out', yearOffset: 3, quarter: 4 },
        { name: 'Filing', yearOffset: 4, quarter: 1 },
      ],
      valuation: {
        ptrs: { value: '45%', color: 'yellow' },
        lopCosts: { value: '£175M', color: 'yellow' },
        launchDate: { value: 'Dec 2027', color: 'red' },
        peakSales: { value: '', color: 'red' },
        eroi: { value: '', color: 'none' }
      }
    },
    {
      id: 'opt3',
      title: 'Option 3',
      subtitle: '(Cost-Sensitive)',
      tagline: '',
      isRecommended: false,
      boxComment: '1:4 Randomization with control arm\nborrowing\nn= 150 patients',
      milestones: [
        { name: 'FSFV', yearOffset: 1, quarter: 1 },
        { name: 'LSFV', yearOffset: 1, quarter: 3 },
        { name: 'Read-out', yearOffset: 3, quarter: 2 },
        { name: 'Filing', yearOffset: 3, quarter: 3 },
      ],
      valuation: {
        ptrs: { value: '40%', color: 'red' },
        lopCosts: { value: '£90M', color: 'green' },
        launchDate: { value: 'Jun 2027', color: 'green' },
        peakSales: { value: '', color: 'red' },
        eroi: { value: '', color: 'none' }
      }
    }
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
  ]
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
