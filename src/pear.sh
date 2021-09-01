#!/bin/bash

filename='./session'

if [ ! -f "$filename" ]; then
    echo "$filename does not exist."
fi

n=1
while read line; do
# reading each line
echo "Line No. $n : $line"
n=$((n+1))
done < $filename