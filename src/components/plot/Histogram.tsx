import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type Props<T> = {
  values: T[]
  selector: (v: T) => number
  xLabel: string
  yLabel: string
  binSize?: number
}

export const Histogram = <T, >(
  {
    values,
    selector,
    xLabel,
    yLabel,
    binSize = 40,
  }: Props<T>,
) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {

    // Declare the chart dimensions and margins.
    const width = 600;
    const height = 300;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 30;
    const marginLeft = 40;

    const bins = d3.bin<T, number>()
      .thresholds(binSize)
      .value((d) => selector(d))
      (values);

    const x = d3.scaleLinear()
      .domain([bins[0].x0!, bins[bins.length - 1].x1!])
      .range([marginLeft, width - marginRight]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, (d) => d.length)!])
      .range([height - marginBottom, marginTop]);

    const svg = d3.create('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto;');

    // Add a rect for each bin.
    svg.append('g')
      .attr('fill', 'steelblue')
      .selectAll()
      .data(bins)
      .join('rect')
      .attr('x', (d) => x(d.x0!) + 1)
      .attr('width', (d) => x(d.x1!) - x(d.x0!) - 1)
      .attr('y', (d) => y(d.length))
      .attr('height', (d) => y(0) - y(d.length));

    svg.append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
      .call((g) => g.append('text')
        .attr('x', width)
        .attr('y', marginBottom - 4)
        .attr('fill', 'currentColor')
        .attr('text-anchor', 'end')
        .text(xLabel));

    svg.append('g')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call((g) => g.select('.domain').remove())
      .call((g) => g.append('text')
        .attr('x', -marginLeft)
        .attr('y', 10)
        .attr('fill', 'currentColor')
        .attr('text-anchor', 'start')
        .text(yLabel));

    const node = svg.node()!;
    ref.current?.append(node);
    return () => {
      node.remove();
    };
  });
  return (
    <div ref={ref}>

    </div>
  );
};