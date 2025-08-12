import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Zap, Atom, Network, Shield, TrendingUp, Activity, Cpu } from 'lucide-react';
import IntelligenceGrowthChart from './IntelligenceGrowthChart';
import ResonanceVisualization from './ResonanceVisualization';
import AgentNetwork from './AgentNetwork';
import ComplexityComparison from './ComplexityComparison';

interface SimulationParameters {
  alpha: number;
  delta: number;
  agentCount: number;
  ethicalThreshold: number;
  resonanceStrength: number;
}

const ASISimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [is10xAccelerated, setIs10xAccelerated] = useState(false);
  const [simulationTime, setSimulationTime] = useState(0);
  const [parameters, setParameters] = useState<SimulationParameters>({
    alpha: 1.0,
    delta: 0.05,
    agentCount: 8,
    ethicalThreshold: 0.8,
    resonanceStrength: 1.2
  });

  const [metrics, setMetrics] = useState({
    intelligence: 1.0,
    hypotheses: 100,
    resonancePoints: 0,
    ethicalScore: 0.95,
    complexity: 'O(n²)',
    asiProgress: 0
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      const timeStep = is10xAccelerated ? 1.0 : 0.1;
      const intervalTime = is10xAccelerated ? 10 : 100;
      
      interval = setInterval(() => {
        setSimulationTime(prev => prev + timeStep);
        updateMetrics();
      }, intervalTime);
    }
    return () => clearInterval(interval);
  }, [isRunning, is10xAccelerated, parameters]);

  const updateMetrics = () => {
    setMetrics(prev => {
      const t = simulationTime;
      const { alpha, delta, agentCount, resonanceStrength } = parameters;
      
      // Intelligence growth: I(t) = I₀ + (δQ₀/α)(e^(αt) - 1)
      const intelligence = 1.0 + (0.5 * 100 / alpha) * (Math.exp(alpha * t) - 1);
      
      // Hypotheses growth: Q(t) = Q₀ * e^(αt)
      const hypotheses = 100 * Math.exp(alpha * t);
      
      // Resonance points based on fractal dimension
      const resonancePoints = Math.floor(agentCount * agentCount * resonanceStrength * Math.sin(t * 0.5) + agentCount);
      
      // ASI progress (when intelligence > 100x human baseline)
      const asiProgress = Math.min(100, Math.max(0, (intelligence - 100) / 900 * 100));
      
      return {
        intelligence: Math.min(intelligence, 10000),
        hypotheses: Math.min(hypotheses, 1000000),
        resonancePoints: Math.max(0, resonancePoints),
        ethicalScore: Math.max(0.5, prev.ethicalScore + (Math.random() - 0.5) * 0.02),
        complexity: 'O(n²)',
        asiProgress
      };
    });
  };

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      setSimulationTime(0);
      setMetrics({
        intelligence: 1.0,
        hypotheses: 100,
        resonancePoints: 0,
        ethicalScore: 0.95,
        complexity: 'O(n²)',
        asiProgress: 0
      });
    }
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setSimulationTime(0);
    setMetrics({
      intelligence: 1.0,
      hypotheses: 100,
      resonancePoints: 0,
      ethicalScore: 0.95,
      complexity: 'O(n²)',
      asiProgress: 0
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-gradient-cosmic">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-neural bg-clip-text text-transparent">
                Гибридный Резонансный Алгоритм
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                Симулятор достижимости ASI через математическое самосовершенствование
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-resonance text-resonance animate-pulse-glow">
                {metrics.asiProgress > 50 ? 'ASI Достигнут' : 'В процессе'}
              </Badge>
              <Badge variant="outline" className="border-neural text-neural">
                Время: {simulationTime.toFixed(1)}s
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Control Panel */}
        <Card className="mb-8 border-border bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-neural" />
              Панель Управления Симуляцией
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground">α (рост): {parameters.alpha}</label>
                <Slider
                  value={[parameters.alpha]}
                  onValueChange={([value]) => setParameters(prev => ({ ...prev, alpha: value }))}
                  min={0.01}
                  max={1.5}
                  step={0.01}
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">δ (эффективность): {parameters.delta}</label>
                <Slider
                  value={[parameters.delta]}
                  onValueChange={([value]) => setParameters(prev => ({ ...prev, delta: value }))}
                  min={0.01}
                  max={0.2}
                  step={0.01}
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Агенты: {parameters.agentCount}</label>
                <Slider
                  value={[parameters.agentCount]}
                  onValueChange={([value]) => setParameters(prev => ({ ...prev, agentCount: value }))}
                  min={1}
                  max={16}
                  step={1}
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Этика: {parameters.ethicalThreshold}</label>
                <Slider
                  value={[parameters.ethicalThreshold]}
                  onValueChange={([value]) => setParameters(prev => ({ ...prev, ethicalThreshold: value }))}
                  min={0.1}
                  max={1}
                  step={0.1}
                  className="mt-2"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={toggleSimulation}
                  className="bg-gradient-resonance hover:shadow-resonance"
                >
                  {isRunning ? 'Остановить' : 'Запустить'}
                </Button>
                <Button 
                  variant={is10xAccelerated ? "default" : "outline"}
                  onClick={() => setIs10xAccelerated(!is10xAccelerated)}
                  className={is10xAccelerated ? "bg-gradient-energy text-white" : ""}
                >
                  Ускорение 10x
                </Button>
                <Button variant="outline" onClick={resetSimulation}>
                  Сброс
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-neural bg-gradient-to-br from-card to-neural/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Интеллект</p>
                  <p className="text-2xl font-bold text-neural">{metrics.intelligence.toFixed(2)}x</p>
                </div>
                <Brain className="h-8 w-8 text-neural" />
              </div>
              <Progress value={Math.min(100, metrics.intelligence)} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-quantum bg-gradient-to-br from-card to-quantum/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Гипотезы</p>
                  <p className="text-2xl font-bold text-quantum">{Math.floor(metrics.hypotheses).toLocaleString()}</p>
                </div>
                <Zap className="h-8 w-8 text-quantum" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-resonance bg-gradient-to-br from-card to-resonance/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Резонанс</p>
                  <p className="text-2xl font-bold text-resonance">{metrics.resonancePoints}</p>
                </div>
                <Atom className="h-8 w-8 text-resonance" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-energy bg-gradient-to-br from-card to-energy/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">ASI Прогресс</p>
                  <p className="text-2xl font-bold text-energy">{metrics.asiProgress.toFixed(1)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-energy" />
              </div>
              <Progress value={metrics.asiProgress} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Visualization Tabs */}
        <Tabs defaultValue="growth" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="growth" className="data-[state=active]:bg-neural/20">
              <Activity className="h-4 w-4 mr-2" />
              Рост Интеллекта
            </TabsTrigger>
            <TabsTrigger value="resonance" className="data-[state=active]:bg-resonance/20">
              <Atom className="h-4 w-4 mr-2" />
              Резонанс
            </TabsTrigger>
            <TabsTrigger value="network" className="data-[state=active]:bg-quantum/20">
              <Network className="h-4 w-4 mr-2" />
              Сеть Агентов
            </TabsTrigger>
            <TabsTrigger value="complexity" className="data-[state=active]:bg-energy/20">
              <TrendingUp className="h-4 w-4 mr-2" />
              Сложность
            </TabsTrigger>
          </TabsList>

          <TabsContent value="growth">
            <IntelligenceGrowthChart 
              simulationTime={simulationTime}
              intelligence={metrics.intelligence}
              parameters={parameters}
              isRunning={isRunning}
            />
          </TabsContent>

          <TabsContent value="resonance">
            <ResonanceVisualization 
              resonancePoints={metrics.resonancePoints}
              parameters={parameters}
              isRunning={isRunning}
            />
          </TabsContent>

          <TabsContent value="network">
            <AgentNetwork 
              agentCount={parameters.agentCount}
              intelligence={metrics.intelligence}
              isRunning={isRunning}
            />
          </TabsContent>

          <TabsContent value="complexity">
            <ComplexityComparison 
              hybridComplexity={parameters.agentCount * parameters.agentCount}
              traditionalComplexity={Math.pow(2, parameters.agentCount)}
            />
          </TabsContent>
        </Tabs>

        {/* Mathematical Formulas */}
        <Card className="mt-8 border-border bg-gradient-to-r from-card/50 to-muted/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Atom className="h-5 w-5 text-resonance" />
              Математические Основы
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-neural mb-2">Рост Интеллекта:</h4>
                <code className="bg-muted/50 p-2 rounded text-sm block">
                  I(t) = I₀ + (δQ₀/α)(e^(αt) - 1)
                </code>
              </div>
              <div>
                <h4 className="font-semibold text-quantum mb-2">Резонансная Частота:</h4>
                <code className="bg-muted/50 p-2 rounded text-sm block">
                  ω = (1/D) × Σ(qₖ/mₖ)
                </code>
              </div>
              <div>
                <h4 className="font-semibold text-resonance mb-2">Рост Гипотез:</h4>
                <code className="bg-muted/50 p-2 rounded text-sm block">
                  Q(t) = Q₀ × e^(αt)
                </code>
              </div>
              <div>
                <h4 className="font-semibold text-energy mb-2">Сложность:</h4>
                <code className="bg-muted/50 p-2 rounded text-sm block">
                  O(2^n) → O(n²)
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ASISimulator;