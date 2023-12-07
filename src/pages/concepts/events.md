---
title: Events
---
### Overview
Events in Spruce are the key to a reactive and interconnected system. They are triggered by user interactions, system updates, or scheduled occurrences and are managed by Mercury, Spruce's central communication hub.

### Understanding Events in Spruce

#### Breakdown of Events
1. **Mercury - The Event Engine**
   - Mercury processes events using commands like `spruce create.event`, `spruce listen.event`, and `spruce sync.events`.

2. **Anatomy of an Event**
   - Each event has a fully qualified event name (FQEN), a payload, and a source. Events follow a naming pattern like `action-subject::version`.

3. **Types of Events**
   - **Core Events**: Foundational events recognized by all Spruce components (e.g., `create-organization::v2020_01_01`).
   - **Skill Events**: Custom events for specific skills (e.g., `appointments.create-category::v2020_01_10`).
   - **Global Events**: Broadcasted across the system without specific targets.

4. **Crafting and Emitting Events**
   - **Targets**: Defined using builders; non-global events require a target like `organizationId`.
   - **Payloads**: Carry data and are constructed based on requirements, using schemas to define the data structure.
   - **Emitting Events**: Involves invoking commands and managing responses and payloads.

5. **Event Emitters**
   - The local event emitter is a strictly typed, payload-validating mechanism.
   - **Creating an Emitter**: Involves adding dependencies, building an event contract, and implementing the emitter class.
   - **Using the Emitter**: Attaching listeners to events and emitting events with payloads.