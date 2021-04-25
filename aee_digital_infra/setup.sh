echo "Limpando Instancias de Infra"
./aee_digital_infra/cleanup.sh

echo "Inicializando"

cat ~/DOCKER_TOKEN.txt | docker login https://docker.pkg.github.com -u brunoduartec --password-stdin

echo "Baixando a imagem do Infra"

docker pull docker.pkg.github.com/brunoduartec/aee_digital_infra/aee_digital_infra:latest

docker-compose -f ./aee_digital_infra/docker-compose.yml up --build