########### COMANDOS DOCKER 

Dica: Colocar sempre ao final do arquivo Dockerfile os parametros que mais mudam pois evita que o docker recompile todas as layers.

## baixa a imagem do debian e verifica a versão
- docker container run debian bash --version 

## mostra os containers ativos.
- docker ps 

## mostra todos até os parados
- docker ps -a 

## remove o container após execução.
- docker container run --rm debian bash --version 

## entra no terminal do container de forma iterativa
- docker container run -it debian bash 

## cria um container com o nome mydeb 
- docker container run --name mydeb -it debian bash  

## reutiliza o container com o name mydeb e attacha o terminal ao modo iterativo
- docker container start -ai mydeb 

## a porta 8080 é a porta que será exposta fora do container (externamente)
## a porta 80 será utilizada dentro do container e será instalada a imagem do nginx.
- docker container run -p 8080:80 nginx 

## a flag -v cria um mapeamento de pastas da pasta html para a pasta not-found na maquina host.
- docker container run -p 8080:80 -v C:\Users\p_913253\Desktop\curso-docker\not-found:/usr/share/nginx/html nginx
	
## mapeamento do diretório corrente no local da pasta html do nginx
- docker container run -p 8080:80 -v %cd%:/usr/share/nginx/html nginx 

## Executa o container em modo background
- docker container run -d --name ex-daemon-basic -p 8080:80 -v %cd%:/usr/share/nginx/html nginx 

## Apresenta os logs do container
- docker container logs ex-daemon-basic 

## informações sobre o container 
- docker container inspect ex-daemon-basic 

## executa um comando dentro do container.
- docker container exec ex-daemon-basic uname -or 

## baixa a última versão do redis.
- docker image pull redis:latest 

## Inspeciona a imagem.
- docker image inspect redis:latest 

## cria uma tag da image redis em sua última versão estavel.
- docker image tag redis:latest cod3r-redis 

## faz o build da imagem apartir de um dockerfile e o nomeia como ex-simple-build.
- docker image build -t ex-simple-build . 

## Executa o container.
- docker container run -p 80:80 ex-simple-build 

## Builda o arquivo dockerfile no diretorio corrente e o nomeia como ex-build-arg
- docker image build -t ex-build-arg . 

## Executa o bash e apresenta a variável.
- docker container run ex-build-arg bash -c "echo $S3_BUCKET" 

## Executa o build com argumentos.
- docker image build --build-arg S3_BUCKET=myapp -t ex-build-arg . 

## Inspeciona a imagem com filtros para saber quem é o mantenedor.
- docker image inspect --format="{{index .Config.Labels \"maintainer\"}}" ex-build-arg 

- docker image build -t ex-build-dev .

## builda o container mapeando o volume da pasta local para /app
- docker container run -it -v %cd%:/app -p 80:8000 --name python-server ex-build-dev 

## lê o arquivo de log de um outro container.
- docker container run -it --volumes-from=python-server debian cat /log/http-server.log  

*********** Subir uma image para o docker hub

## Cria uma tag apartir de uma imagem.
- docker image tag ex-simple-build dockercod3r/simple-build:1.0 

## uma vez logado é possivel fazer o push da imagem.
- docker login --username=""  

- password:

 ## Envia a imagem para o repositorio.
- docker image push dockercod3r/simple-build:1.0

**********************************************************

***********  Redes com docker ****************************

## cria o container com o tipo de rede none.
- docker container run -d --net none debian  

## com a flag --rm remove o container após a sua execução.
- docker container run --rm --net none alpine ash -c "ifconfig" 

## Inspeciona a interface de rede bridge.
- docker network inspect bridge 

## Cria um continer chamado container1 e o comando sleep fica rodando
- docker container run -d --name container1 alpine sleep 1000 

## Roda
- docker container exec -it container1 ifconfig  

## Executa o ping em um outro container
- docker container exec -it container1 ping 172.17.0.3 

## Cria uma nova rede com docker.
- docker network create --driver bridge rede_nova 

## Cria um novo container com a rede nova.
- docker container run -d --name container3 --net rede_nova alpine sleep 1000 

## Roda o container e executa o comando ifconfig
- docker container exec -it container3 ifconfig 

## Tenta pingar no container1
- docker container exec -it container3 ping 172.17.0.3 

## Connecta o container3 criado com a rede_nova com a rede bridge, ele cria duas interfaces de rede
- docker network connect bridge container3 

 ## disconecta o container3 da rede bridge.
- docker network disconnect bridge container3

## Cria um container docker com o tipo de rede host 
- docker container run -d --name container4 --net host alpine sleep 1000

## Roda o compose do docker 
- docker-compose up

## Roda o compose do docker em modo daemon
- docker-compose up -d 

## mostra os serviços que estão rodando
- docker-compose ps

## mostra todos os bancos de dados
- docker-compose exec db psql -U postgres -c '\l'

## Para todos os serviços e remove a rede associada.
- docker-compose down 

## Docker compose 
- docker-compose exec db psql -U postgres -f /scripts/check.sql

## Apresenta os logs no terminal
- docker-compose logs -f -t

## O docker-compose faz o escalonamento de 3 workers
- docker-compose up -d --scale worker=3