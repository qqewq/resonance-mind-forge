import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp } from 'lucide-react';

interface IntelligenceGrowthChartProps {
  simulationTime: number;
  intelligence: number;
  parameters: {
    alpha: number;
    delta: number;
  };
  isRunning: boolean;
}

const IntelligenceGrowthChart: React.FC<IntelligenceGrowthChartProps> = ({
  simulationTime,
  intelligence,
  parameters,
  isRunning
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dataPointsRef = useRef<{ time: number; intelligence: number; baseline: number }[]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Add current data point
    if (isRunning) {
      const baselineIntelligence = 1 + 0.01 * simulationTime; // Linear growth for comparison
      dataPointsRef.current.push({
        time: simulationTime,
        intelligence,
        baseline: baselineIntelligence
      });

      // Keep only last 500 points for performance
      if (dataPointsRef.current.length > 500) {
        dataPointsRef.current = dataPointsRef.current.slice(-500);
      }
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    if (dataPointsRef.current.length < 2) return;

    const maxTime = Math.max(...dataPointsRef.current.map(p => p.time));
    const maxIntelligence = Math.max(...dataPointsRef.current.map(p => Math.max(p.intelligence, p.baseline)));

    // Draw grid
    ctx.strokeStyle = 'rgba(100, 100, 100, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i / 10) * (width - 2 * padding);
      const y = padding + (i / 10) * (height - 2 * padding);
      
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw baseline (traditional algorithm)
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    for (let i = 0; i < dataPointsRef.current.length; i++) {
      const point = dataPointsRef.current[i];
      const x = padding + (point.time / maxTime) * (width - 2 * padding);
      const y = height - padding - (point.baseline / maxIntelligence) * (height - 2 * padding);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw hybrid algorithm curve
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, 'hsl(142, 86%, 56%)');
    gradient.addColorStop(1, 'hsl(284, 80%, 65%)');
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i < dataPointsRef.current.length; i++) {
      const point = dataPointsRef.current[i];
      const x = padding + (point.time / maxTime) * (width - 2 * padding);
      const y = height - padding - (point.intelligence / maxIntelligence) * (height - 2 * padding);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Add glow effect
    ctx.shadowColor = 'hsl(142, 86%, 56%)';
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw labels
    ctx.fillStyle = 'rgba(220, 220, 220, 0.8)';
    ctx.font = '12px monospace';
    ctx.fillText('Время', width - 60, height - 10);
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Интеллект', 0, 0);
    ctx.restore();

    // Draw current values
    ctx.fillStyle = 'hsl(142, 86%, 56%)';
    ctx.font = '14px monospace';
    ctx.fillText(`Гибридный: ${intelligence.toFixed(2)}x`, width - 200, 30);
    
    ctx.fillStyle = '#6b7280';
    ctx.fillText(`Базовый: ${dataPointsRef.current[dataPointsRef.current.length - 1]?.baseline.toFixed(2)}x`, width - 200, 50);

  }, [simulationTime, intelligence, isRunning]);

  const reset = () => {
    dataPointsRef.current = [];
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  useEffect(() => {
    if (!isRunning && simulationTime === 0) {
      reset();
    }
  }, [isRunning, simulationTime]);

  return (
    <Card className="border-neural bg-gradient-to-br from-card to-neural/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-neural" />
          Экспоненциальный Рост Интеллекта
          <div className="ml-auto text-sm text-muted-foreground">
            α = {parameters.alpha}, δ = {parameters.delta}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="w-full h-auto border border-border rounded-lg bg-background/50"
        />
        <div className="mt-4 text-sm text-muted-foreground space-y-1">
          <p>🟢 <strong>Гибридный алгоритм:</strong> I(t) = I₀ + (δQ₀/α)(e^(αt) - 1)</p>
          <p>⚪ <strong>Базовый алгоритм:</strong> Линейный рост</p>
          <p className="text-neural">
            <TrendingUp className="inline h-4 w-4 mr-1" />
            Ускорение: {intelligence > 1 ? ((intelligence - 1) * 100).toFixed(1) : '0'}% выше базового
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntelligenceGrowthChart;
