#!/bin/bash

COMMIT_MSG_FILE=$1
COMMIT_SOURCE=$2
SHA1=$3

filename='./.pear/session'

echo $COMMIT_SOURCE
echo $SHA1

if [ ! -f "$filename" ]; then
    exit 0;
fi

if [ ]

coauthors="Co-authors:"
n=1
while read line; do
    coauthors="${coauthors} $line,"
    n=$((n+1))
done < $filename
coauthors="$(echo $coauthors | sed 's/,$//g')" # Remove trailing comma

echo "\n\n${coauthors}\n$(cat $COMMIT_MSG_FILE)" > "$COMMIT_MSG_FILE"