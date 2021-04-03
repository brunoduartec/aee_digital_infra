containers=$(docker ps -a --no-trunc -q)

for container in $containers
do
 echo "Limpando container: $container"
 rm -rf /var/lib/docker/containers/$container

done

echo "Restarting docker"
systemctl restart docker
echo "Cleaned"