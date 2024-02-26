---
title: Mercury
---
# Overview of Mercury
Mercury acts as a central hub in the Sprucebot platform, managing communication and interaction between various skills (modules or functionalities). It is designed to ensure modularity, reusability, and efficiency in handling different functions within the platform.

## Key Functions of Mercury
1. **Handling Communication Between Skills:** Mercury facilitates the interaction between different skills. It does not have its plugins but relies on core events defined within itself to manage communications.

2. **Permission Checks:** It performs checks to ensure that skills have the necessary permissions to execute their functions, particularly in terms of accessing or emitting data to other skills or system components.

3. **Core Schema/Record Management:** Mercury handles essential records and schemas like locations, people, messages, etc., necessary for the platform's functionality.

## Event Anatomy in Mercury
**Fully Qualified Event Name (FQEN):** This includes the namespace, event name, and version. For example, `appointments.update-person-capability::v2021_06_23`.
**Components of an Event:**
  - **Target:** Can include person ID, organization ID, location ID, and skill ID.
  - **Source:** Usually the skill ID or person ID.
  - **Emit Payload:** Arbitrary data relevant to the event.
  - **Response Payload:** Arbitrary data returned after the event is processed.

## Platform Architecture Comparison
**Traditional Platform Architecture:** Characterized by a large core API with various add-ons or plugins. This structure can lead to maintenance challenges and inconsistency in user experience.
**Sprucebot Platform Architecture:** Emphasizes a smaller, more manageable core (Mercury) with various skills built around it. This design promotes modularity and allows for more flexible and specific functionality without bloating the core system.

## Mercury’s Role in the Skill Hierarchy
- Mercury sits at the top of the hierarchy, providing foundational functions and communications protocols.
- Skills are layered above Mercury, each depending on the functionality provided by the core and potentially other skills.
- This structure allows for creating complex functionalities with minimal code, as each skill leverages the capabilities of the underlying layers.

### Event Handling in Mercury
**Unique Handling Approach:** Unlike other skills, Mercury uses plugins for event handling due to its top position in the hierarchy. This difference is necessary as Mercury introduces the functionalities that other skills rely on but cannot use these functionalities itself due to its foundational role.

#### Message Sending and Receiving
**Message Management:** Mercury oversees the sending and receiving of messages within the platform. It interfaces with external services, like Twilio, for message delivery and reception. It uses a message sender to loop through a messages table, sending messages and handling incoming messages through various adapters.

#### Skill Dependencies and Event Synchronization
**Inter-Skill Communication:** Mercury allows skills to declare dependencies on other skills, managing the synchronization of events between them. This synchronization ensures that skills can effectively communicate and share functionalities.

#### Customization and Extensibility
**Environment Configuration:** Mercury permits customization for different environments, such as local, development, and production. This feature allows for flexible deployment and testing across various settings.