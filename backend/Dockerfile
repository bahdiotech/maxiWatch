FROM python:3.12-alpine
ENV PYTHONUNBUFFERED 1
COPY ./app /movie/app
WORKDIR /movie/app
COPY ./requirements.txt /tmp/requirements.txt
EXPOSE 3030
RUN apk add --update --no-cache libpcre32 libpcre16 pcre-dev
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apk add --update --no-cache postgresql-client pcre-dev jpeg-dev && \
    apk add --update --no-cache --virtual .tmp-build-deps \
        build-base postgresql-dev pcre libpcre16 pcre-tools libpcre32 pcre-dev musl-dev zlib zlib-dev linux-headers && \
    /py/bin/pip install -r /tmp/requirements.txt &&\
    apk del .tmp-build-deps && \
    rm -rf /tmp && \
    adduser \
    --disabled-password \
    --no-create-home \
    django-user && \
mkdir -p /vol/web/media && \
mkdir -p /vol/web/static && \
chown -R django-user:django-user /vol &&\
chmod -R 755 /vol

ENV PATH="/py/bin:$PATH"

ENV POSTGRES_HOST_AUTH_METHOD=md5

USER django-user
# CMD ["python", "manage.py"]
