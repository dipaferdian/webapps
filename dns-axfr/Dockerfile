FROM ubuntu:24.04

RUN apt-get update && \
    apt-get install -y bind9 bind9-utils dnsutils && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

EXPOSE 53/tcp
EXPOSE 53/udp

CMD ["named", "-g", "-c", "/etc/bind/named.conf"]