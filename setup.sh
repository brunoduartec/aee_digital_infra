echo "Limpando Instancias"
./cleanup.sh

echo "Inicializando"

cat ~/DOCKER_TOKEN.txt | docker login https://docker.pkg.github.com -u brunoduartec --password-stdin

echo "Baixando imagens"

docker-compose pull

echo "Deploying....."

docker-compose up -d
