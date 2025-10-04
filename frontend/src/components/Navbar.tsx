import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';
import { NovaLogo } from './NovaLogo';

export function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { path: '/', label: 'HOME' },
    { path: '/about', label: 'ABOUT' },
    { path: '/ai-summarizer', label: 'SUMMARIZER' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-primary/20 bg-background/90 backdrop-blur-xl shadow-lg shadow-primary/5"
    >
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <NovaLogo className="h-12 w-12" />
              <div className="absolute inset-0 bg-cyan-400/20 blur-xl group-hover:bg-cyan-400/40 transition-all" />
            </motion.div>
            <div>
              <span className="block text-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-wide">
                NovaTrip
              </span>
              <span className="block text-xs text-muted-foreground tracking-wider">NASA AI DASHBOARD</span>
            </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? 'default' : 'ghost'}
                  className="relative px-6 py-2 tracking-wider hover:bg-primary/10 transition-all"
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-lg border border-primary/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Button>
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="relative overflow-hidden border-primary/30 hover:bg-primary/10"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden flex gap-2 mt-4 overflow-x-auto pb-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={location.pathname === item.path ? 'default' : 'ghost'}
                size="sm"
                className="tracking-wider"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
