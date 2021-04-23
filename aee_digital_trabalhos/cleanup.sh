container =$(sudo docker ps -aqf "name=aee_digital_trabalhos")
rm -rf /var/lib/docker/containers/$container
systemctl restart docker
