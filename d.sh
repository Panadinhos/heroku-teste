#!/bin/bash
heroku git:remote -a pure-sea-76571 

git add .

git commit -am "make it better"

git push heroku master

git push
