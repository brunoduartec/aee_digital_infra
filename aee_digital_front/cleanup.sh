echo "Iniciou cleanup de front"
container=$(sudo docker ps -aqf "name=aee_digital_front")
rm -rf /var/lib/docker/containers/$container
systemctl restart docker
