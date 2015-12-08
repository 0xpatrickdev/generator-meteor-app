var <%= name %> + 'Routes' = FlowRouter.group({
  prefix: '/<%= name %>',
  name: '<%= name %>',
});

<%= name %> + 'Routes'.route( '/', {
  action: function() {
    BlazeLayout.render('mainLayout', { nav: "navbar", main: "<%= name %>"});
  },
});