#! bin/bash

function main(){
    rm -rf dist/
    tsc
    npm run app
}

main
