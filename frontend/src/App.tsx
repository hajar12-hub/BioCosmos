import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { Chatbot } from './components/Chatbot';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { MarsDashboard } from './pages/MarsDashboard';
import { MoonDashboard } from './pages/MoonDashboard';
import { ISSDashboard } from './pages/ISSDashboard';
import { HumanDashboard } from './pages/HumanDashboard';
import { About } from './pages/About';
import { AISummarizer } from './pages/AISummarizer';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mars" element={<MarsDashboard />} />
            <Route path="/moon" element={<MoonDashboard />} />
            <Route path="/iss" element={<ISSDashboard />} />
            <Route path="/human" element={<HumanDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/ai-summarizer" element={<AISummarizer />} />
            
            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Chatbot />
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
}
