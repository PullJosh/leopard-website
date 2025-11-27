# Leopard Website

## Running Locally

First, make a `.env` file. Copy the contents of `.env.template` and fill it in with the necessary details. To do so, you will need:

- An AWS account with two S3 buckets, one for project assets and one for project assets which are being used for uploads to CodeSandbox.

Next, we need to make it possible to use subdomains on `localhost`. By default, this is not possible, but we can set up our computer to make any .test URL, such as http://localhost.test/ or even http://any-subdomain.anything.test/, map to 127.0.0.1, the localhost IP address.

To do this, install dnsmasq using [these instructions](https://gist.github.com/ogrrd/5831371). In particular, once dnsmasq is installed, you'll need the following settings:

- In `dnsmasq.conf`, add a line that says `address=/.test/127.0.0.1`
- Create a file `/etc/resolver/test` that contains the content `nameserver 127.0.0.1`. You will most likely need to create the `/etc/resolver` directory yourself.

Once you set the above settings and run dnsmasq, you will be able to visit _any_ .test URL and it will always map to localhost. In particular, you can run `npm run dev` and then visit http://localhost.test:3000/ and it will take you to the Leopard dev server. This is good because it works just like normal `localhost:3000` except now you can also use subdomains.

## Running on DigitalOcean Droplet

**Basic setup:** Spin up a DigitalOcean Droplet (or equivalent server).
Use [this tutorial from DigitalOcean](https://www.digitalocean.com/community/developer-center/deploying-a-next-js-application-on-a-digitalocean-droplet#step-5-setting-up-pm2-process-manager) to...

- Set up SSH access to the droplet
- Configure Nginx to accept requests on port `:80` (the default for internet traffic) and forward them to `localhost:3000`, where the Next.js app will run

Then, `git clone` the repository. Just like running locally, you will need to make a copy of `.env.template` into `.env`:

```bash
cd leopard-website
cp .env.template .env
```

Then, edit the file to add access info for two AWS S3 buckets.

After this, you will be able to `npm install` and `npm run build` and then `npm start` to start the server. **Note that you will need to make some configuration changes, detailed below, if your server is resource-limited.**

Once you have confirmed that `npm start` works, return to [the previously-linked tutorial](https://www.digitalocean.com/community/developer-center/deploying-a-next-js-application-on-a-digitalocean-droplet#step-5-setting-up-pm2-process-manager) to...

- Set up PM2 to automatically restart the server if it ever stops

**Domain name configuration:** The domain name should have a bunch of A records that each point to the droplet's IP address.

| **Type** |  **Host**  | **Value**  |
| :------: | :--------: | :--------: |
|    A     |     @      | DROPLET_IP |
|    A     |    www     | DROPLET_IP |
|    A     |     \*     | DROPLET_IP |
|    A     | \*.preview | DROPLET_IP |

Make sure your nginx server block configuration, at `/etc/nginx/sites-available/[name-you-chose]`, is set to accept both domains:

```
server {
  listen 80;
  server_name YOUR_DOMAIN.com www.YOUR_DOMAIN.com;
  # ...
}
```

Finally, make sure the `.env` file has `NEXT_PUBLIC_BASE_URL` set to `https://YOUR_DOMAIN.com` (without a trailing slash). Note that when you change the `.env` file, you must re-build the code for your changes to take effect.

**Add SSL (https):** Follow [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-22-04#step-4-obtaining-an-ssl-certificate) to install and configure certbot which will obtain and automatically renew SSL certificates from Let's Encrypt, and set up the Nginx plugin that enforces redirects from http to https.

**Set up an admin user on the Leopard website:** To set up an admin user on the Leopard website, you can register as a normal user and then update your role in the database. Updating the role can be done using the sqlite command line tool, [sqlite3](https://www.sqlite.org/cli.html), which can be installed by running `sudo apt update` followed by `sudo apt install sqlite3`.

Once the sqlite command-line tool is installed, you can run the following commands to interact with the database:

```
cd ~/leopard-website/prisma
sqlite3

# Within the sqlite3 tool:
sqlite> .open database.db
sqlite> .tables # List all the tables in the database
sqlite> .mode column # Make the output for SQL queries more visually appealing
sqlite> SELECT * FROM User;
sqlite> UPDATE User SET role="ADMIN" WHERE username="PullJosh"; # (or whichever username you want to make an admin)
```

### Configuration for resource-limited servers

I am running the website on a cheap droplet ($4/month), which is resource-limited. It has 512 MB memory and 10 GB disk. Installing dependencies and building with these limited resources required some configuration changes:

- Before installing dependencies, [add a swap file](https://stackoverflow.com/a/49269092/2205195) to compensate for limited RAM
- When building, use the command `npm run build-server` (as opposed to `npm run build`), which sets the `-max-old-space-size` option.

Builds are slow and could be much faster on a more powerful server, but they are also very rare and I'd rather configure the server to be appropriate for 99% of its use, which is serving the website, not building the code. (Alternatively, it is possible on DigitalOcean to temporarily scale up the RAM and compute and then spin it back down while preserving the file system.)
