```ascii
project-root/
├── data/
│ ├── products.sqlite # SQLite database for Products Service
│ ├── orders.sqlite # SQLite database for Orders Service
│ ├── inventory.sqlite # SQLite database for Inventory Service
├── apps/
│ ├── products/
│ │ ├── Dockerfile # Dockerfile for Products Service
│ │ ├── src/
│ │ │ ├── products.module.ts
│ │ │ ├── products.service.ts
│ │ │ ├── products.resolver.ts
│ │ │ └── entities/
│ │ │ └── product.entity.ts (TypeORM entity)
│ ├── orders/
│ │ ├── Dockerfile # Dockerfile for Orders Service
│ │ ├── src/
│ │ │ ├── orders.module.ts
│ │ │ ├── orders.service.ts
│ │ │ ├── orders.resolver.ts
│ │ │ └── entities/
│ │ │ └── order.entity.ts (TypeORM entity)
│ ├── inventory/
│ │ ├── Dockerfile # Dockerfile for Inventory Service
│ │ ├── src/
│ │ │ ├── inventory.module.ts
│ │ │ ├── inventory.service.ts
│ │ │ ├── inventory.resolver.ts
│ │ │ └── entities/
│ │ └── inventory.entity.ts (TypeORM entity)
│ ...
├── libs/
│ ├── common/ # Common library for shared entities and utilities
│ │ ├── entities/
│ │ │ ├── graphql/
│ │ │ │ ├── product.entity.ts
│ │ │ │ ├── order.entity.ts
│ │ │ │ └── inventory.entity.ts
│ │ │ └── typeorm/
│ │ │ ├── product.entity.ts
│ │ │ ├── order.entity.ts
│ │ │ └── inventory.entity.ts
│ ├── kafka/ # Kafka library for producers and consumers
│ │ ├── kafka.producer.ts
│ │ └── kafka.consumer.ts
├── docker-compose.yml # Root file orchestrating all services
```
