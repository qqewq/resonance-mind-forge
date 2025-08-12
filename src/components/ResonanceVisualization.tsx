import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Atom, Zap } from 'lucide-react';

interface ResonanceVisualizationProps {
  resonancePoints: number;
  parameters: {
    agentCount: number;
    resonanceStrength: number;
  };
  isRunning: boolean;
}

interface ResonancePoint {
  x: number;
  y: number;
  intensity: number;
  phase: number;
  id: number;
}

const ResonanceVisualization: React.FC<ResonanceVisualizationProps> = ({
  resonancePoints,
  parameters,
  isRunning
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const resonancePointsRef = useRef<ResonancePoint[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    // Generate resonance points based on current parameters
    const newPoints: ResonancePoint[] = [];
    for (let i = 0; i < resonancePoints; i++) {
      newPoints.push({
        x: Math.random() * 800,
        y: Math.random() * 400,
        intensity: 0.5 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        id: i
      });
    }
    resonancePointsRef.current = newPoints;
  }, [resonancePoints]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      if (!isRunning) return;

      timeRef.current += 0.05;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      // Draw background field
      const fieldGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
      fieldGradient.addColorStop(0, 'rgba(142, 220, 142, 0.1)');
      fieldGradient.addColorStop(1, 'rgba(142, 220, 142, 0.0)');
      ctx.fillStyle = fieldGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw resonance points and their interactions
      resonancePointsRef.current.forEach((point, i) => {
        const currentIntensity = point.intensity * (1 + 0.3 * Math.sin(timeRef.current * 2 + point.phase));
        
        // Draw resonance waves
        for (let wave = 0; wave < 3; wave++) {
          const waveRadius = (timeRef.current * 50 + wave * 30) % 150;
          const alpha = Math.max(0, 1 - waveRadius / 150) * currentIntensity * 0.3;
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, waveRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(142, 220, 142, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Draw the resonance point itself
        const coreGradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 15);
        coreGradient.addColorStop(0, `rgba(142, 220, 142, ${currentIntensity})`);
        coreGradient.addColorStop(0.7, `rgba(200, 162, 255, ${currentIntensity * 0.7})`);
        coreGradient.addColorStop(1, 'rgba(200, 162, 255, 0)');
        
        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 8 + currentIntensity * 5, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections between nearby points
        resonancePointsRef.current.forEach((otherPoint, j) => {
          if (i >= j) return;
          
          const dx = otherPoint.x - point.x;
          const dy = otherPoint.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const connectionStrength = (150 - distance) / 150;
            const alpha = connectionStrength * currentIntensity * 0.4;
            
            // Animate connection
            const connectionPhase = Math.sin(timeRef.current * 3 + distance * 0.01);
            const animatedAlpha = alpha * (0.7 + 0.3 * connectionPhase);
            
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.strokeStyle = `rgba(200, 162, 255, ${animatedAlpha})`;
            ctx.lineWidth = 1 + connectionStrength * 2;
            ctx.stroke();

            // Draw energy particles along connection
            if (connectionStrength > 0.5) {
              const particlePos = (timeRef.current * 0.5) % 1;
              const particleX = point.x + dx * particlePos;
              const particleY = point.y + dy * particlePos;
              
              ctx.fillStyle = `rgba(255, 255, 100, ${animatedAlpha * 2})`;
              ctx.beginPath();
              ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });
      });

      // Draw fractal dimension visualization
      ctx.fillStyle = 'rgba(220, 220, 220, 0.8)';
      ctx.font = '14px monospace';
      const fractalDim = resonancePoints > 0 ? Math.log(resonancePoints) / Math.log(parameters.agentCount) : 0;
      ctx.fillText(`Фрактальная размерность D = ${fractalDim.toFixed(2)}`, 20, 30);
      ctx.fillText(`Резонансных точек: ${resonancePoints}`, 20, 50);
      ctx.fillText(`ω = (1/D) × Σ(qₖ/mₖ) = ${(1/Math.max(fractalDim, 0.1) * parameters.resonanceStrength).toFixed(2)}`, 20, 70);

      animationRef.current = requestAnimationFrame(animate);
    };

    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Draw static state
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      resonancePointsRef.current.forEach(point => {
        const coreGradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 15);
        coreGradient.addColorStop(0, `rgba(142, 220, 142, ${point.intensity * 0.3})`);
        coreGradient.addColorStop(1, 'rgba(142, 220, 142, 0)');
        
        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw static info
      ctx.fillStyle = 'rgba(220, 220, 220, 0.8)';
      ctx.font = '14px monospace';
      const fractalDim = resonancePoints > 0 ? Math.log(resonancePoints) / Math.log(parameters.agentCount) : 0;
      ctx.fillText(`Фрактальная размерность D = ${fractalDim.toFixed(2)}`, 20, 30);
      ctx.fillText(`Резонансных точек: ${resonancePoints}`, 20, 50);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, resonancePoints, parameters]);

  return (
    <Card className="border-resonance bg-gradient-to-br from-card to-resonance/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Atom className="h-5 w-5 text-resonance" />
          Резонансный Анализ
          <div className="ml-auto text-sm text-muted-foreground">
            Сила: {parameters.resonanceStrength}x
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
          <p>🔵 <strong>Резонансные точки:</strong> Области максимального отклика системы</p>
          <p>🟣 <strong>Связи:</strong> Взаимодействие между точками через attention-механизмы</p>
          <p className="text-resonance">
            <Zap className="inline h-4 w-4 mr-1" />
            Малое изменение в резонансной точке → Большой эффект в системе
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResonanceVisualization;