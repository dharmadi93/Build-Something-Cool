# Build-Something-Cool

## Install Express

```
npm install express-generator -g
express --ejs
npm install
```

## Install Sequelize

```
npm install sequelize-cli -g
npm install sequelize --save
sequelize init
```

## Install Sqlite3

```
npm install sqlite3 --save
```

## Setting config.json

```
"development": {
    "storage": "./db/<DB_NAME>",
    "dialect": "sqlite"
  }
```

## Endpoint

### Employee
```
| Endpoint          | HTTP      | Description           |
| ----------        | -----     | ------------          |
| api/employee      | POST      | Create employee       |
| api/employee      | GET       | Get all employee      |
| api/employee/:id  | GET       | Get employee by id    |
| api/employee/:id  | DELETE    | Delete employee by id |
| api/employee      | PUT       | Update employee       |
```

### Item
```
| Endpoint      | HTTP      | Description       |
| ----------    | -----     | ------------      |
| api/item      | POST      | Create item       |
| api/item      | GET       | Get all item      |
| api/item/:id  | GET       | Get item by id    |
| api/item/:id  | DELETE    | Delete item by id |
| api/item      | PUT       | Update item       |
```

### Transaction
```
| Endpoint              | HTTP      | Description           |
| ----------            | -----     | ------------          |
| api/transaction       | POST      | Create transaction    |
| api/transaction       | GET       | Get all transaction   |
| api/transaction/:id   | GET       | Get transaction by id |
```