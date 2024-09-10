#!/bin/sh

npm run migration:generate --name=init

npm run migration:run

npm run start:prod