import { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Filter as FilterIcon, Grid, Table, Upload, FileSpreadsheet } from 'lucide-react';
import { publications } from '../data/mockData';
import { PublicationCard } from '../components/PublicationCard';
import { FilterBar } from '../components/FilterBar';
import { StarfieldBackground } from '../components/StarfieldBackground';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [relevanceFilter, setRelevanceFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { api } = await import('../services/api');
      await api.uploadFile(file);
      alert('File uploaded successfully! Charts and quiz updated.');
    } catch (error) {
      alert('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      const matchesSearch =
        !searchQuery ||
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.authors.some((author) =>
          author.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        pub.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        pub.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === 'all' || pub.category === categoryFilter;

      const matchesRelevance =
        relevanceFilter === 'all' || pub.relevance === relevanceFilter;

      const matchesYear =
        yearFilter === 'all' || pub.year.toString() === yearFilter;

      return matchesSearch && matchesCategory && matchesRelevance && matchesYear;
    });
  }, [searchQuery, categoryFilter, relevanceFilter, yearFilter]);

  const handleReset = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setRelevanceFilter('all');
    setYearFilter('all');
  };

  return (
    <div className="relative min-h-screen pt-24 pb-16">
      <StarfieldBackground />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-3 rounded-xl">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1>Research Dashboard</h1>
              <p className="text-muted-foreground">
                Explore {publications.length} curated bioscience publications for space exploration
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            relevanceFilter={relevanceFilter}
            onRelevanceChange={setRelevanceFilter}
            yearFilter={yearFilter}
            onYearChange={setYearFilter}
            onReset={handleReset}
          />
        </motion.div>

        {/* Upload section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p>Upload Data File</p>
                  <p className="text-sm text-muted-foreground">
                    CSV or Excel file to update visualizations and quiz
                  </p>
                </div>
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  variant="outline"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Upload File'}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* View toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex items-center justify-between"
        >
          <p className="text-sm text-muted-foreground">
            Showing {filteredPublications.length} of {publications.length} publications
          </p>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <Table className="h-4 w-4 mr-2" />
              Table
            </Button>
          </div>
        </motion.div>

        {/* Content */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPublications.map((publication, index) => (
              <PublicationCard
                key={publication.id}
                publication={publication}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden"
          >
            <TableComponent>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-right">Citations</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPublications.map((pub) => (
                  <TableRow key={pub.id} className="hover:bg-primary/5">
                    <TableCell>
                      <div>
                        <p>{pub.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {pub.authors[0]} et al.
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{pub.category}</Badge>
                    </TableCell>
                    <TableCell>{pub.year}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          pub.relevance === 'high'
                            ? 'bg-green-500/10 text-green-500'
                            : pub.relevance === 'medium'
                            ? 'bg-yellow-500/10 text-yellow-500'
                            : 'bg-gray-500/10 text-gray-500'
                        }
                      >
                        {pub.relevance}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{pub.citations}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableComponent>
          </motion.div>
        )}

        {filteredPublications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <FilterIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="mb-2">No publications found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search query
            </p>
            <Button onClick={handleReset}>Reset Filters</Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
