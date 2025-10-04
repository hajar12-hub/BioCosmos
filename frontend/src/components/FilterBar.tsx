import { Search, Filter, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  relevanceFilter: string;
  onRelevanceChange: (relevance: string) => void;
  yearFilter: string;
  onYearChange: (year: string) => void;
  onReset: () => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  relevanceFilter,
  onRelevanceChange,
  yearFilter,
  onYearChange,
  onReset,
}: FilterBarProps) {
  const hasActiveFilters =
    searchQuery || categoryFilter !== 'all' || relevanceFilter !== 'all' || yearFilter !== 'all';

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search publications, authors, keywords..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <Select value={categoryFilter} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-[180px] bg-background/50 backdrop-blur-sm border-border/50">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Human Biology">Human Biology</SelectItem>
              <SelectItem value="Plant Science">Plant Science</SelectItem>
              <SelectItem value="Microbiology">Microbiology</SelectItem>
              <SelectItem value="Astrobiology">Astrobiology</SelectItem>
              <SelectItem value="Psychology">Psychology</SelectItem>
              <SelectItem value="Materials Science">Materials Science</SelectItem>
            </SelectContent>
          </Select>

          <Select value={relevanceFilter} onValueChange={onRelevanceChange}>
            <SelectTrigger className="w-[160px] bg-background/50 backdrop-blur-sm border-border/50">
              <SelectValue placeholder="Relevance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>

          <Select value={yearFilter} onValueChange={onYearChange}>
            <SelectTrigger className="w-[140px] bg-background/50 backdrop-blur-sm border-border/50">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onReset}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchQuery}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onSearchChange('')}
              />
            </Badge>
          )}
          {categoryFilter !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {categoryFilter}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onCategoryChange('all')}
              />
            </Badge>
          )}
          {relevanceFilter !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {relevanceFilter}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onRelevanceChange('all')}
              />
            </Badge>
          )}
          {yearFilter !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {yearFilter}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onYearChange('all')}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
