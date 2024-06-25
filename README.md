# Leopard Website

## Running Locally

First, make a `.env` file. Copy the contents of `.env.template` and fill it in with the necessary details. To do so, you will need:

- A postgres database
- An AWS account with two S3 buckets, one for project assets and one for project assets which are being used for uploads to CodeSandbox.

Next, we need to make it possible to use subdomains on `localhost`. By default, this is not possible, but we can set up our computer to make any .test URL, such as http://localhost.test/ or even http://any-subdomain.anything.test/, map to 127.0.0.1, the localhost IP address.

To do this, install dnsmasq using [these instructions](https://gist.github.com/ogrrd/5831371). In particular, once dnsmasq is installed, you'll need the following settings:

- In `dnsmasq.conf`, add a line that says `address=/.test/127.0.0.1`
- Create a file `/etc/resolver/test` that contains the content `nameserver 127.0.0.1`. You will most likely need to create the `/etc/resolver` directory yourself.

Once you set the above settings and run dnsmasq, you will be able to visit _any_ .test URL and it will always map to localhost. In particular, you can run `npm run dev` and then visit http://localhost.test:3000/ and it will take you to the Leopard dev server. This is good because it works just like normal `localhost:3000` except now you can also use subdomains.
