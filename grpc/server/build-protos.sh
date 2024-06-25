if [[ ! -n $1 ]];
then 
    echo "proto name is needed";
    exit 0;
fi

echo "selected proto file to compile: $1.proto"

TARGET_PROTO=$1
PROTO_DEST="./src/generated-models/${TARGET_PROTO}"
PROTO_PATH="node_modules/protos/src"

mkdir -p ${PROTO_DEST}

protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto \
    -I./ \
    --proto_path=./node_modules/protos/src \
    --ts_proto_out=${PROTO_DEST} \
    --ts_proto_opt=outputServices=grpc-js,esModuleInterop=true \
    ${TARGET_PROTO}.proto
