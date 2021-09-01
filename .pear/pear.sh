#!/bin/bash

COMMIT_MSG_FILE=$1
COMMIT_SOURCE=$2
SHA1=$3

filename='./.pear/session'

if [ ! -f "$filename" ]; then
    exit 0;
fi

coauthors="Co-authors:"
n=1
while read line; do
    coauthors="${coauthors} $line,"
    n=$((n+1))
done < $filename
# Remove trailing comma
coauthors="$(echo $coauthors | sed 's/,$//g')"

echo "\n\n${coauthors}\n$(cat $COMMIT_MSG_FILE)" > "$COMMIT_MSG_FILE"