# run static service
python3 -m http.server 7000 --bind 127.0.0.2

# change run folder location recon.sh
alias recon.sh="path/recon.sh"

# proxy listener
curl -v --proxy http://127.0.0.1:8081 \
  http://localhost:3000/


# run chrome without loopback
google-chrome \
  --user-data-dir=/tmp/chrome-burp \
  --proxy-server="127.0.0.1:8080" \
  --proxy-bypass-list="<-loopback>"

# get certificate burp
  openssl x509 \
  -inform DER \
  -in ~/Downloads/cacert.der \
  -out ~/Downloads/burp-ca.crt

# set to ubuntu
sudo cp ~/Downloads/burp-ca.crt \
  /usr/local/share/ca-certificates/burp-ca.crt
sudo update-ca-certificates