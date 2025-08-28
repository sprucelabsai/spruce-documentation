# Uploads

The `Files` skill provides a way to upload files to various storage backends.

## Upload Client

In all cases, when uploading files, it is recommended to use the `ChunkingUploader`.

### Add `spruce-file-utils` to your project

```bash
yarn add @sprucelabs/spruce-file-utils
```

### Testing the ChunkingUploader

```typescript
import ChunkingUploaderImpl, {
    MockChunkingUploader
} from '@sprucelabs/spruce-file-utils'

@fake.login()
@suite()
export default class MockChunkingUploaderTest extends AbstractFilesTest {
    protected async beforeEach() {
        await super.beforeEach()
        ChunkingUploaderImpl.Class = MockChunkingUploader
    }

    @test()
    protected async uploaderWasCreated() {
        await this.someUploadOperation()
        MockChunkingUploader.assertWasCreated()
    }

    @test()
    protected async assertUploadedActualFile() {
        const file = {
            fileName: generateId(),
            base64: generateId(),
            locationId: generateId(),
            organizationId: generateId()
        }

        await this.someUploadOperation(file)
        this.mockUploader.assertUploadOptionsEqual(file)
    }

    private get mockUploader() {
        return MockChunkingUploader.instance
    }

}

```

### Production Code

```typescript
// Coming soon...
```

## Backend Strategies

### S3 Upload Strategy

By default, the `Files` skill uses `S3` as it's upload strategy. When using `S3`, you must set the following `.env` variables:

#### `.env`
```.env
AWS_ACCESS_KEY_ID="***"
AWS_SECRET_ACCESS_KEY="***"
AWS_S3_BUCKET="****"
```

#### `blueprint.yml`
```yml
env:
  files:
    - AWS_ACCESS_KEY_ID: "***"
    - AWS_SECRET_ACCESS_KEY: "***"
    - AWS_S3_BUCKET: "***"
```

### Local Strategy
If you are in a situation where you are able to serve a local directory, you can configure your `UPLOAD_STRATEGY` to use the local file system. This is useful for development and testing purposes.

#### `.env`
```.env
UPLOAD_STRATEGY=local
LOCAL_UPLOAD_DIR="/absolute/path/to/served/directory"
FILE_HOST_URL="http://localhost:3000"
```

#### `blueprint.yml`
```yml
env:
  files:
    - UPLOAD_STRATEGY: "local"
    - LOCAL_UPLOAD_DIR: "/absolute/path/to/served/directory"
    - FILE_HOST_URL: "http://localhost:3000"

```
## Enabling Big File Uploads
For files under 2mb, you don't have to do anything special. The `Mercury` event system can handle a payload of that size. But, if you need to enable support for larger files, you will need to configure your server to handle chunked uploads.

The `Files` skill comes with it's own REST server for handling file uploads. This bypasses the `Mercury` event system and supports chunked uploads (up to 10MB per chunk).

### Configuring the REST Server

Update your `.env` or `blueprint.yml` file to include the following environment variables:


#### `.env`

```.env
# -------------------------
# The following are part of the .env by default. If you are running on the same machine, you can leave them as-is
# -------------------------

# Mercury connection string
HOST=***** 
# Database connection string (default to mongo)
DB_CONNECTION_STRING=*****
# Optional database name (if not part of DB_CONNECTION_STRING)
DB_NAME=*****

# -------------------------
# REST upload specific settings
# -------------------------

# Port for the REST upload server (defaults to 3000)
REST_UPLOAD_PORT=****

# Optional SSL settings
REST_SSL_KEY=*****
REST_SSL_CERT=*****
REST_SSL_CA=*****
```

#### `blueprint.yml`
```yml
env:
  files:
    - HOST: "****"
    - DB_CONNECTION_STRING: "****"
    - REST_UPLOAD_PORT: "****"
    - REST_SSL_KEY: "****"
    - REST_SSL_CERT: "****"
    - REST_SSL_CA: "****"
```

### Booting the REST Server

Once you have your environment variables set up, you can start the REST server with the following command:

```bash
yarn boot.rest
```


### Setting up on ec2

1. SSH into your EC2 instance:
2. Copy the script from `./support/setup_ec2.sh` to your EC2 instance
3. Run it with `./setup_ec2.sh`


## Useful links

- [Spruce Developer Documentation: https://developer.spruce.ai](https://developer.spruce.ai)
