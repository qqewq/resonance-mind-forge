import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Zap, Clock, CheckCircle } from 'lucide-react';

interface ComplexityComparisonProps {
  hybridComplexity: number;
  traditionalComplexity: number;
}

const ComplexityComparison: React.FC<ComplexityComparisonProps> = ({
  hybridComplexity,
  traditionalComplexity
}) => {
  const accelerationFactor = traditionalComplexity / hybridComplexity;
  const timeSaved = ((traditionalComplexity - hybridComplexity) / traditionalComplexity) * 100;

  return (
    <div className="space-y-6">
      <Card className="border-energy bg-gradient-to-br from-card to-energy/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-energy" />
            Анализ Вычислительной Сложности
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional Algorithm */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <h3 className="text-lg font-semibold text-destructive">Базовый Алгоритм</h3>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="text-2xl font-mono font-bold text-destructive mb-2">
                  O(2^n)
                </div>
                <div className="text-sm text-muted-foreground">
                  Экспоненциальная сложность
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Операций:</span>
                  <span className="font-mono text-destructive">
                    {traditionalComplexity.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Время выполнения:</span>
                  <span className="font-mono text-destructive">
                    {(traditionalComplexity / 1000000).toFixed(2)}s
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Память:</span>
                  <span className="font-mono text-destructive">
                    {(traditionalComplexity * 64 / 8 / 1024 / 1024).toFixed(1)} МБ
                  </span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                Проверяет все возможные комбинации архитектурных параметров
              </div>
            </div>

            {/* Hybrid Algorithm */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-resonance rounded-full animate-pulse-glow"></div>
                <h3 className="text-lg font-semibold text-resonance">Гибридный Алгоритм</h3>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg border border-resonance/20">
                <div className="text-2xl font-mono font-bold text-resonance mb-2">
                  O(n²)
                </div>
                <div className="text-sm text-muted-foreground">
                  Полиномиальная сложность
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Операций:</span>
                  <span className="font-mono text-resonance">
                    {hybridComplexity.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Время выполнения:</span>
                  <span className="font-mono text-resonance">
                    {(hybridComplexity / 1000000).toFixed(4)}s
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Память:</span>
                  <span className="font-mono text-resonance">
                    {(hybridComplexity * 64 / 8 / 1024).toFixed(2)} КБ
                  </span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                Использует резонансный анализ для поиска критических точек
              </div>
            </div>
          </div>

          {/* Performance Comparison */}
          <div className="mt-8 p-6 bg-gradient-to-r from-resonance/10 to-energy/10 rounded-lg border border-resonance/20">
            <h4 className="text-lg font-semibold text-center mb-6">Преимущества Гибридного Подхода</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-energy mb-2">
                  {accelerationFactor.toFixed(0)}x
                </div>
                <div className="text-sm text-muted-foreground">
                  Ускорение
                </div>
                <Zap className="h-6 w-6 text-energy mx-auto mt-2" />
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-resonance mb-2">
                  {timeSaved.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Экономия времени
                </div>
                <Clock className="h-6 w-6 text-resonance mx-auto mt-2" />
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-neural mb-2">
                  ASI
                </div>
                <div className="text-sm text-muted-foreground">
                  Достижимость
                </div>
                <CheckCircle className="h-6 w-6 text-neural mx-auto mt-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mathematical Proof */}
      <Card className="border-quantum bg-gradient-to-br from-card to-quantum/5">
        <CardHeader>
          <CardTitle>Математическое Доказательство</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-quantum mb-2">Теорема о снижении сложности:</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Гибридный резонансный алгоритм снижает сложность поиска оптимальной архитектуры 
              с экспоненциальной до полиномиальной.
            </p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <div>
              <strong>1. Пространство параметров:</strong>
              <code className="block mt-1 text-sm">n-мерный куб с 2^n вершинами</code>
            </div>
            
            <div>
              <strong>2. Базовый алгоритм:</strong>
              <code className="block mt-1 text-sm">Проверяет все 2^n комбинаций → O(2^n)</code>
            </div>
            
            <div>
              <strong>3. Резонансные точки:</strong>
              <code className="block mt-1 text-sm">|Ω| = O(n²) критических точек</code>
            </div>
            
            <div>
              <strong>4. Пересечения гиперповерхностей:</strong>
              <code className="block mt-1 text-sm">n гиперповерхностей в n-мерном пространстве ≤ полином 2-й степени</code>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm font-semibold text-energy">Результат:</div>
            <div className="text-lg font-mono bg-muted/50 p-2 rounded mt-1">
              O(2^n) → O(n²)
            </div>
          </div>

          <div className="mt-4 text-xs text-muted-foreground">
            Для n = 20: 1,048,576 → 400 операций (ускорение в 2621 раз)
          </div>
        </CardContent>
      </Card>

      {/* Real-world Impact */}
      <Card className="border-neural bg-gradient-to-br from-card to-neural/5">
        <CardHeader>
          <CardTitle>Практическое Влияние</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-neural mb-3">Традиционный ИИ</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-destructive">❌</span>
                  <span>Экспоненциальная сложность препятствует самосовершенствованию</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">❌</span>
                  <span>Ограничен фиксированной архитектурой</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">❌</span>
                  <span>Невозможность достижения ASI из-за вычислительных ограничений</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">❌</span>
                  <span>Линейный или логарифмический рост возможностей</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-neural mb-3">Гибридный Алгоритм</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-resonance">✅</span>
                  <span>Полиномиальная сложность позволяет рекурсивное самосовершенствование</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-resonance">✅</span>
                  <span>Динамическое изменение собственной архитектуры</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-resonance">✅</span>
                  <span>Математически обоснованный путь к ASI</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-resonance">✅</span>
                  <span>Экспоненциальный рост интеллекта: I(t) = I₀ + (δQ₀/α)(e^(αt) - 1)</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplexityComparison;