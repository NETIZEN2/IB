import * as d3 from 'd3';

/**
 * Render a simple force-directed network graph inside the given element.
 * @param {HTMLElement} element - Container element where the graph will be rendered.
 * @param {{nodes: Array, links: Array}} data - Graph data consisting of nodes and links.
 */
export function renderNetworkGraph(element, data) {
  const width = 400;
  const height = 300;

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const simulation = d3
    .forceSimulation(data.nodes)
    .force(
      'link',
      d3.forceLink(data.links).id((d) => d.id).distance(50)
    )
    .force('charge', d3.forceManyBody().strength(-200))
    .force('center', d3.forceCenter(width / 2, height / 2));

  const link = svg
    .append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .selectAll('line')
    .data(data.links)
    .enter()
    .append('line');

  const node = svg
    .append('g')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .selectAll('circle')
    .data(data.nodes)
    .enter()
    .append('circle')
    .attr('r', 5)
    .attr('fill', '#69b3a2');

  simulation.on('tick', () => {
    link
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y);

    node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
  });
}
