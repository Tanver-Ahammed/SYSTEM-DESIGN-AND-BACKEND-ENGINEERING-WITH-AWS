
docker network create lb  
docker build -t my-node-app .  

docker run -d --name node-app1 --network lb -p 3001:3000 my-node-app
docker run -d --name node-app2 --network lb -p 3002:3000 my-node-app

docker run -d --name nginx --network lb -p 80:80 nginx:latest    

docker cp ./nginx.conf nginx:/etc/nginx/conf.d/default.conf 

docker restart nginx
