echo "Iniciou cleanup de regionais"
container=$(sudo docker ps -aqf "name=aee_digital_regionais")
rm -rf /var/lib/docker/containers/$container
systemctl restart docker
