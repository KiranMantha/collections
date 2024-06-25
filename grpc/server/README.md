# grpc-server

## Installation

run `yarn` or `npm i`

## generate models

run `yarn createDto <proto-name>`. example: `yarn createDto hello` => this will create hello.ts file in `src/generated-models` folder

## run the server

run `yarn start`

## test for server

this needs `grpcurl` to check if the server is working or not. for this:

- install `grpcurl`
  - mac: `brew install grpcurl`
  - linux: `sudo apt-get install -y grpcurl`
  - windows: `Download from https://github.com/fullstorydev/grpcurl/releases`
- run `grpcurl -plaintext -d '{"name": "World"}' localhost:50050 hello.Greeter/SayHello`. this should print `{message: 'Hello World!!'}`
- this confirms that server is working as expected.

## Known issues / future fixes

Reflection api can be loaded once. so it cannot be initiated and added multiple times for every proto service to the grpc server. check issue: https://github.com/grpc/grpc-node/issues/2630
