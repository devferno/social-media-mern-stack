# social-media-mern-stack
so this is a just an social media app created with the mern stack
register : post /regiser
login : post /login

update a user : put /users/:id
delete a user : delete /users/:id
get a user : get /users/:id
follow a user : put /:id/follow
unfollow a user : put /:id/unfollow

create a post : post /posts
update a post : put /posts/:id
delete a post : delete /posts/:id
like/dislike a post : put /posts/:id/like
get friends post : get /posts/timeline/all
get a post : get /posts/:id
