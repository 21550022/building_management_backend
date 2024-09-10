#!/bin/sh

# Chạy ứng dụng
npm run start:prod

# Tạo migration mới
npm run migration:generate --name=init

# Chạy migration
npm run migration:run