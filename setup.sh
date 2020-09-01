
echo "Inicializando"

systemctl stop mysqld

docker login https://docker.pkg.github.com -u brunoduartec -p 5c0d229c8d57e3e96aab4df2e294d0b00a27c4a2

echo "Baixando a imagem da API"

docker pull docker.pkg.github.com/brunoduartec/aee_tech/aeeapi:latest

echo "Baixando a imagem do front"

docker pull docker.pkg.github.com/brunoduartec/aee_tech_front/aeetechfront:latest

docker-compose up --build -d
