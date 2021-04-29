echo "Downloading Images"

docker-compose pull

echo "Deploying....."

docker-compose up -d
