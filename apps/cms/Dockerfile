FROM wordpress:php8.2-apache

# Install system libs and build PHP extensions (gd, xml, mysqli)
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
        libpng-dev libjpeg62-turbo-dev libfreetype6-dev \
        libxml2-dev; \
    docker-php-ext-configure gd --with-freetype --with-jpeg; \
    docker-php-ext-install -j"$(nproc)" gd xml mysqli; \
    rm -rf /var/lib/apt/lists/*

# (Optional) ensure ownership when using bind mounts
RUN chown -R www-data:www-data /var/www/html