var chart = function(id, poll) {
  //Remove any existing chart
  d3.select(id).selectAll('svg').remove()
  //Determine max length of x-axis labels
  d3.select('body').append('span').attr('id', 'test')
  var xlabelWidth = d3.max(poll.options, function(d) {
    var test = d3.select('#test').text(d.item)
    return test[0][0].offsetWidth + 20
  })
  d3.select('#test').remove()
  //Width and height
  var margin = {top: 20, right: 20, bottom: xlabelWidth, left: 60}
  var w = 500
	var h = 300 + xlabelWidth
  var innerWidth = w - margin.left - margin.right
  var innerHeight = h - margin.top - margin.bottom

	//Create scale functions
	var xScale = d3.scale.ordinal()
						 .domain(poll.options.map(function(d) { return d.item }))
						 .rangeRoundBands([0, innerWidth], .05)

	var yScale = d3.scale.linear()
						 .domain([0, d3.max(poll.options, function(d) { return d.votes })])
						 .range([innerHeight, 0])
						 
	var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')
      .ticks(Math.min(d3.max(poll.options, function(d) { return d.votes }), 10))
      
	//Create SVG element
	var svg = d3.select(id)
				.append('svg')
				.attr('width', w)
				.attr('height', h)
				.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

	svg.selectAll('bar')
	   .data(poll.options)
	   .enter()
	   .append('rect')
	   .attr('class', 'bar')
	   .attr('width', xScale.rangeBand())
	   .attr('height', function(d) { return innerHeight - yScale(d.votes) })
	   .attr('x', function(d) {
	   		return xScale(d.item)
	   })
	   .attr('y', function(d) {
	   		return yScale(d.votes)
	   })
        
  svg.append('g')
      .attr('class', 'axis xAxis')
      .attr('transform', 'translate(0,' + innerHeight + ')')
      .call(xAxis)
    .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '-.55em')
      .attr('transform', 'rotate(-90)' )

  svg.append('g')
      .attr('class', 'axis yAxis')
      .call(yAxis)
    .select('text')
      .text('votes')
      .style('text-anchor', 'middle')
      .attr('x', innerHeight / 2)
      .attr('y', -50)
      .attr('transform', 'rotate(-90)' )
}