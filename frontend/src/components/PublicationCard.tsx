import { motion } from 'framer-motion';
import { ExternalLink, Users, Calendar, TrendingUp, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import type { Publication } from '../data/mockData';

interface PublicationCardProps {
  publication: Publication;
  index: number;
}

export function PublicationCard({ publication, index }: PublicationCardProps) {
  const relevanceColors = {
    high: 'bg-green-500/10 text-green-500 border-green-500/20',
    medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    low: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border-border/50 hover:border-primary/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <CardHeader className="relative">
          <div className="flex items-start justify-between gap-4 mb-2">
            <Badge className={relevanceColors[publication.relevance]}>
              {publication.relevance.toUpperCase()} PRIORITY
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    {publication.citations}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Citations</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <CardTitle className="group-hover:text-primary transition-colors">
            {publication.title}
          </CardTitle>

          <CardDescription className="flex flex-wrap items-center gap-4 mt-2">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {publication.authors.length} authors
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {publication.year}
            </span>
            <Badge variant="outline">{publication.category}</Badge>
          </CardDescription>
        </CardHeader>

        <CardContent className="relative space-y-4">
          <p className="text-sm text-muted-foreground">
            {publication.summary}
          </p>

          <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm">AI-Generated Summary</span>
            </div>
            <p className="text-sm text-foreground/90">
              {publication.aiSummary}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {publication.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground font-mono">
              DOI: {publication.doi}
            </span>
            <Button
              size="sm"
              variant="ghost"
              className="group/btn"
              onClick={() => window.open(`https://doi.org/${publication.doi}`, '_blank')}
            >
              View Paper
              <ExternalLink className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
