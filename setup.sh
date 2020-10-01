
echo "Inicializando"

docker login https://docker.pkg.github.com -u brunoduartec -p df643f7375d20f14dca570d592381011a1a0440b

echo "Baixando a imagem da API"

docker pull docker.pkg.github.com/brunoduartec/aee_tech/aeeapi:latest

echo "Baixando a imagem do front"

docker pull docker.pkg.github.com/brunoduartec/aee_tech_front/aeetechfront:latest

systemctl stop mysqld

docker-compose up --build -d
