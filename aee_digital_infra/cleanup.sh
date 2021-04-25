echo "Iniciou cleanup de infra"
container=$(sudo docker ps -aqf "name=aee_digital_infra")
rm -rf /var/lib/docker/containers/$container
systemctl restart docker
