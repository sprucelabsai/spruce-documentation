---
title: Tests
---

# Overview
Testing in Spruce is essential for maintaining quality. It ensures that every aspect of the system performs as expected.

## Understanding Tests in Spruce

## Breakdown of Tests
1. **Creating and Running Tests**
   - `spruce create.test`: Initializes a new test, committing to quality.
   - `spruce test`: Runs the test suite to validate code readiness for deployment.

2. **Fixtures**
   - Fixtures are utility classes emulating real-world scenarios to set up test environments. These include View, Store, Mercury, Person, Location, Organization, Role, and Seed Fixtures.
   - Built-in fixtures are available when extending `AbstractSpruceFixtureTest`, like `this.views`, `this.roles`, `this.locations`, and others.

3. **Authentication in Testing**
   - The `@login` decorator tests authentication mechanisms, ensuring robust security.

4. **Seeding Data**
   - Seeding prepares the testing landscape with necessary data using decorators like `@seed`.

5. **Installing your Skill**
   - The `@install.skills` decorator is used for installing skills in the testing environment.

6. **Skill Views**
   - Detailed information about Skill Views is provided in the dedicated Views section.

### Best Practices and Advanced Strategies
- Creating reusable fixtures and employing meaningful assertions are key.
- Anticipate user behavior in tests for thorough testing coverage.

#### AbstractProfileTest Setup Guide
- Create an `AbstractProfileTest` class as the foundation for all tests.
- Ensure every new test class extends `AbstractProfileTest`.
- Implement utility functions and initialize commonly used fixtures in the `beforeEach()` method.
- Access stores as class properties and create convenience getters for frequently accessed data.
- Use assertive checks with clear messages for effective troubleshooting.

#### Example: Abstract Skill Test
The example provides a template for setting up an abstract skill test class, demonstrating how to initialize stores, routers, and profiles, along with convenience methods for accessing and listing profiles and organizations.

## Practice