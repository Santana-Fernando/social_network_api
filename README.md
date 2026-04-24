# 🚀 Social Network API

API RESTful para gerenciamento de posts e interações (likes), construída com foco em **boas práticas de arquitetura**, **performance** e **escalabilidade**.

---

## 🧱 Tecnologias utilizadas

* Node.js + TypeScript
* Express
* TypeORM
* PostgreSQL
* Redis (cache)
* RabbitMQ (mensageria)
* Docker

---

## 🧠 Arquitetura

O projeto segue princípios de:

* Clean Architecture
* Inversão de Dependência (com tsyringe)
* Separação em camadas:

```
src/
 ├── domain/        # Entidades e interfaces
 ├── application/   # Casos de uso (services)
 ├── infra/         # Banco, mensageria, cache
 ├── interfaces/    # Controllers e rotas HTTP
```

---

## 📦 Funcionalidades

* CRUD de posts
* Sistema de likes e deslikes
* Ranking de posts mais curtidos
* Cache com Redis para otimização de leitura
* Processamento assíncrono com RabbitMQ

---

## ⚡ Cache com Redis

Utilizado o padrão **Cache-Aside**:

* Busca no cache primeiro
* Se não existir → busca no banco
* Salva no cache

### 🔑 Estratégia de cache

| Endpoint        | Chave Redis        | TTL  |
| --------------- | ------------------ | ---- |
| Listar posts    | `posts:all`        | 60s  |
| Post por ID     | `posts:{id}`       | 120s |
| Ranking         | `posts:top-liked`  | 30s  |
| Posts por autor | `posts:autor:{id}` | 60s  |

### 🔥 Invalidação

Cache é invalidado quando:

* Novo post é criado
* Like/Deslike é processado

---

## 📨 Mensageria com RabbitMQ

O sistema utiliza o RabbitMQ para processar likes de forma assíncrona.

### 📤 Producer

Responsável por enviar eventos:

```json
{
  "type": "LIKE",
  "data": {
    "postId": 1,
    "autorId": 10
  }
}
```

### 📥 Consumer

* Consome mensagens da fila `likes_queue`
* Executa regras de negócio
* Confirma (`ack`) ou rejeita (`nack`) mensagens

---

## 🐳 Subindo o ambiente com Docker

### RabbitMQ

```bash
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:4-management
```

Painel:
👉 http://localhost:15672
Login: `guest / guest`

---

### Redis

```bash
docker run -d  --name redis  -p 6379:6379  redis:7
```

---

## ▶️ Rodando o projeto

```bash
# instalar dependências
npm install

# rodar em desenvolvimento
npm run dev

# build
npm run build

# rodar produção
npm start
```

---

## 🔌 Conexões

| Serviço  | URL                    |
| -------- | ---------------------- |
| API      | http://localhost:3000  |
| RabbitMQ | amqp://localhost:5672  |
| Redis    | redis://localhost:6379 |

---

## 📚 Endpoints principais

### 📄 Posts

* `GET /posts` → lista todos
* `GET /posts/:id` → busca por ID
* `GET /posts/top-liked` → ranking
* `GET /posts/autor/:id` → posts por autor

---

### ❤️ Likes

* Processados via RabbitMQ (assíncrono)

---

## 🧠 Boas práticas aplicadas

* Cache desacoplado da controller
* Tratamento de falha do Redis (fallback para DB)
* Uso de filas para evitar sobrecarga no banco
* Separação clara de responsabilidades
* Código orientado a interfaces

---

## 🚀 Melhorias futuras

* Implementar rate limiting
* Adicionar autenticação (JWT)
* Observabilidade (logs e métricas)
* Testes automatizados

---

## 👨‍💻 Autor

Desenvolvido por **Fernando Rodrigues**
