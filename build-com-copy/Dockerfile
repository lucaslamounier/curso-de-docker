from nginx:latest

LABEL maintainer 'Lucas Lamounier'

RUN echo '<h1>Sem conteudo</h1>' > /usr/share/nginx/html/conteudo.html

# Copia tudo que está na pasta corrente para a pasta nginx/html
COPY *.html /usr/share/nginx/html/


