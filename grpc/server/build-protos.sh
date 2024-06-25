if [[ ! -n $1 ]];
then 
    echo "proto name is needed";
    exit 0;
fi

echo "selected proto file to compile: $1.proto"

TARGET_PROTO=$1
PROTO_GEN_PATH="./node_modules/.bin/protoc-gen-ts_proto"
PROTO_PATH="./node_modules/protos/src"
PROTO_DEST="./src/generated-models/${TARGET_PROTO}"

mkdir -p ${PROTO_DEST}

protoc --plugin=${PROTO_GEN_PATH} \
    -I./ \
    --proto_path=${PROTO_PATH} \
    --ts_proto_out=${PROTO_DEST} \
    --ts_proto_opt=outputServices=grpc-js,esModuleInterop=true \
    ${TARGET_PROTO}.proto
