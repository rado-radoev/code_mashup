#!/usr/bin/env python

import client_data
import pika
import sys
import json

connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

channel.queue_declare(queue='everything')
channel.queue_declare(queue='results')

def callback(ch, method, properties, body):
    print(body)
    client = client_data.ClientData(
        '192.168.186.5',
        'user', 
        'pass', 
        'http://www.google.com', 
        5)
    json_client = client.toJSON()

    channel.basic_publish(
        exchange='', 
        routing_key='results',
        body=json_client)

channel.basic_consume(
    queue='everything',
    on_message_callback=callback,
    auto_ack=True)

print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()