import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Moon as MoonIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { StarfieldBackground } from '../components/StarfieldBackground';
import { HolographicPanel } from '../components/HolographicPanel';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';

export function MoonDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const lunarDayData = [
    { hour: 0, temp: -173, light: 0 },
    { hour: 84, temp: -153, light: 20 },
    { hour: 168, temp: -100, light: 100 },
    { hour: 252, temp: 127, light: 100 },
    { hour: 336, temp: 107, light: 80 },
    { hour: 420, temp: -83, light: 20 },
    { hour: 504, temp: -153, light: 0 },
    { hour: 588, temp: -173, light: 0 },
  ];

  const radiationData = [
    { location: 'South Pole', spe: 5, gcr: 38, total: 43 },
    { location: 'Equator', spe: 12, gcr: 42, total: 54 },
    { location: 'Far Side', spe: 8, gcr: 40, total: 48 },
    { location: 'Mare', spe: 10, gcr: 41, total: 51 },
    { location: 'Crater', spe: 3, gcr: 35, total: 38 },
  ];

  const regolithData = [
    { element: 'Oxygen', percentage: 43 },
    { element: 'Silicon', percentage: 21 },
    { element: 'Aluminum', percentage: 10 },
    { element: 'Calcium', percentage: 9 },
    { element: 'Iron', percentage: 9 },
    { element: 'Magnesium', percentage: 5 },
    { element: 'Titanium', percentage: 3 },
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-16">
      <StarfieldBackground />

      <div className="container mx-auto px-4 relative z-10">
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
            <MoonIcon className="h-8 w-8 text-gray-400" />
            <div>
              <h1 className="bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent mb-1">
                Lunar Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">Moon exploration & research data</p>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lunar Day-Night Cycle */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <HolographicPanel title="🌗 Lunar Day-Night Cycle (14 Earth Days Each)" glowColor="#c0c0c0">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={lunarDayData}>
                    <defs>
                      <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#c0c0c0" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#c0c0c0" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="hour" stroke="#fff" label={{ value: 'Hours', position: 'insideBottom', offset: -5, fill: '#fff' }} />
                    <YAxis stroke="#fff" label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', fill: '#fff' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(26, 11, 46, 0.9)',
                        border: '1px solid rgba(192, 192, 192, 0.3)',
                        borderRadius: '8px',
                      }}
                    />
                    <Area type="monotone" dataKey="temp" stroke="#c0c0c0" fill="url(#tempGradient)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
                <p className="text-xs text-muted-foreground mt-2">
                  Temperature swings from -173°C to +127°C during a full lunar day (29.5 Earth days)
                </p>
              </HolographicPanel>
            </motion.div>

            {/* Radiation by Location */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <HolographicPanel title="☢️ Radiation Levels by Location" glowColor="#3b82f6">
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="location" stroke="#fff" />
                    <YAxis dataKey="total" stroke="#fff" label={{ value: 'mSv/year', angle: -90, position: 'insideLeft', fill: '#fff' }} />
                    <ZAxis range={[100, 400]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(26, 11, 46, 0.9)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '8px',
                      }}
                      cursor={{ strokeDasharray: '3 3' }}
                    />
                    <Scatter name="Radiation" data={radiationData} fill="#3b82f6" />
                  </ScatterChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-xs text-blue-300">SPE (Solar Particle Events)</p>
                    <p className="text-lg text-white">~8 mSv/year</p>
                  </div>
                  <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <p className="text-xs text-purple-300">GCR (Galactic Cosmic Rays)</p>
                    <p className="text-lg text-white">~40 mSv/year</p>
                  </div>
                </div>
              </HolographicPanel>
            </motion.div>

            {/* Regolith Composition */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <HolographicPanel title="🪨 Regolith Composition" glowColor="#10b981">
                <div className="space-y-3">
                  {regolithData.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-white text-sm">{item.element}</span>
                        <span className="text-emerald-400 text-sm">{item.percentage}%</span>
                      </div>
                      <div className="h-2 bg-background/30 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-background/20 rounded-lg border border-border/30">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-white">ISRU Potential:</strong> Lunar regolith contains 43% oxygen, 
                    making it ideal for In-Situ Resource Utilization (ISRU) for oxygen production and construction materials.
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
              <HolographicPanel title="🤖 AI Mission Recommendations" glowColor="#8b5cf6">
                <div className="space-y-4">
                  <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <h4 className="text-sm text-purple-300 mb-2">🏗️ Optimal Base Location</h4>
                    <p className="text-white mb-2">South Pole Crater Rim</p>
                    <p className="text-xs text-muted-foreground">
                      AI Analysis: Lowest radiation (38 mSv/year), near-permanent sunlight for solar power, 
                      and proximity to water ice deposits.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <h4 className="text-sm text-blue-300 mb-2">⚡ Energy Strategy</h4>
                    <p className="text-white mb-2">Solar + Nuclear Hybrid</p>
                    <p className="text-xs text-muted-foreground">
                      Solar arrays at peaks of eternal light + backup fission reactor for 14-day lunar night.
                    </p>
                  </div>

                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <h4 className="text-sm text-green-300 mb-2">💧 Water Extraction</h4>
                    <p className="text-white mb-2">Permanently Shadowed Regions (PSRs)</p>
                    <p className="text-xs text-muted-foreground">
                      Ice deposits detected in PSRs. Estimated 600 million metric tons of water available.
                    </p>
                  </div>

                  <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <h4 className="text-sm text-orange-300 mb-2">🛡️ Radiation Shielding</h4>
                    <p className="text-white mb-2">Regolith-based Construction</p>
                    <p className="text-xs text-muted-foreground">
                      Use 3D-printed regolith habitats with 2-meter thick walls to reduce radiation by 90%.
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
