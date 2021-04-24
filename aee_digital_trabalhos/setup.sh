echo "Limpando Instancias de Trabalhos"
./aee_digital_trabalhos/cleanup.sh

echo "Inicializando"

cat ~/DOCKER_TOKEN.txt | docker login https://docker.pkg.github.com -u brunoduartec --password-stdin

echo "Baixando a imagem das APIs"

docker pull docker.pkg.github.com/brunoduartec/aee_digital_trabalhos/aee_digital_trabalhos:latest

docker-compose -f ./aee_digital_trabalhos/docker-compose.yml up --build