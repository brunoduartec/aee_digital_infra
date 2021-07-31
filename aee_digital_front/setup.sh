echo "Inicializando"

cat ~/DOCKER_TOKEN.txt | docker login https://docker.pkg.github.com -u brunoduartec --password-stdin

echo "Baixando a imagem do Front"

docker-compose pull

docker-compose -f ./aee_digital_front/docker-compose.yml up --build