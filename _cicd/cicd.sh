#! /bin/bash

SOLANA_PROGRAMS=("fund_transfer")
chmod -R a+rwx fund_transfer/

case $1 in
    "reset")
        rm -rf ./node_modules
        for x in $(solana program show --programs | awk 'RP==0 {print $1}'); do 
            if [[ $x != "Program" ]]; 
            then 
                solana program close $x --bypass-warning;
            fi
        done
        for program in "${SOLANA_PROGRAMS[@]}"; do
            cargo clean --manifest-path=./$program/Cargo.toml
        done
        rm -rf _dist/*
        ;;
    "clean")
        rm -rf ./node_modules
        for program in "${SOLANA_PROGRAMS[@]}"; do
            cargo clean --manifest-path=./$program/Cargo.toml
        done;;
    "build")
        for program in "${SOLANA_PROGRAMS[@]}"; do
            cargo build-sbf --manifest-path=./$program/Cargo.toml --sbf-out-dir=./_dist
        done;;
    "deploy")
        for program in "${SOLANA_PROGRAMS[@]}"; do
            solana program deploy _dist/$program.so
        done;;
    "reset-and-build")
        rm -rf ./node_modules
        for x in $(solana program show --programs | awk 'RP==0 {print $1}'); do 
            if [[ $x != "Program" ]]; 
            then 
                solana program close $x --bypass-warning; 
            fi
        done
        rm -rf _dist/*
        for program in "${SOLANA_PROGRAMS[@]}"; do
            cargo clean --manifest-path=./$program/Cargo.toml
            cargo build-sbf --manifest-path=./$program/Cargo.toml --sbf-out-dir=./_dist
            solana program deploy _dist/$program.so
        done
        npm install
        solana program show --programs
        ;;
esac