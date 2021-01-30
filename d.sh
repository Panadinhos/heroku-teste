#!/bin/bash
heroku git:remote -a pure-sea-76571 

git add .

echo -n 'git commit -m '

read cm

git commit -am "$cm"

git push heroku master

git push
