import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Radio } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { StarfieldBackground } from '../components/StarfieldBackground';
import { HolographicPanel } from '../components/HolographicPanel';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export function ISSDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [liveData, setLiveData] = useState({
    altitude: 408,
    velocity: 7.66,
    crew: 7,
    experiments: 234,
  });

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    
    // Simulate live updates
    const interval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        altitude: 408 + (Math.random() - 0.5) * 2,
        velocity: 7.66 + (Math.random() - 0.5) * 0.02,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const environmentData = [
    { time: '00:00', temp: 21.5, humidity: 45, co2: 0.3, pressure: 101.3 },
    { time: '04:00', temp: 21.8, humidity: 47, co2: 0.35, pressure: 101.2 },
    { time: '08:00', temp: 22.1, humidity: 48, co2: 0.4, pressure: 101.4 },
    { time: '12:00', temp: 22.3, humidity: 46, co2: 0.38, pressure: 101.3 },
    { time: '16:00', temp: 22.0, humidity: 45, co2: 0.33, pressure: 101.2 },
    { time: '20:00', temp: 21.7, humidity: 46, co2: 0.31, pressure: 101.3 },
  ];

  const radiationData = [
    { module: 'Destiny', dose: 0.5 },
    { module: 'Harmony', dose: 0.48 },
    { module: 'Columbus', dose: 0.52 },
    { module: 'Kibo', dose: 0.47 },
    { module: 'Zvezda', dose: 0.55 },
    { module: 'Zarya', dose: 0.51 },
  ];

  const experimentCategories = [
    { name: 'Biology', value: 78, color: '#10b981' },
    { name: 'Physics', value: 52, color: '#3b82f6' },
    { name: 'Materials', value: 34, color: '#f59e0b' },
    { name: 'Earth Obs.', value: 28, color: '#06b6d4' },
    { name: 'Technology', value: 42, color: '#8b5cf6' },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#06b6d4', '#8b5cf6'];

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
            <Radio className="h-8 w-8 text-blue-400" />
            <div>
              <h1 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                ISS Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">International Space Station • Live Data</p>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
            >
              {[
                { label: 'Altitude', value: `${liveData.altitude.toFixed(1)} km`, color: '#3b82f6' },
                { label: 'Velocity', value: `${liveData.velocity.toFixed(2)} km/s`, color: '#06b6d4' },
                { label: 'Crew Members', value: liveData.crew, color: '#8b5cf6' },
                { label: 'Active Experiments', value: liveData.experiments, color: '#10b981' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="glass rounded-xl p-4 border border-border/30"
                  style={{ boxShadow: `0 0 20px ${stat.color}20` }}
                >
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl text-white" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                  <div className="mt-2 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-green-400">Live</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Environmental Monitoring */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <HolographicPanel title="🌡️ Life Support Systems" glowColor="#3b82f6">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={environmentData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="time" stroke="#fff" />
                      <YAxis stroke="#fff" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(26, 11, 46, 0.9)',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2} name="Temperature (°C)" />
                      <Line type="monotone" dataKey="humidity" stroke="#06b6d4" strokeWidth={2} name="Humidity (%)" />
                      <Line type="monotone" dataKey="co2" stroke="#10b981" strokeWidth={2} name="CO₂ (%)" />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="p-2 bg-orange-500/10 border border-orange-500/30 rounded">
                      <p className="text-xs text-orange-300">Temp Range</p>
                      <p className="text-sm text-white">18-27°C</p>
                    </div>
                    <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
                      <p className="text-xs text-cyan-300">Humidity</p>
                      <p className="text-sm text-white">30-70%</p>
                    </div>
                    <div className="p-2 bg-green-500/10 border border-green-500/30 rounded">
                      <p className="text-xs text-green-300">CO₂ Limit</p>
                      <p className="text-sm text-white">{'<0.5%'}</p>
                    </div>
                  </div>
                </HolographicPanel>
              </motion.div>

              {/* Radiation by Module */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <HolographicPanel title="☢️ Radiation Dose by Module" glowColor="#f59e0b">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={radiationData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="module" stroke="#fff" angle={-15} textAnchor="end" height={80} />
                      <YAxis stroke="#fff" label={{ value: 'mSv/day', angle: -90, position: 'insideLeft', fill: '#fff' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(26, 11, 46, 0.9)',
                          border: '1px solid rgba(245, 158, 11, 0.3)',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="dose" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <p className="text-xs text-yellow-300">
                      <strong>Average:</strong> ~0.5 mSv/day = 183 mSv/year (vs. 3 mSv/year on Earth)
                    </p>
                  </div>
                </HolographicPanel>
              </motion.div>

              {/* Experiments by Category */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <HolographicPanel title="🔬 Active Experiments" glowColor="#10b981">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={experimentCategories}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {experimentCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(26, 11, 46, 0.9)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  <p className="text-xs text-muted-foreground mt-2">
                    Total: {experimentCategories.reduce((sum, cat) => sum + cat.value, 0)} experiments 
                    from 108 countries
                  </p>
                </HolographicPanel>
              </motion.div>

              {/* AI Prevention Dashboard */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <HolographicPanel title="🤖 AI Health Monitoring" glowColor="#8b5cf6">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <h4 className="text-sm text-green-300 mb-2">✅ All Systems Nominal</h4>
                      <p className="text-xs text-muted-foreground">
                        Life support, power, thermal control, and communication systems operating within normal parameters.
                      </p>
                    </div>

                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <h4 className="text-sm text-blue-300 mb-2">🧬 Crew Health</h4>
                      <div className="space-y-2 mt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Bone Density Loss</span>
                          <span className="text-sm text-white">-1.2% (normal)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Muscle Mass</span>
                          <span className="text-sm text-white">-0.8% (acceptable)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Vision Changes</span>
                          <span className="text-sm text-green-400">Minimal</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <h4 className="text-sm text-purple-300 mb-2">🔮 AI Recommendations</h4>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        <li>• Increase resistance exercise duration by 15 minutes</li>
                        <li>• Monitor vitamin D levels in crew members</li>
                        <li>• Schedule additional cardiovascular workouts</li>
                        <li>• Review sleep patterns for optimal circadian rhythm</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                      <h4 className="text-sm text-orange-300 mb-2">⚡ Upcoming Events</h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        <strong className="text-white">Cargo Resupply:</strong> Dragon CRS-29 arriving in 3 days
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-white">EVA Scheduled:</strong> Maintenance in 8 days
                      </p>
                    </div>
                  </div>
                </HolographicPanel>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
