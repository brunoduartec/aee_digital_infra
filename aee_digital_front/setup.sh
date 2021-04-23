echo "Limpando Instancias de Front"
./aee_digital_regionaiscleanup.sh

echo "Inicializando"

cat ~/DOCKER_TOKEN.txt | docker login https://docker.pkg.github.com -u brunoduartec --password-stdin

echo "Baixando a imagem do Front"

docker pull docker.pkg.github.com/brunoduartec/aee_digital_front/aee_digital_front:latest

docker-compose -f ./aee_digital_front/docker-compose.yml up --build -d 