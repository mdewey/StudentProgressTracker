docker build -t sdg-student-tracker-image .

docker tag sdg-student-tracker-image registry.heroku.com/sdg-student-tracker/web


docker push registry.heroku.com/sdg-student-tracker/web

heroku container:release web -a sdg-student-tracker