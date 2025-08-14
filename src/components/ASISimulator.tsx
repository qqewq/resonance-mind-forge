import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Brain, Zap, Atom, Network, Shield, TrendingUp, Activity, Cpu, Settings, RotateCcw, FastForward, Target, Eye, Play, Globe } from 'lucide-react';
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
  parameterN: number;
}

interface InteractiveState {
  showFormulas: boolean;
  isExponentialMode: boolean;
  isCriticalMass: boolean;
  parameterN: number;
}

type LanguageMode = 'bilingual' | 'russian' | 'english';

interface LanguageTexts {
  [key: string]: {
    ru: string;
    en: string;
  };
}

const ASISimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [is10xAccelerated, setIs10xAccelerated] = useState(false);
  const [simulationTime, setSimulationTime] = useState(0);
  const [languageMode, setLanguageMode] = useState<LanguageMode>('bilingual');
  const [parameters, setParameters] = useState<SimulationParameters>({
    alpha: 0.44,
    delta: 0.17,
    agentCount: 13,
    ethicalThreshold: 0.8,
    resonanceStrength: 1.2,
    parameterN: 13
  });

  const [interactiveState, setInteractiveState] = useState<InteractiveState>({
    showFormulas: true,
    isExponentialMode: false,
    isCriticalMass: false,
    parameterN: 13
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

  // Interactive functions
  const resetParameters = () => {
    setParameters({
      alpha: 0.44,
      delta: 0.17,
      agentCount: 13,
      ethicalThreshold: 0.8,
      resonanceStrength: 1.2,
      parameterN: 13
    });
    setInteractiveState(prev => ({ ...prev, parameterN: 13 }));
  };

  const setExponentialMode = () => {
    setParameters(prev => ({ ...prev, alpha: 0.9, delta: 0.4 }));
    setInteractiveState(prev => ({ ...prev, isExponentialMode: true }));
    setTimeout(() => {
      setInteractiveState(prev => ({ ...prev, isExponentialMode: false }));
    }, 30000);
  };

  const setCriticalMass = () => {
    setParameters(prev => ({ ...prev, agentCount: 25 }));
    setInteractiveState(prev => ({ ...prev, isCriticalMass: true, parameterN: 25 }));
  };

  const toggleFormulas = () => {
    setInteractiveState(prev => ({ ...prev, showFormulas: !prev.showFormulas }));
  };

  // Calculations
  const calculateComplexity = (n: number) => ({
    traditional: Math.pow(2, n),
    hybrid: n * n,
    acceleration: Math.pow(2, n) / (n * n),
    timeSaved: (1 - (n * n) / Math.pow(2, n)) * 100
  });

  const calculateResonance = () => {
    return (parameters.resonanceStrength * parameters.alpha).toFixed(3);
  };

  const calculateASITime = () => {
    const { alpha, delta } = parameters;
    const I_ASI = 1000; // Target ASI intelligence
    const I_0 = 1.0;
    const Q_0 = 100;
    return (1 / alpha) * Math.log((alpha * (I_ASI - I_0)) / (delta * Q_0) + 1);
  };

  const getEfficiencyColor = (acceleration: number) => {
    if (acceleration > 50) return 'bg-green-500/20 border-green-500';
    if (acceleration > 10) return 'bg-yellow-500/20 border-yellow-500';
    return 'bg-red-500/20 border-red-500';
  };

  // Language system
  const texts: LanguageTexts = {
    title: { ru: 'Гибридный Резонансный Алгоритм', en: 'Hybrid Resonance Algorithm' },
    subtitle: { ru: 'Симулятор достижимости ASI через математическое самосовершенствование', en: 'ASI Reachability Simulator via Mathematical Self-Improvement' },
    asiAchieved: { ru: 'ASI Достигнут', en: 'ASI Achieved' },
    inProgress: { ru: 'В процессе', en: 'In Progress' },
    time: { ru: 'Время', en: 'Time' },
    controlPanel: { ru: 'Панель Управления Симуляцией', en: 'Simulation Control Panel' },
    growth: { ru: 'рост', en: 'growth' },
    efficiency: { ru: 'эффективность', en: 'efficiency' },
    agents: { ru: 'Агенты', en: 'Agents' },
    ethics: { ru: 'Этика', en: 'Ethics' },
    stop: { ru: 'Остановить', en: 'Stop' },
    start: { ru: 'Запустить', en: 'Start' },
    acceleration: { ru: 'Ускорение', en: 'Acceleration' },
    reset: { ru: 'Сброс', en: 'Reset' },
    intelligence: { ru: 'Интеллект', en: 'Intelligence' },
    hypotheses: { ru: 'Гипотезы', en: 'Hypotheses' },
    resonance: { ru: 'Резонанс', en: 'Resonance' },
    asiProgress: { ru: 'ASI Прогресс', en: 'ASI Progress' },
    interactiveParams: { ru: 'Интерактивные Параметры', en: 'Interactive Parameters' },
    parameterCount: { ru: 'Количество параметров (n)', en: 'Number of parameters (n)' },
    baseOperations: { ru: 'Базовый', en: 'Base' },
    hybridOperations: { ru: 'Гибридный', en: 'Hybrid' },
    operations: { ru: 'операций', en: 'operations' },
    vs: { ru: 'vs', en: 'vs' },
    growthCoeff: { ru: 'Коэффициент роста (α)', en: 'Growth coefficient (α)' },
    asiTime: { ru: 'ASI время', en: 'ASI time' },
    efficiencyParam: { ru: 'Эффективность (δ)', en: 'Efficiency (δ)' },
    agentCount: { ru: 'Количество агентов', en: 'Number of agents' },
    criticalMassAchieved: { ru: 'Критическая масса достигнута!', en: 'Critical mass achieved!' },
    controlModes: { ru: 'Режимы Управления', en: 'Control Modes' },
    resetParams: { ru: 'Сброс параметров', en: 'Reset parameters' },
    exponentialMode: { ru: 'Экспоненциальный режим', en: 'Exponential mode' },
    criticalMass: { ru: 'Критическая масса', en: 'Critical mass' },
    hideFormulas: { ru: 'Скрыть формулы', en: 'Hide formulas' },
    showFormulas: { ru: 'Показать формулы', en: 'Show formulas' },
    dynamicComparison: { ru: 'Сравнение в динамике', en: 'Dynamic comparison' },
    efficiencyTitle: { ru: 'Эффективность', en: 'Efficiency' },
    timeSavings: { ru: 'Экономия времени', en: 'Time savings' },
    statusText: { ru: 'При n={n} гибридный алгоритм в {acc}x раз эффективнее, экономя {save}% времени вычислений', 
                 en: 'With n={n} the hybrid algorithm is {acc}x more efficient, saving {save}% of computation time' },
    intelligenceGrowth: { ru: 'Рост Интеллекта', en: 'Intelligence Growth' },
    agentNetwork: { ru: 'Сеть Агентов', en: 'Agent Network' },
    complexity: { ru: 'Сложность', en: 'Complexity' },
    mathFoundations: { ru: 'Математические Основы', en: 'Mathematical Foundations' },
    intelligenceGrowthFormula: { ru: 'Рост Интеллекта', en: 'Intelligence Growth' },
    resonanceFreq: { ru: 'Резонансная Частота', en: 'Resonance Frequency' },
    hypothesesGrowth: { ru: 'Рост Гипотез', en: 'Hypothesis Growth' },
    complexityFormula: { ru: 'Сложность', en: 'Complexity' },
    emergence: { ru: 'Эмерджентность', en: 'Emergence' },
    asiAchievementTime: { ru: 'Время достижения ASI', en: 'ASI Achievement Time' }
  };

  const getText = (key: string): string => {
    const text = texts[key];
    if (!text) return key;
    
    switch (languageMode) {
      case 'russian': return text.ru;
      case 'english': return text.en;
      case 'bilingual': return `${text.ru} | ${text.en}`;
      default: return `${text.ru} | ${text.en}`;
    }
  };

  const getStatusText = (): string => {
    const template = texts.statusText;
    const ruText = template.ru
      .replace('{n}', interactiveState.parameterN.toString())
      .replace('{acc}', complexity.acceleration.toFixed(0))
      .replace('{save}', complexity.timeSaved.toFixed(1));
    const enText = template.en
      .replace('{n}', interactiveState.parameterN.toString())
      .replace('{acc}', complexity.acceleration.toFixed(0))
      .replace('{save}', complexity.timeSaved.toFixed(1));
    
    switch (languageMode) {
      case 'russian': return ruText;
      case 'english': return enText;
      case 'bilingual': return `${ruText} | ${enText}`;
      default: return `${ruText} | ${enText}`;
    }
  };

  const cycleLanguageMode = () => {
    setLanguageMode(prev => {
      switch (prev) {
        case 'bilingual': return 'russian';
        case 'russian': return 'english';
        case 'english': return 'bilingual';
        default: return 'bilingual';
      }
    });
  };

  const complexity = calculateComplexity(interactiveState.parameterN);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-gradient-cosmic">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-neural bg-clip-text text-transparent">
                {languageMode === 'bilingual' ? (
                  <>
                    Гибридный Резонансный Алгоритм<br />
                    <span className="text-3xl">Hybrid Resonance Algorithm</span>
                  </>
                ) : getText('title')}
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                {languageMode === 'bilingual' ? (
                  <>
                    Симулятор достижимости ASI через математическое самосовершенствование<br />
                    <span className="text-lg">ASI Reachability Simulator via Mathematical Self-Improvement</span>
                  </>
                ) : getText('subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                onClick={cycleLanguageMode}
                variant="ghost"
                size="icon"
                className="hover:bg-muted/50"
                title={`Current: ${languageMode}`}
              >
                <Globe className="h-5 w-5" />
              </Button>
              <Badge variant="outline" className="border-resonance text-resonance animate-pulse-glow">
                {metrics.asiProgress > 50 ? getText('asiAchieved') : getText('inProgress')}
              </Badge>
              <Badge variant="outline" className="border-neural text-neural">
                {getText('time')}: {simulationTime.toFixed(1)}s
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
              {getText('controlPanel')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground">α ({getText('growth')}): {parameters.alpha}</label>
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
                <label className="text-sm font-medium text-muted-foreground">δ ({getText('efficiency')}): {parameters.delta}</label>
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
                <label className="text-sm font-medium text-muted-foreground">{getText('agents')}: {parameters.agentCount}</label>
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
                <label className="text-sm font-medium text-muted-foreground">{getText('ethics')}: {parameters.ethicalThreshold}</label>
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
                  {isRunning ? getText('stop') : getText('start')}
                </Button>
                <Button 
                  variant={is10xAccelerated ? "default" : "outline"}
                  onClick={() => setIs10xAccelerated(!is10xAccelerated)}
                  className={is10xAccelerated ? "bg-gradient-energy text-white" : ""}
                >
                  {getText('acceleration')} 10x
                </Button>
                <Button variant="outline" onClick={resetSimulation}>
                  {getText('reset')}
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
                  <p className="text-sm text-muted-foreground">{getText('intelligence')}</p>
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
                  <p className="text-sm text-muted-foreground">{getText('hypotheses')}</p>
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
                  <p className="text-sm text-muted-foreground">{getText('resonance')}</p>
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
                  <p className="text-sm text-muted-foreground">{getText('asiProgress')}</p>
                  <p className="text-2xl font-bold text-energy">{metrics.asiProgress.toFixed(1)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-energy" />
              </div>
              <Progress value={metrics.asiProgress} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Interactive Controls Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Parameter Controls */}
          <div className="lg:col-span-2 space-y-6">
            <Card className={`border-border transition-all duration-300 ${getEfficiencyColor(complexity.acceleration)}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-neural" />
                  {getText('interactiveParams')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Parameter N Slider */}
                <div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <label className="text-sm font-medium text-muted-foreground cursor-help">
                        {getText('parameterCount')}: {interactiveState.parameterN}
                      </label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Управляет сложностью алгоритма. Показывает преимущества гибридного подхода | Controls algorithm complexity. Shows hybrid approach advantages</p>
                    </TooltipContent>
                  </Tooltip>
                  <Slider
                    value={[interactiveState.parameterN]}
                    onValueChange={([value]) => {
                      setInteractiveState(prev => ({ ...prev, parameterN: value }));
                      setParameters(prev => ({ ...prev, parameterN: value }));
                    }}
                    min={5}
                    max={30}
                    step={1}
                    className="mt-2"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {getText('baseOperations')}: {complexity.traditional.toLocaleString()} {getText('operations')} {getText('vs')} {getText('hybridOperations')}: {complexity.hybrid.toLocaleString()} {getText('operations')}
                  </div>
                </div>

                {/* Alpha Slider */}
                <div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <label className="text-sm font-medium text-muted-foreground cursor-help">
                        {getText('growthCoeff')}: {parameters.alpha.toFixed(2)}
                      </label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Контролирует экспоненциальный рост интеллекта | Controls exponential intelligence growth</p>
                    </TooltipContent>
                  </Tooltip>
                  <Slider
                    value={[parameters.alpha]}
                    onValueChange={([value]) => setParameters(prev => ({ ...prev, alpha: value }))}
                    min={0.1}
                    max={0.9}
                    step={0.01}
                    className="mt-2"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {getText('resonance')}: {calculateResonance()} | {getText('asiTime')}: {calculateASITime().toFixed(1)}s
                  </div>
                  <div className="text-xs text-quantum mt-1">
                    ω_рез = β·α = {parameters.resonanceStrength}·{parameters.alpha.toFixed(2)}
                  </div>
                </div>

                {/* Delta Slider */}
                <div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <label className="text-sm font-medium text-muted-foreground cursor-help">
                        {getText('efficiencyParam')}: {parameters.delta.toFixed(2)}
                      </label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Влияет на эффективность преобразования гипотез в интеллект | Affects efficiency of converting hypotheses to intelligence</p>
                    </TooltipContent>
                  </Tooltip>
                  <Slider
                    value={[parameters.delta]}
                    onValueChange={([value]) => setParameters(prev => ({ ...prev, delta: value }))}
                    min={0.05}
                    max={0.5}
                    step={0.01}
                    className="mt-2"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {getText('efficiencyTitle')}: {(parameters.delta * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs text-neural mt-1">
                    I(t) = I₀ + (δ·Q₀/α)·(e^(α·t) - 1)
                  </div>
                </div>

                {/* Agent Count Slider */}
                <div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <label className="text-sm font-medium text-muted-foreground cursor-help">
                        {getText('agentCount')}: {parameters.agentCount}
                      </label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Количество ИИ-агентов в сети. При &gt;25 достигается критическая масса | Number of AI agents in network. Critical mass achieved at &gt;25</p>
                    </TooltipContent>
                  </Tooltip>
                  <Slider
                    value={[parameters.agentCount]}
                    onValueChange={([value]) => setParameters(prev => ({ ...prev, agentCount: value }))}
                    min={5}
                    max={30}
                    step={1}
                    className="mt-2"
                  />
                  {parameters.agentCount > 25 && (
                    <Badge className="mt-2 bg-gradient-resonance text-white animate-pulse-glow">
                      {getText('criticalMassAchieved')}
                    </Badge>
                  )}
                  <div className="text-xs text-muted-foreground mt-1">
                    I_эм = ΣI_i + Σγ_ij·I_i·I_j
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Control Buttons & Status */}
          <div className="space-y-6">
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-energy" />
                  {getText('controlModes')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={resetParameters}
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  {getText('resetParams')}
                </Button>
                
                <Button
                  onClick={setExponentialMode}
                  variant={interactiveState.isExponentialMode ? "default" : "outline"}
                  className="w-full flex items-center gap-2 bg-gradient-energy"
                >
                  <FastForward className="h-4 w-4" />
                  {getText('exponentialMode')}
                </Button>

                <Button
                  onClick={setCriticalMass}
                  variant={interactiveState.isCriticalMass ? "default" : "outline"}
                  className="w-full flex items-center gap-2 bg-gradient-resonance"
                >
                  <Target className="h-4 w-4" />
                  {getText('criticalMass')}
                </Button>

                <Button
                  onClick={toggleFormulas}
                  variant={interactiveState.showFormulas ? "default" : "outline"}
                  className="w-full flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  {interactiveState.showFormulas ? getText('hideFormulas') : getText('showFormulas')}
                </Button>

                <Button
                  onClick={() => {
                    // Start dynamic comparison animation
                    setIsRunning(true);
                    setIs10xAccelerated(true);
                  }}
                  variant="outline"
                  className="w-full flex items-center gap-2 bg-gradient-quantum"
                >
                  <Play className="h-4 w-4" />
                  {getText('dynamicComparison')}
                </Button>
              </CardContent>
            </Card>

            {/* Status Card */}
            <Card className={`border-border transition-all duration-300 ${getEfficiencyColor(complexity.acceleration)}`}>
              <CardHeader>
                <CardTitle className="text-lg">{getText('efficiencyTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{getText('acceleration')}:</span>
                    <span className="font-bold text-energy">{complexity.acceleration.toFixed(0)}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{getText('timeSavings')}:</span>
                    <span className="font-bold text-resonance">{complexity.timeSaved.toFixed(1)}%</span>
                  </div>
                  <Progress value={Math.min(100, complexity.acceleration / 100 * 100)} className="mt-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Status Line */}
        <div className="mb-8">
          <Card className="border-border bg-gradient-to-r from-card/50 to-muted/20">
            <CardContent className="p-4">
              <p className="text-center text-lg">
                {getStatusText()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Visualization Tabs */}
        <Tabs defaultValue="growth" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="growth" className="data-[state=active]:bg-neural/20">
              <Activity className="h-4 w-4 mr-2" />
              {getText('intelligenceGrowth')}
            </TabsTrigger>
            <TabsTrigger value="resonance" className="data-[state=active]:bg-resonance/20">
              <Atom className="h-4 w-4 mr-2" />
              {getText('resonance')}
            </TabsTrigger>
            <TabsTrigger value="network" className="data-[state=active]:bg-quantum/20">
              <Network className="h-4 w-4 mr-2" />
              {getText('agentNetwork')}
            </TabsTrigger>
            <TabsTrigger value="complexity" className="data-[state=active]:bg-energy/20">
              <TrendingUp className="h-4 w-4 mr-2" />
              {getText('complexity')}
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
        {interactiveState.showFormulas && (
          <Card className="mt-8 border-border bg-gradient-to-r from-card/50 to-muted/20 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Atom className="h-5 w-5 text-resonance" />
                {getText('mathFoundations')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-neural mb-2">{getText('intelligenceGrowthFormula')}:</h4>
                  <code className="bg-muted/50 p-2 rounded text-sm block">
                    I(t) = I₀ + (δQ₀/α)(e^(αt) - 1)
                  </code>
                </div>
                <div>
                  <h4 className="font-semibold text-quantum mb-2">{getText('resonanceFreq')}:</h4>
                  <code className="bg-muted/50 p-2 rounded text-sm block">
                    ω = (1/D) × Σ(qₖ/mₖ)
                  </code>
                </div>
                <div>
                  <h4 className="font-semibold text-resonance mb-2">{getText('hypothesesGrowth')}:</h4>
                  <code className="bg-muted/50 p-2 rounded text-sm block">
                    Q(t) = Q₀ × e^(αt)
                  </code>
                </div>
                <div>
                  <h4 className="font-semibold text-energy mb-2">{getText('complexityFormula')}:</h4>
                  <code className="bg-muted/50 p-2 rounded text-sm block">
                    O(2^n) → O(n²)
                  </code>
                </div>
                <div>
                  <h4 className="font-semibold text-warning mb-2">{getText('emergence')}:</h4>
                  <code className="bg-muted/50 p-2 rounded text-sm block">
                    I_эм = ΣI_i + Σγ_ij·I_i·I_j
                  </code>
                </div>
                <div>
                  <h4 className="font-semibold text-resonance mb-2">{getText('asiAchievementTime')}:</h4>
                  <code className="bg-muted/50 p-2 rounded text-sm block">
                    T = (1/α)·ln((α·(I_ASI-I₀))/(δ·Q₀) + 1)
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ASISimulator;