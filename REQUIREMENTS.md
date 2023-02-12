# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index (GET `/api/products` )
- Show (GET `/api/products/:id`)
- Create [token required] (POST `/api/products`)
- Update [token required] (PUT `/api/products/:id`)
- Delete [token required] (DELETE `/api/products/:id`)

#### Users

- Index [token required] (GET `/api/users`)
- Show [token required] (GET `/api/users/:id`)
- Create (POST `/api/users`)
- Update [token required] (PUT `/api/users/:id`)
- Delete [token required] (DELETE `/api/users/:id`)

#### Order

- Index [token required] (GET `/api/orders`)
- Show [token required] (GET `/api/orders/:id`)
- Create (POST `/api/orders`)
- Update [token required] (PUT `/api/orders/:id`)
- Delete [token required] (DELETE `/api/orders/:id`)
- Current Orders by user (args: user id)[token required] (GET `/api/orders/user-orders`)

## Data Shapes

#### Product

The table includes the following fields:

- id
- name
- price

The SQL schema for this table is as follows:

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INTEGER DEFAULT 0.00
);
```

#### User

The table includes the following fields:

- id
- firstName
- lastName
- password

The SQL schema for this table is as follows:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    password varchar
);
```

#### Orders

The table includes the following fields:

- id
- user_id
- status of order (active or complete)

The SQL schema for this table is as follows:

```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    status VARCHAR NOT NULL
);
```

#### order_products

The table includes the following fields:

- id
- product_id
- order_id
- quantity

The SQL schema for this table is as follows:

```sql
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    CONSTRAINT fk_order
        FOREIGN KEY (order_id)
            REFERENCES orders(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    CONSTRAINT fk_products
        FOREIGN KEY (product_id)
            REFERENCES products(id)
            ON DELETE CASCADE
            ON  UPDATE CASCADE
);
```
