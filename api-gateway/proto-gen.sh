PROTO_DIR=./src/proto-generated

yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=${PROTO_DIR} proto/*.proto