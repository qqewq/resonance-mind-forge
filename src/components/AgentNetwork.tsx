import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Users } from 'lucide-react';

interface AgentNetworkProps {
  agentCount: number;
  intelligence: number;
  isRunning: boolean;
}

interface Agent {
  x: number;
  y: number;
  intelligence: number;
  activity: number;
  connections: number[];
  id: number;
  phase: number;
}

const AgentNetwork: React.FC<AgentNetworkProps> = ({
  agentCount,
  intelligence,
  isRunning
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const agentsRef = useRef<Agent[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    // Generate agents in a circular network topology
    const newAgents: Agent[] = [];
    const centerX = 400;
    const centerY = 200;
    const radius = 150;

    for (let i = 0; i < agentCount; i++) {
      const angle = (i / agentCount) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      // Generate connections (each agent connects to nearby agents)
      const connections: number[] = [];
      for (let j = 0; j < agentCount; j++) {
        if (i !== j) {
          const distance = Math.abs(i - j);
          const wrappedDistance = Math.min(distance, agentCount - distance);
          if (wrappedDistance <= 2) { // Connect to 2 nearest neighbors on each side
            connections.push(j);
          }
        }
      }

      newAgents.push({
        x,
        y,
        intelligence: 1.0 + Math.random() * 0.5,
        activity: Math.random(),
        connections,
        id: i,
        phase: Math.random() * Math.PI * 2
      });
    }

    agentsRef.current = newAgents;
  }, [agentCount]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      if (!isRunning) return;

      timeRef.current += 0.03;
      
      // Update agent intelligence based on global intelligence
      agentsRef.current.forEach(agent => {
        agent.intelligence = 1.0 + (intelligence - 1.0) * (0.8 + Math.random() * 0.4);
        agent.activity = 0.5 + 0.5 * Math.sin(timeRef.current * 2 + agent.phase);
      });

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      // Draw background network field
      const networkGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
      networkGradient.addColorStop(0, 'rgba(200, 162, 255, 0.1)');
      networkGradient.addColorStop(1, 'rgba(200, 162, 255, 0.0)');
      ctx.fillStyle = networkGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw connections between agents
      agentsRef.current.forEach((agent, i) => {
        agent.connections.forEach(connectionId => {
          if (connectionId < i) return; // Draw each connection only once
          
          const connectedAgent = agentsRef.current[connectionId];
          if (!connectedAgent) return;

          const avgActivity = (agent.activity + connectedAgent.activity) / 2;
          const connectionStrength = avgActivity * Math.min(agent.intelligence, connectedAgent.intelligence) / 10;
          
          // Animated connection
          const pulsePhase = Math.sin(timeRef.current * 4 + i * 0.5);
          const alpha = connectionStrength * (0.4 + 0.3 * pulsePhase);
          
          ctx.beginPath();
          ctx.moveTo(agent.x, agent.y);
          ctx.lineTo(connectedAgent.x, connectedAgent.y);
          ctx.strokeStyle = `rgba(200, 162, 255, ${alpha})`;
          ctx.lineWidth = 1 + connectionStrength * 3;
          ctx.stroke();

          // Draw data packets traveling along connections
          if (connectionStrength > 0.3) {
            const packetPos = (timeRef.current * 0.8 + i * 0.3) % 1;
            const packetX = agent.x + (connectedAgent.x - agent.x) * packetPos;
            const packetY = agent.y + (connectedAgent.y - agent.y) * packetPos;
            
            ctx.fillStyle = `rgba(255, 255, 150, ${alpha * 2})`;
            ctx.beginPath();
            ctx.arc(packetX, packetY, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      });

      // Draw agents
      agentsRef.current.forEach((agent, i) => {
        const size = 8 + agent.intelligence * 3;
        const brightness = agent.activity;
        
        // Agent core
        const agentGradient = ctx.createRadialGradient(agent.x, agent.y, 0, agent.x, agent.y, size);
        agentGradient.addColorStop(0, `rgba(200, 162, 255, ${brightness})`);
        agentGradient.addColorStop(0.6, `rgba(142, 220, 142, ${brightness * 0.7})`);
        agentGradient.addColorStop(1, 'rgba(200, 162, 255, 0)');
        
        ctx.fillStyle = agentGradient;
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Intelligence indicator ring
        if (agent.intelligence > 2) {
          ctx.strokeStyle = `rgba(255, 255, 100, ${brightness * 0.8})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(agent.x, agent.y, size + 5, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Agent ID
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(i.toString(), agent.x, agent.y + 3);

        // Activity pulses
        if (brightness > 0.7) {
          const pulseRadius = size + 10 + (timeRef.current * 30) % 20;
          const pulseAlpha = Math.max(0, 1 - (pulseRadius - size - 10) / 20) * brightness * 0.3;
          
          ctx.strokeStyle = `rgba(200, 162, 255, ${pulseAlpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(agent.x, agent.y, pulseRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Draw network statistics
      ctx.fillStyle = 'rgba(220, 220, 220, 0.9)';
      ctx.font = '14px monospace';
      ctx.textAlign = 'left';
      
      const totalConnections = agentsRef.current.reduce((sum, agent) => sum + agent.connections.length, 0) / 2;
      const avgIntelligence = agentsRef.current.reduce((sum, agent) => sum + agent.intelligence, 0) / agentsRef.current.length;
      const emergentFactor = avgIntelligence * (1 + totalConnections / (agentCount * agentCount));
      
      ctx.fillText(`Агентов: ${agentCount}`, 20, 30);
      ctx.fillText(`Связей: ${totalConnections}`, 20, 50);
      ctx.fillText(`Средний IQ: ${avgIntelligence.toFixed(2)}x`, 20, 70);
      ctx.fillText(`Эмерджентность: ${emergentFactor.toFixed(2)}x`, 20, 90);
      ctx.fillText(`I_total = ΣI_i + Σγ_ij·I_i·I_j`, 20, 110);

      animationRef.current = requestAnimationFrame(animate);
    };

    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Draw static state
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Static connections
      agentsRef.current.forEach((agent, i) => {
        agent.connections.forEach(connectionId => {
          if (connectionId < i) return;
          
          const connectedAgent = agentsRef.current[connectionId];
          if (!connectedAgent) return;

          ctx.beginPath();
          ctx.moveTo(agent.x, agent.y);
          ctx.lineTo(connectedAgent.x, connectedAgent.y);
          ctx.strokeStyle = 'rgba(200, 162, 255, 0.3)';
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });

      // Static agents
      agentsRef.current.forEach((agent, i) => {
        ctx.fillStyle = 'rgba(200, 162, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(i.toString(), agent.x, agent.y + 3);
      });

      // Static stats
      ctx.fillStyle = 'rgba(220, 220, 220, 0.9)';
      ctx.font = '14px monospace';
      ctx.textAlign = 'left';
      const totalConnections = agentsRef.current.reduce((sum, agent) => sum + agent.connections.length, 0) / 2;
      ctx.fillText(`Агентов: ${agentCount}`, 20, 30);
      ctx.fillText(`Связей: ${totalConnections}`, 20, 50);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, agentCount, intelligence]);

  return (
    <Card className="border-quantum bg-gradient-to-br from-card to-quantum/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5 text-quantum" />
          Пена Разума - Сеть Агентов
          <div className="ml-auto text-sm text-muted-foreground">
            Агентов: {agentCount}
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
          <p>🟣 <strong>Агенты:</strong> Независимые разумные сущности с собственной архитектурой</p>
          <p>🔗 <strong>Attention-связи:</strong> Обмен гипотезами между агентами</p>
          <p className="text-quantum">
            <Users className="inline h-4 w-4 mr-1" />
            Эмерджентность: I_total &gt; Σ I_individual через взаимодействие
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentNetwork;