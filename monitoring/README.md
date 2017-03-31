# Monitoring

## Installation

  - Admin Hash in config/prometheus.yml anpassen
  - `docker` und `docker-compose` installieren
  - `sudo docker-compose up -d` in diesem Directory

Auf localhost:9090 läuft dann der prometheus, der Server der die Daten holt und eine primitive Visualisierung bietet.

Das Dashboard Grafana läuft auf localhost:3000, Login ist admin:piox und kann in docker-compose.yml angepasst werden.

## Dashboard freigeben

Um das Dashboard nach aussen freizugeben muss man noch eine Nginx Config erstellen:

    upstream grafana_server {
            #Port
            server 127.0.0.1:3001;
    }

    server {
        listen 3001;
        location / {
            proxy_pass         http://grafana_server;
        }
    }

Das Grafana Dashboard ist nun via http://<deine-domain>:3001 erreichbar :)
