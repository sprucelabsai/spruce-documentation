---
title: Events
intro: Guide to Spruce Events and Mercury Event Engine
show_concepts_header: true
show_concepts_sidebar: true
show_TOC: true
show_concepts_video: false
section: Concepts
order: 4
---

# Overview
In Spruce, events are the communicative threads that connect different parts of the system, allowing for a reactive and synchronized ecosystem. This guide is your comprehensive resource for mastering events within Spruce.

## Understanding Events in Spruce

Events in Spruce are triggered by user interactions, system updates, or scheduled occurrences. These events are managed by Mercury, the central nervous system of Spruce, which facilitates communication between skills.

### Mercury - The Event Engine

Mercury processes events through commands like `spruce create.event`, `spruce listen.event`, and `spruce sync.events`, ensuring the smooth operation of your system's event-driven architecture.

### Anatomy of an Event

An event is characterized by its fully qualified event name (FQEN), payload, and source. Events are named following a pattern like `action-subject::version` to facilitate clear communication and handling.

## Types of Events

### Core Events

Core events are foundational and understood by all Spruce components. Examples include:
- `create-organization::v2020_01_01`
- `update-role::v2020_01_01`

### Skill Events

Skill events are custom to specific skills, such as:
- `appointments.create-category::v2020_01_10`
- `shifts.create-shift-type::v2020_01_10`

### Global Events

Global events are broadcasted across the system and do not target specific recipients.

## Crafting and Emitting Events

### Targets

Targets are defined using builders, and unless the event is global, a target may look like:

```javascript
const acceptEmitTargetBuilder = buildSchema({
    id: 'acceptEmitTarget',
    fields: {
        organizationId: {
            type: 'id',
            isRequired: true,
        },
    },
})

export default acceptEmitTargetBuilder
```

### Payloads

The payload of an event carries the data and is defined based on your requirements. Here's an example of how to construct a payload:

```javascript
import inviteBuilder from '../../../schemas/v2021_12_16/invite.builder'

const sendEmitPayloadBuilder = buildSchema({
    id: 'sendEmitPayload',
    fields: {
        ...dropPrivateFields(
            dropFields(inviteBuilder.fields, [
                'id',
                'dateCreated',
                'status',
                'target',
            ])
        ),
    },
})

export default sendEmitPayloadBuilder
```

### Emitting Events

Emitting events involves invoking specific commands and handling the responses:

```javascript
// Emitting an event and handling the response
const [{ auth }] = await client.emitAndFlattenResponses('whoami::v2020_12_25')

// Listening to events and pushing payloads
const payloads = []
const results = await client.emit('test-skill::register-dashboard-cards', {}, ({ payload }) => {
    payloads.push(payload)
})

// Handling all payloads and errors
const { payloads: allPayloads, errors } = eventResponseUtil.getAllPayloadsAndErrors(results, SpruceError)
assert.isFalsy(errors)
assert.isEqualDeep(allPayloads, payloads)
```

## Event Emitters

Your event emitters are the mechanisms through which your system sends and receives events.

### Local: Event Emitter

A local event emitter is a strictly typed, payload-validating event emitter. Here are the steps to create one:

1. **Dependencies:**

```shell
yarn add @sprucelabs/mercury-event-emitter
```

2. **Create Your Emitter Class:**

```javascript
import { AbstractEventEmitter } from '@sprucelabs/mercury-event-emitter'
import { buildEventContract } from '@sprucelabs/mercury-types'

// Defining the contract
const contract = buildEventContract({
    eventSignatures: {
        // Your event signatures here
    },
})

// SkillViewEmitter class
export default class SkillViewEmitter extends AbstractEventEmitter<SkillViewEventContract> {
    // Your implementation here
}

// Usage
const emitter = SkillViewEmitter.getInstance()
```

3. **Build Your Contract:**

```javascript
const contract = buildEventContract({
    eventSignatures: {
        'did-scroll': {
            emitPayloadSchema: buildSchema({
                id: 'didScrollEmitPayload',
                fields: {
                    scrollTop: {
                        type: 'number',
                        isRequired: true,
                    },
                },
            }),
        },
        // More event signatures can be added here
    },
})
```

4. **Use Your Emitter:**

```javascript
// Attaching a listener
await instance.on('did-scroll', (payload) => {
    console.log(payload

.scrollTop)
})

// Emitting an event
await emitter.emit('did-scroll', {
    scrollTop: 0
})
```

## Use Case