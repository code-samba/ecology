#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/"

if [ "$1" == "prod" ]; then
    docker compose -f "$DIR/../docker-compose-prod.yml" --env-file "$DIR/../.env" up
else
    docker compose -f "$DIR/../docker-compose-local.yml" --env-file "$DIR/../.env-local" up --build
fi
