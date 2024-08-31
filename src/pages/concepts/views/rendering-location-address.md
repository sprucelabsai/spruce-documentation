## Rendering a Location's Address

A location's address (`location.address`) can be rendered easily by user the `locationRenderer` utility provided by `@psrucelabs/spruce-skill-utils` module.

```typescript
import { locationRenderer } from '@sprucelabs/spruce-skill-utils'
console.log(locationRenderer.renderAddress(location))
```