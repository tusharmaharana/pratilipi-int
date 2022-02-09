#!/bin/bash

PROTO_DIR=./proto

# # Generate JavaScript code
# yarn run grpc_tools_node_protoc \
#     --js_out=import_style=commonjs,binary:${PROTO_DIR} \
#     --grpc_out=${PROTO_DIR} \
#     --plugin=protoc-gen-grpc=E:/Project/pratilipi-int/user-interaction/node_modules/.bin/grpc_tools_node_protoc_plugin.cmd \
#     -I ./proto \
#     proto/*.proto

# # Generate TypeScript code (d.ts)
# yarn run grpc_tools_node_protoc \
#     --plugin=protoc-gen-ts=E:/Project/pratilipi-int/user-interaction/node_modules/.bin/protoc-gen-ts.cmd \
#     --ts_out=${PROTO_DIR} \
#     -I ./proto \
#     proto/*.proto

yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=${PROTO_DIR} proto/*.proto