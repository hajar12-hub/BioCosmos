import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { StarfieldBackground } from '../components/StarfieldBackground';
import { MarsLandscape } from '../components/MarsLandscape';
import { HolographicPanel } from '../components/HolographicPanel';
import { Button } from '../components/ui/button';
import { api, SummaryData } from '../services/api';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b'];

const categoryColors: Record<string, string> = {
  O2: '#06b6d4',
  H2O: '#3b82f6',
  DNA: '#8b5cf6',
  Energy: '#f59e0b',
  Agriculture: '#10b981',
  Protection: '#ef4444',
};

export function Summary() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [data, setData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isZooming, setIsZooming] = useState(false);

  const handleCategoryClick = async (categoryId: string) => {
    // Zoom in animation
    setIsZooming(true);
    
    setTimeout(async () => {
      setLoading(true);
      setSelectedCategory(categoryId);
      
      try {
        const result = await api.getSummaryData(categoryId);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
        setIsZooming(false);
      }
    }, 800);
  };

  return (
    <div className="relative min-h-screen pt-24 pb-16">
      <StarfieldBackground />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 dark:from-white dark:via-purple-300 dark:to-blue-300 bg-clip-text text-transparent">
            Bio-Spatial Explorer
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            🌌 Journey through Mars to explore bioscience research. Click floating molecular buttons orbiting the planet to discover data.
          </p>
        </motion.div>

        {/* Mars 3D Landscape with orbiting molecules */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12"
        >
          <MarsLandscape 
            onMoleculeClick={handleCategoryClick}
            selectedCategory={selectedCategory}
          />
        </motion.div>

        {/* Zoom in animation overlay */}
        <AnimatePresence>
          {isZooming && (
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 20 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${categoryColors[selectedCategory || 'O2']}80 0%, transparent 70%)`,
              }}
            >
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.5, 1] }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="text-6xl"
              >
                🧬
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Holographic data panels */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="inline-block h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-muted-foreground">Fetching data from bio-spatial database...</p>
            </motion.div>
          )}

          {!loading && data && selectedCategory && (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              {/* Close button */}
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    setSelectedCategory(null);
                    setData(null);
                  }}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Close
                </Button>
              </div>

              {/* Data summary in holographic panel */}
              <HolographicPanel 
                title={`${data.category} - Key Metrics`}
                glowColor={categoryColors[selectedCategory]}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(data.data).map(([key, value]) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-background/20 rounded-lg p-4 border border-border/30"
                    >
                      <p className="text-sm text-muted-foreground capitalize mb-1">{key}</p>
                      <p className="text-white" style={{ textShadow: `0 0 10px ${categoryColors[selectedCategory]}` }}>
                        {value as string}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </HolographicPanel>

              {/* Visualizations in holographic panel */}
              {data.visualizations && data.visualizations.length > 0 && (
                <HolographicPanel 
                  title="Dynamic Visualizations"
                  glowColor={categoryColors[selectedCategory]}
                >
                  <ResponsiveContainer width="100%" height={400}>
                    {selectedCategory === 'O2' ? (
                      <LineChart data={data.visualizations}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="month" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(26, 11, 46, 0.9)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            borderRadius: '8px',
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="production"
                          stroke={categoryColors[selectedCategory]}
                          strokeWidth={3}
                          dot={{ fill: categoryColors[selectedCategory], r: 6 }}
                        />
                      </LineChart>
                    ) : selectedCategory === 'H2O' ? (
                      <BarChart data={data.visualizations}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="source" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(26, 11, 46, 0.9)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            borderRadius: '8px',
                          }}
                        />
                        <Bar dataKey="amount" radius={[8, 8, 0, 0]} fill={categoryColors[selectedCategory]}>
                          {data.visualizations.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    ) : (
                      <PieChart>
                        <Pie
                          data={data.visualizations}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {data.visualizations.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(26, 11, 46, 0.9)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            borderRadius: '8px',
                          }}
                        />
                      </PieChart>
                    )}
                  </ResponsiveContainer>
                </HolographicPanel>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
