import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Award, Medal, Sparkles, Check, X } from 'lucide-react';
import { StarfieldBackground } from '../components/StarfieldBackground';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { api, QuizQuestion, LeaderboardEntry } from '../services/api';
import { Progress } from '../components/ui/progress';

export function Quiz() {
  const [stage, setStage] = useState<'intro' | 'quiz' | 'results' | 'leaderboard'>('intro');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    loadQuestions();
    loadLeaderboard();
  }, []);

  const loadQuestions = async () => {
    const data = await api.getQuizQuestions();
    setQuestions(data);
  };

  const loadLeaderboard = async () => {
    const data = await api.getLeaderboard();
    setLeaderboard(data);
  };

  const startQuiz = () => {
    if (name && surname) {
      setStage('quiz');
      setCurrentQuestion(0);
      setAnswers([]);
      setScore(0);
    }
  };

  const handleAnswer = (answerIndex: number) => {
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        finishQuiz(score + (correct ? 1 : 0));
      }
    }, 2000);
  };

  const finishQuiz = async (finalScore: number) => {
    await api.submitQuiz({
      name,
      surname,
      score: finalScore,
      totalQuestions: questions.length,
      timestamp: new Date().toISOString(),
    });
    setStage('results');
    await loadLeaderboard();
  };

  const getBadge = (scorePercent: number) => {
    if (scorePercent === 100) return { name: 'DNA Master', icon: Trophy, color: 'text-yellow-500' };
    if (scorePercent >= 80) return { name: 'O₂ Explorer', icon: Star, color: 'text-blue-500' };
    if (scorePercent >= 60) return { name: 'Mars Pioneer', icon: Award, color: 'text-purple-500' };
    return { name: 'Space Scientist', icon: Medal, color: 'text-gray-500' };
  };

  const scorePercent = questions.length > 0 ? (score / questions.length) * 100 : 0;
  const badge = getBadge(scorePercent);

  return (
    <div className="relative min-h-screen pt-24 pb-16">
      <StarfieldBackground />

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <AnimatePresence mode="wait">
          {/* Intro stage */}
          {stage === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle>BioCosmos Knowledge Quiz</CardTitle>
                  <CardDescription>
                    Test your knowledge about space biology and earn badges!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">First Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your first name"
                        className="bg-background/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="surname">Last Name</Label>
                      <Input
                        id="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        placeholder="Enter your last name"
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      How it works
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Answer {questions.length} questions about space biology</li>
                      <li>• Get instant feedback with animations</li>
                      <li>• Earn badges based on your score</li>
                      <li>• Compete on the global leaderboard</li>
                    </ul>
                  </div>

                  <Button
                    onClick={startQuiz}
                    disabled={!name || !surname}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    size="lg"
                  >
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Quiz stage */}
          {stage === 'quiz' && questions.length > 0 && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <Badge variant="secondary">Score: {score}</Badge>
                </div>
                <Progress value={((currentQuestion + 1) / questions.length) * 100} />
              </div>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>{questions[currentQuestion].question}</CardTitle>
                  <CardDescription>Category: {questions[currentQuestion].category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={() => handleAnswer(index)}
                          disabled={showFeedback}
                          variant="outline"
                          className="w-full h-auto p-4 text-left justify-start hover:border-primary/50"
                        >
                          <span className="mr-3 w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0">
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Feedback animation */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                  >
                    <motion.div
                      className={`w-32 h-32 rounded-full flex items-center justify-center ${
                        isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, isCorrect ? 360 : -360, 0],
                      }}
                      transition={{ duration: 1 }}
                    >
                      {isCorrect ? (
                        <Check className="h-16 w-16 text-white" />
                      ) : (
                        <X className="h-16 w-16 text-white" />
                      )}
                    </motion.div>
                    
                    {/* Particle explosion */}
                    {isCorrect && [...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-yellow-500 rounded-full"
                        style={{
                          left: '50%',
                          top: '50%',
                        }}
                        animate={{
                          x: Math.cos((i / 12) * Math.PI * 2) * 150,
                          y: Math.sin((i / 12) * Math.PI * 2) * 150,
                          opacity: [1, 0],
                          scale: [1, 0],
                        }}
                        transition={{ duration: 1 }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Results stage */}
          {stage === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm text-center">
                <CardHeader>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: 'spring', duration: 1 }}
                    className={`w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-4`}
                  >
                    <badge.icon className={`h-12 w-12 text-white`} />
                  </motion.div>
                  <CardTitle>Quiz Complete, {name}!</CardTitle>
                  <CardDescription>You've earned the {badge.name} badge</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/50 rounded-lg p-6">
                    <div className="text-6xl mb-2">{scorePercent.toFixed(0)}%</div>
                    <p className="text-muted-foreground">
                      {score} out of {questions.length} correct
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setStage('leaderboard')}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
                    >
                      <Trophy className="mr-2 h-4 w-4" />
                      View Leaderboard
                    </Button>
                    <Button
                      onClick={() => {
                        setStage('intro');
                        setName('');
                        setSurname('');
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Try Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Leaderboard stage */}
          {stage === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-6 w-6 text-primary" />
                        Global Leaderboard
                      </CardTitle>
                      <CardDescription>Top performers in space biology knowledge</CardDescription>
                    </div>
                    <Button onClick={() => setStage('intro')} variant="outline">
                      New Quiz
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaderboard.map((entry, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center gap-4 p-4 rounded-lg ${
                          entry.name === name && entry.surname === surname
                            ? 'bg-primary/10 border border-primary/30'
                            : 'bg-muted/50'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          entry.rank === 1 ? 'bg-yellow-500 text-white' :
                          entry.rank === 2 ? 'bg-gray-400 text-white' :
                          entry.rank === 3 ? 'bg-orange-600 text-white' :
                          'bg-muted text-foreground'
                        }`}>
                          {entry.rank}
                        </div>
                        <div className="flex-1">
                          <p>{entry.name} {entry.surname}</p>
                          <p className="text-sm text-muted-foreground">{entry.badge}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-primary">{entry.score}%</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(entry.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
