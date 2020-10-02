
echo "Inicializando"

cat ~/DOCKER_TOKEN.txt | docker login https://docker.pkg.github.com -u brunoduartec --password-stdin

echo "Baixando a imagem da API"

docker pull docker.pkg.github.com/brunoduartec/aee_tech/aeeapi:latest

echo "Baixando a imagem do front"

docker pull docker.pkg.github.com/brunoduartec/aee_tech_front/aeetechfront:latest

docker-compose up --build -d
