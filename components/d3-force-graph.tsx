"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: number;
  label: string;
  size: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
  strength: number;
}

const nodes: Node[] = [
  // Core
  { id: "louis", group: 0, label: "Louis Le", size: 36 },
  // Languages & Frameworks
  { id: "python", group: 1, label: "Python", size: 22 },
  { id: "typescript", group: 1, label: "TypeScript", size: 22 },
  { id: "react", group: 1, label: "React", size: 20 },
  { id: "fastapi", group: 1, label: "FastAPI", size: 20 },
  { id: "nextjs", group: 1, label: "Next.js", size: 18 },
  // AI & ML
  { id: "claude", group: 2, label: "Claude SDK", size: 20 },
  { id: "agno", group: 2, label: "Agno MAS", size: 18 },
  { id: "langfuse", group: 2, label: "Langfuse", size: 16 },
  { id: "llm", group: 2, label: "LLM Pipes", size: 18 },
  // Infrastructure
  { id: "redis", group: 3, label: "Redis", size: 18 },
  { id: "firestore", group: 3, label: "Firestore", size: 16 },
  { id: "docker", group: 3, label: "Docker", size: 18 },
  { id: "railway", group: 3, label: "Railway", size: 16 },
  // Projects
  { id: "grounded", group: 4, label: "Grounded", size: 18 },
  { id: "dex", group: 4, label: "Dex", size: 18 },
  { id: "homiq", group: 4, label: "Homiq", size: 18 },
];

const links: Link[] = [
  { source: "louis", target: "python", strength: 0.8 },
  { source: "louis", target: "typescript", strength: 0.8 },
  { source: "louis", target: "claude", strength: 0.7 },
  { source: "louis", target: "llm", strength: 0.7 },
  { source: "python", target: "fastapi", strength: 0.9 },
  { source: "typescript", target: "react", strength: 0.9 },
  { source: "typescript", target: "nextjs", strength: 0.7 },
  { source: "claude", target: "agno", strength: 0.6 },
  { source: "claude", target: "langfuse", strength: 0.5 },
  { source: "llm", target: "claude", strength: 0.8 },
  { source: "llm", target: "agno", strength: 0.6 },
  { source: "fastapi", target: "redis", strength: 0.7 },
  { source: "fastapi", target: "firestore", strength: 0.6 },
  { source: "docker", target: "railway", strength: 0.7 },
  { source: "fastapi", target: "docker", strength: 0.6 },
  { source: "grounded", target: "react", strength: 0.5 },
  { source: "dex", target: "python", strength: 0.5 },
  { source: "homiq", target: "nextjs", strength: 0.5 },
  { source: "grounded", target: "llm", strength: 0.4 },
  { source: "dex", target: "redis", strength: 0.3 },
  { source: "homiq", target: "llm", strength: 0.4 },
];

// Monochrome + red accent palette (cf0-inspired, institutional)
const groupColors: Record<number, { stroke: string; fill: string }> = {
  0: { stroke: "var(--primary)", fill: "var(--primary)" },           // Core - red
  1: { stroke: "var(--foreground)", fill: "var(--foreground)" },     // Languages - foreground
  2: { stroke: "var(--muted-foreground)", fill: "var(--muted-foreground)" }, // AI - muted
  3: { stroke: "var(--muted-foreground)", fill: "var(--muted-foreground)" }, // Infra - muted
  4: { stroke: "var(--primary)", fill: "var(--primary)" },           // Projects - red accent
};

export function D3ForceGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height: Math.max(height, 500) });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    const { width, height } = dimensions;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g");

    // Zoom
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on("zoom", (event) => g.attr("transform", event.transform));
    svg.call(zoom);

    const simulation = d3.forceSimulation<Node>(nodes)
      .force("link", d3.forceLink<Node, Link>(links).id((d) => d.id).distance(100).strength((d) => d.strength * 0.25))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius((d) => (d as Node).size + 12));

    // Links — thin, clean lines
    const link = g.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "var(--border)")
      .attr("stroke-opacity", 0.3)
      .attr("stroke-width", 1);

    // Node groups
    const node = g.append("g")
      .selectAll<SVGGElement, Node>("g")
      .data(nodes)
      .join("g")
      .style("cursor", "grab");

    // Drag
    const drag = d3.drag<SVGGElement, Node>()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    node.call(drag);

    // Circles — clean, minimal fill
    node.append("circle")
      .attr("r", (d) => d.size)
      .attr("fill", (d) => groupColors[d.group].fill)
      .attr("fill-opacity", (d) => d.group === 0 ? 0.12 : 0.06)
      .attr("stroke", (d) => groupColors[d.group].stroke)
      .attr("stroke-width", (d) => d.group === 0 ? 2 : 1)
      .attr("stroke-opacity", (d) => d.group === 0 ? 0.8 : 0.4);

    // Labels — BELOW the circle, not inside
    node.append("text")
      .text((d) => d.label)
      .attr("text-anchor", "middle")
      .attr("dy", (d) => d.size + 14) // Position below circle
      .attr("fill", "var(--foreground)")
      .attr("font-size", (d) => d.id === "louis" ? "11px" : "9px")
      .attr("font-family", "var(--font-inter), Inter, sans-serif")
      .attr("font-weight", (d) => d.id === "louis" ? "600" : "400")
      .attr("opacity", 0.7)
      .attr("letter-spacing", "0.02em")
      .style("pointer-events", "none");

    // Hover effects
    node.on("mouseenter", function (_event, d) {
      d3.select(this).select("circle")
        .transition().duration(200)
        .attr("fill-opacity", d.group === 0 ? 0.25 : 0.15)
        .attr("stroke-opacity", 0.9)
        .attr("r", d.size * 1.15);

      d3.select(this).select("text")
        .transition().duration(200)
        .attr("opacity", 1)
        .attr("font-weight", "600");

      // Highlight connected links
      link.transition().duration(200)
        .attr("stroke-opacity", (l) => {
          const sId = typeof l.source === "string" ? l.source : (l.source as unknown as Node).id;
          const tId = typeof l.target === "string" ? l.target : (l.target as unknown as Node).id;
          return sId === d.id || tId === d.id ? 0.6 : 0.05;
        })
        .attr("stroke-width", (l) => {
          const sId = typeof l.source === "string" ? l.source : (l.source as unknown as Node).id;
          const tId = typeof l.target === "string" ? l.target : (l.target as unknown as Node).id;
          return sId === d.id || tId === d.id ? 1.5 : 1;
        });
    })
    .on("mouseleave", function (_event, d) {
      d3.select(this).select("circle")
        .transition().duration(200)
        .attr("fill-opacity", d.group === 0 ? 0.12 : 0.06)
        .attr("stroke-opacity", d.group === 0 ? 0.8 : 0.4)
        .attr("r", d.size);

      d3.select(this).select("text")
        .transition().duration(200)
        .attr("opacity", 0.7)
        .attr("font-weight", d.id === "louis" ? "600" : "400");

      link.transition().duration(200)
        .attr("stroke-opacity", 0.3)
        .attr("stroke-width", 1);
    });

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as unknown as Node).x!)
        .attr("y1", (d) => (d.source as unknown as Node).y!)
        .attr("x2", (d) => (d.target as unknown as Node).x!)
        .attr("y2", (d) => (d.target as unknown as Node).y!);
      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    return () => { simulation.stop(); };
  }, [dimensions]);

  return (
    <div ref={containerRef} className="relative w-full h-[500px] md:h-[600px]">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      />
      <div className="absolute bottom-4 left-4 flex gap-6 text-xs text-muted-foreground font-mono tracking-wide">
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[var(--primary)]" /> core + projects</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[var(--foreground)] opacity-50" /> languages</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[var(--muted-foreground)] opacity-50" /> AI + infra</span>
      </div>
    </div>
  );
}
