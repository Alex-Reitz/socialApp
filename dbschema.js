let db = {
  users: [
    {
      userId: "jakhsdf823hjkdashf",
      email: "user@email.com",
      handle: "user",
      createdAt: "2019asjkdflalsf",
      imageUrl: "image/dhjfsaklf/hajksdlf",
      bio: "Hello, my name is user, nice to meet you.",
      website: "https://user.com",
      location: "USA"
    }
  ],
  screams: [
    {
      userHandle: "user",
      body: "this is the scream body",
      createdAt: "2020-03-28T14:44:03.306Z",
      likeCount: 5,
      commentCount: 2
    }
  ],
  comments: [
    {
      userHandle: "user",
      screamId: "jdshafkajdsfha",
      body: "Nice one mate",
      createdAt: "29shkldjfasjlkdf"
    }
  ],
  notifications: [
    {
      recipient: "user",
      sender: "john",
      read: "true | false",
      screamId: "hjkasdfhkajsdf",
      type: "like | comment",
      createdAt: "2019-03-15t10"
    }
  ]
};

const userDetails = {
  //Redux data
  credentials: {
    userId: "jakhsdf823hjkdashf",
    email: "user@email.com",
    handle: "user",
    createdAt: "2019asjkdflalsf",
    imageUrl: "image/dhjfsaklf/hajksdlf",
    bio: "Hello, my name is user, nice to meet you.",
    website: "https://user.com",
    location: "USA"
  },
  likes: [
    {
      userHandle: "user",
      screamId: "hjasdhfkjhasd"
    },
    {
      userHandle: "user",
      screamId: "98lkjsadflasdjf"
    }
  ]
};
