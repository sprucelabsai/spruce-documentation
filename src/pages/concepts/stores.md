---
title: Stores
---

### Overview
Data Stores are pivotal repositories in Spruce's framework, designed to be database-agnostic and offer a uniform interface for interacting with various database systems.

### Understanding Stores in Spruce

#### Breakdown of Stores
1. **CLI Operations**
   - **Initialization of Stores**: Use `spruce create.store` to initialize a new Store.
   - **Store Synchronization**: Use `spruce sync.stores` to align the Store with changes in class or file names, ensuring consistency.

2. **Schema Definition within Stores**
   - Schemas define data validation and structure. Types include `fullSchema`, `createSchema`, `updateSchema`, and `databaseSchema`.
   - Best practice: Generate a fully typed schema using `spruce create.schema` and align it with `fullSchema` for consistency.

3. **Data Lifecycle Hooks**
   - Hooks like `willCreate`, `didCreate`, `willUpdate`, `didUpdate`, and `willScramble` manage the data lifecycle, allowing for data manipulation before and after operations.

4. **Implementing Stores in Listeners and Tests**
   - **Listeners Integration**: Efficient data field management using `includeFields` optimizes performance.
   - **Testing with Stores**: Seeding and assertive checks ensure Store performance and reliability. Operations like `youCanSeedDataIntoYourStore` and `helpersLikeGetNewestAndListAreSoNice` test the Store's functionality.

5. **Database Integration: Embracing Postgres**
   - While Stores are database-agnostic, they can be enhanced with adapters like `@sprucelabs/postgres-data-store` for SQL-based systems.
   - Configure Postgres support by importing the necessary dependency and setting the `DATABASE_CONNECTION_STRING` in the environment.