FROM nginx:alpine
EXPOSE 80

# Get rid of nginx landing page
RUN rm /usr/share/nginx/html/index.html

# Add our files
ADD . /usr/share/nginx/html/

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf