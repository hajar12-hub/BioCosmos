import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Download, FileText, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { StarfieldBackground } from '../components/StarfieldBackground';
import { HolographicPanel } from '../components/HolographicPanel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';


export function AISummarizer() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('scientific');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [relatedPublications, setRelatedPublications] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      toast.error('Please enter a topic');
      return;
    }

    setLoading(true);
    setSummary('');

    // Simulate AI processing
    setTimeout(() => {
      const mockSummary = generateMockSummary(topic, tone);
      setSummary(mockSummary);
      setRelatedPublications([
        'Space Biology Research: Effects of Microgravity on Human Cells (2023)',
        'Radiation Protection Strategies for Mars Missions (2022)',
        'Plant Growth in Lunar Regolith: A Feasibility Study (2024)',
        'Psychological Adaptation During Long-Duration Spaceflight (2023)',
        'Water Extraction from Martian Ice: Technical Approaches (2022)',
      ]);
      setLoading(false);
      toast.success('Summary generated successfully!');
    }, 2000);
  };

  const generateMockSummary = (topic: string, tone: string) => {
    const summaries = {
      scientific: `
**Research Summary: ${topic}**

**Abstract:**
This comprehensive analysis synthesizes NASA's biological and physical sciences research pertaining to ${topic.toLowerCase()}. 
The review encompasses data from ISS experiments, ground-based analog studies, and computational models spanning the past decade.

**Key Findings:**
1. **Microgravity Effects**: Prolonged exposure to microgravity environments results in significant physiological adaptations, 
   including bone density reduction (1-2% per month), muscle atrophy (20-30%), and cardiovascular deconditioning.

2. **Radiation Exposure**: Galactic Cosmic Rays (GCR) and Solar Particle Events (SPE) pose substantial health risks, 
   with cumulative doses reaching 300-400 mSv during a Mars mission, significantly exceeding LEO exposure levels.

3. **Countermeasures**: Current mitigation strategies include resistance exercise protocols (2 hours daily), 
   pharmacological interventions (bisphosphonates), and habitat shielding utilizing regolith or water.

**Conclusions:**
The data indicate that ${topic.toLowerCase()} requires integrated approaches combining engineering solutions, 
biomedical interventions, and continuous monitoring systems to ensure crew safety and mission success.

**References:** 234 peer-reviewed publications analyzed
      `,
      operational: `
**Operational Briefing: ${topic}**

**Mission Impact:**
For ${topic.toLowerCase()}, mission planners must account for critical factors affecting crew health and mission timeline.

**Action Items:**
✓ Implement daily 2-hour exercise regimen using ARED (Advanced Resistive Exercise Device)
✓ Monitor bone density monthly via quantitative ultrasound
✓ Maintain radiation dosimeter readings below 500 mSv for mission duration
✓ Schedule psychological wellness check-ins weekly

**Resource Requirements:**
- Exercise equipment mass: 250 kg
- Medical supplies: 50 kg per crew member
- Shielding materials: varies by mission duration

**Timeline Considerations:**
- Pre-flight conditioning: 6 months
- In-flight monitoring: continuous
- Post-flight recovery: 12-18 months

**Risk Assessment:** MODERATE
Primary concerns include long-term bone loss and radiation-induced DNA damage.

**Recommendations:**
Deploy advanced shielding, maintain strict exercise protocols, and ensure adequate nutrition with supplements.
      `,
      simplified: `
**Understanding ${topic} in Simple Terms**

**What's the Challenge?**
When humans go to space, especially for long missions to Mars or the Moon, their bodies face some tough challenges. 
Think of it like this: our bodies are designed for Earth's gravity and protection. In space, everything changes!

**The Main Problems:**
🦴 **Weak Bones**: Without gravity pulling on our bones, they start losing calcium - like a sponge drying out. 
   Astronauts can lose 1-2% of bone mass every month!

💪 **Muscle Loss**: Muscles don't need to work as hard in space, so they get weaker. It's like not exercising for months.

☢️ **Space Radiation**: There's dangerous radiation in space that we don't have on Earth. It can damage our cells and DNA.

**How Do We Fix It?**
Scientists have found some clever solutions:
- Exercise 2 hours every day using special equipment
- Take vitamins and medicine to protect bones
- Build thick-walled habitats to block radiation
- Monitor health constantly with advanced sensors

**Why It Matters:**
If we want to explore Mars or live on the Moon, we need to keep astronauts healthy for months or years. 
These solutions help make that possible!

**Cool Fact:** The same research that helps astronauts also helps people on Earth with bone problems, 
muscle diseases, and aging issues!
      `,
    };

    return summaries[tone as keyof typeof summaries] || summaries.scientific;
  };

  const handleDownloadPDF = () => {
    toast.success('PDF report generation started! (Mock feature)');
  };

  const handleGenerateInfographic = () => {
    toast.success('Infographic generation started! (Mock feature)');
  };

  return (
    <div className="relative min-h-screen pt-32 pb-16">
      <StarfieldBackground />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="gap-2 border-primary/30"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="text-right flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-cyan-400" />
            <div>
              <h1 className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">
                AI Summarizer
              </h1>
              <p className="text-sm text-muted-foreground">Powered by Advanced NLP & NASA Data</p>
            </div>
          </div>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <HolographicPanel title="📝 Research Query" glowColor="#06b6d4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-white mb-2 block">
                  Enter Topic or Research Question
                </label>
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Effects of microgravity on human bone density"
                  className="bg-background/20 border-border/30 text-white placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="text-sm text-white mb-2 block">
                  Summary Tone
                </label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="bg-background/20 border-border/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scientific">Scientific (Technical & Detailed)</SelectItem>
                    <SelectItem value="operational">Operational (Mission Planning)</SelectItem>
                    <SelectItem value="simplified">Simplified (General Audience)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Summary
                    </>
                  )}
                </Button>
              </div>
            </form>
          </HolographicPanel>
        </motion.div>

        {/* Summary Output */}
        {summary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <HolographicPanel title="🤖 AI-Generated Summary" glowColor="#8b5cf6">
              <div className="prose prose-invert max-w-none">
                <Textarea
                  value={summary}
                  readOnly
                  className="min-h-[400px] bg-background/20 border-border/30 text-white font-mono text-sm"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handleDownloadPDF}
                  variant="outline"
                  className="gap-2 border-primary/30"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
                <Button
                  onClick={handleGenerateInfographic}
                  variant="outline"
                  className="gap-2 border-primary/30"
                >
                  <FileText className="h-4 w-4" />
                  Generate Infographic
                </Button>
              </div>
            </HolographicPanel>

            {/* Related Publications */}
            <HolographicPanel title="📚 Related Publications" glowColor="#10b981">
              <div className="space-y-3">
                {relatedPublications.map((pub, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 bg-background/20 border-border/30 hover:border-primary/50 transition-all cursor-pointer">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-white text-sm">{pub}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Click to view full publication (Mock)
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </HolographicPanel>
          </motion.div>
        )}

        {/* Features Info */}
        {!summary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <HolographicPanel title="✨ Features" glowColor="#f59e0b">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-background/20 rounded-lg border border-border/30">
                  <Sparkles className="h-8 w-8 text-cyan-400 mb-3" />
                  <h4 className="text-white mb-2">Smart Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    AI processes thousands of NASA publications to extract key insights
                  </p>
                </div>
                <div className="p-4 bg-background/20 rounded-lg border border-border/30">
                  <FileText className="h-8 w-8 text-purple-400 mb-3" />
                  <h4 className="text-white mb-2">Multiple Formats</h4>
                  <p className="text-sm text-muted-foreground">
                    Export as PDF, generate infographics, or copy markdown text
                  </p>
                </div>
                <div className="p-4 bg-background/20 rounded-lg border border-border/30">
                  <Send className="h-8 w-8 text-green-400 mb-3" />
                  <h4 className="text-white mb-2">Customizable Tone</h4>
                  <p className="text-sm text-muted-foreground">
                    Choose scientific, operational, or simplified language style
                  </p>
                </div>
              </div>
            </HolographicPanel>
          </motion.div>
        )}
      </div>
    </div>
  );
}
