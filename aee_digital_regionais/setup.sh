echo "Limpando Instancias de Regionais"
./aee_digital_regionais/cleanup.sh

echo "Inicializando"

cat ~/DOCKER_TOKEN.txt | docker login https://docker.pkg.github.com -u brunoduartec --password-stdin

echo "Baixando a imagem das APIs"

docker pull docker.pkg.github.com/brunoduartec/aee_digital_regionais/aee_digital_regionais:latest

docker-compose up --build -d