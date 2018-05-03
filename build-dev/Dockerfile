FROM python:3.6

LABEL maintainer 'Lucas Lamounier'

# Executa varios comandos criando apenas uma única layer
RUN useradd www && \
    mkdir /app && \
    mkdir /log && \
    chown www /log

# Informa quem é usuário logado na execução do sistema
USER www

VOLUME /log 

# Informa o diretório de trabalho
WORKDIR /app

# Expoe a porta do container
EXPOSE 8000

# Entry point que é o ponto de entrada, processo q é iniciado quando o container está sendo executado
# executa o python
ENTRYPOINT [ "/usr/local/bin/python" ]

CMD ["run.py"]

