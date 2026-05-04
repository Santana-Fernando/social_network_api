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
* Cadasro e Login de usuários
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

---
## Banco de dados
* crie uma base de dados chamada social_network no postegres
* rode os scripts do arquivo db.sql, na raiz
* ajuste o arquivo env.txt para .env e insira as sua credenciais de acesso
---

## ▶️ Rodando o projeto

```bash
# instalar dependências
npm install

# build
npm run build

# rodar produção
npm start

# rodar consumer
npm run consumer
```
# 🚀 Rodando a aplicação com Docker + Kubernetes (Load Balancer)

---

## ⚙️ Pré-requisitos

- Docker
- Docker Compose
- kubectl
- kind

---

## 🧱 Passo a passo

### 1. Subir infraestrutura (OBRIGATÓRIO)

```bash
docker-compose up -d
```

---

### 2. Criar cluster Kubernetes (se ainda não existir)

```bash
kind create cluster --name api-cluster
```

---

### 3. Garantir que está no cluster correto

```bash
kubectl config use-context kind-api-cluster
```

---

### 4. Build da imagem da API

```bash
docker build -t minha-api:latest .
```

---

### 5. Carregar imagem no cluster

```bash
kind load docker-image minha-api:latest --name api-cluster
```

---

### 6. Subir a API (Deployment com 3 pods)

```bash
kubectl apply -f api-deployment.yaml
```

---

### 7. Subir o Service (Load Balancer)

```bash
kubectl apply -f api-service.yaml
```

---

### 8. Reiniciar pods (IMPORTANTE após build)

```bash
kubectl rollout restart deployment api-deployment
```

---

### 9. Verificar pods

```bash
kubectl get pods
```

---

### 10. Verificar services

```bash
kubectl get svc
```

---

### 11. Acessar aplicação

```bash
kubectl port-forward svc/api-service 3000:80
```

Acesse no navegador:

👉 http://localhost:3000/docs

---

## 🔁 Atualização rápida (quando mudar código)

```bash
docker build -t minha-api:latest .
kind load docker-image minha-api:latest --name api-cluster
kubectl rollout restart deployment api-deployment
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

### 📄 Reações

* `POST /reactions/like` → registra um like e quem deu o like
* `POST /reactions/deslike` → remove a curtida
* `GET  /reactions/listagem/:id` → busca a quantidade de likes por id do post
---

### 📄 Posts

* `POST /posts/cadastro` → criar post
* `GET /posts` → lista todos
* `GET /posts/:id` → busca por ID
* `GET /posts/top-liked` → ranking
* `GET /posts/autor/:id` → posts por autor
* `DELETE /posts/remover/:id` → remover post
* `PUT /posts/atualizar/:id` → atualizar post
---

### 📄 Usuários

* `POST /usuarios/cadastro` → criar um usuário de acesso
* `POST /usuarios/login` → criar logar com usuário para fazer as ações
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
