echo "Limpando Instancias"
./cleanup.sh

echo "Inicializando"

cat ~/DOCKER_TOKEN.txt | docker login https://docker.pkg.github.com -u brunoduartec --password-stdin

echo "Baixando a imagem das APIs"

docker pull docker.pkg.github.com/brunoduartec/aee_digital_regionais/aee_digital_regionais:latest

docker pull docker.pkg.github.com/brunoduartec/aee_digital_trabalhos/aee_digital_trabalhos:latest


echo "Baixando a imagem do front"

docker pull docker.pkg.github.com/brunoduartec/aee_digital_front/aee_digital_front:latest

echo "Baixando a imagem do Infra"

docker pull docker.pkg.github.com/brunoduartec/aee_digital_infra/aee_digital_infra:latest

echo "Deploying....."

docker-compose up --build -d
