FlowRouter.route( '/', {
  action: function() {
    // Do whatever we need to do when we visit http://app.com/terms.
    console.log( "Okay, we're on the Home page!" );
  },
  name: 'home' // Optional route name.
});