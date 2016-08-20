Users = Meteor.users;

//disable any client side operation
Users.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Users.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

