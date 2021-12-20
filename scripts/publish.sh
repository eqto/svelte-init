#!/bin/bash

#read -sp 'Password: ' PASSWORD

#echo $PASSWORD

UPLOADDIR='/home/apps/asuransi.vbotdigital.com'

scp -r -P 2222 build/* apps@logistik.app:$UPLOADDIR

ssh apps@logistik.app -p 2222 "cd $UPLOADDIR; find . -name '*.gz' -type f -delete;  gzip -frk9 ./"

