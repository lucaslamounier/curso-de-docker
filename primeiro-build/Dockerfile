# cria a imagem baseada no nginx última versão
# É sempre bom adicionar uma versão especifica ao invés de latest
# Para que, quando ocorrer atualizações não quebre o codigo.
# Usa todas as layers do nginx
FROM nginx:latest 

# Executa um echo no arquivo index do nginx 
# Cria uma nova layer
RUN echo '<h1>Hello World !</h1>' > /usr/share/nginx/html/index.html
