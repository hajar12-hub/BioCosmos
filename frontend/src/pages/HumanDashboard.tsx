import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Brain, Activity, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { StarfieldBackground } from '../components/StarfieldBackground';
import { HolographicPanel } from '../components/HolographicPanel';
import { LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from 'recharts';

export function HumanDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const bioMetrics = [
    { time: '00:00', heartRate: 68, spo2: 98, stress: 22, temp: 36.8 },
    { time: '04:00', heartRate: 62, spo2: 99, stress: 15, temp: 36.6 },
    { time: '08:00', heartRate: 75, spo2: 97, stress: 35, temp: 37.1 },
    { time: '12:00', heartRate: 78, spo2: 98, stress: 42, temp: 37.2 },
    { time: '16:00', heartRate: 72, spo2: 98, stress: 30, temp: 37.0 },
    { time: '20:00', heartRate: 70, spo2: 99, stress: 25, temp: 36.9 },
  ];

  const microgravityEffects = [
    { system: 'Cardiovascular', impact: 85, baseline: 100 },
    { system: 'Musculoskeletal', impact: 70, baseline: 100 },
    { system: 'Immune', impact: 75, baseline: 100 },
    { system: 'Neurological', impact: 90, baseline: 100 },
    { system: 'Vision', impact: 80, baseline: 100 },
    { system: 'Fluid Distribution', impact: 65, baseline: 100 },
  ];

  const radiationImpact = [
    { month: 1, dnaRepair: 100, cellHealth: 100, mutation: 0 },
    { month: 3, dnaRepair: 95, cellHealth: 97, mutation: 2 },
    { month: 6, dnaRepair: 88, cellHealth: 92, mutation: 5 },
    { month: 9, dnaRepair: 82, cellHealth: 87, mutation: 8 },
    { month: 12, dnaRepair: 78, cellHealth: 83, mutation: 12 },
  ];

  const vitalStats = [
    { 
      label: 'Heart Rate', 
      value: '72 bpm', 
      status: 'normal', 
      icon: Heart, 
      color: '#ef4444',
      range: '60-100 bpm'
    },
    { 
      label: 'SpO₂', 
      value: '98%', 
      status: 'optimal', 
      icon: Activity, 
      color: '#06b6d4',
      range: '95-100%'
    },
    { 
      label: 'Cognitive Load', 
      value: '35%', 
      status: 'moderate', 
      icon: Brain, 
      color: '#8b5cf6',
      range: '0-60% optimal'
    },
    { 
      label: 'Energy Level', 
      value: '82%', 
      status: 'good', 
      icon: Zap, 
      color: '#ffd700',
      range: '70-100% good'
    },
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
          
          <div className="text-right">
            <div className="flex items-center justify-end gap-3 mb-2">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <span className="text-4xl">⭐</span>
              </motion.div>
              <h1 className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
                Human Star Dashboard
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">Humans as Stars • Biological Monitoring</p>
          </div>
        </motion.div>

        {/* Hero Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 p-6 glass rounded-2xl border border-yellow-500/30"
          style={{ boxShadow: '0 0 40px rgba(255, 215, 0, 0.2)' }}
        >
          <div className="flex items-start gap-4">
            <div className="text-6xl">✨</div>
            <div>
              <h3 className="text-white mb-2">We Are Made of Stardust</h3>
              <p className="text-muted-foreground leading-relaxed">
                The iron in our blood, calcium in our bones, and oxygen we breathe were forged in the hearts of dying stars billions of years ago. 
                As we venture into space, we return to our cosmic origin — <strong className="text-yellow-400">humans as radiant beings, 
                shining with the same fundamental elements that illuminate the universe.</strong>
              </p>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Vital Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            >
              {vitalStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="glass rounded-xl p-5 border border-border/30"
                  style={{ boxShadow: `0 0 20px ${stat.color}20` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <stat.icon className="h-8 w-8" style={{ color: stat.color }} />
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      stat.status === 'optimal' ? 'bg-green-500/20 text-green-400' :
                      stat.status === 'normal' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {stat.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl text-white mb-1" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.range}</p>
                </motion.div>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Real-time Biometrics */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <HolographicPanel title="📊 24-Hour Biometric Plot" glowColor="#ef4444">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={bioMetrics}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="time" stroke="#fff" />
                      <YAxis stroke="#fff" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(26, 11, 46, 0.9)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={2} name="Heart Rate (bpm)" />
                      <Line type="monotone" dataKey="spo2" stroke="#06b6d4" strokeWidth={2} name="SpO₂ (%)" />
                      <Line type="monotone" dataKey="stress" stroke="#f59e0b" strokeWidth={2} name="Stress Level" />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-xs text-red-300">
                      <strong>AI Insight:</strong> Elevated stress at midday. Recommend meditation session and reduced workload.
                    </p>
                  </div>
                </HolographicPanel>
              </motion.div>

              {/* Radiation Effects on Biology */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <HolographicPanel title="☢️ Radiation Effects (Cellular Level)" glowColor="#f59e0b">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={radiationImpact}>
                      <defs>
                        <linearGradient id="dnaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="cellGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="month" stroke="#fff" label={{ value: 'Months in Space', position: 'insideBottom', offset: -5, fill: '#fff' }} />
                      <YAxis stroke="#fff" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(26, 11, 46, 0.9)',
                          border: '1px solid rgba(245, 158, 11, 0.3)',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="dnaRepair" stroke="#8b5cf6" fill="url(#dnaGradient)" name="DNA Repair (%)" />
                      <Area type="monotone" dataKey="cellHealth" stroke="#10b981" fill="url(#cellGradient)" name="Cell Health (%)" />
                    </AreaChart>
                  </ResponsiveContainer>
                  <p className="text-xs text-muted-foreground mt-2">
                    Long-duration exposure increases DNA mutations and reduces cellular repair efficiency
                  </p>
                </HolographicPanel>
              </motion.div>

              {/* Microgravity Effects */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <HolographicPanel title="🌌 Microgravity Impact Assessment" glowColor="#06b6d4">
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={microgravityEffects}>
                      <PolarGrid stroke="#ffffff20" />
                      <PolarAngleAxis dataKey="system" stroke="#fff" style={{ fontSize: '12px' }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#fff" />
                      <Radar name="Current Function" dataKey="impact" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} />
                      <Radar name="Baseline (Earth)" dataKey="baseline" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                      <Legend />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(26, 11, 46, 0.9)',
                          border: '1px solid rgba(6, 182, 212, 0.3)',
                          borderRadius: '8px',
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded">
                      <p className="text-xs text-blue-300">Bone Loss</p>
                      <p className="text-sm text-white">1-2% per month</p>
                    </div>
                    <div className="p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                      <p className="text-xs text-purple-300">Muscle Atrophy</p>
                      <p className="text-sm text-white">20-30% loss</p>
                    </div>
                  </div>
                </HolographicPanel>
              </motion.div>

              {/* AI Prevention Dashboard */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <HolographicPanel title="🤖 AI Health Optimization" glowColor="#8b5cf6">
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <h4 className="text-sm text-purple-300 mb-2">💊 Personalized Medicine</h4>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• Vitamin D supplement: 2000 IU daily</li>
                        <li>• Calcium intake: increase to 1500mg/day</li>
                        <li>• Bisphosphonates for bone density</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <h4 className="text-sm text-green-300 mb-2">🏋️ Exercise Protocol</h4>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• Resistance training: 2 hours daily</li>
                        <li>• Cardiovascular: 1 hour on treadmill/bike</li>
                        <li>• Target: minimize muscle & bone loss</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <h4 className="text-sm text-blue-300 mb-2">🧬 Genetic Monitoring</h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        Regular DNA sequencing to detect radiation-induced mutations
                      </p>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Next scan:</span>
                        <span className="text-white">In 7 days</span>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <h4 className="text-sm text-yellow-300 mb-2">🛡️ Radiation Protection</h4>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• Sleep in shielded quarters during SPE</li>
                        <li>• Antioxidant-rich diet (berries, greens)</li>
                        <li>• Monitor telomere length monthly</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                      <h4 className="text-sm text-orange-300 mb-2">🧠 Psychological Wellness</h4>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• Daily meditation: 20 minutes</li>
                        <li>• Weekly virtual family calls</li>
                        <li>• Group activities for team cohesion</li>
                      </ul>
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
