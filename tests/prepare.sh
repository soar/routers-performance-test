#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
cd ${DIR}

find ${DIR} -type f -regex ".*\.tst" -exec echo "Found file: {}, removed..." \; -execdir rm {} \;
find ${DIR} -type f -regex ".*\.html" -exec echo "Found file: {}, removed..." \; -execdir rm {} \;
