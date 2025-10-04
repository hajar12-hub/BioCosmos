import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Shield, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { StarfieldBackground } from '../components/StarfieldBackground';
import { HolographicPanel } from '../components/HolographicPanel';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

export function MarsDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Mock data - would come from Flask backend
  const surfaceData = [
    { sol: 1, temp: -63, pressure: 610, windSpeed: 12 },
    { sol: 2, temp: -55, pressure: 615, windSpeed: 15 },
    { sol: 3, temp: -58, pressure: 608, windSpeed: 18 },
    { sol: 4, temp: -61, pressure: 612, windSpeed: 14 },
    { sol: 5, temp: -59, pressure: 618, windSpeed: 16 },
    { sol: 6, temp: -62, pressure: 605, windSpeed: 13 },
    { sol: 7, temp: -57, pressure: 620, windSpeed: 17 },
  ];

  const radiationData = [
    { type: 'GCR', level: 45, safe: 30 },
    { type: 'SPE', level: 25, safe: 20 },
    { type: 'UV', level: 85, safe: 40 },
    { type: 'Background', level: 15, safe: 10 },
  ];

  const atmosphereData = [
    { component: 'CO₂', percentage: 95.32 },
    { component: 'N₂', percentage: 2.7 },
    { component: 'Ar', percentage: 1.6 },
    { component: 'O₂', percentage: 0.13 },
    { component: 'CO', percentage: 0.08 },
  ];

  const aiPredictions = [
    { title: 'Dust Storm Risk', value: '23%', trend: 'decreasing', color: '#10b981' },
    { title: 'Radiation Alert', value: 'Moderate', trend: 'stable', color: '#f59e0b' },
    { title: 'Habitability Score', value: '6.8/10', trend: 'increasing', color: '#06b6d4' },
    { title: 'Mission Safety', value: '89%', trend: 'increasing', color: '#8b5cf6' },
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-16">
      <StarfieldBackground />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
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
          
          <div className="text-right">
            <h1 className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-1">
              Mars Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">Real-time planetary data & AI insights</p>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Surface Conditions Plot */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <HolographicPanel title="🌡️ Surface Conditions" glowColor="#cd5c5c">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={surfaceData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="sol" stroke="#fff" label={{ value: 'Sol (Mars Day)', position: 'insideBottom', offset: -5, fill: '#fff' }} />
                    <YAxis stroke="#fff" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(26, 11, 46, 0.9)',
                        border: '1px solid rgba(205, 92, 92, 0.3)',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="temp" stroke="#ff6b35" strokeWidth={2} name="Temperature (°C)" />
                    <Line type="monotone" dataKey="windSpeed" stroke="#06b6d4" strokeWidth={2} name="Wind Speed (m/s)" />
                  </LineChart>
                </ResponsiveContainer>
              </HolographicPanel>
            </motion.div>

            {/* Radiation Effects */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <HolographicPanel title="☢️ Radiation Exposure" glowColor="#f59e0b">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={radiationData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="type" stroke="#fff" />
                    <YAxis stroke="#fff" label={{ value: 'mSv/day', angle: -90, position: 'insideLeft', fill: '#fff' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(26, 11, 46, 0.9)',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="level" fill="#f59e0b" name="Current Level" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="safe" fill="#10b981" name="Safe Threshold" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </HolographicPanel>
            </motion.div>

            {/* Atmospheric Composition */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <HolographicPanel title="🌫️ Atmospheric Composition" glowColor="#3b82f6">
                <div className="space-y-4">
                  {atmosphereData.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-white text-sm">{item.component}</span>
                        <span className="text-cyan-400 text-sm">{item.percentage}%</span>
                      </div>
                      <div className="h-2 bg-background/30 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-background/20 rounded-lg border border-border/30">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-white">Note:</strong> Mars atmosphere is 95% CO₂, 
                    requiring advanced life support systems for human habitation.
                  </p>
                </div>
              </HolographicPanel>
            </motion.div>

            {/* AI Prevention Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <HolographicPanel title="🤖 AI Prevention Dashboard" glowColor="#8b5cf6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {aiPredictions.map((prediction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="bg-background/20 rounded-xl p-4 border border-border/30"
                      style={{ boxShadow: `0 0 20px ${prediction.color}20` }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm text-muted-foreground">{prediction.title}</h4>
                        {prediction.trend === 'increasing' ? (
                          <TrendingUp className="h-4 w-4 text-green-400" />
                        ) : prediction.trend === 'decreasing' ? (
                          <Activity className="h-4 w-4 text-blue-400" />
                        ) : (
                          <Shield className="h-4 w-4 text-yellow-400" />
                        )}
                      </div>
                      <p className="text-2xl text-white" style={{ color: prediction.color }}>
                        {prediction.value}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-sm text-blue-300">
                      <strong>🔮 AI Insight:</strong> Optimal mission window detected in 14 sols. 
                      Reduced dust activity expected.
                    </p>
                  </div>
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-sm text-green-300">
                      <strong>✅ Recommendation:</strong> Deploy solar panels during morning hours 
                      when dust settling is minimal.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <p className="text-sm text-purple-300">
                      <strong>⚡ Safety Alert:</strong> Radiation shielding recommended for EVA 
                      activities. GCR levels above baseline.
                    </p>
                  </div>
                </div>
              </HolographicPanel>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
