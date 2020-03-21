docker build -t sdg-template-1-image .

docker tag sdg-template-1-image registry.heroku.com/sdg-template-1/web


docker push registry.heroku.com/sdg-template-1/web

heroku container:release web -a sdg-template-1