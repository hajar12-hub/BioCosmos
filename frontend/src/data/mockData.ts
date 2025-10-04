export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  category: string;
  summary: string;
  aiSummary: string;
  citations: number;
  relevance: 'high' | 'medium' | 'low';
  tags: string[];
  doi: string;
}

export const publications: Publication[] = [
  {
    id: '1',
    title: 'Microgravity Effects on Human Cellular Metabolism in Long-Duration Spaceflight',
    authors: ['Dr. Sarah Chen', 'Dr. Michael Rodriguez', 'Dr. Aisha Patel'],
    year: 2024,
    category: 'Human Biology',
    summary: 'This study examines the metabolic changes in human cells during prolonged exposure to microgravity, with implications for Mars missions.',
    aiSummary: 'AI Analysis: Critical findings show 23% increase in cellular oxidative stress during 6+ month missions. Recommends enhanced antioxidant protocols for Mars crews.',
    citations: 147,
    relevance: 'high',
    tags: ['microgravity', 'metabolism', 'Mars', 'human health'],
    doi: '10.1038/s41586-024-00001-1'
  },
  {
    id: '2',
    title: 'Plant Growth Optimization in Lunar Regolith Simulant Under Controlled Environments',
    authors: ['Dr. Elena Volkov', 'Dr. James Kim'],
    year: 2024,
    category: 'Plant Science',
    summary: 'Investigation of crop yields using lunar soil simulants with various nutrient supplementation strategies.',
    aiSummary: 'AI Analysis: Tomatoes and lettuce show 87% normal growth with modified hydroponic nutrients. Key for lunar base sustainability.',
    citations: 203,
    relevance: 'high',
    tags: ['lunar', 'agriculture', 'sustainability', 'Moon'],
    doi: '10.1126/science.2024.00042'
  },
  {
    id: '3',
    title: 'Radiation Protection via Extremophile Bacterial Biofilms for Mars Habitats',
    authors: ['Dr. Robert Zhang', 'Dr. Maria Santos', 'Dr. Ahmed Al-Rashid'],
    year: 2023,
    category: 'Microbiology',
    summary: 'Novel approach using genetically enhanced bacterial colonies to create radiation-shielding biofilms.',
    aiSummary: 'AI Analysis: Biofilms reduce cosmic radiation exposure by 34%. Scalable solution for Mars surface habitats with minimal resource requirements.',
    citations: 89,
    relevance: 'high',
    tags: ['radiation', 'Mars', 'bacteria', 'shielding'],
    doi: '10.1016/j.space.2023.08.015'
  },
  {
    id: '4',
    title: 'Bone Density Loss Mitigation Through Gene Therapy in Simulated Martian Gravity',
    authors: ['Dr. Lisa Anderson', 'Dr. Yuki Tanaka'],
    year: 2023,
    category: 'Human Biology',
    summary: 'Experimental gene therapy protocols to prevent skeletal degradation in reduced gravity environments.',
    aiSummary: 'AI Analysis: CRISPR-based intervention shows 67% reduction in bone density loss. Phase 2 trials recommended for ISS validation.',
    citations: 156,
    relevance: 'high',
    tags: ['bone density', 'gene therapy', 'Mars gravity', 'CRISPR'],
    doi: '10.1038/s41591-023-00234-5'
  },
  {
    id: '5',
    title: 'Cyanobacteria-Based Oxygen Production Systems for Lunar Base Infrastructure',
    authors: ['Dr. Hans Mueller', 'Dr. Priya Sharma'],
    year: 2024,
    category: 'Astrobiology',
    summary: 'Engineered photosynthetic bacteria optimized for lunar day/night cycles and low-pressure environments.',
    aiSummary: 'AI Analysis: System produces 2.3kg O₂ per day per m². Can support 4 astronauts with 10m² cultivation area. Energy efficient alternative to chemical systems.',
    citations: 178,
    relevance: 'high',
    tags: ['oxygen production', 'cyanobacteria', 'Moon', 'life support'],
    doi: '10.1038/s41586-024-00089-3'
  },
  {
    id: '6',
    title: 'Psychological Resilience Biomarkers in Isolated Confined Environments',
    authors: ['Dr. Emma Wilson', 'Dr. Carlos Mendez'],
    year: 2023,
    category: 'Psychology',
    summary: 'Identification of genetic and biochemical markers that predict crew mental health outcomes.',
    aiSummary: 'AI Analysis: Cortisol and serotonin patterns predict 81% of behavioral issues. Early intervention protocols can prevent mission-critical incidents.',
    citations: 92,
    relevance: 'medium',
    tags: ['psychology', 'crew health', 'biomarkers', 'isolation'],
    doi: '10.1037/space.2023.0012'
  },
  {
    id: '7',
    title: 'Mycelium-Based Composite Materials for Mars Habitat Construction',
    authors: ['Dr. Nina Petrova', 'Dr. David Lee'],
    year: 2024,
    category: 'Materials Science',
    summary: 'Self-growing structural materials using fungal mycelium and Martian regolith.',
    aiSummary: 'AI Analysis: Mycelium composites achieve 89% strength of traditional materials while being grown in-situ. Reduces launch mass by 40%.',
    citations: 134,
    relevance: 'medium',
    tags: ['materials', 'construction', 'Mars', 'mycelium'],
    doi: '10.1016/j.actaastro.2024.01.023'
  },
  {
    id: '8',
    title: 'Water Recovery from Lunar Ice Using Bioengineered Microorganisms',
    authors: ['Dr. Thomas Brown', 'Dr. Mei Lin'],
    year: 2023,
    category: 'Microbiology',
    summary: 'Thermophilic bacteria designed to extract and purify water from lunar polar ice deposits.',
    aiSummary: 'AI Analysis: Bio-extraction method 3x more energy efficient than thermal methods. Purification integrated into bacterial metabolism.',
    citations: 67,
    relevance: 'medium',
    tags: ['water recovery', 'Moon', 'bacteria', 'resources'],
    doi: '10.1089/ast.2023.0045'
  }
];

export interface ChartDataPoint {
  name: string;
  value: number;
  category?: string;
}

export const publicationsByYear: ChartDataPoint[] = [
  { name: '2019', value: 12 },
  { name: '2020', value: 18 },
  { name: '2021', value: 24 },
  { name: '2022', value: 31 },
  { name: '2023', value: 45 },
  { name: '2024', value: 68 },
];

export const publicationsByCategory: ChartDataPoint[] = [
  { name: 'Human Biology', value: 28 },
  { name: 'Plant Science', value: 22 },
  { name: 'Microbiology', value: 35 },
  { name: 'Astrobiology', value: 19 },
  { name: 'Psychology', value: 15 },
  { name: 'Materials Science', value: 18 },
  { name: 'Physics', value: 12 },
  { name: 'Other', value: 9 },
];

export const researchImpact: ChartDataPoint[] = [
  { name: 'Jan', value: 245 },
  { name: 'Feb', value: 312 },
  { name: 'Mar', value: 289 },
  { name: 'Apr', value: 356 },
  { name: 'May', value: 423 },
  { name: 'Jun', value: 498 },
  { name: 'Jul', value: 567 },
  { name: 'Aug', value: 634 },
  { name: 'Sep', value: 712 },
  { name: 'Oct', value: 789 },
];

export const missionReadiness: ChartDataPoint[] = [
  { name: 'Life Support', value: 87, category: 'Critical' },
  { name: 'Food Production', value: 72, category: 'High' },
  { name: 'Radiation Protection', value: 64, category: 'Critical' },
  { name: 'Habitat Construction', value: 58, category: 'Medium' },
  { name: 'Crew Health', value: 79, category: 'Critical' },
  { name: 'Resource Extraction', value: 53, category: 'Medium' },
];
