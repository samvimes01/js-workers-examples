#!/bin/bash
set -e  # Exit on error

setup_impress() {
  echo "Setting up Impress Example and Docker..."
  cd vendor
  
  git clone -b db-seed-in-docker git@github.com:samvimes01/impress-example.git impres-example
  cd impres-example
  
  echo "Starting Docker containers..."
  docker-compose up -d
  
  cd ../..
  echo "Impress Example cloned and Docker started"
}

# Load dependencies
echo "Loading dependencies..."
rm -rf vendor node_modules .yalc
mkdir -p vendor
cd vendor
echo "created vendor directory"

# Clone and setup metarhia-build
git clone -b feat/concat_required_libs git@github.com:samvimes01/metarhia-build.git
cd metarhia-build
npm install
yalc publish
cd ../..
echo "cloned, built and yalc published metarhia-build"

# Clone and setup metautil
cd vendor
git clone -b iife_build git@github.com:samvimes01/metautil.git
cd metautil
yalc add -D metarhia-build
npm install
npm run build
yalc publish
cd ../..
echo "cloned, built and yalc published metautil"

# Clone and setup metacom
cd vendor
git clone -b feat/add_service_worker_proxy git@github.com:samvimes01/metacom.git
cd metacom
yalc add -D metarhia-build
yalc add metautil
npm install
npm run build
yalc publish
cd ../..
echo "cloned, built and yalc published metacom"

yalc update
npm install
npm run build
echo "Finished loading dependencies"

# Check if argument is provided to setup Impres
if [ "$1" == "--impress" ] || [ "$1" == "-i" ]; then
  setup_impres
fi